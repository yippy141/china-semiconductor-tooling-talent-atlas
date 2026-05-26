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
      className="border border-rule-hair bg-paper-deep"
    >
      <p className="border-b border-rule-hair px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
        Anchor firm disclosures
      </p>
      <ul className="divide-y divide-rule-hair">
        {rows.map((row) => (
          <li
            key={row.snapshot.id}
            className="flex flex-col gap-2 px-5 py-4"
          >
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-sm font-semibold text-ink">
                {row.snapshot.firm}
              </p>
              <span className="border border-rule-hair px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                {row.snapshot.segmentSignals[0]}
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <p className="font-mono text-2xl font-semibold tabular-nums text-ink">
                {row.figure.value}
              </p>
              <p className="text-[11px] leading-5 text-muted-2">
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
      <p className="border-t border-rule-hair px-5 py-3 text-[10px] leading-5 text-muted">
        Categories are not interchangeable. R&amp;D, technical staff, service
        staff, and total employees use different denominators.
      </p>
    </aside>
  );
}
