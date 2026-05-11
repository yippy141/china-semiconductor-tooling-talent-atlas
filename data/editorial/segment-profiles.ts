export type SegmentProfile = {
  id: string;
  label: string;
  plainEnglishDefinition: string;
  keyRoleFamilies: string[];
  likelyBottlenecks: string[];
  publicSignals: string[];
  caveat: string;
  whatToWatch: string[];
  source_ids: string[];
};

export const segmentProfiles: SegmentProfile[] = [
  {
    id: "etch_clean",
    label: "Etch, clean, and strip",
    plainEnglishDefinition:
      "Tools and process work that remove material, residues, or photoresist without damaging the wafer pattern.",
    keyRoleFamilies: [
      "Plasma and surface scientists",
      "Etch and clean process engineers",
      "Field application engineers",
      "Maintenance and debug technicians",
    ],
    likelyBottlenecks: [
      "High-aspect-ratio profile control with low damage",
      "Post-etch residue removal without pattern loss",
      "Chamber matching and recovery after maintenance",
    ],
    publicSignals: [
      "Etch and clean product pages",
      "CNINFO annual-report disclosures",
      "Process and application job language",
      "Patents and technical papers on plasma or wet clean",
    ],
    caveat:
      "Public sources expose product families and role language better than yield-learning depth.",
    whatToWatch: [
      "Repeat references to advanced memory and high-aspect-ratio use cases",
      "Service and application-team expansion",
      "Training language tied to customer-site ramps",
    ],
    source_ids: ["CN_FIRM_AMEC", "CN_FIRM_ACM_SH", "CN_FILING_AMEC_2025"],
  },
  {
    id: "deposition",
    label: "Deposition",
    plainEnglishDefinition:
      "Tools and process work that grow or place thin films with the right thickness, composition, coverage, and stability.",
    keyRoleFamilies: [
      "Thin-film scientists",
      "ALD, CVD, and PVD process engineers",
      "Vacuum and gas-delivery engineers",
      "Customer validation and service engineers",
    ],
    likelyBottlenecks: [
      "Conformal film growth at production-worthy throughput",
      "Precursor and chamber behavior under high-volume use",
      "Particle control and chamber matching",
    ],
    publicSignals: [
      "ALD, CVD, PVD, and furnace product coverage",
      "Annual-report language on scale and R&D intensity",
      "Film-process and service job language",
      "Patents on chamber architecture and gas delivery",
    ],
    caveat:
      "Repeat orders and product breadth help, but they do not reveal full process-window or maintenance sensitivity.",
    whatToWatch: [
      "Batch or vertical tool claims tied to throughput",
      "Customer validation and repeat-order language",
      "Hiring or training for field support and application work",
    ],
    source_ids: ["CN_FIRM_NAURA", "CN_FIRM_AMEC", "CN_FILING_NAURA_2025"],
  },
  {
    id: "metrology_inspection",
    label: "Metrology and inspection",
    plainEnglishDefinition:
      "Tools and workflows that measure, inspect, classify, and feed defect or process information back into production.",
    keyRoleFamilies: [
      "Optical and imaging scientists",
      "Algorithm and data engineers",
      "Metrology application engineers",
      "Calibration and field-support specialists",
    ],
    likelyBottlenecks: [
      "Optics-plus-algorithms integration",
      "False-alarm reduction without missing real defects",
      "Fab-specific calibration and defect-library tuning",
    ],
    publicSignals: [
      "Optical, algorithm, and system-engineering job language",
      "Metrology product filings and product pages",
      "Service-team and support-network disclosures",
      "Research-output proxies in optics and instrumentation",
    ],
    caveat:
      "Customer datasets, nuisance-signal handling, and calibration routines are usually private.",
    whatToWatch: [
      "Evidence of application engineers at customer sites",
      "Training or support language around calibration",
      "Product claims that link measurement to yield workflows",
    ],
    source_ids: ["CN_FILING_JINGCE_2025", "CN_EDU_MOE_GRAD_DIR_2022"],
  },
  {
    id: "lithography_sidebar",
    label: "Lithography sidebar",
    plainEnglishDefinition:
      "A sidebar category for optics, alignment, exposure, focus, and process-window signals adjacent to lithography bottlenecks.",
    keyRoleFamilies: [
      "Optical scientists",
      "Stage, control, and mechatronics engineers",
      "Lithography process engineers",
      "Optical assembly and calibration technicians",
    ],
    likelyBottlenecks: [
      "Opto-mechatronic integration for overlay and focus",
      "Contamination discipline and calibration recovery",
      "Process-window tuning under customer conditions",
    ],
    publicSignals: [
      "Optics and control job language",
      "Lithography product and service pages",
      "University optics and instrumentation signals",
      "Policy and park references to IC equipment ecosystems",
    ],
    caveat:
      "This is a sidebar for context, not a claim that public evidence can measure lithography readiness.",
    whatToWatch: [
      "Specialized optics hiring",
      "Service and training infrastructure",
      "Connections between lithography, metrology, and precision motion",
    ],
    source_ids: ["CN_EDU_MOE_GRAD_DIR_2022", "CN_PARK_SIP_IC"],
  },
];
