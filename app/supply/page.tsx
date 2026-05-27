import Link from "next/link";
import disciplinesData from "@/data/generated/disciplines.json";
import { formatSegment } from "@/lib/atlas-labels";

type Discipline = (typeof disciplinesData)[number];

const countableRecords = [
  "Broad postgraduate totals",
  "Province-level postgraduate totals",
  "MOE discipline categories",
  "Authorized degree points",
  "School and lab presence",
];

const isolationLimits = [
  "Plasma-etch PhDs",
  "ALD process engineers",
  "Field application engineers",
  "Placement into AMEC or NAURA",
  "Customer-site support roles",
];

const pipelineLayers = [
  {
    label: "Supply",
    body: "Universities, disciplines, labs, schools, and degree authorization records.",
  },
  {
    label: "Demand",
    body: "Shortage lists, job postings, hiring language, and local talent-policy signals.",
  },
  {
    label: "Absorption",
    body: "Firms, parks, service teams, customer deployments, and repeated tool support.",
  },
];

const researchNeeds = [
  "Degree-point table",
  "Institution pipeline table",
  "City supply-demand join",
  "Comparator context",
];

function segmentLabels(discipline: Discipline) {
  return discipline.most_relevant_segments
    .split(";")
    .map((segment) => segment.trim())
    .filter(Boolean)
    .map(formatSegment);
}

export default function SupplyPage() {
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
            Talent supply scaffold
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Talent supply pipeline
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-stone-700">
            Tooling talent does not come from one major. Etch draws on plasma,
            surface chemistry, materials, RF, controls, and process
            engineering. Deposition draws on thin films, precursor chemistry,
            vacuum behavior, and chamber control. Metrology draws on optics,
            instrumentation, algorithms, calibration, and field support. This
            page maps the disciplines and institutions that plausibly feed
            those role families, and marks where official data stop.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 lg:grid-cols-2">
          <section className="bg-white p-6 sm:p-7">
            <SectionLabel index="01" label="Official data" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              What official data can count
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              Official records can establish the formal training and
              institutional base around tooling-relevant disciplines. They are
              useful for framing the upstream pool, not for assigning exact
              people to tool families.
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-stone-700">
              {countableRecords.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-stone-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-6 sm:p-7">
            <SectionLabel index="02" label="Official data" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              What official data cannot isolate
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              The same records do not isolate niche roles, customer-site work,
              or firm-specific absorption. Those claims need a later research
              pass tied to placement, hiring, and support evidence.
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-stone-700">
              {isolationLimits.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-stone-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="border border-stone-300 bg-white">
          <div className="border-b border-stone-200 p-6 sm:p-7">
            <SectionLabel index="03" label="Disciplines" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Feeder disciplines
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
              This table uses the current MOE-coded discipline scaffold. It
              shows plausible feeder disciplines and why they matter for tool
              roles, without claiming exact graduate counts or placements.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead className="bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">MOE code</th>
                  <th className="px-4 py-3 font-semibold">English name</th>
                  <th className="px-4 py-3 font-semibold">Chinese name</th>
                  <th className="px-4 py-3 font-semibold">
                    Relevant segments
                  </th>
                  <th className="px-4 py-3 font-semibold">Relevance notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200">
                {disciplinesData.map((discipline) => (
                  <tr key={discipline.discipline_id} className="align-top">
                    <td className="whitespace-nowrap px-4 py-4 font-mono text-xs text-stone-600">
                      {discipline.moe_code}
                    </td>
                    <td className="px-4 py-4 font-medium text-stone-950">
                      {discipline.name_en}
                    </td>
                    <td className="px-4 py-4 text-stone-700">
                      {discipline.name_cn}
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
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="border border-stone-300 bg-white p-6 sm:p-7">
            <SectionLabel index="04" label="Pipeline" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Supply, demand, absorption
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-px bg-stone-200 md:grid-cols-3">
              {pipelineLayers.map((layer) => (
                <article key={layer.label} className="bg-white p-5">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {layer.label}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">
                    {layer.body}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="border border-stone-300 bg-white p-6 sm:p-7">
            <SectionLabel index="05" label="Next research" />
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Research still needed
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              A later pass should connect formal training records to city
              demand and firm absorption before this becomes a talent geography
              view.
            </p>
            <ul className="mt-5 space-y-2 text-sm leading-6 text-stone-700">
              {researchNeeds.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-stone-900" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
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
