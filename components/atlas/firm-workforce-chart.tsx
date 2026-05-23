import Link from "next/link";
import {
  firmWorkforceSnapshots,
  type SourceStatus,
} from "@/data/editorial/firm-workforce-snapshots";

const firmHrefById: Record<string, string> = {
  amec: "/firms/amec",
  "acm-research-shanghai": "/firms/acm-research-shanghai",
  naura: "/firms/naura",
};

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
};

export function FirmWorkforceChart() {
  return (
    <section
      aria-labelledby="firm-workforce-chart-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Firm workforce chart
        </p>
        <h3
          id="firm-workforce-chart-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          What listed firms disclose.
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          Each firm is shown in the categories it discloses. The point is to
          read denominators and source status before comparing figures across
          firms.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-3">
        {firmWorkforceSnapshots.map((snapshot) => (
          <article
            key={snapshot.id}
            className="flex h-full flex-col bg-white p-6 sm:p-7"
          >
            <header className="border-b border-stone-200 pb-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                {snapshot.homeBase}
              </p>
              <h4 className="mt-2 text-xl font-semibold tracking-tight text-stone-950">
                <Link
                  href={firmHrefById[snapshot.id] ?? "/firms"}
                  className="underline-offset-4 hover:underline"
                >
                  {snapshot.firm}
                </Link>
              </h4>
              <ul className="mt-3 flex flex-wrap gap-2">
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

            <p className="mt-5 text-sm leading-7 text-stone-700">
              {snapshot.editorialRead}
            </p>

            <dl className="mt-5 flex flex-col gap-4">
              {snapshot.figures.map((figure) => (
                <div
                  key={figure.label}
                  className="border-t border-stone-200 pt-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <dt className="max-w-[12rem] text-xs font-medium leading-5 text-stone-700">
                      {figure.label}
                    </dt>
                    <dd className="font-mono text-2xl font-semibold tracking-tight text-stone-950">
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

            <Link
              href={firmHrefById[snapshot.id] ?? "/firms"}
              className="mt-6 text-sm font-semibold text-stone-900 underline-offset-4 hover:underline"
            >
              Open firm dossier -&gt;
            </Link>
          </article>
        ))}
      </div>

      <div className="border-t border-stone-200 px-6 py-4 sm:px-8">
        <p className="text-[11px] leading-6 text-stone-500">
          Firms use different workforce categories. R&amp;D share, technical
          staff, service staff, and advanced-degree counts are not
          interchangeable.
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
