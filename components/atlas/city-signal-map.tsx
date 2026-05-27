"use client";

import Link from "next/link";
import { useId, useState } from "react";
import observationsData from "@/data/generated/observations.json";
import { cityPositions } from "@/data/editorial/city-positions";
import { topCitiesByEvidence } from "@/lib/atlas-analytics";
import { formatSegment } from "@/lib/atlas-labels";

type LabelDirection = "left" | "right" | "top" | "bottom";

const labelOverridesByCity: Record<string, LabelDirection> = {
  Beijing: "left",
  Tianjin: "right",
  Dalian: "bottom",
  Shenyang: "left",
  Shanghai: "right",
  Suzhou: "top",
  Hangzhou: "bottom",
};

type SegmentCount = { label: string; count: number };

type CityNode = {
  city: string;
  province: string;
  count: number;
  sourceCount: number;
  x: number;
  y: number;
  topSegments: SegmentCount[];
};

const positionByCity = new Map(
  cityPositions.map((position) => [position.city, position]),
);

const segmentCountsByCity = (() => {
  const cities = new Map<string, Map<string, number>>();

  for (const observation of observationsData) {
    if (!observation.city) continue;
    if (observation.evidence_type === "manual_inference") continue;
    if (!observation.segment) continue;

    const segments =
      cities.get(observation.city) ?? new Map<string, number>();
    segments.set(
      observation.segment,
      (segments.get(observation.segment) ?? 0) + 1,
    );
    cities.set(observation.city, segments);
  }

  return cities;
})();

function topSegmentsFor(city: string, max = 3): SegmentCount[] {
  const segments = segmentCountsByCity.get(city);
  if (!segments) return [];

  return Array.from(segments.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([segmentId, count]) => ({
      label: formatSegment(segmentId),
      count,
    }));
}

const nodes: CityNode[] = topCitiesByEvidence
  .map((row) => {
    const position = positionByCity.get(row.city);
    if (!position) return null;

    return {
      city: row.city,
      province: row.province,
      count: row.count,
      sourceCount: row.sourceCount,
      x: position.x,
      y: position.y,
      topSegments: topSegmentsFor(row.city),
    };
  })
  .filter((node): node is CityNode => node !== null);

const maxCount = nodes.reduce((peak, node) => Math.max(peak, node.count), 0) || 1;
const labelledCities = new Set(nodes.slice(0, 8).map((node) => node.city));

const MIN_RADIUS = 8;
const MAX_RADIUS = 26;

function nodeDiameter(count: number) {
  const ratio = Math.sqrt(count / maxCount);
  return MIN_RADIUS + ratio * (MAX_RADIUS - MIN_RADIUS);
}

