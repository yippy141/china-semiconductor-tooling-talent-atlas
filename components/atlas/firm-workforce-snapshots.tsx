import Link from "next/link";
import sourcesData from "@/data/generated/sources.json";
import {
  firmWorkforceSnapshots,
  type SourceStatus,
} from "@/data/editorial/firm-workforce-snapshots";

const NOT_DISCLOSED =
  "No source-checked workforce figures are included in this snapshot yet.";

const statusMeta: Record<
  SourceStatus,
  { label: string; className: string; description: string }
> = {
  source_checked: {
    label: "Source checked",
    className: "border-emerald-300 bg-emerald-50 text-emerald-900",
    description: "Reviewed against the cited source.",
  },
  needs_check: {
    label: "Needs check",
    className: "border-amber-300 bg-amber-50 text-amber-900",
    description: "Staged from a filing and still needs manual source review.",
  },
  staging: {
    label: "Staging",
    className: "border-stone-300 bg-stone-50 text-stone-600",
    description: "Draft observation pending verification.",
  },
  not_disclosed: {
    label: "Not disclosed",
    className: "border-stone-400 bg-stone-100 text-stone-500",
    description: "The filing does not disclose this field.",
  },
};

type SourceRecord = {
  source_id: string;
  title: string;
  publisher: string;
};

const sourceById = new Map<string, SourceRecord>(
  (sourcesData as SourceRecord[]).map((source) => [source.source_id, source]),
);

const explorerHrefById: Record<string, string> = {
  amec: "/explorer?entity_id=ent_amec",
  "acm-research-shanghai": "/explorer?entity_id=ent_acm_sh",
  naura: "/explorer?entity_id=ent_naura",
  piotech: "/explorer?entity_id=ent_piotech",
};

export function FirmWorkforceSnapshots() {
  return (
    <section
      aria-labelledby="firm-workforce-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Firm workforce snapshots
        </p>
        <h3
          id="firm-workforce-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          What AMEC, ACM Research Shanghai, NAURA, and Piotech publish about
          their workforce
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          These categories come from each firm&apos;s filing as published. Firms
          use different labels and denominators, and the figures describe
          whole-firm staffing. Tooling-segment headcount would need separate
          disclosure.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-3">
        {firmWorkforceSnapshots.map((snapshot) => {
          const sources = snapshot.source_ids
            .map((id) => sourceById.get(id))
            .filter((source): source is SourceRecord => Boolean(source));

          return (
            <article
              key={snapshot.id}
              className="flex h-full flex-col gap-6 bg-white p-7"
            >
              <header className="flex flex-col gap-3 border-b border-stone-200 pb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  {snapshot.homeBase}
                </p>
                <h4 className="text-xl font-semibold tracking-tight text-stone-950">
                  <Link
                    href={`/firms/${snapshot.id}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {snapshot.firm}
                  </Link>
                </h4>
                <ul className="flex flex-wrap gap-2">
                  {snapshot.segmentSignals.map((segment) => (
                    <li
                      key={segment}
                      className="border border-stone-300 bg-stone-50 px-2.5 py-1 text-[11px] text-stone-700"
                    >
                      {segment}
                    </li>
                  ))}
                </ul>
              </header>

              <p className="text-sm leading-7 text-stone-700">
                {snapshot.editorialRead}
              </p>

              {snapshot.figures.length > 0 ? (
                <dl className="flex flex-col gap-4">
                  {snapshot.figures.map((figure) => (
                    <div
                      key={figure.label}
                      className="border-t border-stone-200 pt-4"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-xs leading-5 text-stone-600">
                          {figure.label}
                        </dt>
                        <dd className="font-mono text-lg font-semibold tracking-tight text-stone-950">
                          {figure.value}
                        </dd>
                      </div>
                      <p className="mt-2 text-[11px] leading-5 text-stone-500">
                        Denominator: {figure.denominator}
                      </p>
                      <p className="mt-2 text-xs leading-6 text-stone-600">
                        {figure.note}
                      </p>
                      <SourceStatusBadge status={figure.sourceStatus} />
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm leading-7 text-stone-600">
                  {NOT_DISCLOSED}
                </p>
              )}

              <p className="border-t border-dashed border-stone-300 pt-4 text-xs leading-6 text-stone-600">
                <span className="font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Limit ·{" "}
                </span>
                {snapshot.caveat}
              </p>

              <nav
                aria-label={`${snapshot.firm} next clicks`}
                className="flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold text-stone-900"
              >
                <Link
                  href={`/firms/${snapshot.id}`}
                  className="underline-offset-4 hover:underline"
                >
                  Open dossier -&gt;
                </Link>
                <Link
                  href={explorerHrefById[snapshot.id] ?? "/explorer"}
                  className="underline-offset-4 hover:underline"
                >
                  View source rows -&gt;
                </Link>
              </nav>

              {sources.length > 0 ? (
                <div className="mt-auto border-t border-stone-200 pt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Source
                  </p>
                  <ul className="mt-2 space-y-1.5 text-xs leading-5 text-stone-700">
                    {sources.map((source) => (
                      <li key={source.source_id}>
                        <span className="font-medium text-stone-900">
                          {source.title}
                        </span>
                        <span className="text-stone-500">
                          {" · "}
                          {source.publisher}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="border-t border-stone-200 px-6 py-4 sm:px-8">
        <p className="text-[11px] leading-6 text-stone-500">
          Firms use different workforce categories. R&amp;D share, technical
          staff, service staff, and advanced-degree counts should stay
          separate.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {(Object.keys(statusMeta) as SourceStatus[]).map((status) => (
            <li key={status}>
              <SourceStatusBadge status={status} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function SourceStatusBadge({ status }: { status: SourceStatus }) {
  const meta = statusMeta[status];

  return (
    <span
      className={`mt-3 inline-flex w-fit border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${meta.className}`}
      title={meta.description}
    >
      {meta.label}
    </span>
  );
}
