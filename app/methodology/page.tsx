import Link from "next/link";
import {
  evidenceTypeGroups,
  evidenceGroupLabels,
  observationsByEvidenceType,
  type EvidenceGroup,
} from "@/lib/atlas-analytics";
import { formatEvidenceType } from "@/lib/atlas-labels";

type EvidenceTypeRow = {
  raw: string;
  label: string;
  group: EvidenceGroup;
  groupLabel: string;
  definition: string;
};

const evidenceTypeDefinitions: Record<string, string> = {
  official_policy: "Policy document or government announcement.",
  institutional_capacity:
    "Degree authorization, school, lab, research centre, or key discipline.",
  industry_presence:
    "Firm, industrial park, supplier cluster, or manufacturing ecosystem.",
  shortage_signal:
    "Shortage list, talent catalogue, recruitment policy, or labour-market signal.",
  job_posting_proxy: "Role demand inferred from job postings.",
  research_output_proxy: "Papers, patents, grants, standards, or labs.",
  expert_secondary:
    "Think-tank, consulting, industry report, or academic synthesis.",
  manual_inference:
    "Analyst-coded inference linking taxonomy to evidence. Scaffolding, not real-world activity.",
};

const evidenceCountByRaw = new Map<string, number>(
  observationsByEvidenceType.map((row) => [row.id, row.count]),
);

const evidenceTypeRows: EvidenceTypeRow[] = Object.keys(evidenceTypeGroups)
  .map((raw) => ({
    raw,
    label: formatEvidenceType(raw),
    group: evidenceTypeGroups[raw],
    groupLabel: evidenceGroupLabels[evidenceTypeGroups[raw]],
    definition: evidenceTypeDefinitions[raw] ?? "—",
  }))
  .sort((a, b) => {
    const groupOrder: EvidenceGroup[] = [
      "direct_public_record",
      "analytical_proxy",
      "taxonomy_scaffold",
    ];
    const ai = groupOrder.indexOf(a.group);
    const bi = groupOrder.indexOf(b.group);
    if (ai !== bi) return ai - bi;
    return a.label.localeCompare(b.label);
  });

const confidenceRows = [
  {
    raw: "high",
    label: "High",
    definition: "The source directly supports the observation.",
  },
  {
    raw: "medium",
    label: "Medium",
    definition:
      "The source supports the observation through a reasonable proxy.",
  },
  {
    raw: "low",
    label: "Low",
    definition:
      "The source is relevant but indirect, promotional, outdated, or incomplete.",
  },
];

const tableOfContents = [
  { id: "what-it-measures", label: "What the atlas measures" },
  { id: "what-it-does-not", label: "What it does not measure" },
  { id: "evidence-types", label: "Evidence types" },
  { id: "confidence-levels", label: "Confidence levels" },
  {
    id: "evidence-vs-capability",
    label: "Why evidence strength is not capability",
  },
  { id: "update-cadence", label: "Update cadence" },
  { id: "no-individual-data", label: "No individual-level mapping" },
  {
    id: "how-to-cite",
    label: "How to cite or use the atlas responsibly",
  },
];

