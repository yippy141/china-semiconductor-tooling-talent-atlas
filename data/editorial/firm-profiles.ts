import type { SourceStatus } from "@/data/editorial/firm-workforce-snapshots";

export type FirmProfile = {
  slug: string;
  profileType: "full" | "light";
  firmId: string;
  name: string;
  nameCn: string;
  logo?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  headquarters: string;
  oneLine: string;
  segments: string[];
  productFamilies: {
    segment: string;
    label: string;
    publicRecord: string;
    verificationStatus: SourceStatus;
    source_id: string;
  }[];
  workforceSignals: {
    label: string;
    value: string;
    note: string;
    verificationStatus: SourceStatus;
    source_id: string;
  }[];
  analystRead: string;
  watchSignals: string[];
  changesTheRead: string[];
  doNotInfer: string[];
  notDisclosed: { label: string; note: string; source_id: string }[];
  source_ids: string[];
};

export const firmProfiles: FirmProfile[] = [
  {
    slug: "amec",
    profileType: "full",
    firmId: "ent_amec",
    name: "AMEC",
    nameCn: "中微公司",
    logo: {
      src: "/Advanced_Micro-Fabrication_Equipment.png",
      alt: "AMEC logo",
      width: 1256,
      height: 899,
    },
    headquarters: "Shanghai",
    oneLine:
      "AMEC is the clearest listed-company anchor for China's etch story, with added deposition product coverage.",
    segments: ["Etch, clean, and strip", "Deposition"],
    productFamilies: [
      {
        segment: "Etch, clean, and strip",
        label: "ICP etch: Primo Twin-Star, Primo nanova, Primo Menova",
        publicRecord:
          "The 2025 annual report describes ICP etch products including Primo Twin-Star, Primo nanova, and Primo Menova as in mass production across more than 50 customer production lines.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        segment: "Etch, clean, and strip",
        label: "Cumulative ICP reaction-chamber installation",
        publicRecord:
          "The 2025 annual report reports cumulative customer-side ICP installation reached 1,800 reaction chambers.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        segment: "Deposition",
        label: "Tungsten CVD, high-aspect-ratio tungsten, and ALD tungsten",
        publicRecord:
          "The 2025 annual report reports that tungsten CVD, high-aspect-ratio tungsten, and ALD tungsten products passed on-site validation with key memory and logic customers and received repeat mass-production orders.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        segment: "Etch, clean, and strip",
        label: "Company product-line anchor",
        publicRecord:
          "Official company materials anchor AMEC's etch and deposition product breadth.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_AMEC",
      },
    ],
    workforceSignals: [
      {
        label: "R&D personnel",
        value: "1,548",
        note: "Filing-disclosed firm-level R&D headcount. The filing does not split it by etch, deposition, service, or customer-ramp work.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "R&D personnel, share of total staff",
        value: "52.24%",
        note: "R&D intensity signal as filed. Segment-specific staffing would need a separate disclosure.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "Doctoral researchers in R&D",
        value: "280",
        note: "Filing-disclosed PhD count inside the R&D personnel layer.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "Master's researchers in R&D",
        value: "616",
        note: "Filing-disclosed master's count inside the R&D personnel layer; with the 280 PhDs this gives the 57.88% master's-or-doctoral share within R&D.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "Doctoral degree holders, company-wide",
        value: "291",
        note: "Filing-disclosed absolute count; the checked filing sections do not disclose a company-wide total-employee figure.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "Master's degree holders, company-wide",
        value: "989",
        note: "Filing-disclosed absolute count; the checked filing sections do not disclose a total-employee denominator.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_AMEC_2025",
      },
    ],
    analystRead:
      "For etch, AMEC is the cleanest public record: product coverage and listed-company R&D staffing read together. The open question is how much of that R&D layer is converting into field application, service, and customer-ramp staffing.",
    watchSignals: [
      "Platform-specific customer-validation language in filings and product news",
      "Field-application and service-engineer postings in Shanghai and at customer fab cities",
      "Training and chief-technician disclosures tied to specific etch platforms",
      "References to advanced-memory or high-aspect-ratio etch wins",
    ],
    changesTheRead: [
      "Disclosure of total-employee headcount (would let the R&D share be benchmarked against non-R&D functions)",
      "After-sales, service, or field-application headcount broken out from R&D",
      "Repeat-order language for the same etch platform at the same domestic customer",
      "Master's or doctoral share broken out by R&D function",
    ],
    doNotInfer: [
      "Yield",
      "Installed-base quality",
      "Segment-specific headcount",
    ],
    notDisclosed: [
      {
        label: "Total-employee headcount",
        note: "The checked filing sections do not state a company-wide employee total; absolute PhD and master's counts are reported without a denominator.",
        source_id: "CN_FILING_AMEC_2025",
      },
      {
        label: "After-sales / field-service headcount",
        note: "The checked filing sections do not break out an after-sales or field-service category.",
        source_id: "CN_FILING_AMEC_2025",
      },
    ],
    source_ids: ["CN_FIRM_AMEC", "CN_FILING_AMEC_2025"],
  },
  {
    slug: "naura",
    profileType: "full",
    firmId: "ent_naura",
    name: "NAURA Technology Group",
    nameCn: "北方华创",
    logo: {
      src: "/002371.SZ_BIG-0f67fd11.png",
      alt: "NAURA logo",
      width: 1548,
      height: 589,
    },
    headquarters: "Beijing",
    oneLine:
      "NAURA is the scale case: a broad equipment group with public signals across deposition, etch/clean, furnaces, wet tools, implant, RTP, and epi.",
    segments: ["Deposition", "Etch, clean, and strip"],
    productFamilies: [
      {
        segment: "Deposition",
        label: "PVD, CVD, furnace, RTP, and epi coverage",
        publicRecord:
          "Official product pages list NAURA's deposition portfolio across PVD, CVD, furnaces, RTP, and epi tools, alongside the firm's manufacturing bases.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_NAURA",
      },
      {
        segment: "Etch, clean, and strip",
        label: "Etch and wet-tool coverage",
        publicRecord:
          "The same product pages cover NAURA's etch and wet-clean tool families inside the same broad equipment portfolio.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_NAURA",
      },
      {
        segment: "Deposition",
        label: "Sales and customer-service team expansion",
        publicRecord:
          "The 2025 annual report attributes part of the sales-expense increase to growth in the market-expansion and customer-service team.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
    ],
    workforceSignals: [
      {
        label: "Total employees",
        value: "21,101",
        note: "Whole-firm scale signal for a broad equipment group.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "Production personnel",
        value: "8,065",
        note: "Filing-disclosed production category across the equipment group.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "Sales and customer-service personnel",
        value: "3,950",
        note: "Filing-disclosed sales-and-customer-service category; the sales-expense increase was partly attributed to growth in this team.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "Technical personnel",
        value: "6,511",
        note: "Filing-disclosed technical-staff category; equals the R&D-personnel figure in this filing.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "R&D personnel",
        value: "6,511",
        note: "Firm-level R&D scale signal for the broad equipment group.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "R&D personnel, share of total employees",
        value: "30.86%",
        note: "R&D intensity signal. Filing role labels and job-posting role labels do not map cleanly.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "Doctoral researchers in R&D",
        value: "268",
        note: "Filing-disclosed PhD count inside the R&D personnel layer.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "Master's researchers in R&D",
        value: "4,137",
        note: "Filing-disclosed master's count inside the R&D personnel layer.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
      {
        label: "Master's degree or above, company-wide",
        value: "6,271",
        note: "Filing-disclosed company-wide count of master's-and-above degree holders.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_NAURA_2025",
      },
    ],
    analystRead:
      "NAURA gives the clearest scale and breadth signal among listed peers. Its whole-firm R&D and employee totals describe an equipment group, so segment depth remains unresolved.",
    watchSignals: [
      "Service-team and customer-service spending language in successive annual reports",
      "Deposition product-platform validation tied to specific domestic fabs",
      "Field-application and service-engineer hiring across the equipment group",
      "Revenue or backlog mix disclosed by tool family",
    ],
    changesTheRead: [
      "Headcount split by tool family within the equipment group (deposition vs etch vs RTP vs implant)",
      "After-sales or service-team headcount disclosed separately from R&D personnel",
      "Customer-validation language tied to a specific deposition or etch platform at a named fab",
      "Revenue mix disclosed by tool family",
    ],
    doNotInfer: [
      "Segment-specific workforce depth from whole-firm R&D counts",
      "Deposition yield performance",
      "Customer-site ramp quality",
    ],
    notDisclosed: [
      {
        label: "Headcount by tool family",
        note: "The filing does not split production, R&D, technical, or sales-and-customer-service headcount by tool family within the equipment group.",
        source_id: "CN_FILING_NAURA_2025",
      },
    ],
    source_ids: ["CN_FIRM_NAURA", "CN_FILING_NAURA_2025"],
  },
  {
    slug: "acm-research-shanghai",
    profileType: "full",
    firmId: "ent_acm_sh",
    name: "ACM Research Shanghai",
    nameCn: "盛美上海",
    logo: {
      src: "/ACM_Research.svg",
      alt: "ACM Research logo",
      width: 1518,
      height: 944,
    },
    headquarters: "Shanghai",
    oneLine:
      "ACM Research Shanghai gives the clearest public view of the wet-clean, strip, and service layer among the firms in this dossier set.",
    segments: ["Etch, clean, and strip", "Deposition"],
    productFamilies: [
      {
        segment: "Etch, clean, and strip",
        label: "TEBO cleaning equipment",
        publicRecord:
          "The 2025 annual report describes TEBO cleaning equipment for 28nm-and-below patterned wafer cleaning and 3D structures including FinFET, DRAM, and 3D NAND.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        segment: "Etch, clean, and strip",
        label: "Tahoe cleaning equipment",
        publicRecord:
          "The 2025 annual report describes Tahoe cleaning equipment for photoresist removal, post-etch cleaning, ion-implant cleaning, and post-CMP cleaning.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        segment: "Deposition",
        label: "Adjacent front-end tools",
        publicRecord:
          "Company materials cover ACM's electroplating, furnace, track, and PECVD lines alongside the clean/strip portfolio.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_ACM_SH",
      },
    ],
    workforceSignals: [
      {
        label: "Total employees",
        value: "2,485",
        note: "Whole-firm figure. Clean/strip-specific headcount would need a separate disclosure.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        label: "Technical personnel",
        value: "1,228",
        note: "Filing-disclosed technical-staff category; do not relabel as R&D.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        label: "Technical personnel, share of total employees",
        value: "49.42%",
        note: "Technical-personnel share signal; do not add to R&D or service categories.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        label: "After-sales service personnel",
        value: "672",
        note: "Filing-disclosed after-sales / service category; the only clean post-sale headcount among the four firms in this dossier set.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_ACM_SH_2025",
      },
      {
        label: "Master's degree or above, company-wide",
        value: "708",
        note: "Filing-disclosed absolute count of master's-and-above across the firm.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_ACM_SH_2025",
      },
    ],
    analystRead:
      "On wet clean, strip, and the service layer, ACM Research Shanghai is the most disclosing of the three listed firms. The public record carries firm-level workforce structure but still does not split staff by tool family.",
    watchSignals: [
      "After-sales or service headcount disclosure in successive annual reports",
      "Validation language for specific wet-clean or strip tools at named domestic fabs",
      "Field-application and customer-site support hiring volume",
      "Role language that distinguishes cleaning and strip work from generic technical staff",
    ],
    changesTheRead: [
      "Master's or doctoral share disclosed within the technical-personnel category",
      "Field-service or after-sales headcount disclosed separately from technical personnel",
      "Wet-clean or strip tool validation tied to a named domestic fab and node",
      "Disclosure separating applications and service staff from generic technical staff",
    ],
    doNotInfer: [
      "Clean/strip-specific headcount from technical staff totals",
      "Customer yield impact",
      "Installed-base quality",
    ],
    notDisclosed: [
      {
        label: "Master's or doctoral share within technical personnel",
        note: "The filing reports master's-and-above company-wide but does not break that group down inside the technical-personnel category.",
        source_id: "CN_FILING_ACM_SH_2025",
      },
    ],
    source_ids: ["CN_FIRM_ACM_SH", "CN_FILING_ACM_SH_2025"],
  },
  {
    slug: "piotech",
    profileType: "full",
    firmId: "ent_piotech",
    name: "Piotech",
    nameCn: "拓荆科技",
    logo: {
      src: "/Piotech.png",
      alt: "Piotech logo",
      width: 512,
      height: 341,
    },
    headquarters: "Shenyang",
    oneLine:
      "Piotech is the dedicated deposition firm in this dossier set, with source records covering multiple CVD and ALD product families.",
    segments: ["Deposition"],
    productFamilies: [
      {
        segment: "Deposition",
        label: "PECVD, ALD, SACVD, HDPCVD, and Flowable CVD in mass production",
        publicRecord:
          "The 2025 financing report states that Piotech's PECVD, ALD, SACVD, HDPCVD, and Flowable CVD series have reached client-side mass production.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_PIOTECH_2025",
      },
      {
        segment: "Deposition",
        label: "Company product portfolio",
        publicRecord:
          "Company materials list PECVD, ALD, SACVD, HDPCVD, Flowable CVD, hybrid-bonding tools, and deposition-adjacent metrology.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_PIOTECH",
      },
    ],
    workforceSignals: [
      {
        label: "R&D personnel (as of 2025-06-30)",
        value: "638",
        note: "Filing-disclosed R&D personnel; the financing report is dated September 2025 and reports the position as of 30 June 2025.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_PIOTECH_2025",
      },
      {
        label: "R&D personnel, share of total staff",
        value: "40.66%",
        note: "R&D intensity signal for a deposition-focused vendor.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_PIOTECH_2025",
      },
      {
        label: "Doctoral researchers in R&D",
        value: "53",
        note: "Filing-disclosed PhD count inside the R&D personnel layer.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_PIOTECH_2025",
      },
      {
        label: "Master's researchers in R&D",
        value: "384",
        note: "Filing-disclosed master's count inside the R&D personnel layer.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_PIOTECH_2025",
      },
    ],
    analystRead:
      "Piotech is the cleanest addition to the deposition story because its public source trail is specific to deposition product families. The current dossier supports product-breadth monitoring. Production performance, customer yield, and parity claims need other evidence.",
    watchSignals: [
      "Customer-validation language by specific deposition tool family",
      "Field-application and service-team hiring in Shenyang and at customer fab cities",
      "Repeat-order or installed-base language for the same platform at the same customer",
      "Training or support disclosures tied to customer ramps for individual tool families",
    ],
    changesTheRead: [
      "Any firm-level workforce table (Piotech is the one priority firm without one)",
      "Customer-validation language tied to a named deposition platform and a named domestic fab",
      "Repeat-order disclosure for the same product family from the same customer",
      "Disclosure of field-application or installed-base support headcount",
    ],
    doNotInfer: [
      "Parity with Lam, Applied Materials, or Tokyo Electron",
      "Deposition yield performance",
      "Customer-site support depth from product breadth alone",
      "Segment-specific workforce totals",
    ],
    notDisclosed: [
      {
        label: "Full after-sales / installed-base support headcount",
        note: "The financing report does not break out a full after-sales or installed-base support category.",
        source_id: "CN_FILING_PIOTECH_2025",
      },
    ],
    source_ids: ["CN_FIRM_PIOTECH", "CN_FILING_PIOTECH_2025"],
  },
  {
    slug: "jingce-electronics",
    profileType: "light",
    firmId: "ent_jingce",
    name: "Jingce Electronics",
    nameCn: "精测电子",
    logo: {
      src: "/j0A6jnC4dKXSgheBbXrGNa1ROW61762945999987_200x200.png",
      alt: "Jingce Electronics logo",
      width: 200,
      height: 200,
    },
    headquarters: "Wuhan",
    oneLine:
      "Jingce is the Wuhan-based metrology and inspection entry; this dossier sits at watch-card depth until the full annual filing is reviewed.",
    segments: ["Metrology and inspection"],
    productFamilies: [
      {
        segment: "Metrology and inspection",
        label: "MetaPAM — metal film-thickness metrology",
        publicRecord:
          "The 2025 annual-report summary names MetaPAM as Jingce's metal film-thickness metrology platform.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_JINGCE_2025",
      },
      {
        segment: "Metrology and inspection",
        label: "SCALE EPI — epitaxial-layer thickness metrology",
        publicRecord:
          "The 2025 annual-report summary names SCALE EPI as Jingce's epitaxial-layer thickness metrology platform.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_JINGCE_2025",
      },
      {
        segment: "Metrology and inspection",
        label: "eMetric — e-beam CD metrology",
        publicRecord:
          "The 2025 annual-report summary names eMetric as Jingce's e-beam critical-dimension metrology platform.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_JINGCE_2025",
      },
      {
        segment: "Metrology and inspection",
        label: "eView / eVC / eSpec — e-beam defect review",
        publicRecord:
          "The 2025 annual-report summary names eView, eVC, and eSpec as Jingce's e-beam defect-review platforms.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_JINGCE_2025",
      },
      {
        segment: "Metrology and inspection",
        label: "BFI — bright-field inspection",
        publicRecord:
          "The 2025 annual-report summary names BFI as Jingce's bright-field inspection platform.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_JINGCE_2025",
      },
      {
        segment: "Metrology and inspection",
        label: "VEGA — dark-field defect inspection",
        publicRecord:
          "The 2025 annual-report summary names VEGA as Jingce's dark-field defect inspection platform.",
        verificationStatus: "source_checked",
        source_id: "CN_FILING_JINGCE_2025",
      },
    ],
    workforceSignals: [],
    analystRead:
      "Jingce is the Wuhan-based metrology and inspection anchor in this dossier set. The current source record is a single annual-report summary that names the product taxonomy at a general level. This dossier stays at watch-card depth until the full filing is reviewed.",
    watchSignals: [
      "Front-end metrology and inspection language in the full annual filing (not just the summary)",
      "Application-engineer or calibration-support role disclosures",
      "Customer-support or service-network language tied to specific inspection platforms",
      "Product taxonomy that separates front-end semiconductor inspection from display and broader measurement work",
    ],
    changesTheRead: [
      "Reading the full annual filing against the current summary source",
      "Front-end metrology revenue or staff split separated from display and broader inspection lines",
      "Calibration-team or application-engineer headcount disclosure",
      "Named customer validation for specific Jingce inspection platforms",
    ],
    doNotInfer: [
      "Front-end metrology depth from an annual-report summary alone",
      "Customer calibration routines",
      "Tool performance or yield impact",
      "Workforce scale by product family",
    ],
    notDisclosed: [
      {
        label: "Workforce figures",
        note: "The current summary source does not disclose Jingce workforce totals or category breakdowns.",
        source_id: "CN_FILING_JINGCE_2025",
      },
    ],
    source_ids: ["CN_FILING_JINGCE_2025"],
  },
  {
    slug: "smee",
    profileType: "light",
    firmId: "ent_smee",
    name: "Shanghai Micro Electronics Equipment",
    nameCn: "上海微电子装备",
    logo: {
      src: "/6141949811eaf.jpg",
      alt: "SMEE logo",
      width: 626,
      height: 275,
    },
    headquarters: "Shanghai",
    oneLine:
      "SMEE anchors the lithography-adjacent sidebar in this brief as a domestic source of optical, alignment, stage, and calibration talent.",
    segments: ["Lithography sidebar", "Metrology and inspection"],
    productFamilies: [
      {
        segment: "Lithography sidebar",
        label: "Lithography-adjacent company anchor",
        publicRecord:
          "The official company homepage names SMEE's application footprint across IC, packaging, display, MEMS, LED, and power-device lithography. It does not separate IC platforms from the rest.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_SMEE",
      },
      {
        segment: "Metrology and inspection",
        label: "Adjacent inspection and metrology exposure",
        publicRecord:
          "The same homepage carries a metrology and inspection presence signal; detailed product pages have not yet been pulled against this dossier.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_SMEE",
      },
    ],
    workforceSignals: [],
    analystRead:
      "SMEE is the lithography-adjacent anchor in this brief: a domestic source of optical, alignment, stage, and calibration talent that adjacent tools draw on. The current homepage source names the application footprint (IC, packaging, display, MEMS, LED, power devices) without separating IC lithography platforms from the rest. The dossier stays at watchcard depth until product pages confirm that split.",
    watchSignals: [
      "Detailed product pages that separate IC lithography platforms from display, MEMS, LED, and power-device platforms",
      "Hiring for optical design, alignment, stage, mechatronics, and calibration work",
      "Service and training pages tied to customer support",
      "Public records that distinguish IC equipment revenue from display or packaging equipment revenue",
    ],
    changesTheRead: [
      "Product pages separating IC lithography from display, MEMS, LED, and power-device platforms",
      "Service or field-application hiring tied to specific lithography tool families",
      "Validation language for IC-segment lithography at a named domestic fab",
      "Disclosure of optics, alignment, or stage subsystem teams as separate functions",
    ],
    doNotInfer: [
      "Lithography readiness from homepage breadth",
      "Advanced-node capability",
      "Customer-site uptime or calibration quality",
      "Workforce depth by subsystem",
    ],
    notDisclosed: [],
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
      "BEIM anchors the Beijing metrology and inspection presence in this dossier set, with a public profile that names front-end inspection categories without separating them from broader measurement work.",
    segments: ["Metrology and inspection"],
    productFamilies: [
      {
        segment: "Metrology and inspection",
        label: "Inspection and measurement category anchor",
        publicRecord:
          "The public company profile names pattern defect inspection, micro/nano morphology metrology, and mask or inspection-adjacent measurement. The front-end semiconductor share of that portfolio remains grouped with broader measurement work.",
        verificationStatus: "needs_check",
        source_id: "CN_FIRM_BEIM",
      },
    ],
    workforceSignals: [],
    analystRead:
      "BEIM anchors the Beijing metrology and inspection presence in the dossier set. The public company profile names pattern defect inspection, micro/nano morphology metrology, and mask-adjacent categories. The front-end semiconductor share of that portfolio remains grouped with broader measurement work. The dossier stays at watchcard depth until product-level disclosures confirm the split.",
    watchSignals: [
      "Product pages that separate front-end semiconductor inspection from general electronics measurement",
      "Calibration, defect review, and application-support language tied to specific platforms",
      "Customer support or training disclosures for named inspection tools",
      "Hiring for optics, precision measurement, algorithms, and field-support functions",
    ],
    changesTheRead: [
      "Revenue or staff split between semiconductor inspection and the broader measurement portfolio",
      "Calibration or defect-review headcount disclosed separately",
      "Customer-validation language tied to specific BEIM inspection product families",
      "Product pages distinguishing front-end inspection from general electronics measurement",
    ],
    doNotInfer: [
      "Front-end semiconductor share of the broader product portfolio",
      "Inspection sensitivity or false-alarm performance",
      "Customer-site calibration quality",
      "Dedicated semiconductor workforce totals",
    ],
    notDisclosed: [],
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
