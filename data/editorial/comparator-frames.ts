import type { SourceStatus } from "@/data/editorial/firm-workforce-snapshots";

export type ComparatorFrame = {
  id: string;
  chinaFocus: string;
  referencePeers: string;
  segment: string;
  compareOn: string[];
  doNotCompareOn: string[];
  readerUse: string;
  verificationStatus: SourceStatus;
  sourceAnchor: string[];
  reviewNotes: string;
};

export const comparatorFrames: ComparatorFrame[] = [
  {
    id: "amec-lam",
    chinaFocus: "AMEC",
    referencePeers: "Lam Research",
    segment: "Etch and process equipment",
    compareOn: [
      "R&D scale",
      "etch product families",
      "customer-validation language",
      "field application and service signals",
    ],
    doNotCompareOn: [
      "capability parity",
      "installed-base quality",
      "yield performance",
    ],
    readerUse:
      "Use Lam Research as a mature-market reference for the support functions that matter after an etch product leaves the lab.",
    verificationStatus: "needs_check",
    sourceAnchor: ["CN_FILING_AMEC_2025", "CN_FIRM_AMEC"],
    reviewNotes:
      "AMEC-side claims (etch product families, R&D scale) are source_checked via CN_FILING_AMEC_2025. Lam Research is named as a reference peer; the row does not assert any specific Lam number. doNotCompareOn explicitly bars capability parity, installed-base quality, and yield. Row stays needs_check until a Lam reference is anchored to a verifiable source rather than general industry knowledge.",
  },
  {
    id: "naura-piotech-amat-tel",
    chinaFocus: "NAURA / Piotech",
    referencePeers: "Applied Materials / Tokyo Electron",
    segment: "Deposition and broad process equipment",
    compareOn: [
      "deposition product breadth",
      "thin-film R&D scale",
      "service and customer-support structure",
      "repeat-order or validation language",
    ],
    doNotCompareOn: [
      "tool equivalence",
      "node readiness",
      "market-share parity",
    ],
    readerUse:
      "Use mature deposition suppliers as a reference for the gap between product breadth and production support.",
    verificationStatus: "needs_check",
    sourceAnchor: [
      "CN_FILING_NAURA_2025",
      "CN_FILING_PIOTECH_2025",
      "CN_FIRM_NAURA",
      "CN_FIRM_PIOTECH",
    ],
    reviewNotes:
      "NAURA and Piotech sides are source_checked via the listed filings (NAURA 21,101 total / 6,511 R&D; Piotech 638 R&D / PECVD/ALD/SACVD/HDPCVD/Flowable CVD at client-side mass production). Applied Materials and Tokyo Electron are named as references without any specific number asserted. Row stays needs_check until peer references are anchored to verifiable sources.",
  },
  {
    id: "acm-screen-lam-tel",
    chinaFocus: "ACM Research Shanghai",
    referencePeers: "SCREEN / Lam Research / Tokyo Electron",
    segment: "Clean and wafer processing",
    compareOn: [
      "wet-clean and strip product coverage",
      "service-heavy workforce language",
      "customer validation by tool family",
      "maintenance and recovery signals",
    ],
    doNotCompareOn: [
      "wafer-processing equivalence",
      "installed-base depth",
      "customer yield impact",
    ],
    readerUse:
      "Use mature clean and wafer-processing suppliers to read why installation, tuning, maintenance, and recovery matter alongside product listings.",
    verificationStatus: "needs_check",
    sourceAnchor: ["CN_FILING_ACM_SH_2025", "CN_FIRM_ACM_SH"],
    reviewNotes:
      "ACM-side claims are source_checked (TEBO and Tahoe product scopes; 672 after-sales personnel; 1,228 technical personnel). SCREEN, Lam, and TEL are named as references without specific numbers. Row stays needs_check until peer references are anchored.",
  },
  {
    id: "metrology-kla",
    chinaFocus: "Jingce / BEIM / Skyverse",
    referencePeers: "KLA",
    segment: "Metrology and inspection",
    compareOn: [
      "optics and inspection product categories",
      "algorithm and calibration roles",
      "field-support language",
      "customer-specific workflow signals",
    ],
    doNotCompareOn: [
      "yield-management capability",
      "defect-library quality",
      "tool matching",
    ],
    readerUse:
      "Use KLA as a reference for why metrology is as much a service and data problem as a hardware problem.",
    verificationStatus: "staging",
    sourceAnchor: ["CN_FILING_JINGCE_2025", "CN_FIRM_BEIM"],
    reviewNotes:
      "Jingce-side platforms are source_checked (MetaPAM, SCALE EPI, eMetric, eView/eVC/eSpec, BFI, VEGA). BEIM-side is needs_check. Skyverse is named but has no firm profile or source row in this dataset — that is a data gap, not source-checked content. KLA reference is generic. Row marked staging until Skyverse is either removed or added as a firm profile with sources.",
  },
  {
    id: "smee-asml-nikon-canon",
    chinaFocus: "SMEE",
    referencePeers: "ASML / Nikon / Canon",
    segment: "Lithography sidebar",
    compareOn: [
      "optics",
      "stage control",
      "alignment",
      "service calibration",
    ],
    doNotCompareOn: [
      "EUV readiness",
      "overlay performance",
      "customer yield",
    ],
    readerUse:
      "Use lithography peers only to frame the role mix. Keep lithography as a sidebar in this release.",
    verificationStatus: "needs_check",
    sourceAnchor: ["CN_FIRM_SMEE"],
    reviewNotes:
      "SMEE-side is needs_check at the firm-profile level (homepage source only; product pages have not been pulled). ASML, Nikon, Canon are named as references without specific numbers, and doNotCompareOn explicitly bars EUV readiness and overlay performance — the exact claims that would invite Western numerical comparison. Row stays needs_check.",
  },
];
