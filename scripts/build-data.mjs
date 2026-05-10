import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "csv-parse/sync";
import { z } from "zod";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const rawDir = path.join(projectRoot, "data", "raw");
const generatedDir = path.join(projectRoot, "data", "generated");

const tableConfigs = {
  "capabilities.csv": {
    outputName: "capabilities",
    idColumn: "capability_id",
    requiredColumns: ["capability_id", "segment", "capability_name"],
  },
  "observations.csv": {
    outputName: "observations",
    idColumn: "observation_id",
    requiredColumns: [
      "observation_id",
      "entity_type",
      "entity_id",
      "segment",
      "indicator_name",
      "indicator_value",
      "evidence_type",
      "confidence",
      "source_id",
    ],
  },
  "sources.csv": {
    outputName: "sources",
    idColumn: "source_id",
    requiredColumns: ["source_id", "title", "publisher", "source_type", "url"],
  },
};

const requiredRawFiles = Object.keys(tableConfigs);

function csvNameToOutputName(fileName) {
  return fileName.replace(/\.csv$/u, "").replaceAll("-", "_");
}

function createRequiredColumnSchema(requiredColumns) {
  return z
    .object(
      Object.fromEntries(
        requiredColumns.map((column) => [column, z.string().trim().min(1)]),
      ),
    )
    .passthrough();
}

function formatZodIssue(issue) {
  const column = issue.path.join(".");
  return column ? `${column}: ${issue.message}` : issue.message;
}

async function readCsvTable(fileName) {
  const csvText = await readFile(path.join(rawDir, fileName), "utf8");

  return parse(csvText, {
    bom: true,
    columns: true,
    relax_column_count: false,
    skip_empty_lines: true,
    trim: true,
  });
}

function validateRequiredColumns({ fileName, rows, requiredColumns, errors }) {
  const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

  for (const column of requiredColumns) {
    if (!headers.includes(column)) {
      errors.push(`${fileName}: missing required column "${column}".`);
    }
  }
}

function validateRows({ fileName, rows, config, errors }) {
  const rowSchema = createRequiredColumnSchema(config.requiredColumns);
  const seenIds = new Set();

  rows.forEach((row, index) => {
    const rowNumber = index + 2;
    const rowResult = z.record(z.string()).safeParse(row);

    if (!rowResult.success) {
      errors.push(`${fileName} row ${rowNumber}: expected string CSV values.`);
      return;
    }

    const result = rowSchema.safeParse(row);
    if (!result.success) {
      const message = result.error.issues.map(formatZodIssue).join("; ");
      errors.push(`${fileName} row ${rowNumber}: ${message}.`);
    }

    const id = row[config.idColumn]?.trim();
    if (!id) {
      errors.push(
        `${fileName} row ${rowNumber}: missing required ID in "${config.idColumn}".`,
      );
      return;
    }

    if (seenIds.has(id)) {
      errors.push(
        `${fileName} row ${rowNumber}: duplicate ${config.idColumn} "${id}".`,
      );
    }

    seenIds.add(id);
  });
}

function validateObservationReferences({ tablesByFile, errors }) {
  const sources = tablesByFile["sources.csv"] ?? [];
  const capabilities = tablesByFile["capabilities.csv"] ?? [];
  const observations = tablesByFile["observations.csv"] ?? [];

  const sourceIds = new Set(sources.map((row) => row.source_id));
  const capabilityIds = new Set(capabilities.map((row) => row.capability_id));

  observations.forEach((row, index) => {
    const rowNumber = index + 2;
    const sourceId = row.source_id?.trim();
    const capabilityId = row.capability_id?.trim();

    if (!sourceIds.has(sourceId)) {
      errors.push(
        `observations.csv row ${rowNumber}: source_id "${sourceId}" does not exist in sources.csv.`,
      );
    }

    if (capabilityId && !capabilityIds.has(capabilityId)) {
      errors.push(
        `observations.csv row ${rowNumber}: capability_id "${capabilityId}" does not exist in capabilities.csv.`,
      );
    }
  });
}

async function writeJsonTables({ tablesByFile }) {
  await mkdir(generatedDir, { recursive: true });

  const existingFiles = await readdir(generatedDir);
  await Promise.all(
    existingFiles
      .filter((fileName) => fileName.endsWith(".json"))
      .map((fileName) => rm(path.join(generatedDir, fileName))),
  );

  const manifest = [];

  for (const [fileName, rows] of Object.entries(tablesByFile)) {
    const outputName =
      tableConfigs[fileName]?.outputName ?? csvNameToOutputName(fileName);
    const outputFile = `${outputName}.json`;

    await writeFile(
      path.join(generatedDir, outputFile),
      `${JSON.stringify(rows, null, 2)}\n`,
    );

    manifest.push({
      table: outputName,
      source: `data/raw/${fileName}`,
      output: `data/generated/${outputFile}`,
      rows: rows.length,
    });
  }

  await writeFile(
    path.join(generatedDir, "manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );
}

async function main() {
  const errors = [];
  const tablesByFile = {};

  let rawFileNames = [];
  try {
    rawFileNames = (await readdir(rawDir))
      .filter((fileName) => fileName.endsWith(".csv"))
      .sort();
  } catch {
    errors.push("data/raw does not exist. Add raw CSV files before running.");
  }

  for (const fileName of requiredRawFiles) {
    if (!rawFileNames.includes(fileName)) {
      errors.push(`data/raw/${fileName} is required but was not found.`);
    }
  }

  for (const fileName of rawFileNames) {
    try {
      const rows = await readCsvTable(fileName);
      tablesByFile[fileName] = rows;

      const config = tableConfigs[fileName];
      if (config) {
        validateRequiredColumns({
          fileName,
          rows,
          requiredColumns: config.requiredColumns,
          errors,
        });
        validateRows({ fileName, rows, config, errors });
      }
    } catch (error) {
      errors.push(`${fileName}: ${error.message}`);
    }
  }

  if (
    tablesByFile["sources.csv"] &&
    tablesByFile["capabilities.csv"] &&
    tablesByFile["observations.csv"]
  ) {
    validateObservationReferences({ tablesByFile, errors });
  }

  if (errors.length > 0) {
    console.error("Data build failed:");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  await writeJsonTables({ tablesByFile });
  console.log(`Built ${Object.keys(tablesByFile).length} JSON tables.`);
}

main().catch((error) => {
  console.error("Data build failed:");
  console.error(`- ${error.message}`);
  process.exit(1);
});
