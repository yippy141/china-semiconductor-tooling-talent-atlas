export type CityPosition = {
  city: string;
  province: string;
  x: number;
  y: number;
  note: string;
  source_ids: string[];
};

const schematicNote =
  "Schematic placement against a simplified mainland outline, not geospatial measurement.";

export const cityPositions: CityPosition[] = [
  {
    city: "Shanghai",
    province: "Shanghai",
    x: 86,
    y: 61,
    note: schematicNote,
    source_ids: ["CN_SHORT_SH_DIR_2020", "CN_PARK_ORIENTAL_CHIP_PORT"],
  },
  {
    city: "Beijing",
    province: "Beijing",
    x: 75,
    y: 39,
    note: schematicNote,
    source_ids: ["CN_PARK_BEIJING_ETOWN_IC", "CN_FIRM_NAURA"],
  },
  {
    city: "Suzhou",
    province: "Jiangsu",
    x: 84,
    y: 60,
    note: schematicNote,
    source_ids: ["CN_PARK_SIP_IC"],
  },
  {
    city: "Shenzhen",
    province: "Guangdong",
    x: 74,
    y: 87,
    note: schematicNote,
    source_ids: ["CN_SHORT_SZ_SEMI_2024"],
  },
  {
    city: "Xiamen",
    province: "Fujian",
    x: 82,
    y: 81,
    note: schematicNote,
    source_ids: ["CN_PARK_HAICANG_IC"],
  },
  {
    city: "Tianjin",
    province: "Tianjin",
    x: 76,
    y: 41,
    note: schematicNote,
    source_ids: ["CN_SHORT_TJ_DIR_2023"],
  },
  {
    city: "Dalian",
    province: "Liaoning",
    x: 81,
    y: 40,
    note: schematicNote,
    source_ids: [],
  },
  {
    city: "Hangzhou",
    province: "Zhejiang",
    x: 83,
    y: 66,
    note: schematicNote,
    source_ids: [],
  },
  {
    city: "Harbin",
    province: "Heilongjiang",
    x: 87,
    y: 18,
    note: schematicNote,
    source_ids: [],
  },
  {
    city: "Chengdu",
    province: "Sichuan",
    x: 48,
    y: 65,
    note: schematicNote,
    source_ids: ["CN_SHORT_CY_DIR_2023"],
  },
  {
    city: "Chongqing",
    province: "Chongqing",
    x: 60,
    y: 68,
    note: schematicNote,
    source_ids: ["CN_SHORT_CY_DIR_2023"],
  },
  {
    city: "Wuhan",
    province: "Hubei",
    x: 71,
    y: 63,
    note: schematicNote,
    source_ids: ["CN_FILING_JINGCE_2025"],
  },
  {
    city: "Shenyang",
    province: "Liaoning",
    x: 81,
    y: 33,
    note: schematicNote,
    source_ids: ["CN_FILING_PIOTECH_2025"],
  },
];
