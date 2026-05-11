"use client";

import { useMemo, useState } from "react";
import capabilitiesData from "@/data/generated/capabilities.json";
import citySignalsData from "@/data/generated/city_signals.json";
import industryEntitiesData from "@/data/generated/industry_entities.json";
import institutionsData from "@/data/generated/institutions.json";
import observationsData from "@/data/generated/observations.json";
import sourcesData from "@/data/generated/sources.json";

const segments = [
  {
    id: "etch_clean",
    label: "Etch/Clean/Strip",
    shortLabel: "etch/clean/strip",
  },
  {
    id: "deposition",
    label: "Deposition",
    shortLabel: "deposition",
  },
  {
    id: "metrology_inspection",
    label: "Metrology/Inspection",
    shortLabel: "metrology/inspection",
  },
  {
    id: "lithography_sidebar",
    label: "Lithography Sidebar",
    shortLabel: "lithography sidebar",
  },
] as const;

type SegmentId = (typeof segments)[number]["id"];
type Capability = (typeof capabilitiesData)[number];
type Observation = (typeof observationsData)[number];
type Source = (typeof sourcesData)[number];

const sourceTitleById = new Map<string, Source>(
  sourcesData.map((source) => [source.source_id, source]),
);

const segmentLabelById = new Map<string, string>(
  segments.map((segment) => [segment.id, segment.label]),
);

const confidencePalette: Record<string, string> = {
  high: "#1c1917",
  medium: "#a8a29e",
  low: "#d6d3d1",
};

function titleCaseFromSnake(value: string) {
  return value
    .split("_")
    .map((word) =>
      word.length === 0 ? word : word[0].toUpperCase() + word.slice(1),
    )
    .join(" ");
}

const kpis = [
  {
    label: "Sources",
    value: sourcesData.length,
    note: "ledger entries",
  },
  {
    label: "Observations",
    value: observationsData.length,
    note: "staging evidence rows",
  },
  {
    label: "Capabilities",
    value: capabilitiesData.length,
    note: "taxonomy rows",
  },
  {
    label: "Institutions",
    value: institutionsData.length,
    note: "public institution signals",
  },
];

function normalizeList(value: string) {
  return value
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean);
}

function includesSegment(value: string, segment: SegmentId) {
  return normalizeList(value).includes(segment);
}

function uniqueCount(values: string[]) {
  return new Set(values.filter(Boolean)).size;
}

function confidenceLabel(observations: Observation[]) {
  const confidenceCounts = observations.reduce<Record<string, number>>(
    (counts, observation) => {
      const key = observation.confidence || "unspecified";
      counts[key] = (counts[key] ?? 0) + 1;
      return counts;
    },
    {},
  );

  return Object.entries(confidenceCounts)
    .map(([confidence, count]) => `${confidence}: ${count}`)
    .join(", ");
}

function sourceLabel(sourceId: string) {
  const source = sourceTitleById.get(sourceId);
  return source ? source.publisher : "Source not found";
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-stone-50 px-5 py-8 text-sm text-stone-600">
      {message}
    </div>
  );
}

