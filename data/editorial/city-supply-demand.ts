export type CitySupplyDemandRow = {
  city: string;
  visibleSupply: string;
  nearbyAbsorption: string;
  demandSignal: string;
  inference: string;
  cannotInfer: string;
  sourceIds: string[];
};

export const citySupplyDemandRows: CitySupplyDemandRow[] = [
  {
    city: "Beijing",
    visibleSupply:
      "Thick university supply across instruments, optics, controls, IC, chemistry, and materials.",
    nearbyAbsorption:
      "NAURA, Beijing E-Town IC chain, equipment, parts, and materials cluster signals.",
    demandSignal:
      "Public records show local semiconductor-equipment and IC-chain demand in Beijing E-Town.",
    inference:
      "A supply-demand join is plausible for equipment, materials, process, metrology, and support roles.",
    cannotInfer:
      "Cannot infer actual graduates into etch, deposition, metrology, or named firms.",
    sourceIds: [
      "CN_PARK_BEIJING_ETOWN_IC",
      "CN_FIRM_NAURA",
      "public-source talent supply appendix",
    ],
  },
  {
    city: "Shanghai",
    visibleSupply:
      "Visible university supply in microelectronics, IC process, chemical engineering, materials, and adjacent optics.",
    nearbyAbsorption:
      "Clearest mixed cluster across etch, clean, metrology, and lithography-adjacent firms.",
    demandSignal:
      "Shanghai shortage and Lingang records point to IC, equipment, materials, packaging, and testing activity.",
    inference:
      "Shanghai is the strongest public-source supply-demand join for multiple tooling role families.",
    cannotInfer: "Cannot infer graduate destination shares by firm or tool segment.",
    sourceIds: [
      "CN_SHORT_SH_DIR_2020",
      "CN_PARK_ORIENTAL_CHIP_PORT",
      "CN_FIRM_AMEC",
      "CN_FIRM_ACM_SH",
      "CN_FIRM_SMEE",
      "public-source talent supply appendix",
    ],
  },
  {
    city: "Wuhan",
    visibleSupply:
      "Optics, inspection, test/measurement, optoelectronics, controls, and manufacturing-system supply signals.",
    nearbyAbsorption:
      "Optoelectronics, inspection, and broader electronic-test demand are visible in the regional industrial base.",
    demandSignal:
      "Public records make Wuhan relevant for optics and measurement-adjacent roles.",
    inference:
      "A plausible feeder base exists for metrology, inspection, optics, controls, and test roles.",
    cannotInfer:
      "Cannot isolate front-end equipment demand from display, telecom, and broader electronic-test demand.",
    sourceIds: ["public-source talent supply appendix"],
  },
  {
    city: "Shenzhen",
    visibleSupply:
      "Metrology/inspection, test instrumentation, optical-electronic measurement, and semiconductor-service role signals.",
    nearbyAbsorption:
      "Strong semiconductor and electronics services market with official shortage records.",
    demandSignal:
      "Official semiconductor and IC high-end shortage lists identify role pressure in Shenzhen.",
    inference:
      "The city is a plausible demand-side join for metrology, test, optical-electronic measurement, and service roles.",
    cannotInfer:
      "Less visible front-end etch/deposition OEM concentration than Beijing, Shanghai, or Shenyang.",
    sourceIds: [
      "CN_SHORT_SZ_SEMI_2024",
      "CN_SHORT_BAOAN_2025",
      "public-source talent supply appendix",
    ],
  },
  {
    city: "Shenyang",
    visibleSupply:
      "Local instrumentation, materials, mechanics, optics, and control education signals.",
    nearbyAbsorption:
      "Piotech and Kingsemi create a direct local equipment-demand context for deposition and clean/develop tools.",
    demandSignal:
      "Public firm records and local proximity make the supply-demand join unusually concrete.",
    inference:
      "There is a direct public-source link between local technical education themes and nearby equipment firms.",
    cannotInfer: "No institution-by-institution placement data.",
    sourceIds: ["CN_FIRM_PIOTECH", "public-source talent supply appendix"],
  },
  {
    city: "Nanjing/Wuxi",
    visibleSupply:
      "Broad IC talent market plus manufacturing-oriented coursework and practice-base signals.",
    nearbyAbsorption:
      "Yangtze River Delta fabs, equipment-adjacent activity, packaging, and power-semiconductor markets.",
    demandSignal:
      "Regional IC cluster and practice-base records make this a plausible supply-demand join.",
    inference:
      "The corridor can plausibly support process, equipment, thin-film, patterning-adjacent, and manufacturing roles.",
    cannotInfer:
      "Cannot separate equipment employment from fabs, packaging, or power semiconductors.",
    sourceIds: ["public-source talent supply appendix"],
  },
];
