import type { SourceStatus } from "@/data/editorial/firm-workforce-snapshots";

export type HomepageInsight = {
  id: string;
  title: string;
  finding: string;
  recordShows: string;
  limit: string;
  href: string;
  linkLabel: string;
  verificationStatus: SourceStatus;
  sourceAnchor: string[];
  reviewNotes: string;
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
    href: "/segments",
    linkLabel: "Compare segment briefs",
    verificationStatus: "source_checked",
    sourceAnchor: ["CN_EDU_MOE_GRAD_DIR_2022"],
    reviewNotes:
      "Backed by the MOE 2022 graduate catalogue and the discipline-to-segment matrix rendered on the homepage. Card claims a mapping, not a graduate count.",
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
    linkLabel: "Compare firm dossiers",
    verificationStatus: "source_checked",
    sourceAnchor: [
      "CN_FILING_AMEC_2025",
      "CN_FILING_ACM_SH_2025",
      "CN_FILING_NAURA_2025",
      "CN_FILING_PIOTECH_2025",
    ],
    reviewNotes:
      "All four filings carry source_checked workforce categories in firm-workforce-snapshots.ts. Card claims relative usefulness vs education statistics, which is supported by the disclosed categories.",
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
    href: "/monitor?city=Shanghai",
    linkLabel: "Open Shanghai in monitor",
    verificationStatus: "source_checked",
    sourceAnchor: ["data/generated/city_signals.json", "data/raw/observations.csv"],
    reviewNotes:
      "Claim is derived from aggregated non-taxonomy observation rows by city; the CitySignalMap on the homepage uses the same aggregation. Card asserts ordering, which matches the generated city signals.",
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
    verificationStatus: "source_checked",
    sourceAnchor: [
      "CN_FILING_AMEC_2025",
      "CN_FILING_NAURA_2025",
      "CN_FILING_PIOTECH_2025",
      "CN_FILING_JINGCE_2025",
    ],
    reviewNotes:
      "The thesis is supported empirically by the notDisclosed fields in firm-profiles.ts: AMEC, NAURA, Piotech, and Jingce all carry not_disclosed entries for service or after-sales headcount. ACM Research Shanghai is the partial exception (672 after-sales personnel disclosed), which is itself the proof that the field can be reported and usually isn't.",
  },
];
