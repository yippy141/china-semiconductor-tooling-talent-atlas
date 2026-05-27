import Link from "next/link";
import { AnchorFirmsExhibit } from "@/components/atlas/anchor-firms-exhibit";
import { CitySignalMap } from "@/components/atlas/city-signal-map";
import { ComparatorFrame } from "@/components/atlas/comparator-frame";
import { DisciplineSegmentMatrix } from "@/components/atlas/discipline-segment-matrix";
import { FirmWorkforceChart } from "@/components/atlas/firm-workforce-chart";
import { GlobalTalentContext } from "@/components/atlas/global-talent-context";
import { LabToFabChain } from "@/components/atlas/lab-to-fab-chain";
import { ReaderPaths } from "@/components/atlas/reader-paths";
import { TheArgument } from "@/components/atlas/the-argument";
import { ToolmakerFootprintGrid } from "@/components/atlas/toolmaker-footprint-grid";

const sourceTrailLinks = [
  {
    label: "Read the brief",
    href: "/essay",
    description: "The argument, with sources cited.",
  },
  {
    label: "Open firm dossiers",
    href: "/firms",
    description: "AMEC, ACM, NAURA, Piotech, and the watchlist.",
  },
  {
    label: "Compare tool segments",
    href: "/segments/deposition",
    description: "Etch, deposition, metrology, and the lithography sidebar.",
  },
  {
    label: "Inspect source records",
    href: "/explorer",
    description: "Filter source records by city, firm, segment, or source.",
  },
  {
    label: "Read the methodology",
    href: "/methodology",
    description: "Definitions, source policy, and verification status.",
  },
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
      <section className="border-b border-rule-hair bg-paper">
        <div className="mx-auto w-full max-w-[1240px] px-6 py-12 sm:px-10 sm:py-16 lg:px-14">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
              China Semiconductor Tooling Talent Atlas
            </p>
            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-[3.25rem]">
              Can China staff its chip-tooling push?
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-ink-soft">
              Chinese toolmakers are adding products and R&amp;D staff. The
              harder support-capacity question is whether they can build the
              field engineers, service teams, calibration routines, and
              customer-support systems that make equipment work in fabs.
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
                inspect source records -&gt;
              </Link>
            </div>

            <p className="mt-4 max-w-2xl text-xs leading-6 text-muted">
              A longer essay version will publish separately. This site is the
              interactive source companion.
            </p>

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

          <div className="mt-12">
            <AnchorFirmsExhibit />
          </div>
        </div>
      </section>

      <ReaderPaths />

      <TheArgument />

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
        <SectionEyebrow number="03" label="Exhibits" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          What the workforce question requires
        </h2>

        <div className="mt-8 flex flex-col gap-10">
          <DisciplineSegmentMatrix />
          <Link
            href="/supply"
            className="group border border-stone-300 bg-white p-6 transition-colors hover:border-stone-900 sm:p-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Talent supply
            </p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
              Where might the talent come from?
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              The supply page maps official counts, feeder disciplines, visible
              institutions, and city supply-demand joins. It does not claim to
              measure tool-specific graduate output.
            </p>
            <span className="mt-5 inline-flex text-sm font-semibold text-stone-950 underline-offset-4 group-hover:underline">
              Open supply page -&gt;
            </span>
          </Link>
          <FirmWorkforceChart />
          <GlobalTalentContext />
          <ComparatorFrame />
          <ToolmakerFootprintGrid />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12">
        <SectionEyebrow number="04" label="Geography" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Source coverage by city
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-7 text-ink-soft">
          This map shows where the beta dataset has public records. Large nodes
          usually mean filings, park documents, shortage notices, or official
          sources are easier to observe there. They do not count engineers,
          workforce size, or city capability.
        </p>
        <div className="mt-8">
          <CitySignalMap />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10 sm:pb-16 lg:px-12">
        <SectionEyebrow number="05" label="Visibility" />
        <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Where filings stop short
        </h2>
        <div className="mt-8">
          <LabToFabChain />
        </div>
      </section>

      <section className="bg-reverse text-paper">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
          <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-2">
            <span className="font-mono text-paper">06</span>
            <span>Source trail</span>
          </p>
          <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Open the source trail.
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-paper/80">
            Start with the brief, then move into firm dossiers, segment pages,
            source records, and methodology as needed.
          </p>

          <nav
            aria-label="Reader paths"
            className="mt-8 grid grid-cols-1 gap-px border border-reverse-soft bg-reverse-soft sm:grid-cols-2 lg:grid-cols-5"
          >
            {sourceTrailLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-40 flex-col justify-between bg-reverse p-5 transition-colors hover:bg-reverse-soft"
              >
                <span className="text-lg font-semibold tracking-tight text-paper">
                  {link.label}
                </span>
                <span className="mt-4 text-xs leading-6 text-muted-2 group-hover:text-paper">
                  {link.description}
                </span>
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}
