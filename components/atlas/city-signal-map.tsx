"use client";

import { useId, useState } from "react";
import observationsData from "@/data/generated/observations.json";
import { cityPositions } from "@/data/editorial/city-positions";
import { topCitiesByEvidence } from "@/lib/atlas-analytics";
import { formatSegment } from "@/lib/atlas-labels";

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
            City signal map · schematic
          </p>
          <h3
            id={headingId}
            className="mt-2 text-xl font-semibold tracking-tight text-stone-50 sm:text-2xl"
          >
            Where evidence concentrates across mainland China
          </h3>
        </div>
        <p className="max-w-sm text-xs leading-6 text-stone-400">
          Node size scales with the count of non-taxonomy evidence rows tied
          to a city. This is visibility coverage, not a talent ranking.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col">
          <div
            className="relative w-full overflow-hidden"
            style={{ aspectRatio: "4 / 3" }}
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
            <p
              aria-hidden
              className="absolute left-4 top-3 text-[10px] uppercase tracking-[0.22em] text-stone-500"
            >
              Mainland PRC · schematic
            </p>
            <p
              aria-hidden
              className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.22em] text-stone-500"
            >
              Not to geographic scale
            </p>

            {nodes.map((node) => {
              const diameter = nodeDiameter(node.count);
              const isActive = activeNode?.city === node.city;
              const showLabel = labelledCities.has(node.city);
              const labelOnLeft = node.x > 70;

              return (
                <button
                  key={node.city}
                  type="button"
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
                  aria-label={`${node.city}, ${node.province}: ${node.count} evidence rows`}
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
                      className={`pointer-events-none absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[11px] font-medium tracking-tight ${
                        labelOnLeft ? "right-full mr-2" : "left-full ml-2"
                      } ${isActive ? "text-amber-100" : "text-stone-200"}`}
                    >
                      {node.city}
                    </span>
                  )}
                </button>
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
              <span className="ml-1">Node size = public evidence signal</span>
            </span>
            <span>Schematic placement, not precise GIS</span>
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
                    Evidence rows
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
                          {segment.count} rows
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-3 text-sm text-stone-500">
                    No non-taxonomy segment rows recorded for this city yet.
                  </p>
                )}
              </div>
            </>
          ) : (
            <p className="text-sm text-stone-400">
              Hover or focus a city node to inspect its evidence.
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