function DistributionCard({
  eyebrow,
  title,
  description,
  emptyMessage,
  rows,
}: {
  eyebrow: string;
  title: string;
  description: string;
  emptyMessage: string;
  rows: { label: string; count: number }[];
}) {
  const maxCount = Math.max(...rows.map((row) => row.count), 0);

  return (
    <div className="flex flex-col rounded-lg border border-stone-300 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        {eyebrow}
      </p>
      <h3 className="mt-2 text-base font-semibold text-stone-950">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-stone-600">{description}</p>
      <div className="mt-4">
        {rows.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <div className="space-y-3">
            {rows.map((row) => {
              const width = maxCount === 0 ? 0 : (row.count / maxCount) * 100;

              return (
                <div key={row.label}>
                  <div className="mb-1 flex items-center justify-between gap-4 text-xs text-stone-600">
                    <span>{row.label}</span>
                    <span className="font-mono text-stone-500">
                      {row.count}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden bg-stone-100">
                    <div
                      className="h-full bg-stone-800"
                      style={{ width: `${width}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 max-w-3xl">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-semibold tracking-tight text-stone-950">
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-stone-600">{description}</p>
    </div>
  );
}

export default function ExplorerPage() {
  const [activeSegment, setActiveSegment] = useState<SegmentId>("etch_clean");

  const selectedSegment = segments.find((segment) => segment.id === activeSegment);

  const filteredCapabilities = useMemo(
    () =>
      capabilitiesData.filter(
        (capability) => capability.segment === activeSegment,
      ),
    [activeSegment],
  );

  const filteredObservations = useMemo(
    () =>
      observationsData.filter(
        (observation) => observation.segment === activeSegment,
      ),
    [activeSegment],
  );

  const observationsBySegment = useMemo(() => {
    const counts = new Map<string, number>();
    for (const observation of observationsData) {
      const key = observation.segment || "unspecified";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts, ([segmentId, count]) => ({
      segmentId,
      label: segmentLabelById.get(segmentId) ?? titleCaseFromSnake(segmentId),
      count,
    })).sort((a, b) => b.count - a.count);
  }, []);

  const observationsByEvidenceType = useMemo(() => {
    const counts = new Map<string, number>();
    for (const observation of observationsData) {
      const key = observation.evidence_type || "unspecified";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts, ([evidenceType, count]) => ({
      evidenceType,
      label: titleCaseFromSnake(evidenceType),
      count,
    })).sort((a, b) => b.count - a.count);
  }, []);

  const cityClusters = useMemo(() => {
    type Row = {
      city: string;
      province: string;
      segment: string;
      evidence_type: string;
      confidence: string;
    };

    const signalRows: Row[] = citySignalsData.map((signal) => ({
      city: signal.city,
      province: signal.province,
      segment: signal.segment,
      evidence_type: signal.evidence_type,
      confidence: signal.confidence,
    }));

    const observationRows: Row[] = observationsData.map((observation) => ({
      city: observation.city,
      province: observation.province,
      segment: observation.segment,
      evidence_type: observation.evidence_type,
      confidence: observation.confidence,
    }));

    const allRows: Row[] = signalRows
      .concat(observationRows)
      .filter((row) => Boolean(row.city) && Boolean(row.segment));

    const groups = allRows.reduce<Record<string, Row[]>>((acc, row) => {
      const key = `${row.city}|${row.province}|${row.segment}`;
      acc[key] = (acc[key] ?? []).concat(row);
      return acc;
    }, {});

    const clusters = Object.entries(groups).map(([key, rows]) => {
      const [city, province, segment] = key.split("|");

      const evidenceCounts = rows.reduce<Record<string, number>>(
        (acc, row) =>
          row.evidence_type
            ? { ...acc, [row.evidence_type]: (acc[row.evidence_type] ?? 0) + 1 }
            : acc,
        {},
      );
      const topEvidenceTypes = Object.entries(evidenceCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([type, count]) => ({ label: titleCaseFromSnake(type), count }));

      const confidenceCounts = rows.reduce<Record<string, number>>(
        (acc, row) =>
          row.confidence
            ? { ...acc, [row.confidence]: (acc[row.confidence] ?? 0) + 1 }
            : acc,
        {},
      );
      const confidenceMix = Object.entries(confidenceCounts)
        .sort((a, b) => b[1] - a[1])
        .map(([confidence, count]) => ({
          confidence,
          label: titleCaseFromSnake(confidence),
          count,
        }));

      const institutions = institutionsData
        .filter(
          (institution) =>
            institution.city === city &&
            normalizeList(institution.segments).includes(segment),
        )
        .map((institution) => ({
          id: institution.institution_id,
          name: institution.name_en,
        }));

      const entities = industryEntitiesData
        .filter(
          (entity) =>
            entity.city === city &&
            normalizeList(entity.segment).includes(segment),
        )
        .map((entity) => ({ id: entity.entity_id, name: entity.name_en }));

      return {
        key,
        city,
        province,
        segment,
        segmentLabel:
          segmentLabelById.get(segment) ?? titleCaseFromSnake(segment),
        observationCount: rows.length,
        topEvidenceTypes,
        confidenceMix,
        institutions,
        entities,
      };
    });

    return clusters.sort((a, b) => {
      if (b.observationCount !== a.observationCount) {
        return b.observationCount - a.observationCount;
      }
      if (a.city !== b.city) return a.city.localeCompare(b.city);
      return a.segmentLabel.localeCompare(b.segmentLabel);
    });
  }, []);

  const observationsByConfidence = useMemo(() => {
    const counts = new Map<string, number>();
    for (const observation of observationsData) {
      const key = observation.confidence || "unspecified";
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts, ([confidence, count]) => ({
      confidence,
      label: titleCaseFromSnake(confidence),
      count,
    })).sort((a, b) => b.count - a.count);
  }, []);

  const filteredInstitutions = useMemo(
    () =>
      institutionsData.filter((institution) =>
        includesSegment(institution.segments, activeSegment),
      ),
    [activeSegment],
  );

  const segmentSummary = [
    {
      label: "Capability rows",
      value: filteredCapabilities.length,
    },
    {
      label: "Evidence rows",
      value: filteredObservations.length,
    },
    {
      label: "Source IDs",
      value: uniqueCount(
        filteredObservations.map((observation) => observation.source_id),
      ),
    },
    {
      label: "Institution signals",
      value: filteredInstitutions.length,
    },
  ];

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 py-8 sm:px-8 lg:px-10">
        <header className="border-b border-stone-300 pb-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                Editorial evidence product
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                China Semiconductor Tooling Talent Atlas
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
                A public-evidence view of where tooling-relevant talent signals
                appear across mainland PRC semiconductor equipment segments.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/essay"
                className="inline-flex h-11 w-fit items-center border border-stone-300 bg-stone-50 px-4 text-sm font-medium text-stone-700 transition-colors hover:border-stone-500 hover:bg-white"
              >
                Read the essay
              </a>
              <a
                href="/methodology"
                className="inline-flex h-11 w-fit items-center border border-stone-900 px-4 text-sm font-medium text-stone-950 transition-colors hover:bg-stone-950 hover:text-white"
              >
                Methodology
              </a>
            </div>
          </div>
          <div className="mt-6 max-w-4xl border-l-2 border-stone-400 pl-4 text-sm leading-6 text-stone-600">
            Caveat: this page uses generated JSON from local CSV files. The
            observations remain staging evidence until manually verified, and
            the counts below are public evidence signals, not capability scores
            or labor-market totals.
          </div>
        </header>

        <section
          aria-label="Dataset totals"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg border border-stone-300 bg-white p-5 shadow-sm"
            >
              <p className="text-sm text-stone-500">{kpi.label}</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight">
                {kpi.value.toLocaleString()}
              </p>
              <p className="mt-2 text-sm text-stone-600">{kpi.note}</p>
            </div>
          ))}
        </section>

        <section aria-label="Dataset shape" className="flex flex-col gap-4">
          <SectionHeading
            eyebrow="Dataset shape"
            title="How observations distribute across the atlas"
            description="Counts are calculated from the full observations.json file, not the segment filter below. Read these as public evidence signals, not capability."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            <DistributionCard
              eyebrow="By segment"
              title="Observations per tooling segment"
              description="Number of evidence rows assigned to each segment in the staging data."
              emptyMessage="No observations are loaded for any segment."
              rows={observationsBySegment}
            />

            <DistributionCard
              eyebrow="By confidence"
              title="Confidence breakdown"
              description="Confidence describes the link between source and observation, not how important the observation is."
              emptyMessage="No observations carry a confidence value yet."
              rows={observationsByConfidence}
            />
          </div>

          <DistributionCard
            eyebrow="By evidence type"
            title="Observations per evidence type"
            description="Definitions for each label live on the methodology page. Bars are sorted by count to surface the most-cited evidence types first."
            emptyMessage="No observations are tagged with an evidence type."
            rows={observationsByEvidenceType}
          />
        </section>

        <section aria-label="City clusters">
          <SectionHeading
            eyebrow="City clusters"
            title="Public-evidence signals by city and segment"
            description="Each row groups public evidence rows for one city, province, and tooling segment. Counts are public evidence signals, not capability scores, talent rankings, or labor-market totals."
          />
          {cityClusters.length === 0 ? (
            <EmptyState message="No city-level evidence is loaded yet." />
          ) : (
            <div className="overflow-hidden rounded-lg border border-stone-300 bg-white shadow-sm">
              <div className="max-h-[680px] overflow-auto">
                <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
                  <thead className="sticky top-0 bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                    <tr>
                      <th className="min-w-44 px-4 py-3 font-semibold">City</th>
                      <th className="min-w-44 px-4 py-3 font-semibold">Segment</th>
                      <th className="w-36 px-4 py-3 font-semibold">
                        Public evidence signal
                      </th>
                      <th className="min-w-56 px-4 py-3 font-semibold">
                        Top evidence types
                      </th>
                      <th className="min-w-44 px-4 py-3 font-semibold">
                        Confidence mix
                      </th>
                      <th className="min-w-56 px-4 py-3 font-semibold">
                        Key institutions
                      </th>
                      <th className="min-w-56 px-4 py-3 font-semibold">
                        Key industry entities
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {cityClusters.map((cluster) => (
                      <tr key={cluster.key}>
                        <td className="px-4 py-4 align-top">
                          <p className="font-medium text-stone-950">
                            {cluster.city}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            {cluster.province || "Province not recorded"}
                          </p>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <p className="text-stone-800">{cluster.segmentLabel}</p>
                          <p className="mt-1 font-mono text-xs text-stone-500">
                            {cluster.segment}
                          </p>
                        </td>
                        <td className="px-4 py-4 align-top">
                          <p className="text-2xl font-semibold text-stone-950">
                            {cluster.observationCount}
                          </p>
                          <p className="mt-1 text-xs text-stone-500">
                            evidence row
                            {cluster.observationCount === 1 ? "" : "s"}
                          </p>
                        </td>
                        <td className="px-4 py-4 align-top text-stone-600">
                          {cluster.topEvidenceTypes.length === 0 ? (
                            <span className="text-stone-400">—</span>
                          ) : (
                            <ul className="space-y-1">
                              {cluster.topEvidenceTypes.map((type) => (
                                <li key={type.label} className="leading-5">
                                  {type.label}
                                  <span className="ml-1 text-xs text-stone-500">
                                    · {type.count}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                        <td className="px-4 py-4 align-top">
                          {cluster.confidenceMix.length === 0 ? (
                            <span className="text-stone-400">—</span>
                          ) : (
                            <ul className="flex flex-wrap gap-1.5">
                              {cluster.confidenceMix.map((entry) => (
                                <li
                                  key={entry.confidence}
                                  className="inline-flex items-center gap-1.5 border border-stone-200 bg-stone-50 px-2 py-1 text-xs text-stone-700"
                                >
                                  <span
                                    aria-hidden
                                    className="inline-block h-2 w-2 rounded-full"
                                    style={{
                                      backgroundColor:
                                        confidencePalette[entry.confidence] ??
                                        "#a8a29e",
                                    }}
                                  />
                                  {entry.label}
                                  <span className="text-stone-500">
                                    · {entry.count}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </td>
                        <td className="px-4 py-4 align-top text-stone-600">
                          {cluster.institutions.length === 0 ? (
                            <span className="text-stone-400">—</span>
                          ) : (
                            <ul className="space-y-1 leading-5">
                              {cluster.institutions.map((institution) => (
                                <li key={institution.id}>{institution.name}</li>
                              ))}
                            </ul>
                          )}
                        </td>
                        <td className="px-4 py-4 align-top text-stone-600">
                          {cluster.entities.length === 0 ? (
                            <span className="text-stone-400">—</span>
                          ) : (
                            <ul className="space-y-1 leading-5">
                              {cluster.entities.map((entity) => (
                                <li key={entity.id}>{entity.name}</li>
                              ))}
                            </ul>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section className="rounded-lg border border-stone-300 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                Segment filter
              </p>
              <h2 className="mt-2 text-xl font-semibold text-stone-950">
                {selectedSegment?.label}
              </h2>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:flex">
              {segments.map((segment) => {
                const isActive = segment.id === activeSegment;

                return (
                  <button
                    key={segment.id}
                    type="button"
                    onClick={() => setActiveSegment(segment.id)}
                    className={`h-10 border px-3 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-stone-950 bg-stone-950 text-white"
                        : "border-stone-300 bg-stone-50 text-stone-700 hover:border-stone-500 hover:bg-white"
                    }`}
                  >
                    {segment.shortLabel}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {segmentSummary.map((item) => (
              <div
                key={item.label}
                className="border border-stone-200 bg-stone-50 p-4"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-stone-500">
                  {item.label}
                </p>
                <p className="mt-2 text-2xl font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionHeading
            eyebrow="Capability matrix"
            title="Capabilities and attached public evidence signals"
            description="Rows come from the generated capability taxonomy. Evidence counts are calculated only from observations that name the same capability_id."
          />

          {filteredCapabilities.length === 0 ? (
            <EmptyState message="No capability rows are available for this segment." />
          ) : (
            <div className="overflow-hidden rounded-lg border border-stone-300 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
                  <thead className="bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                    <tr>
                      <th className="w-28 px-4 py-3 font-semibold">ID</th>
                      <th className="min-w-72 px-4 py-3 font-semibold">
                        Capability
                      </th>
                      <th className="min-w-64 px-4 py-3 font-semibold">
                        Public proxy examples
                      </th>
                      <th className="w-36 px-4 py-3 font-semibold">
                        Evidence rows
                      </th>
                      <th className="w-44 px-4 py-3 font-semibold">
                        Evidence strength
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredCapabilities.map((capability: Capability) => {
                      const capabilityObservations = filteredObservations.filter(
                        (observation) =>
                          observation.capability_id ===
                          capability.capability_id,
                      );
                      const sourceCount = uniqueCount(
                        capabilityObservations.map(
                          (observation) => observation.source_id,
                        ),
                      );

                      return (
                        <tr key={capability.capability_id}>
                          <td className="px-4 py-4 align-top font-mono text-xs text-stone-500">
                            {capability.capability_id}
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="font-medium text-stone-950">
                              {capability.capability_name}
                            </p>
                            <p className="mt-2 leading-6 text-stone-600">
                              {capability.plain_english_description}
                            </p>
                          </td>
                          <td className="px-4 py-4 align-top leading-6 text-stone-600">
                            {capability.public_proxy_examples}
                          </td>
                          <td className="px-4 py-4 align-top">
                            <p className="font-semibold text-stone-950">
                              {capabilityObservations.length}
                            </p>
                            <p className="mt-1 text-xs text-stone-500">
                              {sourceCount} source ID
                              {sourceCount === 1 ? "" : "s"}
                            </p>
                          </td>
                          <td className="px-4 py-4 align-top text-stone-600">
                            {capabilityObservations.length > 0
                              ? confidenceLabel(capabilityObservations)
                              : "No capability-linked observations yet"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section>
          <SectionHeading
            eyebrow="Evidence table"
            title="Observation rows for the selected segment"
            description="Each row is sourced by source_id. Empty capability_id cells mean the observation is segment-level or entity-level rather than capability-specific."
          />

          {filteredObservations.length === 0 ? (
            <EmptyState message="No observations are available for this segment." />
          ) : (
            <div className="overflow-hidden rounded-lg border border-stone-300 bg-white shadow-sm">
              <div className="max-h-[680px] overflow-auto">
                <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
                  <thead className="sticky top-0 bg-stone-50 text-xs uppercase tracking-[0.12em] text-stone-500">
                    <tr>
                      <th className="w-28 px-4 py-3 font-semibold">ID</th>
                      <th className="min-w-64 px-4 py-3 font-semibold">
                        Observation
                      </th>
                      <th className="min-w-52 px-4 py-3 font-semibold">
                        Entity
                      </th>
                      <th className="w-40 px-4 py-3 font-semibold">
                        Evidence type
                      </th>
                      <th className="w-32 px-4 py-3 font-semibold">
                        Confidence
                      </th>
                      <th className="min-w-52 px-4 py-3 font-semibold">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filteredObservations.map((observation) => (
                      <tr key={observation.observation_id}>
                        <td className="px-4 py-4 align-top font-mono text-xs text-stone-500">
                          {observation.observation_id}
                        </td>
                        <td className="px-4 py-4 align-top">
                          <p className="font-medium text-stone-950">
                            {observation.indicator_name}
                          </p>
                          <p className="mt-2 leading-6 text-stone-600">
                            {observation.indicator_value}
                          </p>
                          {observation.capability_id ? (
                            <p className="mt-2 font-mono text-xs text-stone-500">
                              capability_id: {observation.capability_id}
                            </p>
                          ) : null}
                        </td>
                        <td className="px-4 py-4 align-top text-stone-600">
                          <p>{observation.entity_type}</p>
                          <p className="mt-1 font-mono text-xs text-stone-500">
                            {observation.entity_id}
                          </p>
                        </td>
                        <td className="px-4 py-4 align-top text-stone-600">
                          {observation.evidence_type}
                        </td>
                        <td className="px-4 py-4 align-top text-stone-600">
                          {observation.confidence}
                        </td>
                        <td className="px-4 py-4 align-top">
                          <p className="font-mono text-xs text-stone-700">
                            {observation.source_id}
                          </p>
                          <p className="mt-2 leading-5 text-stone-500">
                            {sourceLabel(observation.source_id)}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>

        <section
          id="methodology"
          className="rounded-lg border border-stone-300 bg-white p-6 shadow-sm"
        >
          <SectionHeading
            eyebrow="Methodology"
            title="What this first dashboard does and does not claim"
            description="The page reads local generated JSON only. It shows public evidence signals by segment and source_id, keeps observations in staging language, and avoids maps, rankings, exact labor counts, or individual-level data."
          />
          <div className="grid gap-4 text-sm leading-6 text-stone-600 lg:grid-cols-3">
            <p>
              Capability rows describe tooling problems and public proxy
              examples from the local taxonomy.
            </p>
            <p>
              Evidence rows are filtered observations and should be read as
              source-backed signals, not as a neutral census.
            </p>
            <p>
              Source IDs stay visible so every observation can be traced back to
              the ledger before publication.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
