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
      "The current crosswalk maps 14 MOE-coded disciplines to the four tool segments in scope.",
    limit:
      "The dataset does not yet measure graduate placement into equipment roles.",
    href: "/segments",
    linkLabel: "Open segment briefs",
  },
  {
    id: "firm-filings",
    title: "Firm filings are the best public workforce window",
    finding:
      "Listed equipment firms disclose R&D scale, technical staff, degree mix, product lines, and support categories that education data cannot show.",
    recordShows:
      "AMEC, ACM Research Shanghai, NAURA, and Piotech provide the strongest employer-side trail in the current release.",
    limit:
      "Firm categories are not standardized across companies.",
    href: "/firms",
    linkLabel: "Open firm dossiers",
  },
  {
    id: "city-records",
    title: "Shanghai and Beijing produce the most records",
    finding:
      "The current record set is concentrated in cities with listed firms, industrial parks, universities, and local notices.",
    recordShows:
      "Shanghai and Beijing lead the visible record set in the current beta data.",
    limit:
      "A larger node means more public records, not a measured count of engineers.",
    href: "/monitor",
    linkLabel: "Open monitor",
  },
  {
    id: "customer-site-support",
    title: "Customer-site support is the hardest layer to see",
    finding:
      "Product pages show ambition. Filings show R&D scale. Public sources rarely show installation, tuning, maintenance, and recovery inside customer fabs.",
    recordShows:
      "The strongest next signals are field application hiring, service training, repeat orders, and customer validation by tool family.",
    limit:
      "This layer is expected to remain partly hidden from public records.",
    href: "/methodology#source-criticism",
    linkLabel: "Read source notes",
  },
];
