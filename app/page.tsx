import Link from "next/link";
import {
  nonTaxonomyEvidenceRows,
  taxonomyScaffoldRows,
  totalSources,
} from "@/lib/atlas-analytics";
import { formatSegment } from "@/lib/atlas-labels";
import { insights } from "@/data/editorial/insights";
import { segmentProfiles } from "@/data/editorial/segment-profiles";
import { audienceImplications } from "@/data/editorial/audience-implications";

const numberFormatter = new Intl.NumberFormat("en-US");

const keyNumbers = [
  {
    label: "Sources",
    value: totalSources,
    note: "Distinct public records currently catalogued.",
  },
  {
    label: "Non-taxonomy evidence rows",
    value: nonTaxonomyEvidenceRows.length,
    note: "Observations tied to filings, directories, policy, or proxies.",
  },
  {
    label: "Taxonomy scaffold rows",
    value: taxonomyScaffoldRows.length,
    note: "Structural placeholders that organise the atlas, not measurements.",
  },
  {
    label: "Core tooling segments",
    value: segmentProfiles.length,
    note: "Etch and clean, deposition, metrology and inspection, lithography sidebar.",
  },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-stone-100 text-stone-950">
      <section className="relative overflow-hidden bg-stone-950 text-stone-100">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col px-6 pb-20 pt-16 sm:px-10 sm:pt-20 lg:px-12">
          <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.22em] text-stone-400">
            <span>China Semiconductor Tooling Talent Atlas</span>
            <span className="hidden sm:inline">Visual brief · v1</span>
          </div>

          <div className="mt-16 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              Editorial evidence brief
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[68px]">
              The Talent Layer of
              <br />
              China&apos;s Chip Tooling Push
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              China&apos;s semiconductor equipment race is also a race for
              role-specific know-how.
            </p>
          </div>

          <nav className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/explorer"
              className="inline-flex h-12 items-center bg-stone-100 px-6 text-sm font-semibold tracking-wide text-stone-950 transition-colors hover:bg-white"
            >
              Explore evidence
            </Link>
            <Link
              href="/methodology"
              className="inline-flex h-12 items-center border border-stone-500 px-6 text-sm font-semibold tracking-wide text-stone-100 transition-colors hover:border-stone-200 hover:bg-stone-900"
            >
              Read methodology
            </Link>
            <span className="ml-1 text-xs uppercase tracking-[0.18em] text-stone-500">
              Beta · evidence under review
            </span>
          </nav>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
              The brief in numbers
            </h2>
            <p className="max-w-md text-sm text-stone-600">
              What the atlas catalogues today. Counts describe public-evidence
              coverage, not workforce size.
            </p>
          </div>
          <dl className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-stone-200 bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
            {keyNumbers.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col gap-3 bg-stone-50 p-6"
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
                  {stat.label}
                </dt>
                <dd className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                  {numberFormatter.format(stat.value)}
                </dd>
                <p className="text-sm leading-6 text-stone-600">{stat.note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              Four arguments
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What the visible layer does, and does not, show.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              Each card states a finding, the evidence pattern behind it, and
              why it matters when reading the rest of the atlas.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {insights.map((insight, index) => (
              <li
                key={insight.id}
                className="flex flex-col border border-stone-300 bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-baseline justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Argument {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-stone-400">
                    {insight.source_ids.length} sources cited
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-stone-950">
                  {insight.title}
                </h3>
                <dl className="mt-6 flex flex-1 flex-col gap-5 text-sm leading-7 text-stone-700">
                  <div>
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      Evidence pattern
                    </dt>
                    <dd className="mt-2">{insight.summary}</dd>
                  </div>
                  <div className="border-t border-dashed border-stone-200 pt-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      Why it matters
                    </dt>
                    <dd className="mt-2 text-stone-800">
                      {insight.implication}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
              Who this is for
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              How different readers should use the atlas.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {audienceImplications.map((entry) => (
              <article
                key={entry.audience}
                className="flex h-full flex-col border-t-2 border-stone-950 bg-white p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                  {entry.audience}
                </p>
                <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-stone-950">
                  {entry.headline}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">
                  {entry.takeaway}
                </p>
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                    Use the explorer for
                  </p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-stone-700">
                    {entry.useTheExplorerFor.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-2 inline-block h-px w-3 shrink-0 bg-stone-400"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 border-t border-stone-200 pt-4 text-xs leading-6 text-stone-600">
                  <span className="font-semibold uppercase tracking-[0.18em] text-stone-500">
                    Caution ·{" "}
                  </span>
                  {entry.caution}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-stone-950 text-stone-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-400">
                Continue reading
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                Pick how you want to dig in.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-stone-400">
              Segments covered:{" "}
              {segmentProfiles.map((s) => formatSegment(s.id)).join(", ")}.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-stone-800 bg-stone-800 md:grid-cols-3">
            <Link
              href="/explorer"
              className="group flex h-full flex-col justify-between gap-6 bg-stone-950 p-7 transition-colors hover:bg-stone-900"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/80">
                  Interactive
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-50">
                  Explore evidence
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">
                  Filter the observation set by segment, evidence type, and
                  city. Each row links back to its source.
                </p>
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-200 group-hover:text-white">
                Open explorer →
              </span>
            </Link>

            <Link
              href="/methodology"
              className="group flex h-full flex-col justify-between gap-6 bg-stone-950 p-7 transition-colors hover:bg-stone-900"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/80">
                  Reference
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-50">
                  Methodology
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">
                  How observations are collected, classified, and what the
                  evidence categories actually mean.
                </p>
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-200 group-hover:text-white">
                Read methodology →
              </span>
            </Link>

            <div
              aria-disabled
              className="flex h-full flex-col justify-between gap-6 bg-stone-950 p-7 opacity-70"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Coming soon
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-200">
                  Source ledger
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">
                  A full register of public records behind the atlas, with
                  retrieval dates and notes. Not yet published.
                </p>
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-500">
                In preparation
              </span>
            </div>
          </div>

          <p className="mt-12 max-w-3xl text-xs leading-6 text-stone-500">
            This is an editorial evidence product, not a capability index.
            Counts describe public-evidence coverage; observations are staging
            data until manually verified. Mainland PRC only.
          </p>
        </div>
      </section>
    </main>
  );
}
