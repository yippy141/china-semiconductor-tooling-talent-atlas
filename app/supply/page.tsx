import Link from "next/link";
import disciplinesData from "@/data/generated/disciplines.json";
import {
  doctoralAuthorizationProxies,
  macroSupplyMetrics,
} from "@/data/editorial/supply-metrics";
import { institutionPipelineRows } from "@/data/editorial/institution-pipeline";
import { citySupplyDemandRows } from "@/data/editorial/city-supply-demand";
import {
  globalTalentContextIntro,
  globalTalentContextRows,
} from "@/data/editorial/global-talent-context";
import { formatSegment } from "@/lib/atlas-labels";

type Discipline = (typeof disciplinesData)[number];

const officialCanCount = [
  "Broad science and engineering entrants and enrolment.",
  "Discipline catalogues and degree categories.",
  "Doctoral-authorization distribution proxies by discipline.",
  "Visible schools, departments, courses, labs, and practice-base records.",
  "City-level policy, shortage, firm, and park records that show demand context.",
];

const officialCannotIsolate = [
  "Exact plasma-etch, ALD, wet-clean, field-service, or metrology graduate output.",
  "University-to-firm placement into AMEC, Piotech, NAURA, ACM Research Shanghai, SMEE, or Kingsemi.",
  "Whether a broad engineering or science count converts into tool-specific production support.",
  "Graduate destination shares by city, tool family, firm, or customer-site role.",
  "Current headcount from doctoral-authorization records.",
];

const toolFamilyDisciplineRows = [
  {
    family: "Etch, clean, and strip",
    disciplines:
      "Physics, Chemistry, Materials Science and Engineering, Chemical Engineering and Technology, Control Science and Engineering.",
    roleFamilies:
      "Plasma, wet chemistry, surface reactions, chamber materials, process engineering, tool control.",
    caveat:
      "This is a feeder-discipline map, not a count of etch or clean-tool graduates.",
  },
  {
    family: "Deposition",
    disciplines:
      "Materials Science and Engineering, Chemistry, Chemical Engineering and Technology, Mechanical Engineering, Control Science and Engineering.",
    roleFamilies:
      "Thin films, precursor chemistry, vacuum and gas delivery, thermal systems, chamber control.",
    caveat:
      "Broad materials and chemical-engineering records cannot be converted into deposition output.",
  },
  {
    family: "Metrology and inspection",
    disciplines:
      "Optical Engineering, Instrument Science and Technology, Physics, Electronic Science and Technology, Computer Science and Technology.",
    roleFamilies:
      "Optics, sensors, calibration, image algorithms, inspection software, measurement systems.",
    caveat:
      "Public records do not separate semiconductor inspection from broader optical, display, and electronic-test demand.",
  },
  {
    family: "Lithography sidebar",
    disciplines:
      "Optical Engineering, Instrument Science and Technology, Mechanical Engineering, Control Science and Engineering, Physics.",
    roleFamilies:
      "Illumination, alignment, precision stages, control loops, optics, metrology-adjacent support.",
    caveat:
      "This page treats lithography as adjacent context, not as proof of domestic lithography capability.",
  },
];

const verificationNeeds = [
  "Ledger source IDs for appendix-only institution and doctoral-authorization rows before promoting them into raw observations.",
  "Institution pages or official programme records for each visible feeder claim.",
  "Role-level hiring or placement records before any firm-absorption claim.",
  "City-level demand records that separate equipment roles from fabs, packaging, display, telecom, and electronic-test demand.",
  "Manual review of observations.csv before any staged rows become source-checked records.",
];

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function sourceText(sourceIds: string[]) {
  return sourceIds.join("; ");
}

function segmentLabels(discipline: Discipline) {
  return discipline.most_relevant_segments
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map(formatSegment);
}

