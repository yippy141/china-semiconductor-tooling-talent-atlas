import Link from "next/link";
import { articleBrief } from "@/data/editorial/article-brief";
import { ArticleStatStrip } from "@/components/atlas/article-stat-strip";
import { AnalystBriefRail } from "@/components/atlas/analyst-brief-rail";
import { CitySignalMap } from "@/components/atlas/city-signal-map";
import { ComparatorFrame } from "@/components/atlas/comparator-frame";
import { DisciplineSegmentMatrix } from "@/components/atlas/discipline-segment-matrix";
import { FirmWorkforceChart } from "@/components/atlas/firm-workforce-chart";
import { LabToFabChain } from "@/components/atlas/lab-to-fab-chain";
import { ToolmakerFootprintGrid } from "@/components/atlas/toolmaker-footprint-grid";

const heroPrimaryLinks = [
  { label: "Read the brief", href: "/essay" },
  { label: "Open firm dossiers", href: "/firms" },
  { label: "Inspect source rows", href: "/explorer" },
];

const findingNextLinks = [
  { label: "Open segment brief", href: "/segments/deposition" },
  { label: "Open firm dossiers", href: "/firms" },
  { label: "View source rows", href: "/explorer?entity_id=ent_acm_sh" },
];

function SectionEyebrow({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
      <span className="font-mono text-stone-900">{number}</span>
      <span>{label}</span>
    </p>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <section className="border-b border-stone-300 bg-stone-50">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-10 sm:px-10 sm:py-14 lg:grid-cols-[1fr_19rem] lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              China Semiconductor Tooling Talent Atlas
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Can China Staff Its Chip-Tooling Push?
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-700">
              Chinese toolmakers are adding products and R&amp;D staff. The
              harder test is whether they can build field engineers, service
              teams, calibration routines, and customer-support systems that
              make equipment work in fabs.
            </p>
            <p className="mt-3 max-w-3xl text-xs leading-6 text-stone-500">
              Beta public-source monitor. Counts show source coverage, not
              workforce size.
            </p>

            <nav
              aria-label="Primary article links"
              className="mt-6 flex flex-wrap gap-3"
            >
              {heroPrimaryLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex h-11 items-center justify-center px-5 text-sm font-semibold transition-colors ${
                    index === 0
                      ? "bg-stone-950 text-stone-50 hover:bg-stone-800"
                      : "border border-stone-300 bg-white text-stone-950 hover:border-stone-950"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <aside className="border-l-2 border-stone-900 pl-6 lg:self-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Core question
            </p>
            <p className="mt-3 text-base font-semibold leading-7 tracking-tight text-stone-950">
              Are Chinese semiconductor-equipment firms building the workforce
              and support organizations needed to make domestic tools work in
              customer fabs?
            </p>
          </aside>
        </div>
      </section>

      <section
        aria-labelledby="home-brief"
        className="mx-auto w-full max-w-6xl px-6 pt-8 sm:px-10 lg:px-12"
      >
        <SectionEyebrow number="01" label="Analyst brief" />
        <h2 id="home-brief" className="sr-only">
          Analyst brief
        </h2>
        <div className="mt-4">
          <AnalystBriefRail />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pt-12 sm:px-10 lg:px-12">
        <ArticleStatStrip />
      </section>

      <section className="mt-12 border-y border-stone-300 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
          <SectionEyebrow number="02" label="Findings" />
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            The public record shows scale before customer-site depth.
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 lg:grid-cols-3">
            {articleBrief.findings.map((finding, index) => (
              <article key={finding.title} className="bg-white p-6 sm:p-7">
                <p className="font-mono text-[11px] font-semibold text-stone-500">
                  0{index + 1}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-stone-950">
                  {finding.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">
                  {finding.body}
                </p>
                <p className="mt-5 border-t border-dashed border-stone-300 pt-4 text-xs leading-6 text-stone-600">
                  {finding.evidenceRead}
                </p>
                <Link
                  href={findingNextLinks[index]?.href ?? "/explorer"}
                  className="mt-5 inline-flex text-sm font-semibold text-stone-900 underline-offset-4 hover:underline"
                >
                  {findingNextLinks[index]?.label ?? "View source rows"} -&gt;
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <SectionEyebrow number="03" label="Exhibits" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          What the public record actually shows.
        </h2>

        <div className="mt-8 flex flex-col gap-10">
          <FirmWorkforceChart />
          <DisciplineSegmentMatrix />
          <ToolmakerFootprintGrid />
          <ComparatorFrame />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12">
        <SectionEyebrow number="04" label="Geography" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Where the records concentrate.
        </h2>
        <div className="mt-8">
          <CitySignalMap />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12">
        <SectionEyebrow number="05" label="Visibility" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Where the public record goes quiet.
        </h2>
        <div className="mt-8">
          <LabToFabChain />
        </div>
      </section>

      <section className="bg-stone-950 text-stone-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
          <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
            <span className="font-mono text-stone-100">06</span>
            <span>Source trail</span>
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Open the source trail.
          </h2>

          <nav
            aria-label="Next clicks"
            className="mt-8 grid grid-cols-1 gap-px border border-stone-800 bg-stone-800 sm:grid-cols-2 lg:grid-cols-5"
          >
            {articleBrief.nextClicks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-40 flex-col justify-between bg-stone-950 p-5 transition-colors hover:bg-stone-900"
              >
                <span className="text-lg font-semibold tracking-tight text-stone-50">
                  {link.label}
                </span>
                <span className="mt-4 text-xs leading-6 text-stone-500 group-hover:text-stone-300">
                  {link.description}
                </span>
              </Link>
            ))}
          </nav>

          <p className="mt-8 max-w-3xl text-[11px] leading-6 text-stone-500">
            {articleBrief.footnote}
          </p>
        </div>
      </section>
    </main>
  );
}
