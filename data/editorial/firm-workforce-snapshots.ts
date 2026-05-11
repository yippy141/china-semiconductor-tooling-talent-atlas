export type VerificationStatus = "needs_verification" | "verified";

export type WorkforceFigure = {
  label: string;
  value: string;
  verificationStatus: VerificationStatus;
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
        verificationStatus: "needs_verification",
      },
      {
        label: "R&D personnel share of total staff",
        value: "52.24%",
        verificationStatus: "needs_verification",
      },
      {
        label: "Master's or doctoral degree share within R&D personnel",
        value: "57.88%",
        verificationStatus: "needs_verification",
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
      "ACM Research Shanghai makes the wet-clean and strip workforce layer more visible than most firms, especially through R&D and service-heavy disclosures.",
    figures: [
      {
        label: "Total employees",
        value: "2,485",
        verificationStatus: "needs_verification",
      },
      {
        label: "R&D personnel",
        value: "1,228",
        verificationStatus: "needs_verification",
      },
      {
        label: "R&D personnel share of total staff",
        value: "49.42%",
        verificationStatus: "needs_verification",
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
        verificationStatus: "needs_verification",
      },
      {
        label: "R&D personnel",
        value: "6,511",
        verificationStatus: "needs_verification",
      },
      {
        label: "R&D personnel share of total staff",
        value: "30.86%",
        verificationStatus: "needs_verification",
      },
    ],
    caveat:
      "The filing covers a broad equipment group, so the figures should frame scale and R&D intensity rather than tooling-segment capacity.",
    source_ids: ["CN_FILING_NAURA_2025"],
  },
];
