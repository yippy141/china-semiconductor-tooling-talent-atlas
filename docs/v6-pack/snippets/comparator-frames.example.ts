export type ComparatorFrame = {
  id: string;
  chinaFocus: string;
  referencePeers: string;
  segment: string;
  compareOn: string[];
  doNotCompareOn: string[];
  readerUse: string;
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
    doNotCompareOn: ["capability parity", "installed-base quality", "yield performance"],
    readerUse:
      "Use Lam as a mature-market reference for the support functions that matter after an etch product leaves the lab.",
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
    doNotCompareOn: ["tool equivalence", "node readiness", "market-share parity"],
    readerUse:
      "Use mature deposition suppliers as a reference for the gap between product breadth and production support.",
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
    doNotCompareOn: ["yield-management capability", "defect-library quality", "tool matching"],
    readerUse:
      "Use KLA as a reference for why metrology is as much a service and data problem as a hardware problem.",
  },
  {
    id: "smee-asml",
    chinaFocus: "SMEE",
    referencePeers: "ASML / Nikon / Canon",
    segment: "Lithography sidebar",
    compareOn: ["optics", "stage control", "alignment", "service calibration"],
    doNotCompareOn: ["EUV readiness", "overlay performance", "customer yield"],
    readerUse:
      "Use lithography peers only to frame the role mix. Keep lithography as a sidebar in this release.",
  },
];