export function CitySignalMap() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const headingId = useId();

  const activeNode: CityNode | undefined = activeCity
    ? nodes.find((node) => node.city === activeCity) ?? nodes[0]
    : nodes[0];

  return (
    <section
      aria-labelledby={headingId}
      className="border border-stone-800 bg-stone-950 text-stone-100"
    >
      <header className="flex flex-col gap-3 border-b border-stone-800 px-6 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/80">
            City source coverage · province outline
          </p>
          <h3
            id={headingId}
            className="mt-2 text-xl font-semibold tracking-tight text-stone-50 sm:text-2xl"
          >
            Source coverage by city
          </h3>
        </div>
        <p className="max-w-sm text-xs leading-6 text-stone-400">
          The beta dataset has public records in these cities. Node size does
          not show talent density, workforce size, or city capability.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "1000 / 850" }}
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.14]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #d6d3d1 1px, transparent 1px), linear-gradient(to bottom, #d6d3d1 1px, transparent 1px)",
                backgroundSize: "8% 8%",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 70% 50%, rgba(251,191,36,0.06), transparent 65%)",
              }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-no-repeat"
              style={{
                backgroundImage: "url(/china-schematic.svg)",
                backgroundSize: "100% 100%",
                backgroundPosition: "center",
              }}
            />
            <p
              aria-hidden
              className="absolute left-4 top-3 text-[10px] uppercase tracking-[0.22em] text-stone-500"
            >
              Mainland PRC · province outline
            </p>
            <p
              aria-hidden
              className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.22em] text-stone-500"
            >
              City placement is approximate
            </p>

            {nodes.map((node) => {
              const diameter = nodeDiameter(node.count);
              const isActive = activeNode?.city === node.city;
              const showLabel = labelledCities.has(node.city);
              const labelDirection: LabelDirection =
                labelOverridesByCity[node.city] ??
                (node.x > 70 ? "left" : "right");
              const labelPositionClass =
                labelDirection === "left"
                  ? "right-full top-1/2 mr-2 -translate-y-1/2"
                  : labelDirection === "right"
                    ? "left-full top-1/2 ml-2 -translate-y-1/2"
                    : labelDirection === "top"
                      ? "bottom-full left-1/2 mb-1.5 -translate-x-1/2"
                      : "top-full left-1/2 mt-1.5 -translate-x-1/2";

              return (
                <Link
                  key={node.city}
                  href={`/explorer?city=${encodeURIComponent(node.city)}`}
                  prefetch={false}
                  onMouseEnter={() => setActiveCity(node.city)}
                  onMouseLeave={() =>
                    setActiveCity((current) =>
                      current === node.city ? null : current,
                    )
                  }
                  onFocus={() => setActiveCity(node.city)}
                  onBlur={() =>
                    setActiveCity((current) =>
                      current === node.city ? null : current,
                    )
                  }
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  aria-label={`${node.city}, ${node.province}: ${node.count} public records. Open city in evidence explorer.`}
                >
                  <span
                    aria-hidden
                    className={`block rounded-full border transition-all duration-150 ${
                      isActive
                        ? "border-amber-200 bg-amber-200/80 shadow-[0_0_0_4px_rgba(251,191,36,0.18)]"
                        : "border-stone-200/70 bg-stone-100/30 group-hover:bg-stone-100/60 group-focus-visible:border-amber-200"
                    }`}
                    style={{ width: diameter, height: diameter }}
                  />
                  {showLabel && (
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute whitespace-nowrap text-[11px] font-medium tracking-tight ${labelPositionClass} ${
                        isActive ? "text-amber-100" : "text-stone-200"
                      }`}
                    >
                      {node.city}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone-800 px-6 py-4 text-[11px] text-stone-400 sm:px-8">
            <span className="flex items-end gap-2">
              <span
                aria-hidden
                className="inline-block rounded-full bg-stone-100/40"
                style={{ width: 6, height: 6 }}
              />
              <span
                aria-hidden
                className="inline-block rounded-full bg-stone-100/40"
                style={{ width: 12, height: 12 }}
              />
              <span
                aria-hidden
                className="inline-block rounded-full bg-stone-100/40"
                style={{ width: 20, height: 20 }}
              />
              <span className="ml-1">Node size = public records per city</span>
            </span>
            <span>Province outline for orientation. City placement is approximate.</span>
          </div>
        </div>

        <aside className="flex flex-col gap-5 border-t border-stone-800 p-6 sm:p-8 lg:border-l lg:border-t-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            City inspector{" "}
            <span className="ml-1 normal-case tracking-normal text-stone-600">
              {activeCity ? "· focused" : "· default view"}
            </span>
          </p>

          {activeNode ? (
            <>
              <div>
                <p className="text-2xl font-semibold tracking-tight text-stone-50">
                  {activeNode.city}
                </p>
                <p className="mt-1 text-sm text-stone-400">
                  {activeNode.province}
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-4 border-y border-stone-800 py-4">
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                    Public records
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-stone-50">
                    {activeNode.count}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                    Distinct sources
                  </dt>
                  <dd className="mt-1 text-2xl font-semibold text-stone-50">
                    {activeNode.sourceCount}
                  </dd>
                </div>
              </dl>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-stone-500">
                  Top segments
                </p>
                {activeNode.topSegments.length > 0 ? (
                  <ul className="mt-3 space-y-2 text-sm text-stone-200">
                    {activeNode.topSegments.map((segment) => (
                      <li
                        key={segment.label}
                        className="flex items-baseline justify-between gap-3 border-b border-dashed border-stone-800/80 pb-2 last:border-b-0 last:pb-0"
                      >
                        <span>{segment.label}</span>
                        <span className="text-xs text-stone-500">
                          {segment.count} records
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">
                    No non-taxonomy segment records found for this city yet.
                  </p>
                )}
              </div>
              <Link
                href={`/explorer?city=${encodeURIComponent(activeNode.city)}`}
                prefetch={false}
                className="inline-flex w-fit items-center text-sm font-semibold text-amber-200 hover:text-amber-100"
              >
                View source records in explorer &rarr;
              </Link>
            </>
          ) : (
            <p className="text-sm text-stone-400">
              Hover or focus a city node to inspect its public records.
            </p>
          )}

          <p className="mt-auto text-[11px] leading-5 text-stone-500">
            Visibility reflects what public records currently disclose. It is
            not a talent ranking.
          </p>
        </aside>
      </div>
    </section>
  );
}
