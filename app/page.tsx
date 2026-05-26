import Link from "next/link";
import { articleBrief } from "@/data/editorial/article-brief";
import { AnchorFirmsExhibit } from "@/components/atlas/anchor-firms-exhibit";
import { CitySignalMap } from "@/components/atlas/city-signal-map";
import { ComparatorFrame } from "@/components/atlas/comparator-frame";
import { DisciplineSegmentMatrix } from "@/components/atlas/discipline-segment-matrix";
import { FirmWorkforceChart } from "@/components/atlas/firm-workforce-chart";
import { LabToFabChain } from "@/components/atlas/lab-to-fab-chain";
import { TheArgument } from "@/components/atlas/the-argument";
import { ToolmakerFootprintGrid } from "@/components/atlas/toolmaker-footprint-grid";

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
      <section className="border-b border-rule-hair bg-paper">
        <div className="mx-auto grid w-full max-w-[1240px] gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1fr_19rem] lg:px-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              China Semiconductor Tooling Talent Atlas
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3.25rem]">
              Can China staff its chip-tooling push?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
              Chinese toolmakers are adding products and R&amp;D staff. The
              harder test is whether they can build the field engineers,
              service teams, calibration routines, and customer-support
              systems that make equipment work in fabs.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Link
                href="/essay"
                className="inline-flex h-11 items-center justify-center bg-ink px-5 text-sm font-semibold text-paper transition-colors hover:bg-ink-soft"
              >
                Read the brief -&gt;
              </Link>
              <Link
                href="/firms"
                className="text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                firm dossiers -&gt;
              </Link>
              <Link
                href="/explorer"
                className="text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                inspect source rows -&gt;
              </Link>
            </div>

            <p className="mt-6 text-xs leading-6 text-muted">
              Beta public-source monitor · counts reflect source coverage,
              not workforce size ·{" "}
              <Link
                href="/methodology"
                className="underline underline-offset-2 hover:text-ink"
              >
                methodology
              </Link>
            </p>
          </div>

          <AnchorFirmsExhibit />
        </div>
      </section>

      <TheArgument />

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <SectionEyebrow number="03" label="Exhibits" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          What the workforce test requires
        </h2>

        <div className="mt-8 flex flex-col gap-10">
          <DisciplineSegmentMatrix />
          <FirmWorkforceChart />
          <ComparatorFrame />
          <ToolmakerFootprintGrid />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12">
        <SectionEyebrow number="04" label="Geography" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Where public records cluster.
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
          Shanghai and Beijing lead the current public record set because
          listed firms, industrial parks, universities, and policy documents
          are easier to observe there.
        </p>
        <div className="mt-8">
          <CitySignalMap />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12">
        <SectionEyebrow number="05" label="Visibility" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Where public records go quiet.
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
