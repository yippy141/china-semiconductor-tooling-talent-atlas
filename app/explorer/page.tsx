"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useMemo, useState } from "react";
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

const evidenceGroupRank: Record<EvidenceGroup, number> = {
  direct_public_record: 0,
  analytical_proxy: 1,
  taxonomy_scaffold: 2,
};

const confidenceRank: Record<string, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

function evidenceGroupFor(evidenceType: string): EvidenceGroup {
  return evidenceTypeGroups[evidenceType] ?? "analytical_proxy";
}

function isTaxonomyScaffoldRow(observation: Observation) {
  return observation.evidence_type === "manual_inference";
}

function isSourceInfrastructureRow(observation: Observation) {
  return (
    observation.entity_type === "proxy_source" ||
    observation.entity_type === "source"
  );
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

function ExplorerInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = useMemo(
    () => ({
      segment: searchParams.get("segment") ?? "",
      city: searchParams.get("city") ?? "",
      evidenceGroup: searchParams.get("evidence_group") ?? "",
      evidenceType: searchParams.get("evidence_type") ?? "",
      confidence: searchParams.get("confidence") ?? "",
      entityId: searchParams.get("entity_id") ?? "",
    }),
    // Read from URL only on mount; UI interactions drive state directly afterwards.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [segmentFilter, setSegmentFilter] = useState(initial.segment);
  const [groupFilter, setGroupFilter] = useState(initial.evidenceGroup);
  const [typeFilter, setTypeFilter] = useState(initial.evidenceType);
  const [confidenceFilter, setConfidenceFilter] = useState(initial.confidence);
  const [cityFilter, setCityFilter] = useState(initial.city);
  const [entityIdFilter, setEntityIdFilter] = useState(initial.entityId);
  const [showTaxonomyScaffold, setShowTaxonomyScaffold] = useState(false);
  const [showSourceInfrastructure, setShowSourceInfrastructure] = useState(
    false,
  );
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    const rows = observationsData.filter((observation) => {
      if (
        !showTaxonomyScaffold &&
        isTaxonomyScaffoldRow(observation)
      )
        return false;
      if (
        !showSourceInfrastructure &&
        isSourceInfrastructureRow(observation)
      )
        return false;
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
      if (entityIdFilter && observation.entity_id !== entityIdFilter)
        return false;
      return true;
    });

    return rows.slice().sort((a, b) => {
      const groupA =
        evidenceGroupRank[evidenceGroupFor(a.evidence_type)] ?? 99;
      const groupB =
        evidenceGroupRank[evidenceGroupFor(b.evidence_type)] ?? 99;
      if (groupA !== groupB) return groupA - groupB;
      const confA = confidenceRank[a.confidence?.toLowerCase()] ?? 99;
      const confB = confidenceRank[b.confidence?.toLowerCase()] ?? 99;
      return confA - confB;
    });
  }, [
    segmentFilter,
    groupFilter,
    typeFilter,
    confidenceFilter,
    cityFilter,
    entityIdFilter,
    showTaxonomyScaffold,
    showSourceInfrastructure,
  ]);

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
    setEntityIdFilter("");
    setShowTaxonomyScaffold(false);
    setShowSourceInfrastructure(false);
    router.push("/explorer");
  }

  const hasActiveFilters = Boolean(
    segmentFilter ||
      groupFilter ||
      typeFilter ||
      confidenceFilter ||
      cityFilter ||
      entityIdFilter ||
      showTaxonomyScaffold ||
      showSourceInfrastructure,
  );

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-10 sm:px-8 lg:px-10">
        <header className="border-b border-stone-300 pb-6">
          <nav
            aria-label="Atlas sections"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500"
          >
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <Link href="/methodology" className="hover:text-stone-950">
              Methodology
            </Link>
            <Link href="/sources" className="hover:text-stone-950">
              Source ledger
            </Link>
          </nav>
          <div className="mt-5 flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <span className="font-mono text-stone-800">Audit layer</span>
            <span aria-hidden className="text-stone-400">·</span>
            <span className="text-stone-500">Evidence rows</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Evidence Explorer
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-700 sm:text-base">
            Filter the public evidence signals behind the visual brief. The
            homepage interprets the evidence; this page exposes the rows.
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
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-stone-200 pt-4">
            <ToggleCheckbox
              label="Show taxonomy scaffold"
              checked={showTaxonomyScaffold}
              onChange={setShowTaxonomyScaffold}
              hint="Includes manual_inference rows that map disciplines, roles, and segments."
            />
            <ToggleCheckbox
              label="Show source infrastructure rows"
              checked={showSourceInfrastructure}
              onChange={setShowSourceInfrastructure}
              hint="Includes ledger and proxy-source bookkeeping rows."
            />
          </div>
          {entityIdFilter ? (
            <p className="mt-4 flex items-center gap-3 text-xs text-stone-700">
              <span>
                Entity ID filter:{" "}
                <span className="rounded-sm bg-stone-100 px-1.5 py-0.5 font-mono text-stone-900">
                  {entityIdFilter}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setEntityIdFilter("")}
                className="text-xs font-medium text-stone-600 underline-offset-2 hover:text-stone-950 hover:underline"
              >
                Clear
              </button>
            </p>
          ) : null}
          <p className="mt-4 text-xs text-stone-600">
            Showing{" "}
            <span className="font-semibold text-stone-950">
              {numberFormatter.format(filtered.length)}
            </span>{" "}
            substantive rows of{" "}
            {numberFormatter.format(totals.evidenceRows)} total beta rows.
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

export default function ExplorerPage() {
  return (
    <Suspense fallback={null}>
      <ExplorerInner />
    </Suspense>
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
    <div className="border border-stone-300 bg-white p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
        {label}
      </p>
      <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-stone-950">
        {numberFormatter.format(value)}
      </p>
      <p className="mt-1 text-xs leading-5 text-stone-600">{note}</p>
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

function ToggleCheckbox({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  hint?: string;
}) {
  return (
    <label className="flex max-w-md items-start gap-2 text-xs text-stone-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="mt-0.5 h-4 w-4 border-stone-300 text-stone-900 focus:ring-stone-700"
      />
      <span className="flex flex-col">
        <span className="font-medium text-stone-800">{label}</span>
        {hint ? (
          <span className="mt-0.5 text-[11px] leading-5 text-stone-500">
            {hint}
          </span>
        ) : null}
      </span>
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
