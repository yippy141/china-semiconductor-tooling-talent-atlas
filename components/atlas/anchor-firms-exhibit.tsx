import {
  firmWorkforceSnapshots,
  type FirmWorkforceSnapshot,
  type WorkforceFigure,
} from "@/data/editorial/firm-workforce-snapshots";

type HeroPick = {
  snapshot: FirmWorkforceSnapshot;
  figure: WorkforceFigure;
  isFallback: boolean;
};

const heroOrder: { id: string; preferred: string[] }[] = [
  { id: "amec", preferred: ["R&D personnel"] },
  {
    id: "acm-research-shanghai",
    preferred: ["After-sales service personnel", "Technical personnel"],
  },
  {
    id: "naura",
    preferred: ["Sales and customer-service personnel", "R&D personnel"],
  },
  { id: "piotech", preferred: ["R&D personnel"] },
];

function pickFigure(
  snapshot: FirmWorkforceSnapshot,
  preferred: string[],
): { figure: WorkforceFigure; isFallback: boolean } | null {
  for (const wanted of preferred) {
    const exact = snapshot.figures.find(
      (f) => f.label === wanted && f.sourceStatus === "source_checked",
    );
    if (exact) return { figure: exact, isFallback: false };
    const prefixed = snapshot.figures.find(
      (f) =>
        f.label.startsWith(wanted) && f.sourceStatus === "source_checked",
    );
    if (prefixed) return { figure: prefixed, isFallback: false };
  }
  const firstChecked = snapshot.figures.find(
    (f) => f.sourceStatus === "source_checked",
  );
  return firstChecked ? { figure: firstChecked, isFallback: true } : null;
}

const rows: HeroPick[] = heroOrder.flatMap(({ id, preferred }) => {
  const snapshot = firmWorkforceSnapshots.find((s) => s.id === id);
  if (!snapshot) return [];
  const pick = pickFigure(snapshot, preferred);
  if (!pick) return [];
  return [{ snapshot, figure: pick.figure, isFallback: pick.isFallback }];
});

export function AnchorFirmsExhibit() {
  return (
    <aside
      aria-label="Anchor firm disclosures"
      className="border-y border-rule-hair bg-paper"
    >
      <div className="grid gap-3 border-b border-rule-hair py-4 sm:grid-cols-[12rem_1fr] sm:items-end">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
          Anchor firm disclosures
        </p>
        <p className="max-w-3xl text-xs leading-5 text-muted">
          Keep categories separate. R&amp;D, technical staff, service staff,
          and total employees use different denominators.
        </p>
      </div>
      <ul className="grid grid-cols-1 divide-y divide-rule-hair sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
        {rows.map((row) => (
          <li
            key={row.snapshot.id}
            className="flex min-h-44 flex-col justify-between gap-5 py-5 sm:px-5 first:sm:pl-0 last:sm:pr-0"
          >
            <div>
              <p className="text-base font-semibold leading-snug text-ink">
                {row.snapshot.firm}
              </p>
              <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-muted">
                {row.snapshot.segmentSignals[0]}
              </p>
            </div>
            <div>
              <p className="font-mono text-3xl font-semibold tabular-nums text-ink">
                {row.figure.value}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-2">
                {row.figure.label}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-semibold uppercase tracking-[0.18em]">
              <span className="text-sig-green">Source checked</span>
              {row.isFallback ? (
                <span className="text-muted">Fallback figure</span>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
