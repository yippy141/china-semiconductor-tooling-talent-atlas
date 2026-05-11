export const segmentLabels: Record<string, string> = {
  deposition: "Deposition",
  etch_clean: "Etch, clean, and strip",
  lithography_sidebar: "Lithography sidebar",
  metrology_inspection: "Metrology and inspection",
};

export const evidenceTypeLabels: Record<string, string> = {
  expert_secondary: "Expert secondary source",
  industry_presence: "Industry presence",
  institutional_capacity: "Institutional capacity",
  job_posting_proxy: "Job posting proxy",
  manual_inference: "Manual taxonomy scaffold",
  official_policy: "Official policy",
  research_output_proxy: "Research output proxy",
  shortage_signal: "Shortage signal",
};

export const confidenceLabels: Record<string, string> = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

export const entityTypeLabels: Record<string, string> = {
  capability: "Capability",
  city: "City",
  company: "Company",
  discipline: "Discipline",
  industrial_cluster: "Industrial cluster",
  industrial_park: "Industrial park",
  institution: "Institution",
  proxy_source: "Proxy source",
  role_family: "Role family",
  source: "Source",
};

function formatFallback(value: string) {
  if (!value) return "Unspecified";

  return value
    .split("_")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatSegment(value: string): string {
  return segmentLabels[value] ?? formatFallback(value);
}

export function formatEvidenceType(value: string): string {
  return evidenceTypeLabels[value] ?? formatFallback(value);
}

export function formatConfidence(value: string): string {
  return confidenceLabels[value] ?? formatFallback(value);
}

export function formatEntityType(value: string): string {
  return entityTypeLabels[value] ?? formatFallback(value);
}
