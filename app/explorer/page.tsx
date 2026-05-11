"use client";

import { Fragment, useMemo, useState } from "react";
import capabilitiesData from "@/data/generated/capabilities.json";
import institutionsData from "@/data/generated/institutions.json";
import observationsData from "@/data/generated/observations.json";
import sourcesData from "@/data/generated/sources.json";
import {
  formatConfidence,
  formatEntityType,
  formatEvidenceType,
  formatSegment,
} from "@/lib/atlas-labels";
import {
  evidenceGroupLabels,
  evidenceTypeGroups,
  type EvidenceGroup,
} from "@/lib/atlas-analytics";

type Observation = (typeof observationsData)[number];
type SourceRecord = (typeof sourcesData)[number];

const numberFormatter = new Intl.NumberFormat("en-US");

const sourceById = new Map<string, SourceRecord>(
  sourcesData.map((source) => [source.source_id, source]),
);

const segmentOptions = [
  { id: "etch_clean", label: formatSegment("etch_clean") },
  { id: "deposition", label: formatSegment("deposition") },
  {
    id: "metrology_inspection",
    label: formatSegment("metrology_inspection"),
  },
  {
    id: "lithography_sidebar",
    label: formatSegment("lithography_sidebar"),
  },
];

const evidenceGroupOptions: { id: EvidenceGroup; label: string }[] = [
  { id: "direct_public_record", label: evidenceGroupLabels.direct_public_record },
  { id: "analytical_proxy", label: evidenceGroupLabels.analytical_proxy },
  { id: "taxonomy_scaffold", label: evidenceGroupLabels.taxonomy_scaffold },
];

const evidenceTypeOptions = (() => {
  const ids = new Set<string>();
  for (const observation of observationsData) {
    if (observation.evidence_type) ids.add(observation.evidence_type);
  }
  return Array.from(ids)
    .map((id) => ({ id, label: formatEvidenceType(id) }))
    .sort((a, b) => a.label.localeCompare(b.label));
})();

const confidenceOptions = (() => {
  const ids = new Set<string>();
  for (const observation of observationsData) {
    if (observation.confidence) ids.add(observation.confidence);
  }
  return Array.from(ids)
    .map((id) => ({ id, label: formatConfidence(id) }))
    .sort((a, b) => a.label.localeCompare(b.label));
})();

const cityOptions = (() => {
  const cities = new Set<string>();
  for (const observation of observationsData) {
    if (observation.city) cities.add(observation.city);
  }
  return Array.from(cities)
    .sort()
    .map((city) => ({ id: city, label: city }));
})();

const totals = {
  sources: sourcesData.length,
  evidenceRows: observationsData.length,
  capabilities: capabilitiesData.length,
  institutions: institutionsData.length,
};

function evidenceGroupFor(evidenceType: string): EvidenceGroup {
  return evidenceTypeGroups[evidenceType] ?? "analytical_proxy";
}

function placeLabel(observation: Observation): string {
  if (observation.city) {
    return observation.province
      ? `${observation.city}, ${observation.province}`
      : observation.city;
  }
  if (observation.province) return observation.province;
  return formatEntityType(observation.entity_type);
}

