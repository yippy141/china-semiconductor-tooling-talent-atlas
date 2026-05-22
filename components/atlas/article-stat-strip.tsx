import {
  nonTaxonomyEvidenceRows,
  taxonomyScaffoldRows,
  totalSources,
} from "@/lib/atlas-analytics";
import { firmWorkforceSnapshots } from "@/data/editorial/firm-workforce-snapshots";
import { segmentProfiles } from "@/data/editorial/segment-profiles";

const numberFormatter = new Intl.NumberFormat("en-US");

const stats = [
  {
    label: "Public sources",
    value: totalSources,
    note: "Source records catalogued in the local ledger.",
  },
  {
    label: "Evidence rows",
    value: nonTaxonomyEvidenceRows.length,
    note: "Non-taxonomy rows tied to public records or analytical proxies.",
  },
  {
    label: "Tool segments",
    value: segmentProfiles.length,
    note: "Etch and clean, deposition, metrology, and lithography-adjacent.",
  },
  {
    label: "Listed-firm snapshots",
    value: firmWorkforceSnapshots.length,
    note: "Firm-level workforce snapshots from public filings.",
  },
];

export function ArticleStatStrip() {
  return (
    <section
      aria-label="Dataset coverage"
      className="border border-stone-300 bg-white"
    >
      <dl className="grid grid-cols-1 gap-px bg-stone-200 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-5">
            <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
              {stat.label}
            </dt>
            <dd className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
              {numberFormatter.format(stat.value)}
            </dd>
            <p className="mt-3 text-xs leading-6 text-stone-600">
              {stat.note}
            </p>
          </div>
        ))}
      </dl>
      <p className="border-t border-stone-200 px-5 py-3 text-[11px] leading-6 text-stone-500">
        Taxonomy scaffold rows are kept separate from evidence rows:{" "}
        {numberFormatter.format(taxonomyScaffoldRows.length)} scaffold rows
        organize the monitor and do not measure workforce capacity.
      </p>
    </section>
  );
}
