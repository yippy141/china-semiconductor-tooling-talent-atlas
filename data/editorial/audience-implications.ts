export type AudienceImplication = {
  audience: string;
  headline: string;
  takeaway: string;
  useTheExplorerFor: string[];
  caution: string;
  source_ids: string[];
};

export const audienceImplications: AudienceImplication[] = [
  {
    audience: "Equipment firms",
    headline: "Look for scarce combinations, not generic STEM supply.",
    takeaway:
      "The useful signal is where role families, segment bottlenecks, and city or firm evidence overlap.",
    useTheExplorerFor: [
      "Comparing public evidence signals by segment",
      "Finding where service, application, and production roles become visible",
      "Separating R&D visibility from customer-ramp know-how",
    ],
    caution:
      "Do not read public evidence strength as a hiring pipeline or competitor capability score.",
    source_ids: ["CN_FILING_AMEC_2025", "CN_FILING_NAURA_2025"],
  },
  {
    audience: "Policymakers",
    headline: "Shortage lists are directional, not a census.",
    takeaway:
      "Local directories and park plans help identify where public institutions see pressure, but they rarely measure tacit production learning.",
    useTheExplorerFor: [
      "Checking which cities disclose shortage or cluster signals",
      "Seeing which segments rely on proxy evidence",
      "Identifying evidence gaps before funding or training claims harden",
    ],
    caution:
      "Avoid converting qualitative shortage signals into exact workforce targets without separate validation.",
    source_ids: [
      "CN_SHORT_SZ_SEMI_2024",
      "CN_SHORT_TJ_DIR_2023",
      "CN_SHORT_CY_DIR_2023",
      "CN_PARK_SIP_IC",
    ],
  },
  {
    audience: "Researchers / analysts",
    headline: "The missing column is often the most important one.",
    takeaway:
      "Public data is best at showing institutions, filings, and role language; it is weaker at showing chamber recovery, calibration habits, and customer-specific learning.",
    useTheExplorerFor: [
      "Tracing each observation back to source_id",
      "Distinguishing direct public records from analytical proxies",
      "Building a verification queue for the most visible claims",
    ],
    caution:
      "Treat observations.csv as staging until the visible claims are checked against primary sources.",
    source_ids: ["CN_EDU_MOE_GRAD_DIR_2022", "CN_FILING_ACM_SH_2025"],
  },
];
