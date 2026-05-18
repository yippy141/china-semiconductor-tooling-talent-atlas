export type FirmProfile = {
  slug: string;
  firmId: string;
  name: string;
  nameCn: string;
  headquarters: string;
  oneLine: string;
  segments: string[];
  productFamilies: {
    segment: string;
    label: string;
    publicRecord: string;
    source_id: string;
  }[];
  workforceSignals: {
    label: string;
    value: string;
    note: string;
    source_id: string;
  }[];
  analystRead: string;
  watchSignals: string[];
  doNotInfer: string[];
  source_ids: string[];
};

export const firmProfiles: FirmProfile[] = [
  {
    slug: "amec",
    firmId: "ent_amec",
    name: "AMEC",
    nameCn: "中微公司",
    headquarters: "Shanghai",
    oneLine:
      "AMEC is the clearest listed-company anchor for China's etch story and also has deposition exposure.",
    segments: ["Etch, clean, and strip", "Deposition"],
    productFamilies: [
      {
        segment: "Etch, clean, and strip",
        label: "Etch product-line anchor",
        publicRecord:
          "The source ledger treats AMEC's official company page as a core source for etch product-line mapping.",
        source_id: "CN_FIRM_AMEC",
      },
      {
        segment: "Deposition",
        label: "Deposition exposure",
        publicRecord:
          "The same company source is used in the monitor for etch and deposition product-line mapping.",
        source_id: "CN_FIRM_AMEC",
      },
      {
        segment: "Etch, clean, and strip",
        label: "Etch product maturity and R&D composition",
        publicRecord:
          "The 2025 annual-report source is logged for etch product maturity and R&D composition.",
        source_id: "CN_FILING_AMEC_2025",
      },
    ],
    workforceSignals: [
      {
        label: "R&D personnel",
        value: "1,548",
        note: "Firm-level filing figure; not split by etch, deposition, service, or customer-ramp work.",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "R&D personnel share of total staff",
        value: "52.24%",
        note: "Firm-level filing figure used as an R&D intensity signal, not a capability score.",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "Master's or doctoral degree share within R&D personnel",
        value: "57.88%",
        note: "Aggregated R&D composition figure; it does not identify segment-specific expertise.",
        source_id: "CN_FILING_AMEC_2025",
      },
    ],
    analystRead:
      "AMEC is the most useful first dossier for etch because the public record links company product coverage with listed-company R&D staffing. The open question is how much of that R&D layer converts into field application, service, and customer-ramp support.",
    watchSignals: [
      "Customer validation language",
      "Field application roles",
      "Service training",
      "Advanced memory or high-aspect-ratio references",
    ],
    doNotInfer: [
      "Yield",
      "Installed-base quality",
      "Segment-specific headcount",
    ],
    source_ids: ["CN_FIRM_AMEC", "CN_FILING_AMEC_2025"],
  },
  {
    slug: "naura",
    firmId: "ent_naura",
    name: "NAURA Technology Group",
    nameCn: "北方华创",
    headquarters: "Beijing",
    oneLine:
      "NAURA is the scale case: a broad equipment group with public signals across deposition, etch/clean, furnaces, wet tools, implant, RTP, and epi.",
    segments: ["Deposition", "Etch, clean, and strip"],
    productFamilies: [
      {
        segment: "Deposition",
        label: "PVD, CVD, furnace, RTP, and epi coverage",
        publicRecord:
          "The official product-page source explicitly supports broad semiconductor-equipment category mapping, including PVD, CVD, furnace, RTP, and epi.",
        source_id: "CN_FIRM_NAURA",
      },
      {
        segment: "Etch, clean, and strip",
        label: "Etch and wet-tool coverage",
        publicRecord:
          "The same product-page source is logged for etch and WET product coverage.",
        source_id: "CN_FIRM_NAURA",
      },
      {
        segment: "Deposition",
        label: "Scale, R&D intensity, and customer-service expansion",
        publicRecord:
          "The 2025 annual-report source is logged for scale, R&D intensity, and customer-service expansion.",
        source_id: "CN_FILING_NAURA_2025",
      },
    ],
    workforceSignals: [
      {
        label: "Total employees",
        value: "21,101",
        note: "Whole-firm scale signal; it does not identify tooling-segment capacity.",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "R&D personnel",
        value: "6,511",
        note: "Firm-level R&D signal for a broad equipment group, not a deposition-only count.",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "R&D personnel share of total staff",
        value: "30.86%",
        note: "Aggregated R&D intensity signal; role labels are not directly comparable to job postings.",
        source_id: "CN_FILING_NAURA_2025",
      },
    ],
    analystRead:
      "NAURA is useful for reading scale and breadth, but that breadth is also the trap: whole-firm R&D and employee totals should frame public evidence signal, not segment-specific workforce depth.",
    watchSignals: [
      "Service-team growth",
      "Customer-service spending language",
      "Deposition product validation",
      "Application support",
    ],
    doNotInfer: [
      "Segment-specific workforce depth from whole-firm R&D counts",
      "Deposition yield performance",
      "Customer-site ramp quality",
    ],
    source_ids: ["CN_FIRM_NAURA", "CN_FILING_NAURA_2025"],
  },
  {
    slug: "acm-research-shanghai",
    firmId: "ent_acm_sh",
    name: "ACM Research Shanghai",
    nameCn: "盛美上海",
    headquarters: "Shanghai",
    oneLine:
      "ACM Research Shanghai makes the wet-clean, strip, and service layer more visible than most public sources.",
    segments: ["Etch, clean, and strip", "Deposition"],
    productFamilies: [
      {
        segment: "Etch, clean, and strip",
        label: "Wet cleaning and strip visibility",
        publicRecord:
          "The official company-page source is logged as a high-value clean-tool source with wet cleaning and adjacent front-end equipment coverage.",
        source_id: "CN_FIRM_ACM_SH",
      },
      {
        segment: "Deposition",
        label: "Adjacent front-end tools",
        publicRecord:
          "The source ledger notes electroplating, furnace, track, and PECVD coverage alongside clean/strip evidence.",
        source_id: "CN_FIRM_ACM_SH",
      },
      {
        segment: "Etch, clean, and strip",
        label: "Clean/strip product and service-heavy workforce evidence",
        publicRecord:
          "The 2025 annual-report source is logged for clean/strip product and service-heavy workforce evidence.",
        source_id: "CN_FILING_ACM_SH_2025",
      },
    ],
    workforceSignals: [
      {
        label: "Total employees",
        value: "2,485",
        note: "Whole-firm figure; it cannot be read as clean/strip-specific headcount.",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        label: "R&D personnel",
        value: "1,228",
        note: "Firm-level R&D figure; role categories are aggregated.",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        label: "R&D personnel share of total staff",
        value: "49.42%",
        note: "R&D intensity signal, not a product-line staffing measurement.",
        source_id: "CN_FILING_ACM_SH_2025",
      },
    ],
    analystRead:
      "ACM Research Shanghai is the dossier to open when the question is wet clean, strip, and the service layer. The public record is helpful on firm-level workforce structure, but it still does not split the staff behind individual tool families.",
    watchSignals: [
      "After-sales/service headcount",
      "Wet-clean tool validation",
      "Customer-site support",
      "Cleaning or strip role language",
    ],
    doNotInfer: [
      "Clean/strip-specific headcount from technical staff totals",
      "Customer yield impact",
      "Installed-base quality",
    ],
    source_ids: ["CN_FIRM_ACM_SH", "CN_FILING_ACM_SH_2025"],
  },
];

export const firmProfileBySlug = new Map(
  firmProfiles.map((profile) => [profile.slug, profile]),
);