export default function SupplyPage() {
  const highlightedInstitutions = institutionPipelineRows.slice(0, 6);

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10">
        <header className="border-b-2 border-stone-900 pb-8">
          <nav
            aria-label="Atlas sections"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500"
          >
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <Link href="/methodology" className="hover:text-stone-950">
              Methodology
            </Link>
            <Link href="/explorer" className="hover:text-stone-950">
              Explorer
            </Link>
          </nav>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            Talent supply appendix
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Where the workforce might come from
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-stone-700">
            This page maps official counts, feeder disciplines, visible
            institutions, and city supply-demand joins. It treats broad
            science and engineering totals as upstream context only. It does not
            claim exact tool-specific graduate output or university-to-firm
            placement.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 lg:grid-cols-2">
          <div className="bg-white p-6 sm:p-7">
            <SectionLabel index="01" label="Official records" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              What official data can count
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              Public records are strong at counting broad education categories
              and at showing visible institutional presence. Those records are
              useful for the size and shape of the upstream pool.
            </p>
            <ListBlock items={officialCanCount} />
          </div>

          <div className="bg-white p-6 sm:p-7">
            <SectionLabel index="02" label="Official records" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              What official data cannot isolate
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              Tooling-relevant work is too specific to read directly from broad
              science and engineering records. Placement, customer-site support,
              and tool-family absorption need separate source records.
            </p>
            <ListBlock items={officialCannotIsolate} />
          </div>
        </section>

        <section className="border border-stone-300 bg-white">
          <div className="border-b border-stone-200 p-6 sm:p-7">
            <SectionLabel index="03" label="Counts" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Official counts and distribution proxies
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              These figures come from the public-source talent supply appendix.
              The first table is broad official education scale. The second is
              an institutional distribution proxy, not current graduate
              headcount.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-x-auto bg-white">
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-stone-200 bg-stone-50 text-[11px] uppercase tracking-[0.14em] text-stone-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Metric</th>
                    <th className="px-4 py-3 font-semibold">2023 value</th>
                    <th className="px-4 py-3 font-semibold">Caveat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {macroSupplyMetrics.map((metric) => (
                    <tr key={metric.metric} className="align-top">
                      <td className="px-4 py-4">
                        <p className="font-medium text-stone-950">
                          {metric.metric}
                        </p>
                        <p className="mt-1 text-xs text-stone-500">
                          {metric.field} · {metric.level}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 font-mono text-sm tabular-nums text-stone-950">
                        {formatNumber(metric.value)}
                      </td>
                      <td className="max-w-sm px-4 py-4 text-stone-700">
                        {metric.caveat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 sm:p-7">
              <h3 className="text-lg font-semibold tracking-tight">
                Doctoral-authorization proxies
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {doctoralAuthorizationProxies.map((metric) => (
                  <div
                    key={metric.metric}
                    className="flex items-start justify-between gap-4 border-b border-dashed border-stone-200 pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-stone-950">
                        {metric.field}
                      </p>
                      <p className="mt-1 text-[11px] leading-5 text-stone-500">
                        {metric.caveat}
                      </p>
                    </div>
                    <p className="font-mono text-lg font-semibold tabular-nums">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="border-t border-stone-200 px-6 py-4 text-[11px] leading-6 text-stone-500 sm:px-7">
            Source records: public-source talent supply appendix. Broad counts
            are not used as semiconductor-tooling counts.
          </p>
        </section>

        <section className="border border-stone-300 bg-white">
          <div className="border-b border-stone-200 p-6 sm:p-7">
            <SectionLabel index="04" label="Disciplines" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Feeder disciplines by tool family
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              Tooling roles are combinations of physics, chemistry, materials,
              precision mechanics, optics, controls, software, and field
              support. The mapping below shows plausible feeder disciplines
              without converting them into exact output.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-stone-200 md:grid-cols-2">
            {toolFamilyDisciplineRows.map((row) => (
              <article key={row.family} className="bg-white p-6 sm:p-7">
                <h3 className="text-lg font-semibold tracking-tight">
                  {row.family}
                </h3>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  Plausible feeders
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-700">
                  {row.disciplines}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  Role families
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-700">
                  {row.roleFamilies}
                </p>
                <p className="mt-5 border-t border-dashed border-stone-300 pt-4 text-[11px] leading-6 text-stone-500">
                  {row.caveat}
                </p>
              </article>
            ))}
          </div>

          <details className="border-t border-stone-200">
            <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-stone-950 sm:px-7">
              Open the MOE-coded discipline scaffold
            </summary>
            <div className="overflow-x-auto border-t border-stone-200">
              <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
                <thead className="bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">MOE code</th>
                    <th className="px-4 py-3 font-semibold">Discipline</th>
                    <th className="px-4 py-3 font-semibold">Segments</th>
                    <th className="px-4 py-3 font-semibold">Source note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {disciplinesData.map((discipline) => (
                    <tr key={discipline.discipline_id} className="align-top">
                      <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-stone-600">
                        {discipline.moe_code}
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-medium text-stone-950">
                          {discipline.name_en}
                        </p>
                        <p className="mt-1 text-xs text-stone-500">
                          {discipline.name_cn}
                        </p>
                      </td>
                      <td className="px-4 py-4 text-stone-700">
                        <div className="flex flex-wrap gap-1.5">
                          {segmentLabels(discipline).map((segment) => (
                            <span
                              key={segment}
                              className="border border-stone-300 bg-stone-50 px-2 py-1 text-[11px] leading-4 text-stone-700"
                            >
                              {segment}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="max-w-md px-4 py-4 leading-6 text-stone-700">
                        {discipline.relevance_notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </section>

        <section className="border border-stone-300 bg-white">
          <div className="border-b border-stone-200 p-6 sm:p-7">
            <SectionLabel index="05" label="Institutions" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Institutions by role family
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              These are visible feeder or plausible feeder records from the
              appendix. They are not university rankings, and they are not
              placement claims.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-3">
            {highlightedInstitutions.map((row) => (
              <article key={row.institution} className="bg-white p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
                  {row.city}, {row.province}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {row.institution}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {row.visibleProgram}
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
                  Role families
                </p>
                <p className="mt-2 text-sm leading-7 text-stone-700">
                  {row.roleFamilies.join(", ")}
                </p>
                <p className="mt-5 border-t border-dashed border-stone-300 pt-4 text-[11px] leading-6 text-stone-500">
                  {row.caveat}
                </p>
              </article>
            ))}
          </div>

          <details className="border-t border-stone-200">
            <summary className="cursor-pointer px-6 py-4 text-sm font-semibold text-stone-950 sm:px-7">
              Open all curated institution records
            </summary>
            <div className="overflow-x-auto border-t border-stone-200">
              <table className="min-w-[980px] divide-y divide-stone-200 text-left text-sm">
                <thead className="bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Institution</th>
                    <th className="px-4 py-3 font-semibold">Visible program</th>
                    <th className="px-4 py-3 font-semibold">Role families</th>
                    <th className="px-4 py-3 font-semibold">Source records</th>
                    <th className="px-4 py-3 font-semibold">Caveat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {institutionPipelineRows.map((row) => (
                    <tr key={row.institution} className="align-top">
                      <td className="px-4 py-4">
                        <p className="font-medium text-stone-950">
                          {row.institution}
                        </p>
                        <p className="mt-1 text-xs text-stone-500">
                          {row.city}, {row.province} · {row.confidence}
                        </p>
                      </td>
                      <td className="max-w-xs px-4 py-4 leading-6 text-stone-700">
                        {row.visibleProgram}
                      </td>
                      <td className="max-w-xs px-4 py-4 leading-6 text-stone-700">
                        {row.roleFamilies.join(", ")}
                      </td>
                      <td className="max-w-xs px-4 py-4 font-mono text-[11px] leading-5 text-stone-600">
                        {sourceText(row.sourceIds)}
                      </td>
                      <td className="max-w-xs px-4 py-4 leading-6 text-stone-700">
                        {row.caveat}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </section>

        <section className="border border-stone-300 bg-white">
          <div className="border-b border-stone-200 p-6 sm:p-7">
            <SectionLabel index="06" label="Geography" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              City supply-demand joins
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              A city join is useful when visible feeder institutions sit near
              firms, parks, or public shortage signals. It is still a public
              evidence signal, not a labor-flow measurement.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-2">
            {citySupplyDemandRows.map((row) => (
              <article key={row.city} className="bg-white p-6 sm:p-7">
                <h3 className="text-xl font-semibold tracking-tight">
                  {row.city}
                </h3>
                <DefinitionList
                  rows={[
                    ["Visible supply", row.visibleSupply],
                    ["Nearby absorption", row.nearbyAbsorption],
                    ["Demand signal", row.demandSignal],
                    ["Can infer", row.inference],
                    ["Cannot infer", row.cannotInfer],
                  ]}
                />
                <p className="mt-5 border-t border-dashed border-stone-300 pt-4 font-mono text-[11px] leading-5 text-stone-500">
                  Source records: {sourceText(row.sourceIds)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border border-stone-300 bg-white">
          <div className="border-b border-stone-200 p-6 sm:p-7">
            <SectionLabel index="07" label="Global context" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Global context
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              {globalTalentContextIntro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-5">
            {globalTalentContextRows.map((row) => (
              <article key={row.economy} className="bg-white p-5">
                <h3 className="text-lg font-semibold tracking-tight">
                  {row.economy}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {row.publicSignal}
                </p>
                <p className="mt-4 border-t border-dashed border-stone-300 pt-4 text-[11px] leading-6 text-stone-500">
                  {row.howToUse}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border border-stone-300 bg-white p-6 sm:p-7">
          <SectionLabel index="08" label="Verification" />
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            What remains to verify
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
            The appendix makes the supply question more concrete, but several
            claims should stay in the editorial layer until they are manually
            checked against source records.
          </p>
          <ListBlock items={verificationNeeds} />
        </section>
      </div>
    </main>
  );
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <p className="flex items-baseline gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
      <span className="font-mono text-stone-900">{index}</span>
      <span>{label}</span>
    </p>
  );
}

function ListBlock({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-2 text-sm leading-6 text-stone-700">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-stone-900" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DefinitionList({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="mt-5 space-y-4">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
            {label}
          </dt>
          <dd className="mt-1 text-sm leading-7 text-stone-700">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
