export type SourceStatus =
  | "source_checked"
  | "needs_check"
  | "staging"
  | "not_disclosed";

export type WorkforceFigure = {
  label: string;
  value: string;
  denominator: string;
  note: string;
  sourceStatus: SourceStatus;
};

export type FirmWorkforceSnapshot = {
  id: string;
  firm: string;
  homeBase: string;
  segmentSignals: string[];
  editorialRead: string;
  numberRead?: string;
  strongerSignal?: string;
  reasonableInference?: string;
  doNotInfer?: string;
  figures: WorkforceFigure[];
  caveat: string;
  source_ids: string[];
};

export const firmWorkforceSnapshots: FirmWorkforceSnapshot[] = [
  {
    id: "amec",
    firm: "AMEC",
    homeBase: "Shanghai",
    segmentSignals: ["Etch, clean, and strip", "Deposition"],
    editorialRead:
      "AMEC is the clearest public anchor for the etch story, with disclosed R&D staffing that points to a science-heavy equipment organization.",
    numberRead:
      "AMEC's R&D scale supports the view that its etch story is being built through a research-heavy organization. Advanced etch depends on plasma behavior, chamber design, materials interaction, and process control.",
    strongerSignal:
      "Growth in field application engineers, service training, chamber matching, advanced-memory validation, and repeat customer deployment.",
    reasonableInference:
      "The filing supports an R&D-intensive reading of AMEC. It leaves customer-support depth unresolved.",
    doNotInfer:
      "Do not infer etch-specific service depth or installed-base support from the R&D count.",
    figures: [
      {
        label: "R&D personnel",
        value: "1,548",
        denominator: "Firm-level R&D personnel headcount.",
        note: "The filing does not split this total by etch, deposition, service, or customer-ramp work.",
        sourceStatus: "source_checked",
      },
      {
        label: "R&D personnel, share of total staff",
        value: "52.24%",
        denominator: "Total staff, as disclosed in the filing.",
        note: "Use as an R&D intensity signal. Segment-specific staffing would need a separate disclosure.",
        sourceStatus: "source_checked",
      },
      {
        label: "Doctoral researchers in R&D",
        value: "280",
        denominator: "R&D personnel.",
        note: "Filing-disclosed count of PhD holders inside the R&D layer.",
        sourceStatus: "source_checked",
      },
      {
        label: "Master's researchers in R&D",
        value: "616",
        denominator: "R&D personnel.",
        note: "Filing-disclosed count of master's holders inside the R&D layer; together with the 280 PhDs this gives the 57.88% master's-or-doctoral share within R&D.",
        sourceStatus: "source_checked",
      },
      {
        label: "Doctoral degree holders, company-wide",
        value: "291",
        denominator: "Company-wide.",
        note: "Filing-disclosed absolute count; the checked filing sections do not disclose a company-wide total-employee figure, so a share cannot be computed.",
        sourceStatus: "source_checked",
      },
      {
        label: "Master's degree holders, company-wide",
        value: "989",
        denominator: "Company-wide.",
        note: "Filing-disclosed absolute count; the checked filing sections do not disclose a total-employee denominator.",
        sourceStatus: "source_checked",
      },
      {
        label: "After-sales / field-service headcount",
        value: "Not disclosed",
        denominator: "—",
        note: "The checked filing sections do not break out an after-sales or field-service category.",
        sourceStatus: "not_disclosed",
      },
    ],
    caveat:
      "Filing figures are firm-level. They do not split people by etch, deposition, service, or customer-ramp work.",
    source_ids: ["CN_FILING_AMEC_2025"],
  },
  {
    id: "acm-research-shanghai",
    firm: "ACM Research Shanghai",
    homeBase: "Shanghai",
    segmentSignals: ["Etch, clean, and strip", "Deposition"],
    editorialRead:
      "ACM Research Shanghai makes the wet-clean and strip workforce layer more visible than most firms, especially through technical and service-heavy disclosures.",
    numberRead:
      "ACM's after-sales service category is the closest disclosed measure in this set to customer-site support. That matters because clean and strip tools depend heavily on process support at the fab.",
    strongerSignal:
      "A split between field service, installation, applications engineering, and tool-family support.",
    reasonableInference:
      "ACM gives a stronger public service signal than firms that disclose only R&D and degree mix.",
    doNotInfer:
      "Do not infer clean-specific staffing or customer success from the aggregate after-sales number.",
    figures: [
      {
        label: "Total employees",
        value: "2,485",
        denominator: "Whole firm.",
        note: "Company-level total; it cannot be read as clean/strip-specific headcount.",
        sourceStatus: "source_checked",
      },
      {
        label: "Technical personnel",
        value: "1,228",
        denominator: "Technical personnel, as disclosed by the firm.",
        note: "Technical-staff category as filed; do not relabel as R&D.",
        sourceStatus: "source_checked",
      },
      {
        label: "Technical personnel, share of total employees",
        value: "49.42%",
        denominator: "Total employees, as disclosed by ACM Research Shanghai.",
        note: "Share signal; do not add to R&D or service categories.",
        sourceStatus: "source_checked",
      },
      {
        label: "After-sales service personnel",
        value: "672",
        denominator: "Whole firm.",
        note: "Filing-disclosed after-sales / service category; the only clean post-sale headcount among the four firms in this dossier set.",
        sourceStatus: "source_checked",
      },
      {
        label: "Master's degree or above, company-wide",
        value: "708",
        denominator: "Total employees.",
        note: "Filing-disclosed absolute count of master's-and-above across the firm.",
        sourceStatus: "source_checked",
      },
      {
        label: "Master's or doctoral share within technical personnel",
        value: "Not disclosed",
        denominator: "Technical personnel.",
        note: "The filing reports master's-and-above company-wide but does not break that group down inside the technical-personnel category.",
        sourceStatus: "not_disclosed",
      },
    ],
    caveat:
      "Role categories are aggregated and cannot be read as clean/strip-specific headcount.",
    source_ids: ["CN_FILING_ACM_SH_2025"],
  },
  {
    id: "naura",
    firm: "NAURA Technology Group",
    homeBase: "Beijing",
    segmentSignals: ["Deposition", "Etch, clean, and strip"],
    editorialRead:
      "NAURA gives the strongest scale signal among the listed equipment firms in this layer, but its breadth makes segment attribution especially risky.",
    numberRead:
      "NAURA's scale marks it as a broad equipment group. Its R&D and customer-service figures show organizational mass, while tool-family depth remains blurred.",
    strongerSignal:
      "Headcount or hiring split by etch, deposition, furnace, wet, service, and applications roles.",
    reasonableInference:
      "NAURA has visible organizational scale across equipment categories.",
    doNotInfer:
      "Do not read whole-firm R&D or service categories as deposition-specific or etch-specific depth.",
    figures: [
      {
        label: "Total employees",
        value: "21,101",
        denominator: "Whole firm.",
        note: "Broad equipment group workforce figure.",
        sourceStatus: "source_checked",
      },
      {
        label: "Production personnel",
        value: "8,065",
        denominator: "Total employees.",
        note: "Filing-disclosed production category; spans the full equipment group.",
        sourceStatus: "source_checked",
      },
      {
        label: "Sales and customer-service personnel",
        value: "3,950",
        denominator: "Total employees.",
        note: "Filing-disclosed sales-and-customer-service category; the sales-expense increase was partly attributed to growth in this team.",
        sourceStatus: "source_checked",
      },
      {
        label: "Technical personnel",
        value: "6,511",
        denominator: "Total employees.",
        note: "Filing-disclosed technical-staff category; equals the R&D-personnel figure in this filing.",
        sourceStatus: "source_checked",
      },
      {
        label: "R&D personnel",
        value: "6,511",
        denominator: "Total employees.",
        note: "Firm-level R&D scale signal for the broad equipment group.",
        sourceStatus: "source_checked",
      },
      {
        label: "R&D personnel, share of total employees",
        value: "30.86%",
        denominator: "Total employees.",
        note: "R&D intensity signal. Filing role labels and job-posting role labels do not map cleanly.",
        sourceStatus: "source_checked",
      },
      {
        label: "Doctoral researchers in R&D",
        value: "268",
        denominator: "R&D personnel.",
        note: "Filing-disclosed count of PhD holders inside the R&D layer.",
        sourceStatus: "source_checked",
      },
      {
        label: "Master's researchers in R&D",
        value: "4,137",
        denominator: "R&D personnel.",
        note: "Filing-disclosed count of master's holders inside the R&D layer.",
        sourceStatus: "source_checked",
      },
      {
        label: "Master's degree or above, company-wide",
        value: "6,271",
        denominator: "Total employees.",
        note: "Company-wide count of master's-and-above degree holders.",
        sourceStatus: "source_checked",
      },
      {
        label: "Headcount by tool family",
        value: "Not disclosed",
        denominator: "—",
        note: "The filing does not split production, R&D, or service headcount by tool family within the equipment group.",
        sourceStatus: "not_disclosed",
      },
    ],
    caveat:
      "The filing covers a broad equipment group, so the figures should frame scale and R&D intensity. Tooling-segment capacity would need a separate disclosure.",
    source_ids: ["CN_FILING_NAURA_2025"],
  },
  {
    id: "piotech",
    firm: "Piotech",
    homeBase: "Shenyang",
    segmentSignals: ["Deposition"],
    editorialRead:
      "Piotech is the dedicated deposition vendor in this dossier set; the 2025 financing report supplies its first source-checked workforce figures.",
    numberRead:
      "Piotech keeps the deposition story from being swallowed by NAURA. Its filings show R&D concentration and deposition product breadth. Customer-support capacity remains unresolved.",
    strongerSignal:
      "Application and service capacity tied to PECVD, ALD, SACVD, HDPCVD, and Flowable CVD product families.",
    reasonableInference:
      "Piotech is a focused deposition vendor with visible R&D investment.",
    doNotInfer:
      "Do not infer mature installed-base support from deposition product breadth alone.",
    figures: [
      {
        label: "R&D personnel (as of 2025-06-30)",
        value: "638",
        denominator: "Total staff at the reporting date.",
        note: "Filing-disclosed R&D personnel; the financing report is dated September 2025 and reports the position as of 30 June 2025.",
        sourceStatus: "source_checked",
      },
      {
        label: "R&D personnel, share of total staff",
        value: "40.66%",
        denominator: "Total staff at the reporting date.",
        note: "R&D intensity signal for a deposition-focused vendor.",
        sourceStatus: "source_checked",
      },
      {
        label: "Doctoral researchers in R&D",
        value: "53",
        denominator: "R&D personnel.",
        note: "Filing-disclosed count of PhD holders inside the R&D layer.",
        sourceStatus: "source_checked",
      },
      {
        label: "Master's researchers in R&D",
        value: "384",
        denominator: "R&D personnel.",
        note: "Filing-disclosed count of master's holders inside the R&D layer.",
        sourceStatus: "source_checked",
      },
      {
        label: "After-sales / installed-base support headcount",
        value: "Not disclosed",
        denominator: "—",
        note: "The financing report does not break out a full after-sales or installed-base support category.",
        sourceStatus: "not_disclosed",
      },
    ],
    caveat:
      "Piotech's disclosures come from a financing report. Treat product and demand framing as corporate filing evidence.",
    source_ids: ["CN_FILING_PIOTECH_2025"],
  },
];
