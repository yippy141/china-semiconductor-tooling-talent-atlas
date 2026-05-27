export type InstitutionPipelineRow = {
  institution: string;
  city: string;
  province: string;
  visibleProgram: string;
  disciplines: string[];
  roleFamilies: string[];
  segmentFit: string[];
  confidence: "High" | "Medium";
  sourceIds: string[];
  caveat: string;
};

export const institutionPipelineRows: InstitutionPipelineRow[] = [
  {
    institution: "Tsinghua University",
    city: "Beijing",
    province: "Beijing",
    visibleProgram:
      "IC manufacturing, specialized equipment/materials, and precision/instrument base.",
    disciplines: [
      "Instrument Science and Technology",
      "Optical Engineering",
      "Control Science and Engineering",
      "Electronic Science and Technology",
    ],
    roleFamilies: ["Precision instruments", "Metrology", "Controls"],
    segmentFit: ["Metrology and inspection", "Lithography sidebar"],
    confidence: "High",
    sourceIds: ["CN_UNI_THU_DPI", "public-source talent supply appendix"],
    caveat:
      "Visible feeder signal only; this does not measure tool-specific graduate output or firm placement.",
  },
  {
    institution: "Peking University",
    city: "Beijing",
    province: "Beijing",
    visibleProgram: "Physics, chemistry, materials, and microelectronics base.",
    disciplines: [
      "Physics",
      "Chemistry",
      "Materials Science and Engineering",
      "Electronic Science and Technology",
    ],
    roleFamilies: ["Process science", "Materials", "Device/process bridge"],
    segmentFit: ["Etch, clean, and strip", "Deposition", "Metrology and inspection"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Plausible feeder signal only; no university-to-toolmaker placement claim.",
  },
  {
    institution: "Beihang University",
    city: "Beijing",
    province: "Beijing",
    visibleProgram: "Optics, instruments, metrology, controls, and precision systems.",
    disciplines: [
      "Optical Engineering",
      "Instrument Science and Technology",
      "Control Science and Engineering",
      "Mechanical Engineering",
    ],
    roleFamilies: ["Optics", "Controls", "Precision mechanics"],
    segmentFit: ["Metrology and inspection", "Lithography sidebar"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Visible feeder signal only; not a count of semiconductor-equipment graduates.",
  },
  {
    institution: "Beijing Institute of Technology",
    city: "Beijing",
    province: "Beijing",
    visibleProgram: "Instrumentation, optical-electronic measurement, controls, and mechanics.",
    disciplines: [
      "Instrument Science and Technology",
      "Optical Engineering",
      "Control Science and Engineering",
      "Mechanical Engineering",
    ],
    roleFamilies: ["Measurement systems", "Automation", "Precision mechanics"],
    segmentFit: ["Metrology and inspection", "Lithography sidebar"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Plausible feeder signal only; no claim of direct hiring into NAURA, AMEC, or other firms.",
  },
  {
    institution: "Beijing University of Chemical Technology",
    city: "Beijing",
    province: "Beijing",
    visibleProgram: "Chemical engineering, materials, wet chemistry, and thin films.",
    disciplines: [
      "Chemical Engineering and Technology",
      "Chemistry",
      "Materials Science and Engineering",
    ],
    roleFamilies: ["Wet chemistry", "Thin films", "Process engineering"],
    segmentFit: ["Etch, clean, and strip", "Deposition"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Plausible feeder signal only; broad chemistry and chemical-engineering records are not tooling headcounts.",
  },
  {
    institution: "Tianjin University",
    city: "Tianjin",
    province: "Tianjin",
    visibleProgram: "Precision instruments and optoelectronics, with metrology relevance.",
    disciplines: [
      "Instrument Science and Technology",
      "Optical Engineering",
      "Mechanical Engineering",
      "Control Science and Engineering",
    ],
    roleFamilies: ["Metrology", "Optoelectronics", "Precision testing"],
    segmentFit: ["Metrology and inspection", "Lithography sidebar"],
    confidence: "High",
    sourceIds: ["CN_UNI_TJU_PRECISION", "public-source talent supply appendix"],
    caveat:
      "Visible feeder signal only; school profile records do not identify downstream employers.",
  },
  {
    institution: "University of Science and Technology of China",
    city: "Hefei",
    province: "Anhui",
    visibleProgram: "Optics, instruments, metrology, controls, physics, and materials.",
    disciplines: [
      "Physics",
      "Optical Engineering",
      "Instrument Science and Technology",
      "Materials Science and Engineering",
    ],
    roleFamilies: ["Optics", "Measurement", "Process physics"],
    segmentFit: ["Metrology and inspection", "Lithography sidebar", "Etch, clean, and strip"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Plausible feeder signal only; it should not be read as tool-specific graduate output.",
  },
  {
    institution: "Huazhong University of Science and Technology",
    city: "Wuhan",
    province: "Hubei",
    visibleProgram: "Optics, instruments, metrology, controls, and manufacturing systems.",
    disciplines: [
      "Optical Engineering",
      "Instrument Science and Technology",
      "Mechanical Engineering",
      "Control Science and Engineering",
    ],
    roleFamilies: ["Optics", "Metrology", "Manufacturing systems"],
    segmentFit: ["Metrology and inspection", "Lithography sidebar"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Visible feeder signal only; public records do not isolate front-end equipment placements.",
  },
  {
    institution: "Shanghai Jiao Tong University",
    city: "Shanghai",
    province: "Shanghai",
    visibleProgram:
      "IC manufacturing process and equipment, including AMEC-linked course evidence.",
    disciplines: [
      "Integrated Circuit Science and Engineering",
      "Electronic Science and Technology",
      "Mechanical Engineering",
      "Materials Science and Engineering",
    ],
    roleFamilies: ["Process equipment", "Device/process bridge", "Manufacturing engineering"],
    segmentFit: ["Etch, clean, and strip", "Deposition", "Metrology and inspection"],
    confidence: "High",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Public-source link only; course evidence is not a placement or output measure.",
  },
  {
    institution: "Fudan University",
    city: "Shanghai",
    province: "Shanghai",
    visibleProgram: "Microelectronics, process-adjacent IC training, and micro/nano systems.",
    disciplines: [
      "Integrated Circuit Science and Engineering",
      "Electronic Science and Technology",
      "Materials Science and Engineering",
    ],
    roleFamilies: ["Process integration", "Device/process bridge", "Tool software context"],
    segmentFit: ["Etch, clean, and strip", "Deposition", "Metrology and inspection"],
    confidence: "High",
    sourceIds: ["CN_UNI_FDU_ICMNE", "public-source talent supply appendix"],
    caveat:
      "Visible feeder signal only; no firm-specific absorption claim.",
  },
  {
    institution: "East China University of Science and Technology",
    city: "Shanghai",
    province: "Shanghai",
    visibleProgram: "Chemical engineering, materials, wet chemistry, and thin films.",
    disciplines: [
      "Chemical Engineering and Technology",
      "Chemistry",
      "Materials Science and Engineering",
    ],
    roleFamilies: ["Wet chemistry", "Thin films", "Process chemistry"],
    segmentFit: ["Etch, clean, and strip", "Deposition"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Plausible feeder signal only; broad chemical-engineering strength is not a semiconductor-tooling count.",
  },
  {
    institution: "Southeast University",
    city: "Nanjing",
    province: "Jiangsu",
    visibleProgram:
      "Deposition, patterning, EUV/lithography-adjacent coursework, and Nanjing/Wuxi practice-base signal.",
    disciplines: [
      "Integrated Circuit Science and Engineering",
      "Electronic Science and Technology",
      "Optical Engineering",
      "Materials Science and Engineering",
    ],
    roleFamilies: ["Patterning-adjacent process", "Thin films", "Practice-base training"],
    segmentFit: ["Deposition", "Metrology and inspection", "Lithography sidebar"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Supply-demand join only; it does not separate equipment hiring from fabs or packaging.",
  },
  {
    institution: "Zhejiang University",
    city: "Hangzhou",
    province: "Zhejiang",
    visibleProgram: "Optics, instruments, metrology, controls, and optical engineering.",
    disciplines: [
      "Optical Engineering",
      "Instrument Science and Technology",
      "Control Science and Engineering",
      "Electronic Science and Technology",
    ],
    roleFamilies: ["Optics", "Metrology", "Control systems"],
    segmentFit: ["Metrology and inspection", "Lithography sidebar"],
    confidence: "High",
    sourceIds: ["CN_UNI_ZJU_OPTICS", "public-source talent supply appendix"],
    caveat:
      "Visible feeder signal only; no direct toolmaker placement is inferred.",
  },
  {
    institution: "Shenyang University of Technology",
    city: "Shenyang",
    province: "Liaoning",
    visibleProgram:
      "Instrumentation, optics, precision mechanics, and control near Piotech/Kingsemi.",
    disciplines: [
      "Instrument Science and Technology",
      "Optical Engineering",
      "Mechanical Engineering",
      "Control Science and Engineering",
    ],
    roleFamilies: ["Instrumentation", "Precision mechanics", "Controls"],
    segmentFit: ["Deposition", "Etch, clean, and strip", "Metrology and inspection"],
    confidence: "Medium",
    sourceIds: ["public-source talent supply appendix"],
    caveat:
      "Useful local proximity signal only; no institution-by-institution placement data.",
  },
];
