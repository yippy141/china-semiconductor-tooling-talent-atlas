export type EditorialInsight = {
  id: string;
  title: string;
  summary: string;
  implication: string;
  source_ids: string[];
};

export const insights: EditorialInsight[] = [
  {
    id: "taxonomy-scaffold-share",
    title: "Thirty-eight percent of rows are structural scaffolding.",
    summary:
      "Sixty-five of 172 rows map disciplines, roles, and segments. They make the monitor navigable, but they do not show firms hiring, training, or deploying people.",
    implication:
      "Broad STEM counts cannot tell a toolmaker where Chinese competitors are building production support.",
    source_ids: ["CN_EDU_MOE_GRAD_DIR_2022", "CN_FILING_AMEC_2025"],
  },
  {
    id: "employer-disclosures-carry-signal",
    title: "Employer disclosures carry the strongest public signal.",
    summary:
      "AMEC, ACM Research Shanghai, and NAURA publish workforce categories that expose R&D, technical, and service structure better than most education data.",
    implication:
      "The customer-site support work between R&D and the customer fab deserves more attention than raw graduate output.",
    source_ids: [
      "CN_FILING_AMEC_2025",
      "CN_FILING_ACM_SH_2025",
      "CN_FILING_NAURA_2025",
    ],
  },
  {
    id: "city-records-cluster",
    title: "Shanghai and Beijing dominate the visible record.",
    summary:
      "Shanghai leads the city view, followed by Beijing. The concentration reflects firm filings, park records, and shortage notices, not a full labor-market map.",
    implication:
      "Shanghai-area filings, Beijing park records, and a small set of coastal shortage notices are the first stops for a primary-source check.",
    source_ids: [
      "CN_SHORT_SH_DIR_2020",
      "CN_PARK_BEIJING_ETOWN_IC",
      "CN_PARK_ORIENTAL_CHIP_PORT",
    ],
  },
  {
    id: "knowhow-hidden",
    title: "The decisive know-how sits behind the public record.",
    summary:
      "Chamber recovery, field calibration, tool matching, and customer-ramp support rarely appear in public records, even when firms publish product lines and R&D counts.",
    implication:
      "Production-support signals — service hiring, field application language, customer-ramp staffing — carry more weight than product-line announcements.",
    source_ids: ["CN_FILING_NAURA_2025", "CN_FILING_ACM_SH_2025"],
  },
];
