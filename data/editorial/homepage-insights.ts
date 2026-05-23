export type HomepageInsight = {
  id: string;
  title: string;
  finding: string;
  recordShows: string;
  limit: string;
  href: string;
  linkLabel: string;
};

export const homepageInsights: HomepageInsight[] = [
  {
    id: "stem-denominator",
    title: "Broad STEM counts are the wrong denominator",
    finding:
      "Equipment firms need specific mixes of plasma, thin-film, wet chemistry, optics, controls, software, and field-service talent.",
    recordShows:
      "The segment briefs separate tool families and role families instead of treating technical supply as one pool.",
    limit:
      "The current dataset maps disciplines to tool segments. It does not yet measure graduate placement into equipment roles.",
    href: "/segments/deposition",
    linkLabel: "Open a segment brief",
  },
  {
    id: "firm-filings",
    title: "Firm filings are the best public workforce window",
    finding:
      "AMEC, ACM Research Shanghai, NAURA, and Piotech disclose more usable workforce and product detail than most education statistics.",
    recordShows:
      "Their filings show R&D scale, technical staff, degree mix, product lines, and support categories.",
    limit:
      "Firm categories are not standardized. R&D headcount, technical staff, and service staff should not be added into one score.",
    href: "/firms",
    linkLabel: "Open firm dossiers",
  },
  {
    id: "city-records",
    title: "Shanghai and Beijing produce the most records",
    finding:
      "Shanghai and Beijing lead the current public record set because listed firms, industrial parks, universities, and policy documents are easier to observe there.",
    recordShows:
      "The monitor shows where current public evidence records cluster.",
    limit:
      "A larger node means more public records. It does not mean more usable talent.",
    href: "/monitor",
    linkLabel: "Open monitor",
  },
  {
    id: "customer-site-support",
    title: "Customer-site support is the hardest layer to see",
    finding:
      "Product pages can show ambition. Filings can show R&D scale. The public record rarely shows whether a firm can install, tune, maintain, and recover tools inside customer fabs.",
    recordShows:
      "The strongest next signals are field application hiring, service training, repeat orders, and customer validation by tool family.",
    limit:
      "The missing layer is part of the finding. Field application, calibration, chamber recovery, and repeat deployment are the signals to track next.",
    href: "/methodology#evidence-vs-capability",
    linkLabel: "Read evidence limits",
  },
];
