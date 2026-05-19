import Link from "next/link";
import sourcesData from "@/data/generated/sources.json";
import {
  firmWorkforceSnapshots,
  type WorkforceFigure,
} from "@/data/editorial/firm-workforce-snapshots";

type Slot = "total" | "rnd" | "advanced_degree" | "service";

const slotOrder: { key: Slot; label: string }[] = [
  { key: "total", label: "Total employees" },
  { key: "rnd", label: "R&D or technical staff" },
  { key: "advanced_degree", label: "PhDs or master's degree holders" },
  { key: "service", label: "After-sales or service staff" },
];

const NOT_DISCLOSED = "Not disclosed in current snapshot";

function classifyFigure(label: string): Slot | "rnd_share" | null {
  const lower = label.toLowerCase();
  if (lower.includes("total employees")) return "total";
  if (
    lower.includes("master") ||
    lower.includes("doctor") ||
    lower.includes("phd")
  )
    return "advanced_degree";
  if (
    lower.includes("after-sales") ||
    lower.includes("service") ||
    lower.includes("support")
  )
    return "service";
  if (lower.includes("r&d") || lower.includes("technical")) {
    if (lower.includes("share")) return "rnd_share";
    return "rnd";
  }
  return null;
}

type SourceRecord = {
  source_id: string;
  title: string;
  publisher: string;
};

const sourceById = new Map<string, SourceRecord>(
  (sourcesData as SourceRecord[]).map((source) => [source.source_id, source]),
);

type FigureSlots = {
  total: WorkforceFigure | null;
  rnd: WorkforceFigure | null;
  rndShare: WorkforceFigure | null;
  advanced_degree: WorkforceFigure | null;
  service: WorkforceFigure | null;
};

function bucketFigures(figures: WorkforceFigure[]): FigureSlots {
  const slots: FigureSlots = {
    total: null,
    rnd: null,
    rndShare: null,
    advanced_degree: null,
    service: null,
  };

  for (const figure of figures) {
    const classification = classifyFigure(figure.label);
    if (classification === "total") slots.total = figure;
    else if (classification === "rnd") slots.rnd = figure;
    else if (classification === "rnd_share") slots.rndShare = figure;
    else if (classification === "advanced_degree")
      slots.advanced_degree = figure;
    else if (classification === "service") slots.service = figure;
  }

  return slots;
}

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
          What AMEC, ACM Research, and NAURA publish about their workforce
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          Three listed firms publish enough workforce structure to be worth
          comparing. The categories below come from each filing as
          published; they are not standardized across firms, and they
          describe whole-firm staffing, not tooling-segment headcount.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-3">
        {firmWorkforceSnapshots.map((snapshot) => {
          const slots = bucketFigures(snapshot.figures);
          const needsVerification = snapshot.figures.some(
            (figure) => figure.verificationStatus === "needs_verification",
          );
          const sources = snapshot.source_ids
            .map((id) => sourceById.get(id))
            .filter((source): source is SourceRecord => Boolean(source));

          return (
            <article
              key={snapshot.id}
              className="flex h-full flex-col gap-6 bg-white p-7"
            >
              <header className="flex flex-col gap-3 border-b border-stone-200 pb-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                    {snapshot.homeBase}
                  </p>
                  {needsVerification ? (
                    <span className="inline-flex items-center gap-1.5 border border-amber-300 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-800">
                      <span
                        aria-hidden
                        className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500"
                      />
                      Needs manual filing check
                    </span>
                  ) : null}
                </div>
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

              <dl className="flex flex-col">
                {slotOrder.map((slot, index) => {
                  const figure = slots[slot.key];
                  const showShare =
                    slot.key === "rnd" && Boolean(slots.rndShare);

                  return (
                    <div
                      key={slot.key}
                      className={`flex items-baseline justify-between gap-4 py-3 ${
                        index === 0 ? "" : "border-t border-stone-200"
                      }`}
                    >
                      <dt className="text-xs leading-5 text-stone-600">
                        {slot.label}
                      </dt>
                      <dd className="text-right">
                        {figure ? (
                          <>
                            <span className="font-mono text-lg font-semibold tracking-tight text-stone-950">
                              {figure.value}
                            </span>
                            {showShare && slots.rndShare ? (
                              <span className="ml-2 text-[11px] text-stone-500">
                                ({slots.rndShare.value} of total staff)
                              </span>
                            ) : null}
                          </>
                        ) : (
                          <span className="text-xs italic text-stone-400">
                            {NOT_DISCLOSED}
                          </span>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>

              <p className="border-t border-dashed border-stone-300 pt-4 text-xs leading-6 text-stone-600">
                <span className="font-semibold uppercase tracking-[0.18em] text-stone-500">
                  Caveat ·{" "}
                </span>
                {snapshot.caveat}
              </p>

              <Link
                href={`/firms/${snapshot.id}`}
                className="text-sm font-semibold text-stone-900 underline-offset-4 hover:underline"
              >
                Open firm dossier -&gt;
              </Link>

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

      <p className="border-t border-stone-200 px-6 py-4 text-[11px] leading-6 text-stone-500 sm:px-8">
        Workforce categories are aggregated by each firm and not directly
        comparable. These figures describe whole-firm scale and R&D intensity —
        they should not be read as full semiconductor-tooling workforce totals.
      </p>
    </section>
  );
}
