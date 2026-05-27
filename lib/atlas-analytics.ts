import capabilitiesData from "@/data/generated/capabilities.json";
import observationsData from "@/data/generated/observations.json";
import sourcesData from "@/data/generated/sources.json";
import { formatEvidenceType, formatSegment } from "@/lib/atlas-labels";

type Observation = (typeof observationsData)[number];
type Capability = (typeof capabilitiesData)[number];

export type EvidenceGroup =
  | "direct_public_record"
  | "analytical_proxy"
  | "taxonomy_scaffold";

export type CountRow = {
  id: string;
  label: string;
  count: number;
};

export type CityEvidenceRow = {
  city: string;
  province: string;
  count: number;
  sourceCount: number;
};

export const evidenceGroupLabels: Record<EvidenceGroup, string> = {
  direct_public_record: "Direct public record",
  analytical_proxy: "Analytical proxy",
  taxonomy_scaffold: "Taxonomy scaffold",
};

export const evidenceTypeGroups: Record<string, EvidenceGroup> = {
  expert_secondary: "analytical_proxy",
  industry_presence: "direct_public_record",
  institutional_capacity: "direct_public_record",
  job_posting_proxy: "analytical_proxy",
  manual_inference: "taxonomy_scaffold",
  official_policy: "direct_public_record",
  research_output_proxy: "analytical_proxy",
  shortage_signal: "direct_public_record",
};

export const totalSources = sourcesData.length;
export const totalObservations = observationsData.length;

export const taxonomyScaffoldRows = observationsData.filter(
  (observation) => observation.evidence_type === "manual_inference",
);

export const nonTaxonomyEvidenceRows = observationsData.filter(
  (observation) => observation.evidence_type !== "manual_inference",
);

function isSubstantiveObservation(observation: Observation) {
  return (
    observation.evidence_type !== "manual_inference" &&
    observation.entity_type !== "source" &&
    observation.entity_type !== "proxy_source"
  );
}

function getEvidenceGroup(evidenceType: string): EvidenceGroup {
  return evidenceTypeGroups[evidenceType] ?? "analytical_proxy";
}

function sortCountRows(rows: CountRow[]) {
  return rows.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.label.localeCompare(b.label);
  });
}

function countObservationsByValue(
  observations: readonly Observation[],
  getValue: (observation: Observation) => string,
  getLabel: (value: string) => string,
): CountRow[] {
  const counts = new Map<string, number>();

  for (const observation of observations) {
    const value = getValue(observation) || "unspecified";
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const rows = Array.from(counts, ([id, count]) => ({
    id,
    label: getLabel(id),
    count,
  }));

  return sortCountRows(rows);
}

function countCapabilitiesByValue(
  capabilities: readonly Capability[],
  getValue: (capability: Capability) => string,
  getLabel: (value: string) => string,
): CountRow[] {
  const counts = new Map<string, number>();

  for (const capability of capabilities) {
    const value = getValue(capability) || "unspecified";
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const rows = Array.from(counts, ([id, count]) => ({
    id,
    label: getLabel(id),
    count,
  }));

  return sortCountRows(rows);
}

export const observationsBySegment = countObservationsByValue(
  observationsData,
  (observation) => observation.segment,
  formatSegment,
);

export const observationsByEvidenceType = countObservationsByValue(
  observationsData,
  (observation) => observation.evidence_type,
  formatEvidenceType,
);

export const observationsByEvidenceGroup = countObservationsByValue(
  observationsData,
  (observation) => getEvidenceGroup(observation.evidence_type),
  (value) => evidenceGroupLabels[value as EvidenceGroup] ?? value,
);

export const topCitiesByEvidence: CityEvidenceRow[] = (() => {
  const groups = new Map<string, Observation[]>();

  for (const observation of observationsData) {
    if (!observation.city) continue;
    if (!isSubstantiveObservation(observation)) continue;

    const key = `${observation.city}|${observation.province}`;
    const existingRows = groups.get(key) ?? [];
    groups.set(key, existingRows.concat(observation));
  }

  const rows = Array.from(groups, ([key, observations]) => {
    const [city, province] = key.split("|");
    const sourceIds = observations.map((observation) => observation.source_id);

    return {
      city,
      province,
      count: observations.length,
      sourceCount: new Set(sourceIds.filter(Boolean)).size,
    };
  });

  return rows.sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.city.localeCompare(b.city);
  });
})();

export const sourceCountBySegment = (() => {
  const sourceIdsBySegment = new Map<string, Set<string>>();

  for (const observation of observationsData) {
    const segment = observation.segment || "unspecified";
    const sourceIds = sourceIdsBySegment.get(segment) ?? new Set<string>();

    if (observation.source_id) {
      sourceIds.add(observation.source_id);
    }

    sourceIdsBySegment.set(segment, sourceIds);
  }

  const rows = Array.from(sourceIdsBySegment, ([id, sourceIds]) => ({
    id,
    label: formatSegment(id),
    count: sourceIds.size,
  }));

  return sortCountRows(rows);
})();

export const capabilityCountBySegment = countCapabilitiesByValue(
  capabilitiesData,
  (capability) => capability.segment,
  formatSegment,
);
