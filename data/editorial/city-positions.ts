export type CityPosition = {
  city: string;
  province: string;
  x: number;
  y: number;
  note: string;
  source_ids: string[];
};

const schematicNote =
  "Schematic placement for visual navigation, not geospatial measurement.";

export const cityPositions: CityPosition[] = [
  {
    city: "Shanghai",
    province: "Shanghai",
    x: 78,
    y: 58,
    note: schematicNote,
    source_ids: ["CN_SHORT_SH_DIR_2020", "CN_PARK_ORIENTAL_CHIP_PORT"],
  },
  {
    city: "Beijing",
    province: "Beijing",
    x: 62,
    y: 25,
    note: schematicNote,
    source_ids: ["CN_PARK_BEIJING_ETOWN_IC", "CN_FIRM_NAURA"],
  },
  {
    city: "Suzhou",
    province: "Jiangsu",
    x: 75,
    y: 56,
    note: schematicNote,
    source_ids: ["CN_PARK_SIP_IC"],
  },
  {
    city: "Shenzhen",
    province: "Guangdong",
    x: 64,
    y: 83,
    note: schematicNote,
    source_ids: ["CN_SHORT_SZ_SEMI_2024"],
  },
  {
    city: "Xiamen",
    province: "Fujian",
    x: 72,
    y: 75,
    note: schematicNote,
    source_ids: ["CN_PARK_HAICANG_IC"],
  },
  {
    city: "Tianjin",
    province: "Tianjin",
    x: 66,
    y: 29,
    note: schematicNote,
    source_ids: ["CN_SHORT_TJ_DIR_2023"],
  },
  {
    city: "Dalian",
    province: "Liaoning",
    x: 76,
    y: 22,
    note: schematicNote,
    source_ids: [],
  },
  {
    city: "Hangzhou",
    province: "Zhejiang",
    x: 76,
    y: 62,
    note: schematicNote,
    source_ids: [],
  },
  {
    city: "Harbin",
    province: "Heilongjiang",
    x: 79,
    y: 8,
    note: schematicNote,
    source_ids: [],
  },
  {
    city: "Chengdu",
    province: "Sichuan",
    x: 36,
    y: 67,
    note: schematicNote,
    source_ids: ["CN_SHORT_CY_DIR_2023"],
  },
  {
    city: "Chongqing",
    province: "Chongqing",
    x: 43,
    y: 70,
    note: schematicNote,
    source_ids: ["CN_SHORT_CY_DIR_2023"],
  },
  {
    city: "Wuhan",
    province: "Hubei",
    x: 59,
    y: 63,
    note: schematicNote,
    source_ids: ["CN_FILING_JINGCE_2025"],
  },
  {
    city: "Shenyang",
    province: "Liaoning",
    x: 73,
    y: 18,
    note: schematicNote,
    source_ids: ["CN_FILING_PIOTECH_2025"],
  },
];