const numberFormatter = new Intl.NumberFormat("en-US");

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10">
        <header className="border-b-2 border-stone-900 pb-8">
          <nav
            aria-label="Atlas sections"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500"
          >
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <Link href="/explorer" className="hover:text-stone-950">
              Explorer
            </Link>
            <Link href="/sources" className="hover:text-stone-950">
              Source ledger
            </Link>
          </nav>
          <div className="mt-6 flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <span className="font-mono text-stone-800">Source contract</span>
            <span aria-hidden className="text-stone-400">·</span>
            <span className="text-stone-500">Methodology · Beta dataset v1</span>
          </div>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            How to read this atlas.
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
            The China Semiconductor Tooling Talent Atlas is an editorial
            evidence product. This page describes what the atlas measures, what
            it deliberately does not measure, and the contract this product
            keeps with the public sources behind every row.
          </p>
        </header>

        <nav
          aria-label="On this page"
          className="border border-stone-300 bg-white p-5"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            On this page
          </p>
          <ol className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 text-sm leading-6 text-stone-800 sm:grid-cols-2">
            {tableOfContents.map((entry, index) => (
              <li key={entry.id}>
                <a
                  href={`#${entry.id}`}
                  className="flex items-baseline gap-3 hover:text-stone-950 hover:underline"
                >
                  <span className="font-mono text-xs text-stone-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{entry.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Section
          index="01"
          id="what-it-measures"
          title="What the atlas measures"
        >
          <p>
            The atlas catalogues <em>public evidence signals</em> for
            semiconductor-equipment talent in mainland PRC. Each row is anchored
            to a public source and tagged by tooling segment, evidence type, and
            confidence. The catalogue is built to answer a specific kind of
            question: where, and through what kind of record, does the talent
            layer behind a tooling segment become visible at all?
          </p>
          <p>
            Concretely, the dataset combines four kinds of artefact:
          </p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              Filings and corporate disclosures (annual reports, prospectuses).
            </li>
            <li className="list-disc">
              Government and institutional records (policy notices, shortage
              catalogues, university and key-lab pages, industrial-park
              directories).
            </li>
            <li className="list-disc">
              Analytical proxies derived from public sources (job-posting
              language, research-output indicators, expert secondary writing).
            </li>
            <li className="list-disc">
              Taxonomy scaffolding that organises the four tool families and
              their role and capability vocabulary.
            </li>
          </ul>
        </Section>

        <Section
          index="02"
          id="what-it-does-not"
          title="What it does not measure"
        >
          <p>
            The atlas is not a labour-market census, a capability index, or a
            ranking. It avoids several specific kinds of claim:
          </p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              Headcount estimates of segment-specific workforces.
            </li>
            <li className="list-disc">
              Yield-learning depth, process-window judgement, or chamber and
              calibration know-how.
            </li>
            <li className="list-disc">
              Comparative readiness, market share, or competitive position.
            </li>
            <li className="list-disc">
              Forecasts of future capability, hiring, or shortage.
            </li>
            <li className="list-disc">
              Any individual-level personal data. The atlas operates at firm,
              institution, city, segment, capability, and discipline levels
              only.
            </li>
          </ul>
          <p>
            If a row appears to support such a claim, it is being read too far.
            Use the explorer&rsquo;s audit panel to inspect the underlying
            source.
          </p>
        </Section>

        <Section index="03" id="evidence-types" title="Evidence types">
          <p>
            Every observation carries a single <code className="font-mono text-xs">evidence_type</code> value. These values
            roll up into three analytical groups: direct public record (the
            strongest), analytical proxy (supporting context), and taxonomy
            scaffold (navigational only). Counts below reflect the current beta
            dataset.
          </p>
          <div className="overflow-hidden border border-stone-300 bg-white">
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Label</th>
                  <th className="px-4 py-3 font-semibold">Raw value</th>
                  <th className="px-4 py-3 font-semibold">Group</th>
                  <th className="px-4 py-3 font-semibold">Definition</th>
                  <th className="w-20 px-4 py-3 text-right font-semibold">
                    Rows
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {evidenceTypeRows.map((row) => (
                  <tr key={row.raw}>
                    <td className="px-4 py-3 align-top font-medium text-stone-950">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 align-top font-mono text-xs text-stone-600">
                      {row.raw}
                    </td>
                    <td className="px-4 py-3 align-top text-stone-700">
                      {row.groupLabel}
                    </td>
                    <td className="px-4 py-3 align-top leading-6 text-stone-700">
                      {row.definition}
                    </td>
                    <td className="px-4 py-3 text-right align-top font-mono text-xs text-stone-600">
                      {numberFormatter.format(evidenceCountByRaw.get(row.raw) ?? 0)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-stone-600">
            An observation tagged with an evidence type that is not in this
            table will default to the analytical-proxy group when read by the
            explorer.
          </p>
        </Section>

        <Section index="04" id="confidence-levels" title="Confidence levels">
          <p>
            Confidence describes the link between source and observation, not
            the importance of the observation. A row can be highly relevant
            editorially while only carrying medium confidence.
          </p>
          <div className="overflow-hidden border border-stone-300 bg-white">
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Label</th>
                  <th className="px-4 py-3 font-semibold">Raw value</th>
                  <th className="px-4 py-3 font-semibold">Definition</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {confidenceRows.map((row) => (
                  <tr key={row.raw}>
                    <td className="px-4 py-3 align-top font-medium text-stone-950">
                      {row.label}
                    </td>
                    <td className="px-4 py-3 align-top font-mono text-xs text-stone-600">
                      {row.raw}
                    </td>
                    <td className="px-4 py-3 align-top leading-6 text-stone-700">
                      {row.definition}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          index="05"
          id="evidence-vs-capability"
          title="Why evidence strength is not capability"
        >
          <p>
            Public records expose what firms, institutions, and government
            bodies choose to disclose. They do not expose chamber recovery,
            customer-ramp judgement, calibration habits, or the quiet learning
            that makes a tool work in a fab. A segment can look strong because
            its firms file thoroughly, or weak because its firms publish less —
            neither tells you about real engineering depth.
          </p>
          <p>
            For that reason the atlas avoids composite scores. Each tier of
            evidence is reported on its own terms. When the homepage talks
            about &ldquo;visibility&rdquo; or &ldquo;public evidence signal,&rdquo; it is referring to
            disclosure coverage, not capability.
          </p>
        </Section>

        <Section index="06" id="update-cadence" title="Update cadence">
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              The atlas is on a manual review cadence. There is no automated
              scraping, and no automated polling of external services.
            </li>
            <li className="list-disc">
              Every source row records a <code className="font-mono text-xs">publication_date</code> and an{" "}
              <code className="font-mono text-xs">access_date</code>; for the
              recency of any specific claim, refer to the source row via the
              explorer&rsquo;s audit panel.
            </li>
            <li className="list-disc">
              Observations remain in the beta dataset until they are manually
              verified against the primary source. The explorer header marks
              this status; the underlying CSV is treated as staging.
            </li>
            <li className="list-disc">
              New rows are added in batches, not continuously. Expect the
              published snapshot to lag the original filings by weeks rather
              than days.
            </li>
          </ul>
        </Section>

        <Section
          index="07"
          id="no-individual-data"
          title="No individual-level mapping"
        >
          <p>
            The atlas does not, and will not, hold individual-level personal
            data. Observations are anchored to one of the following entity
            types: firm, institution, industrial park, city, segment,
            capability, discipline, or role family. Named individuals only
            appear when they are unavoidable bibliographic attribution in a
            source title — never as a subject of analysis.
          </p>
          <p>
            This rule is editorial, not just legal. The atlas exists to make
            the structure of public evidence legible. Profiling specific
            engineers would change the product into something it is not meant
            to be.
          </p>
        </Section>

        <Section
          index="08"
          id="how-to-cite"
          title="How to cite or use the atlas responsibly"
        >
          <p>
            When citing or quoting from the atlas, follow these conventions:
          </p>
          <ul className="space-y-2 pl-5">
            <li className="list-disc">
              Cite the atlas as the editorial source and the underlying public
              record as the primary source. Do not present atlas counts as
              workforce totals.
            </li>
            <li className="list-disc">
              For any specific claim, retrieve the source via the explorer&rsquo;s
              audit panel and quote the source&rsquo;s own title, publisher,
              publication date, and access date.
            </li>
            <li className="list-disc">
              Preserve evidence-tier language: a row from the analytical-proxy
              group should not be paraphrased as a direct measurement.
            </li>
            <li className="list-disc">
              When publishing derivative analysis, flag the same caveats this
              page lists — particularly the absence of tacit production
              know-how in the visible layer.
            </li>
          </ul>
          <div className="border border-stone-300 bg-white p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Suggested citation pattern
            </p>
            <p className="mt-2 font-mono text-xs leading-6 text-stone-700">
              China Semiconductor Tooling Talent Atlas (beta dataset), entry
              for &lt;city / firm / segment&gt;, evidence type &lt;raw
              value&gt;, source: &lt;title, publisher, publication date,
              access date&gt;.
            </p>
          </div>
        </Section>

        <footer className="flex flex-col gap-3 border-t border-stone-300 pt-8 text-sm leading-7 text-stone-700 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Continue reading:{" "}
            <Link
              href="/"
              className="font-medium text-stone-950 underline-offset-2 hover:underline"
            >
              Home
            </Link>{" "}
            ·{" "}
            <Link
              href="/explorer"
              className="font-medium text-stone-950 underline-offset-2 hover:underline"
            >
              Evidence Explorer
            </Link>
          </p>
          <p className="text-xs text-stone-500">
            Mainland PRC only unless explicitly labelled otherwise.
          </p>
        </footer>
      </div>
    </main>
  );
}

function Section({
  index,
  id,
  title,
  children,
}: {
  index: string;
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-8 flex flex-col gap-4 border-t border-stone-200 pt-8"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-xs text-stone-500">{index}</span>
        <h2
          id={`${id}-heading`}
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
        >
          {title}
        </h2>
      </div>
      <div className="flex flex-col gap-4 text-base leading-7 text-stone-700">
        {children}
      </div>
    </section>
  );
}
