"use client";

import Link from "next/link";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  firmWorkforceSnapshots,
  type FirmWorkforceSnapshot,
  type WorkforceFigure,
} from "@/data/editorial/firm-workforce-snapshots";

const NOT_DISCLOSED = "Not disclosed in current filing";

const firmHrefByName: Record<string, string> = {
  AMEC: "/firms/amec",
  "ACM Research Shanghai": "/firms/acm-research-shanghai",
  "NAURA Technology Group": "/firms/naura",
};

function parseNumeric(value: string): number | null {
  const cleaned = value.replace(/,/g, "").replace(/%/g, "").trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

function pickFigure(
  snapshot: FirmWorkforceSnapshot,
  match: (label: string) => boolean,
): WorkforceFigure | null {
  return snapshot.figures.find((figure) => match(figure.label)) ?? null;
}

function pickRnDCount(snapshot: FirmWorkforceSnapshot) {
  return pickFigure(snapshot, (label) => {
    const lower = label.toLowerCase();
    return (
      lower.includes("r&d personnel") &&
      !lower.includes("share") &&
      !lower.includes("degree")
    );
  });
}

function pickRnDShare(snapshot: FirmWorkforceSnapshot) {
  return pickFigure(snapshot, (label) => {
    const lower = label.toLowerCase();
    return lower.includes("r&d personnel") && lower.includes("share");
  });
}

function pickTotal(snapshot: FirmWorkforceSnapshot) {
  return pickFigure(snapshot, (label) =>
    label.toLowerCase().includes("total employees"),
  );
}

function pickAdvancedDegree(snapshot: FirmWorkforceSnapshot) {
  return pickFigure(snapshot, (label) => {
    const lower = label.toLowerCase();
    return (
      lower.includes("master") ||
      lower.includes("doctor") ||
      lower.includes("phd")
    );
  });
}

const chartCategories = [
  {
    key: "rndCount" as const,
    title: "R&D personnel (headcount)",
    pick: pickRnDCount,
    formatTick: (value: number) => value.toLocaleString("en-US"),
  },
  {
    key: "rndShare" as const,
    title: "R&D share of total staff",
    pick: pickRnDShare,
    formatTick: (value: number) => `${value}%`,
  },
];

type ChartDatum = {
  firm: string;
  href: string;
  value: number;
  displayValue: string;
};

function buildChartData(
  pick: (snapshot: FirmWorkforceSnapshot) => WorkforceFigure | null,
): ChartDatum[] {
  return firmWorkforceSnapshots
    .map((snapshot) => {
      const figure = pick(snapshot);
      if (!figure) return null;
      const numeric = parseNumeric(figure.value);
      if (numeric === null) return null;
      return {
        firm: snapshot.firm,
        href: firmHrefByName[snapshot.firm] ?? `/firms/${snapshot.id}`,
        value: numeric,
        displayValue: figure.value,
      } satisfies ChartDatum;
    })
    .filter((datum): datum is ChartDatum => datum !== null);
}

const additionalRows = firmWorkforceSnapshots.map((snapshot) => ({
  firm: snapshot.firm,
  total: pickTotal(snapshot),
  advancedDegree: pickAdvancedDegree(snapshot),
}));

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
          AMEC, ACM Research Shanghai, and NAURA each publish enough
          workforce structure to be compared. The chart shows only the
          categories every firm discloses; categories disclosed by some but
          not others are listed below as a small table.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-2">
        {chartCategories.map((category) => {
          const data = buildChartData(category.pick);
          const missing = firmWorkforceSnapshots.filter(
            (snapshot) => category.pick(snapshot) === null,
          );
          return (
            <figure
              key={category.key}
              className="flex flex-col gap-4 bg-white p-6 sm:p-7"
            >
              <figcaption className="flex flex-col gap-1">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Category
                </p>
                <p className="text-base font-semibold tracking-tight text-stone-950">
                  {category.title}
                </p>
              </figcaption>

              <div
                className="w-full overflow-x-auto"
                role="img"
                aria-label={`${category.title} for ${data
                  .map((datum) => `${datum.firm} ${datum.displayValue}`)
                  .join(", ")}`}
              >
                <BarChart
                  width={520}
                  height={220}
                  data={data}
                  layout="vertical"
                  margin={{ top: 8, right: 32, bottom: 8, left: 12 }}
                  className="max-w-full"
                >
                  <CartesianGrid
                    stroke="#e7e5e4"
                    horizontal={false}
                    strokeDasharray="2 4"
                  />
                  <XAxis
                    type="number"
                    stroke="#78716c"
                    tick={{ fill: "#57534e", fontSize: 11 }}
                    tickFormatter={category.formatTick}
                  />
                  <YAxis
                    type="category"
                    dataKey="firm"
                    stroke="#78716c"
                    tick={{ fill: "#1c1917", fontSize: 12 }}
                    width={150}
                  />
                  <Bar dataKey="value" fill="#1c1917" radius={[0, 0, 0, 0]}>
                    <LabelList
                      dataKey="displayValue"
                      position="right"
                      style={{ fill: "#1c1917", fontSize: 11 }}
                    />
                  </Bar>
                </BarChart>
              </div>

              {missing.length > 0 ? (
                <p className="text-[11px] leading-6 text-stone-500">
                  {missing.map((snapshot) => snapshot.firm).join(", ")}:{" "}
                  {NOT_DISCLOSED.toLowerCase()}.
                </p>
              ) : null}

              <nav
                aria-label={`Firm dossiers for ${category.title}`}
                className="mt-auto flex flex-wrap gap-x-4 gap-y-2 border-t border-dashed border-stone-300 pt-4"
              >
                {data.map((datum) => (
                  <Link
                    key={datum.firm}
                    href={datum.href}
                    className="text-xs font-semibold text-stone-900 underline-offset-4 hover:underline"
                  >
                    {datum.firm}
                  </Link>
                ))}
              </nav>
            </figure>
          );
        })}
      </div>

      <div className="border-t border-stone-200 px-6 py-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Other disclosed categories
        </p>
        <table className="mt-3 w-full border-collapse text-left text-sm">
          <thead>
            <tr className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
              <th scope="col" className="py-2 pr-4">
                Firm
              </th>
              <th scope="col" className="py-2 pr-4">
                Total employees
              </th>
              <th scope="col" className="py-2 pr-4">
                Master&apos;s or doctoral share within R&amp;D
              </th>
            </tr>
          </thead>
          <tbody>
            {additionalRows.map((row) => (
              <tr key={row.firm} className="border-t border-stone-200">
                <th scope="row" className="py-2 pr-4 font-medium text-stone-900">
                  <Link
                    href={firmHrefByName[row.firm] ?? "/firms"}
                    className="underline-offset-4 hover:underline"
                  >
                    {row.firm}
                  </Link>
                </th>
                <td className="py-2 pr-4 text-stone-700">
                  {row.total ? (
                    <span className="font-mono">{row.total.value}</span>
                  ) : (
                    <span className="text-xs italic text-stone-400">
                      {NOT_DISCLOSED}
                    </span>
                  )}
                </td>
                <td className="py-2 pr-4 text-stone-700">
                  {row.advancedDegree ? (
                    <span className="font-mono">
                      {row.advancedDegree.value}
                    </span>
                  ) : (
                    <span className="text-xs italic text-stone-400">
                      {NOT_DISCLOSED}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="border-t border-stone-200 px-6 py-4 text-[11px] leading-6 text-stone-500 sm:px-8">
        Categories follow each firm&apos;s filing and are not segment-specific
        headcounts.
      </p>
    </section>
  );
}
