export type SourceStatus = "source_checked" | "needs_check" | "staging";

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
    figures: [
      {
        label: "R&D personnel",
        value: "1,548",
        denominator: "Firm-level R&D personnel headcount.",
        note: "This figure is not split by etch, deposition, service, or customer-ramp work.",
        sourceStatus: "needs_check",
      },
      {
        label: "R&D personnel, share of total employees",
        value: "52.24%",
        denominator: "Total employees, as disclosed by AMEC.",
        note: "Use as an R&D intensity signal, not a segment-specific staffing measure.",
        sourceStatus: "needs_check",
      },
      {
        label: "Master's or doctoral degree share within R&D personnel",
        value: "57.88%",
        denominator: "R&D personnel.",
        note: "The firm disclosure combines master's and doctoral degree holders within R&D personnel.",
        sourceStatus: "needs_check",
      },
    ],
    caveat:
      "The filing figures are firm-level and do not split people by etch, deposition, service, or customer ramp work.",
    source_ids: ["CN_FILING_AMEC_2025"],
  },
  {
    id: "acm-research-shanghai",
    firm: "ACM Research Shanghai",
    homeBase: "Shanghai",
    segmentSignals: ["Etch, clean, and strip", "Deposition"],
    editorialRead:
      "ACM Research Shanghai makes the wet-clean and strip workforce layer more visible than most firms, especially through technical and service-heavy disclosures.",
    figures: [
      {
        label: "Total employees",
        value: "2,485",
        denominator: "Whole firm.",
        note: "This is a company-level total and cannot be read as clean/strip-specific headcount.",
        sourceStatus: "needs_check",
      },
      {
        label: "Technical personnel",
        value: "1,228",
        denominator: "Technical personnel, as disclosed by the firm.",
        note: "Use as a technical staff signal unless the underlying filing confirms an R&D category.",
        sourceStatus: "needs_check",
      },
      {
        label: "Technical personnel, share of total employees",
        value: "49.42%",
        denominator: "Total employees, as disclosed by ACM Research Shanghai.",
        note: "This percentage should not be added to R&D or service categories.",
        sourceStatus: "needs_check",
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
    figures: [
      {
        label: "Total employees",
        value: "21,101",
        denominator: "Whole firm.",
        note: "This describes a broad equipment group, not a deposition-only workforce.",
        sourceStatus: "needs_check",
      },
      {
        label: "R&D personnel",
        value: "6,511",
        denominator: "Firm-level R&D personnel headcount.",
        note: "Use as an R&D scale signal for the group, not a segment-specific headcount.",
        sourceStatus: "needs_check",
      },
      {
        label: "R&D personnel, share of total employees",
        value: "30.86%",
        denominator: "Total employees, as disclosed by NAURA.",
        note: "Use as an R&D intensity signal; role labels are not directly comparable to job postings.",
        sourceStatus: "needs_check",
      },
    ],
    caveat:
      "The filing covers a broad equipment group, so the figures should frame scale and R&D intensity rather than tooling-segment capacity.",
    source_ids: ["CN_FILING_NAURA_2025"],
  },
];
