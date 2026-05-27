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
import { CitySignalMap } from "@/components/atlas/city-signal-map";
import { CapabilityRoleMatrix } from "@/components/atlas/capability-role-matrix";
import { EvidenceLadder } from "@/components/atlas/evidence-ladder";
import { FirmWorkforceSnapshots } from "@/components/atlas/firm-workforce-snapshots";
import { MonitoringQuestions } from "@/components/atlas/monitoring-questions";

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
    note: "Structural placeholders that organise the monitor, not measurements.",
  },
  {
    label: "Core tooling segments",
    value: segmentProfiles.length,
    note: "Etch and clean, deposition, metrology and inspection, lithography sidebar.",
  },
];

export default function MonitorPage() {
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
          <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.22em] text-stone-400">
            <span className="flex items-baseline gap-2">
              <span aria-hidden className="font-mono text-stone-500">CN · TOOL</span>
              <span aria-hidden className="text-stone-700">/</span>
              <span>China Chip Tooling Talent Monitor</span>
            </span>
            <span className="hidden font-mono text-stone-500 sm:inline">
              Edition 01 · Beta dataset
            </span>
          </div>

          <div className="mt-16 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              China &middot; Semiconductor equipment
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-[68px]">
              China Chip Tooling Talent Monitor
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-stone-300 sm:text-xl">
              What public records reveal about the people and organizations
              behind China&apos;s semiconductor-equipment push.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-stone-400">
              The monitor tracks firms, city clusters, role families, and
              source records tied to etch/clean, deposition,
              metrology/inspection, and lithography-adjacent tooling. It is
              built for analysts tracking how Chinese toolmakers move from
              R&amp;D headcount to customer-site capability.
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
            <span className="ml-1 max-w-xl text-xs leading-5 text-stone-500">
              Beta dataset. 43 sources, 172 evidence rows. Counts describe
              public-record coverage.
            </span>
          </nav>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 lg:px-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
              The dataset
            </h2>
            <p className="max-w-md text-sm text-stone-600">
              What the dataset catalogues today. Counts measure record coverage.
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
            <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="font-mono text-stone-800">Findings</span>
              <span aria-hidden className="text-stone-400">·</span>
              <span className="text-stone-500">01–04</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              What the public record shows, and where it thins out.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              Four findings from the current dataset, with the source pattern
              behind each and how it should change a reader&rsquo;s priors.
            </p>
          </div>

          <ol className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {insights.map((insight, index) => (
              <li
                key={insight.id}
                className="flex flex-col border border-stone-300 bg-white p-7 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
              >
                <div className="flex items-baseline justify-between gap-4 border-b border-stone-200 pb-4">
                  <span className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
                    <span className="font-mono text-stone-800">
                      Finding {String(index + 1).padStart(2, "0")}
                    </span>
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
                      Source pattern
                    </dt>
                    <dd className="mt-2">{insight.summary}</dd>
                  </div>
                  <div className="border-t border-dashed border-stone-200 pt-4">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                      Analyst read
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

      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-4 sm:px-10 sm:pb-20 lg:px-12">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="font-mono text-stone-800">Exhibit A</span>
              <span aria-hidden className="text-stone-400">·</span>
              <span className="text-stone-500">Geography of visibility</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Visible evidence concentrates in a handful of cities.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              Public records cluster around Shanghai, Beijing, and a small
              set of coastal hubs. The cluster shows coverage, not capability
              depth.
            </p>
          </div>
          <CitySignalMap />
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto w-full max-w-6xl px-6 pb-14 pt-4 sm:px-10 sm:pb-20 lg:px-12">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="font-mono text-stone-800">Exhibit B</span>
              <span aria-hidden className="text-stone-400">·</span>
              <span className="text-stone-500">What the work looks like</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Tooling talent, by segment.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              Each tool family pulls on a different mix of roles, bottlenecks,
              and public signals. STEM totals don&rsquo;t separate them.
            </p>
          </div>
          <CapabilityRoleMatrix />
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="font-mono text-stone-800">Exhibit C</span>
              <span aria-hidden className="text-stone-400">·</span>
              <span className="text-stone-500">Employer-side evidence</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Employer disclosures anchor the public record.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              Three listed firms publish enough workforce structure to anchor
              the picture. Categories describe firms, not segments.
            </p>
          </div>
          <FirmWorkforceSnapshots />
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
          <div className="max-w-3xl">
            <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="font-mono text-stone-800">Implications</span>
              <span aria-hidden className="text-stone-400">·</span>
              <span className="text-stone-500">Who this is for</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Who this is for, and where the evidence stops.
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

      <section className="border-b border-stone-200 bg-stone-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="font-mono text-stone-800">Exhibit D</span>
              <span aria-hidden className="text-stone-400">·</span>
              <span className="text-stone-500">Evidence ladder</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The 172 rows sit in separate evidence tiers.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              Three tiers sit under the headline count. Mixing them inflates
              what the public record shows.
            </p>
          </div>
          <EvidenceLadder />
        </div>
      </section>

      <section className="border-b border-stone-200 bg-stone-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
          <div className="mb-8 max-w-3xl">
            <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
              <span className="font-mono text-stone-800">Exhibit E</span>
              <span aria-hidden className="text-stone-400">·</span>
              <span className="text-stone-500">Monitoring brief</span>
            </div>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Four signals worth monitoring.
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-700">
              For corporate and policy readers: what to watch, what the
              stronger version of each signal looks like, and where the
              public record runs out.
            </p>
          </div>
          <MonitoringQuestions />
        </div>
      </section>

      <section className="relative overflow-hidden bg-stone-950 text-stone-100">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
                <span className="font-mono text-amber-200/80">Continue reading</span>
                <span aria-hidden className="text-stone-600">·</span>
                <span className="text-stone-400">Pick a thread</span>
              </div>
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
                  evidence categories mean.
                </p>
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-200 group-hover:text-white">
                Read methodology →
              </span>
            </Link>

            <Link
              href="/sources"
              className="group flex h-full flex-col justify-between gap-6 bg-stone-950 p-7 transition-colors hover:bg-stone-900"
            >
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/80">
                  Audit
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight text-stone-50">
                  Source ledger
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">
                  Every public record behind the monitor, with publisher, type,
                  reuse value, and retrieval dates.
                </p>
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-200 group-hover:text-white">
                Open ledger →
              </span>
            </Link>
          </div>

          <p className="mt-12 max-w-3xl text-xs leading-6 text-stone-500">
            Editorial evidence product. Counts describe public-record
            coverage; observation rows remain in the beta dataset until
            manually verified against the underlying source. Mainland PRC
            only.
          </p>
        </div>
      </section>
    </main>
  );
}
