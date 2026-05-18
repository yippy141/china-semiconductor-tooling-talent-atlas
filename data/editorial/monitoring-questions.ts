export type MonitoringQuestion = {
  id: string;
  title: string;
  watchSignal: string;
  strongerSignal: string;
  doNotInfer: string;
  link: { href: string; label: string };
};

export const monitoringQuestions: MonitoringQuestion[] = [
  {
    id: "firm-absorption",
    title: "Firm absorption",
    watchSignal:
      "Listed toolmakers disclosing growth in R&D, technical, after-sales, service, or customer-support categories in annual filings.",
    strongerSignal:
      "Growth concentrated in customer-site categories — field application, service training, after-sales — rather than R&D headcount alone. That is where formal engineering supply turns into organizational capacity.",
    doNotInfer:
      "Whole-firm workforce categories are firm-level. They do not show segment-specific headcount.",
    link: {
      href: "/firms/amec",
      label: "Open AMEC dossier",
    },
  },
  {
    id: "customer-site-support",
    title: "Customer-site support",
    watchSignal:
      "Product announcements naming a new tool family, a customer, or a process win.",
    strongerSignal:
      "Language about field application engineers, customer validation, calibration, repeat orders, or service training tied to a specific tool family. These are the routines that move a tool from lab result to fab operation.",
    doNotInfer:
      "An announcement does not show ramp success, installed-base quality, or yield. Service language shows visibility of the function, not its depth.",
    link: {
      href: "/firms/acm-research-shanghai",
      label: "Open ACM Research Shanghai dossier",
    },
  },
  {
    id: "scarce-role-combinations",
    title: "Scarce role combinations",
    watchSignal:
      "Hiring or training in single disciplines — plasma, optics, motion control, ALD chemistry, algorithms.",
    strongerSignal:
      "The combinations are harder than the parts: plasma plus chamber hardware, ALD chemistry plus vacuum behavior, optics plus algorithms, precision motion plus calibration. Generic STEM counts miss them.",
    doNotInfer:
      "Aggregate graduate output cannot tell you whether a firm has assembled the right cross-discipline teams.",
    link: {
      href: "/segments/metrology_inspection",
      label: "See the optics-plus-algorithms case",
    },
  },
  {
    id: "city-clusters",
    title: "City clusters worth checking first",
    watchSignal:
      "Aggregate city evidence counts. Shanghai and Beijing dominate the visible record.",
    strongerSignal:
      "Inside those clusters, the records worth pulling first are listed-firm filings, park disclosures, shortage notices, and policy directives — not raw evidence totals.",
    doNotInfer:
      "City evidence concentration is visibility coverage, not a talent ranking. Sparsely covered cities may still have material activity.",
    link: {
      href: "/explorer?city=Shanghai",
      label: "Open Shanghai rows in explorer",
    },
  },
];