export default function ExplorerPage() {
  const [segmentFilter, setSegmentFilter] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [confidenceFilter, setConfidenceFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return observationsData.filter((observation) => {
      if (segmentFilter && observation.segment !== segmentFilter) return false;
      if (
        groupFilter &&
        evidenceGroupFor(observation.evidence_type) !== groupFilter
      )
        return false;
      if (typeFilter && observation.evidence_type !== typeFilter) return false;
      if (confidenceFilter && observation.confidence !== confidenceFilter)
        return false;
      if (cityFilter && observation.city !== cityFilter) return false;
      return true;
    });
  }, [segmentFilter, groupFilter, typeFilter, confidenceFilter, cityFilter]);

  function toggleRow(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearAllFilters() {
    setSegmentFilter("");
    setGroupFilter("");
    setTypeFilter("");
    setConfidenceFilter("");
    setCityFilter("");
  }

  const hasActiveFilters = Boolean(
    segmentFilter || groupFilter || typeFilter || confidenceFilter || cityFilter,
  );

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
        <header className="border-b border-stone-300 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            Evidence explorer
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
            Evidence Explorer
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-stone-700">
            Filter the public evidence signals behind the visual brief.
          </p>
          <p className="mt-6 max-w-3xl border-l-2 border-stone-400 pl-4 text-sm leading-6 text-stone-600">
            This explorer is for auditability. The homepage interprets the
            evidence; this page exposes the rows.
          </p>
        </header>

        <section
          aria-label="Dataset totals"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <KpiCard
            label="Sources"
            value={totals.sources}
            note="ledger entries"
          />
          <KpiCard
            label="Evidence rows"
            value={totals.evidenceRows}
            note="evidence rows in beta dataset"
          />
          <KpiCard
            label="Capabilities"
            value={totals.capabilities}
            note="taxonomy rows"
          />
          <KpiCard
            label="Institutions"
            value={totals.institutions}
            note="public institution signals"
          />
        </section>

        <section
          aria-label="Filters"
          className="border border-stone-300 bg-white p-5"
        >
          <div className="flex items-baseline justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              Filters
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearAllFilters}
                className="text-xs font-medium text-stone-700 underline-offset-2 hover:text-stone-950 hover:underline"
              >
                Clear all
              </button>
            ) : null}
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <FilterSelect
              label="Segment"
              value={segmentFilter}
              onChange={setSegmentFilter}
              options={segmentOptions}
            />
            <FilterSelect
              label="Evidence group"
              value={groupFilter}
              onChange={setGroupFilter}
              options={evidenceGroupOptions}
            />
            <FilterSelect
              label="Evidence type"
              value={typeFilter}
              onChange={setTypeFilter}
              options={evidenceTypeOptions}
            />
            <FilterSelect
              label="Confidence"
              value={confidenceFilter}
              onChange={setConfidenceFilter}
              options={confidenceOptions}
            />
            <FilterSelect
              label="City"
              value={cityFilter}
              onChange={setCityFilter}
              options={cityOptions}
            />
          </div>
          <p className="mt-4 text-xs text-stone-600">
            Showing{" "}
            <span className="font-semibold text-stone-950">
              {numberFormatter.format(filtered.length)}
            </span>{" "}
            of {numberFormatter.format(totals.evidenceRows)} evidence rows in
            beta dataset.
          </p>
        </section>

        <section aria-label="Evidence rows">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-stone-300 bg-white px-5 py-10 text-center text-sm text-stone-600">
              No evidence rows match the current filters.
            </div>
          ) : (
            <div className="overflow-hidden border border-stone-300 bg-white">
              <div className="max-h-[720px] overflow-auto">
                <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
                    <tr>
                      <th className="min-w-72 px-4 py-3 font-semibold">
                        Claim
                      </th>
                      <th className="min-w-40 px-4 py-3 font-semibold">
                        Segment
                      </th>
                      <th className="min-w-44 px-4 py-3 font-semibold">
                        Place / entity
                      </th>
                      <th className="min-w-40 px-4 py-3 font-semibold">
                        Evidence type
                      </th>
                      <th className="w-28 px-4 py-3 font-semibold">
                        Confidence
                      </th>
                      <th className="min-w-52 px-4 py-3 font-semibold">
                        Source
                      </th>
                      <th className="w-16 px-3 py-3 text-right font-semibold">
                        Audit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filtered.map((observation) => {
                      const isOpen = expanded.has(observation.observation_id);
                      const source = sourceById.get(observation.source_id);

                      return (
                        <Fragment key={observation.observation_id}>
                          <tr
                            className={
                              isOpen ? "bg-stone-50" : "hover:bg-stone-50/60"
                            }
                          >
                            <td className="px-4 py-4 align-top">
                              <p className="font-medium text-stone-950">
                                {observation.indicator_name || "—"}
                              </p>
                              {observation.indicator_value ? (
                                <p className="mt-1 leading-6 text-stone-700">
                                  {observation.indicator_value}
                                </p>
                              ) : null}
                            </td>
                            <td className="px-4 py-4 align-top text-stone-700">
                              {observation.segment
                                ? formatSegment(observation.segment)
                                : "—"}
                            </td>
                            <td className="px-4 py-4 align-top">
                              <p className="text-stone-800">
                                {placeLabel(observation)}
                              </p>
                              {observation.entity_type ? (
                                <p className="mt-1 text-xs text-stone-500">
                                  {formatEntityType(observation.entity_type)}
                                </p>
                              ) : null}
                            </td>
                            <td className="px-4 py-4 align-top text-stone-700">
                              {formatEvidenceType(observation.evidence_type)}
                            </td>
                            <td className="px-4 py-4 align-top text-stone-700">
                              {formatConfidence(observation.confidence)}
                            </td>
                            <td className="px-4 py-4 align-top">
                              <p className="font-medium text-stone-900">
                                {source?.title ?? "Source not in ledger"}
                              </p>
                              {source?.publisher ? (
                                <p className="mt-1 text-xs text-stone-500">
                                  {source.publisher}
                                </p>
                              ) : null}
                            </td>
                            <td className="px-3 py-4 text-right align-top">
                              <button
                                type="button"
                                onClick={() =>
                                  toggleRow(observation.observation_id)
                                }
                                aria-expanded={isOpen}
                                aria-controls={`audit-${observation.observation_id}`}
                                className="inline-flex h-8 items-center justify-center border border-stone-300 bg-white px-2.5 text-xs font-medium text-stone-700 hover:border-stone-500 hover:bg-stone-50"
                              >
                                {isOpen ? "Hide" : "Audit"}
                              </button>
                            </td>
                          </tr>
                          {isOpen ? (
                            <tr
                              id={`audit-${observation.observation_id}`}
                              className="bg-stone-100/80"
                            >
                              <td colSpan={7} className="px-4 py-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                                  Audit details
                                </p>
                                <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                  <AuditField
                                    label="observation_id"
                                    value={observation.observation_id}
                                  />
                                  <AuditField
                                    label="source_id"
                                    value={observation.source_id}
                                  />
                                  <AuditField
                                    label="capability_id"
                                    value={observation.capability_id}
                                  />
                                  <AuditField
                                    label="entity_id"
                                    value={observation.entity_id}
                                  />
                                </dl>
                                <div className="mt-4">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                                    notes
                                  </p>
                                  {observation.notes ? (
                                    <p className="mt-2 text-xs leading-6 text-stone-700">
                                      {observation.notes}
                                    </p>
                                  ) : (
                                    <p className="mt-2 text-xs italic text-stone-400">
                                      No analyst notes recorded.
                                    </p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function KpiCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  return (
    <div className="border border-stone-300 bg-white p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-stone-500">
        {label}
      </p>
      <p className="mt-3 text-4xl font-semibold tracking-tight">
        {numberFormatter.format(value)}
      </p>
      <p className="mt-2 text-sm text-stone-600">{note}</p>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 border border-stone-300 bg-white px-2.5 text-sm text-stone-800 focus:border-stone-700 focus:outline-none"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function AuditField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
        {label}
      </dt>
      <dd className="mt-1 font-mono text-xs text-stone-800">
        {value ? value : <span className="text-stone-400">—</span>}
      </dd>
    </div>
  );
}
