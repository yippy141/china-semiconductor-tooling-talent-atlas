export type SupplyMetricKind = "actual_count" | "proxy";

export type SupplyMetric = {
  metric: string;
  value: number;
  year: number;
  kind: SupplyMetricKind;
  level: "postgraduate" | "undergraduate" | "doctoral authorization";
  field: string;
  geography: string;
  sourceIds: string[];
  caveat: string;
};

export const macroSupplyMetrics: SupplyMetric[] = [
  {
    metric: "Engineering postgraduate entrants",
    value: 453870,
    year: 2023,
    kind: "actual_count",
    level: "postgraduate",
    field: "Broad engineering",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Broad engineering count; not tooling-specific.",
  },
  {
    metric: "Engineering postgraduate enrolment",
    value: 1333008,
    year: 2023,
    kind: "actual_count",
    level: "postgraduate",
    field: "Broad engineering",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Stock, not output; not tooling-specific.",
  },
  {
    metric: "Science postgraduate entrants",
    value: 99988,
    year: 2023,
    kind: "actual_count",
    level: "postgraduate",
    field: "Broad science",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Broad science count; not a physics or chemistry subfield count.",
  },
  {
    metric: "Science postgraduate enrolment",
    value: 308073,
    year: 2023,
    kind: "actual_count",
    level: "postgraduate",
    field: "Broad science",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Stock, not output; not tooling-specific.",
  },
  {
    metric: "Engineering undergraduate entrants",
    value: 1662036,
    year: 2023,
    kind: "actual_count",
    level: "undergraduate",
    field: "Broad engineering",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Broad engineering count; not tooling-specific.",
  },
  {
    metric: "Engineering undergraduate enrolment",
    value: 6742664,
    year: 2023,
    kind: "actual_count",
    level: "undergraduate",
    field: "Broad engineering",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Broad engineering stock; not tooling-specific.",
  },
  {
    metric: "Science undergraduate entrants",
    value: 337668,
    year: 2023,
    kind: "actual_count",
    level: "undergraduate",
    field: "Broad science",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Broad science count; not a semiconductor-tooling count.",
  },
  {
    metric: "Science undergraduate enrolment",
    value: 1314583,
    year: 2023,
    kind: "actual_count",
    level: "undergraduate",
    field: "Broad science",
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Broad science stock; not a semiconductor-tooling count.",
  },
];

export const doctoralAuthorizationProxies: SupplyMetric[] = [
  "Physics",
  "Chemistry",
  "Mechanical Engineering",
  "Optical Engineering",
  "Instrument Science and Technology",
  "Materials Science and Engineering",
  "Electronic Science and Technology",
  "Control Science and Engineering",
  "Chemical Engineering and Technology",
].map((field) => {
  const proxyValues: Record<string, number> = {
    Physics: 64,
    Chemistry: 69,
    "Mechanical Engineering": 93,
    "Optical Engineering": 39,
    "Instrument Science and Technology": 32,
    "Materials Science and Engineering": 93,
    "Electronic Science and Technology": 52,
    "Control Science and Engineering": 67,
    "Chemical Engineering and Technology": 54,
  };

  return {
    metric: `${field} doctoral authorization proxy`,
    value: proxyValues[field],
    year: 2023,
    kind: "proxy",
    level: "doctoral authorization",
    field,
    geography: "Mainland PRC",
    sourceIds: ["public-source talent supply appendix"],
    caveat: "Institutional distribution proxy, not current graduate headcount.",
  };
});
