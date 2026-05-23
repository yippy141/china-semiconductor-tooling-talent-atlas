import type { SourceStatus } from "@/data/editorial/firm-workforce-snapshots";

export type ArticleLink = {
  label: string;
  href: string;
  description?: string;
};

export type ArticleFinding = {
  eyebrow: string;
  title: string;
  body: string;
  evidenceRead: string;
  source_ids: string[];
  verificationStatus: SourceStatus;
  sourceAnchor: string[];
  reviewNotes: string;
};

export type HeroClaim = {
  rendered: string;
  beta: string;
  verificationStatus: SourceStatus;
  sourceAnchor: string[];
  reviewNotes: string;
};

export type ExhibitSlot = {
  eyebrow: string;
  title: string;
  body: string;
  status: string;
};

export type LabToFabStep = {
  label: string;
  title: string;
  body: string;
};

export const articleBrief = {
  hero: {
    title: "Can China Staff Its Chip-Tooling Push?",
    deck:
      "Public filings and company records show Chinese toolmakers adding R&D scale and product breadth. The harder test is whether they are building field engineers, service teams, calibration routines, and customer-support capacity.",
    intro:
      "China's semiconductor-equipment push is usually tracked through product announcements, export controls, and market share. Those indicators matter, but they do not show whether a firm can install a tool, tune it at a customer site, keep chambers matched, recover after maintenance, and support repeat deployment.",
  },
  heroClaim: {
    rendered:
      "Chinese toolmakers are adding products and R&D staff. The harder test is whether they can build field engineers, service teams, calibration routines, and customer-support systems that make equipment work in fabs.",
    beta:
      "Beta public-source monitor. Counts show source coverage, not workforce size.",
    verificationStatus: "source_checked",
    sourceAnchor: [
      "CN_FILING_AMEC_2025",
      "CN_FILING_NAURA_2025",
      "CN_FILING_ACM_SH_2025",
      "CN_FILING_PIOTECH_2025",
    ],
    reviewNotes:
      "First clause (products + R&D scale) is supported by source-checked product entries and R&D workforce figures for AMEC, NAURA, ACM, and Piotech. Second clause (field engineers / service / calibration / customer-support visibility) is supported by the notDisclosed fields in firm-profiles.ts: only ACM discloses an after-sales category. Hero claim does not assert numbers; the beta note explicitly tells the reader that the homepage counts show source coverage, not workforce size.",
  } satisfies HeroClaim,
  primaryLinks: [
    { label: "Open firm index", href: "/firms" },
    { label: "Read methodology", href: "/methodology" },
    { label: "Explore rows", href: "/explorer" },
  ] satisfies ArticleLink[],
  findings: [
    {
      eyebrow: "Finding 01",
      title: "Broad STEM counts are too blunt for chip tooling.",
      body:
        "A STEM total will not tell you whether a firm has plasma engineers, ALD chemists, optical metrology staff, control engineers, and field service teams in the same organization.",
      evidenceRead:
        "The segment briefs separate etch and clean, deposition, metrology and inspection, and lithography-adjacent work because each tool family pulls on a different mix of disciplines and role families.",
      source_ids: ["CN_EDU_MOE_GRAD_DIR_2022"],
      verificationStatus: "source_checked",
      sourceAnchor: ["CN_EDU_MOE_GRAD_DIR_2022"],
      reviewNotes:
        "Backed by the MOE 2022 catalogue and the discipline-segment matrix on the homepage. Card claims a structural mismatch, not a number.",
    },
    {
      eyebrow: "Finding 02",
      title: "Listed-company filings give the clearest public workforce view.",
      body:
        "AMEC, ACM Research Shanghai, and NAURA publish firm-level workforce figures that make R&D scale and technical staffing visible in a way most product pages do not.",
      evidenceRead:
        "The useful comparison is filing language and workforce structure, not a ranking of firms or a segment-specific headcount estimate.",
      source_ids: [
        "CN_FILING_AMEC_2025",
        "CN_FILING_ACM_SH_2025",
        "CN_FILING_NAURA_2025",
      ],
      verificationStatus: "source_checked",
      sourceAnchor: [
        "CN_FILING_AMEC_2025",
        "CN_FILING_ACM_SH_2025",
        "CN_FILING_NAURA_2025",
      ],
      reviewNotes:
        "All three filings have source_checked workforce categories in firm-workforce-snapshots.ts (AMEC 1,548 R&D / NAURA 21,101 total / ACM 2,485 total + 672 after-sales). Piotech is intentionally omitted from the card text because Piotech's disclosure comes from a financing report rather than a standard annual filing.",
    },
    {
      eyebrow: "Finding 03",
      title: "Customer-site support is the hardest layer to see.",
      body:
        "The public record shows product families and R&D categories more readily than installation teams, chamber matching routines, calibration habits, recipe transfer, and customer-specific process support.",
      evidenceRead:
        "The records to watch are field application hiring, service training, repeat-order language, and customer validation by tool family.",
      source_ids: [
        "CN_FIRM_AMEC",
        "CN_FIRM_ACM_SH",
        "CN_FIRM_NAURA",
      ],
      verificationStatus: "source_checked",
      sourceAnchor: [
        "CN_FILING_AMEC_2025",
        "CN_FILING_NAURA_2025",
        "CN_FILING_PIOTECH_2025",
      ],
      reviewNotes:
        "Supported empirically by the notDisclosed entries in firm-profiles.ts: AMEC and Piotech both carry not_disclosed for after-sales / field-service headcount; NAURA carries not_disclosed for headcount-by-tool-family. ACM Research Shanghai is the exception that proves the rule with 672 after-sales personnel disclosed.",
    },
  ] satisfies ArticleFinding[],
  exhibitSlots: [
    {
      eyebrow: "Exhibit slot",
      title: "Discipline-to-segment matrix",
      body:
        "A matrix should show how the 14 MOE-coded disciplines connect to etch and clean, deposition, metrology and inspection, and lithography-adjacent work.",
      status: "Placeholder until the dedicated matrix component lands.",
    },
    {
      eyebrow: "Exhibit slot",
      title: "Listed-firm workforce chart",
      body:
        "A chart should compare only workforce categories disclosed by AMEC, ACM Research Shanghai, and NAURA, with notes where a category is absent.",
      status: "Placeholder until the chart component lands.",
    },
    {
      eyebrow: "Exhibit slot",
      title: "Toolmaker footprint grid",
      body:
        "A grid should place AMEC, NAURA, ACM Research Shanghai, Piotech, Jingce, SMEE, and BEIM against the tool segments they publicly touch.",
      status: "Placeholder until the footprint component lands.",
    },
  ] satisfies ExhibitSlot[],
  labToFabSteps: [
    {
      label: "01",
      title: "Build the tool",
      body:
        "Product teams turn process knowledge, chambers, optics, controls, software, and subsystems into a tool family that can leave the lab.",
    },
    {
      label: "02",
      title: "Install at the customer site",
      body:
        "Field engineers and service teams bring the tool into a fab, connect it to local utilities and workflows, and start the customer-specific setup.",
    },
    {
      label: "03",
      title: "Tune the process window",
      body:
        "Application engineers adjust recipes, chamber behavior, measurements, and defect feedback until the tool fits the customer's production flow.",
    },
    {
      label: "04",
      title: "Keep it stable",
      body:
        "Support teams handle calibration, maintenance recovery, chamber matching, spare parts, and training so repeat deployment does not depend on one-off hero work.",
    },
  ] satisfies LabToFabStep[],
  nextClicks: [
    {
      label: "Firms",
      href: "/firms",
      description: "Open the firm index and dossiers as they are added.",
    },
    {
      label: "Segments",
      href: "/segments/deposition",
      description: "Read a segment brief for one tool family.",
    },
    {
      label: "Monitor",
      href: "/monitor",
      description: "Return to the dashboard-style reference monitor.",
    },
    {
      label: "Explorer",
      href: "/explorer",
      description: "Filter evidence rows by segment, city, and source type.",
    },
    {
      label: "Sources",
      href: "/sources",
      description: "Inspect the public source ledger behind the monitor.",
    },
  ] satisfies ArticleLink[],
  footnote:
    "Public records only. Counts refer to records in this dataset, not workforce totals or technical performance. Observation rows remain staging material until manually verified against the underlying source.",
};
