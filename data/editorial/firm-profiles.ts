export type FirmProfile = {
  slug: string;
  profileType: "full" | "light";
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
    profileType: "full",
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
        note: "Firm-level filing figure used as an R&D intensity signal, not a performance measure.",
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
      "For etch, AMEC is the cleanest public record: product coverage and listed-company R&D staffing read together. The open question is how much of that R&D layer is converting into field application, service, and customer-ramp staffing.",
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
    profileType: "full",
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
      "NAURA gives the clearest scale and breadth signal among listed peers. The same breadth is the trap: whole-firm R&D and employee totals describe an equipment group, not a tooling segment.",
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
    profileType: "full",
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
      "On wet clean, strip, and the service layer, ACM Research Shanghai is the most disclosing of the three listed firms. The public record carries firm-level workforce structure but still does not split staff by tool family.",
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
  {
    slug: "piotech",
    profileType: "full",
    firmId: "ent_piotech",
    name: "Piotech",
    nameCn: "拓荆科技",
    headquarters: "Shenyang",
    oneLine:
      "Piotech gives the monitor a dedicated deposition firm, with public records pointing to multiple CVD and ALD-related product families.",
    segments: ["Deposition"],
    productFamilies: [
      {
        segment: "Deposition",
        label: "PECVD, ALD, SACVD, HDPCVD, and Flowable CVD trail",
        publicRecord:
          "The official company source is logged for deposition category coverage including PECVD, ALD, SACVD, HDPCVD, Flowable CVD, hybrid bonding, and related metrology.",
        source_id: "CN_FIRM_PIOTECH",
      },
      {
        segment: "Deposition",
        label: "Product-family and demand framing",
        publicRecord:
          "The 2025 financing report is logged for deposition demand mechanics and product families; its product and demand framing should be treated as corporate filing evidence.",
        source_id: "CN_FILING_PIOTECH_2025",
      },
    ],
    workforceSignals: [],
    analystRead:
      "Piotech is the cleanest addition to the deposition story because its public source trail is specific to deposition product families. The current dossier supports product-breadth monitoring, not claims about production performance, customer yield, or parity with foreign suppliers.",
    watchSignals: [
      "Customer validation language by deposition tool family",
      "Field application and service-team hiring",
      "Repeat-order or installed-base language",
      "Training or support routines for customer ramps",
    ],
    doNotInfer: [
      "Parity with Lam, Applied Materials, or Tokyo Electron",
      "Deposition yield performance",
      "Customer-site support depth from product breadth alone",
      "Segment-specific workforce totals",
    ],
    source_ids: ["CN_FIRM_PIOTECH", "CN_FILING_PIOTECH_2025"],
  },
  {
    slug: "jingce-electronics",
    profileType: "light",
    firmId: "ent_jingce",
    name: "Jingce Electronics",
    nameCn: "精测电子",
    headquarters: "Wuhan",
    oneLine:
      "Jingce gives the monitor a metrology and inspection watch card through a public filing source.",
    segments: ["Metrology and inspection"],
    productFamilies: [
      {
        segment: "Metrology and inspection",
        label: "Metrology and inspection product taxonomy",
        publicRecord:
          "The annual-report summary source is logged for metrology and inspection product taxonomy, with a note to use the full filing before making stronger product or workforce claims.",
        source_id: "CN_FILING_JINGCE_2025",
      },
    ],
    workforceSignals: [],
    analystRead:
      "Jingce belongs in the watch set as a metrology and inspection anchor, but the current record should be treated as a starting point. The full filing needs review before the site makes detailed product or workforce claims.",
    watchSignals: [
      "Full annual-report language on front-end metrology and inspection",
      "Application engineer or calibration-support roles",
      "Customer-support or service-network disclosures",
      "Product taxonomy that separates inspection from generic equipment activity",
    ],
    doNotInfer: [
      "Front-end metrology depth from an annual-report summary alone",
      "Customer calibration routines",
      "Tool performance or yield impact",
      "Workforce scale by product family",
    ],
    source_ids: ["CN_FILING_JINGCE_2025"],
  },
  {
    slug: "smee",
    profileType: "light",
    firmId: "ent_smee",
    name: "Shanghai Micro Electronics Equipment",
    nameCn: "上海微电子装备",
    headquarters: "Shanghai",
    oneLine:
      "SMEE belongs in the lithography-adjacent sidebar because its public homepage anchors the optics, alignment, stage, focus, and calibration talent mix.",
    segments: ["Lithography sidebar", "Metrology and inspection"],
    productFamilies: [
      {
        segment: "Lithography sidebar",
        label: "Lithography-adjacent company anchor",
        publicRecord:
          "The official company homepage is logged as the lithography-sidebar source for IC, packaging, display, MEMS, LED, and power-device application footprint.",
        source_id: "CN_FIRM_SMEE",
      },
      {
        segment: "Metrology and inspection",
        label: "Adjacent inspection and metrology exposure",
        publicRecord:
          "The same homepage is also logged as a metrology and inspection presence signal, but detailed product pages need separate verification.",
        source_id: "CN_FIRM_SMEE",
      },
    ],
    workforceSignals: [],
    analystRead:
      "SMEE is useful as a sidebar dossier because lithography-adjacent work draws on optics, alignment, stages, focus, contamination control, and calibration. The homepage is broad, so this profile should guide monitoring rather than make detailed readiness claims.",
    watchSignals: [
      "Detailed product pages for lithography-adjacent systems",
      "Optical design, alignment, stage, and calibration hiring",
      "Service and training pages tied to customer support",
      "Public records separating IC equipment from display or packaging equipment",
    ],
    doNotInfer: [
      "Lithography readiness from homepage breadth",
      "Advanced-node capability",
      "Customer-site uptime or calibration quality",
      "Workforce depth by subsystem",
    ],
    source_ids: ["CN_FIRM_SMEE"],
  },
  {
    slug: "beim",
    profileType: "light",
    firmId: "ent_beim",
    name: "Beijing Electronics Inspection and Metrology Equipment",
    nameCn: "北京电子量检测装备有限责任公司",
    headquarters: "Beijing",
    oneLine:
      "BEIM is a metrology and inspection reference point because its public company profile names inspection and measurement categories.",
    segments: ["Metrology and inspection"],
    productFamilies: [
      {
        segment: "Metrology and inspection",
        label: "Inspection and measurement category anchor",
        publicRecord:
          "The public company profile is logged for pattern defect inspection, micro/nano morphology metrology, and mask or inspection-adjacent categories.",
        source_id: "CN_FIRM_BEIM",
      },
    ],
    workforceSignals: [],
    analystRead:
      "BEIM can support a light metrology and inspection dossier because the company profile names categories connected to optics, precision measurement, and defect review. The profile should not be read as a full account of front-end semiconductor tool performance.",
    watchSignals: [
      "Product pages that separate semiconductor inspection from broader measurement equipment",
      "Calibration, defect review, and application-support language",
      "Customer support or training disclosures",
      "Hiring for optics, precision measurement, algorithms, and field support",
    ],
    doNotInfer: [
      "Front-end semiconductor share of the broader product portfolio",
      "Inspection sensitivity or false-alarm performance",
      "Customer-site calibration quality",
      "Dedicated semiconductor workforce totals",
    ],
    source_ids: ["CN_FIRM_BEIM"],
  },
];

export const firmProfileBySlug = new Map(
  firmProfiles.map((profile) => [profile.slug, profile]),
);

export const fullFirmProfiles = firmProfiles.filter(
  (profile) => profile.profileType === "full",
);

export const lightFirmProfiles = firmProfiles.filter(
  (profile) => profile.profileType === "light",
);
