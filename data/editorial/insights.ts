export type EditorialInsight = {
  id: string;
  title: string;
  summary: string;
  implication: string;
  source_ids: string[];
};

export const insights: EditorialInsight[] = [
  {
    id: "visible-layer-thinner-than-headline-count",
    title: "Visible layer is thinner than headline count.",
    summary:
      "The atlas contains many public evidence signals, but a meaningful share is taxonomy scaffolding or proxy evidence rather than direct workforce observation.",
    implication:
      "Use the evidence layer to ask sharper questions, not to claim a measured talent pool.",
    source_ids: ["CN_EDU_MOE_GRAD_DIR_2022", "CN_FILING_AMEC_2025"],
  },
  {
    id: "segment-rankings-are-fragile",
    title: "Segment rankings are fragile.",
    summary:
      "A segment can look stronger because its firms, parks, or policy directories disclose more, not because the underlying know-how is deeper.",
    implication:
      "The homepage should compare evidence strength and visibility, not rank capability.",
    source_ids: ["CN_FIRM_AMEC", "CN_FIRM_NAURA", "CN_FIRM_ACM_SH"],
  },
  {
    id: "geography-clustered-visibility-not-depth",
    title: "Geography is clustered but visibility is not depth.",
    summary:
      "Shanghai, Beijing, Suzhou, Shenzhen, and several inland or northeast cities show visible signals, but city presence is not the same as production depth.",
    implication:
      "Treat the city view as a navigation layer for evidence, not as a geographic scorecard.",
    source_ids: [
      "CN_SHORT_SH_DIR_2020",
      "CN_SHORT_SZ_SEMI_2024",
      "CN_PARK_SIP_IC",
      "CN_PARK_BEIJING_ETOWN_IC",
    ],
  },
  {
    id: "tacit-production-knowhow-silent-column",
    title: "Tacit production know-how is the silent column.",
    summary:
      "The hardest skills, such as chamber recovery, field calibration, tool matching, and customer ramp judgment, are weakly visible in public sources.",
    implication:
      "The brief should make absence legible instead of filling it with invented precision.",
    source_ids: ["CN_FILING_NAURA_2025", "CN_FILING_ACM_SH_2025"],
  },
];
