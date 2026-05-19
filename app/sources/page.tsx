"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import sourcesData from "@/data/generated/sources.json";

type SourceRecord = (typeof sourcesData)[number];

const numberFormatter = new Intl.NumberFormat("en-US");

const sourceTypeOptions = (() => {
  const values = new Set<string>();
  for (const source of sourcesData) {
    if (source.source_type) values.add(source.source_type);
  }
  return Array.from(values)
    .sort((a, b) => a.localeCompare(b))
    .map((value) => ({ id: value, label: value }));
})();

const languageOptions = (() => {
  const values = new Set<string>();
  for (const source of sourcesData) {
    if (source.language) values.add(source.language);
  }
  return Array.from(values)
    .sort()
    .map((value) => ({ id: value, label: value }));
})();

const reuseValueOptions = (() => {
  const values = new Set<string>();
  for (const source of sourcesData) {
    if (source.reuse_value) values.add(source.reuse_value);
  }
  return Array.from(values)
    .sort()
    .map((value) => ({ id: value, label: value }));
})();

const publisherCount = new Set(
  sourcesData.map((source) => source.publisher).filter(Boolean),
).size;

export default function SourcesPage() {
  const [typeFilter, setTypeFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [reuseFilter, setReuseFilter] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return sourcesData.filter((source) => {
      if (typeFilter && source.source_type !== typeFilter) return false;
      if (languageFilter && source.language !== languageFilter) return false;
      if (reuseFilter && source.reuse_value !== reuseFilter) return false;
      return true;
    });
  }, [typeFilter, languageFilter, reuseFilter]);

  function toggleRow(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function clearAllFilters() {
    setTypeFilter("");
    setLanguageFilter("");
    setReuseFilter("");
  }

  const hasActiveFilters = Boolean(
    typeFilter || languageFilter || reuseFilter,
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
            <Link href="/explorer" className="hover:text-stone-950">
              Explorer
            </Link>
            <Link href="/methodology" className="hover:text-stone-950">
              Methodology
            </Link>
          </nav>
          <div className="mt-5 flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <span className="font-mono text-stone-800">Audit layer</span>
            <span aria-hidden className="text-stone-400">·</span>
            <span className="text-stone-500">Source ledger</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Source Ledger
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-700 sm:text-base">
            Every observation in the explorer resolves to one entry in this
            ledger. The audit panel on each row carries publication and
            access dates, analyst notes, and the source identifier.
          </p>
        </header>

        <section
          aria-label="Ledger totals"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          <LedgerStat
            label="Sources"
            value={sourcesData.length}
            note="ledger entries"
          />
          <LedgerStat
            label="Publishers"
            value={publisherCount}
            note="distinct publishing bodies"
          />
          <LedgerStat
            label="Source types"
            value={sourceTypeOptions.length}
            note="record categories in use"
          />
          <LedgerStat
            label="Languages"
            value={languageOptions.length}
            note="of original publication"
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
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FilterSelect
              label="Source type"
              value={typeFilter}
              onChange={setTypeFilter}
              options={sourceTypeOptions}
            />
            <FilterSelect
              label="Language"
              value={languageFilter}
              onChange={setLanguageFilter}
              options={languageOptions}
            />
            <FilterSelect
              label="Reuse value"
              value={reuseFilter}
              onChange={setReuseFilter}
              options={reuseValueOptions}
            />
          </div>
          <p className="mt-4 text-xs text-stone-600">
            Showing{" "}
            <span className="font-semibold text-stone-950">
              {numberFormatter.format(filtered.length)}
            </span>{" "}
            of {numberFormatter.format(sourcesData.length)} ledger entries.
          </p>
        </section>

        <section aria-label="Source ledger">
          {filtered.length === 0 ? (
            <div className="border border-dashed border-stone-300 bg-white px-5 py-10 text-center text-sm text-stone-600">
              No sources match the current filters.
            </div>
          ) : (
            <div className="overflow-hidden border border-stone-300 bg-white">
              <div className="max-h-[720px] overflow-auto">
                <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
                  <thead className="sticky top-0 z-10 bg-stone-50 text-xs uppercase tracking-[0.14em] text-stone-500">
                    <tr>
                      <th className="min-w-72 px-4 py-3 font-semibold">
                        Source
                      </th>
                      <th className="min-w-44 px-4 py-3 font-semibold">
                        Publisher
                      </th>
                      <th className="min-w-44 px-4 py-3 font-semibold">
                        Type
                      </th>
                      <th className="w-28 px-4 py-3 font-semibold">
                        Reuse value
                      </th>
                      <th className="min-w-72 px-4 py-3 font-semibold">
                        Caveat
                      </th>
                      <th className="w-24 px-4 py-3 font-semibold">Link</th>
                      <th className="w-16 px-3 py-3 text-right font-semibold">
                        Audit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200">
                    {filtered.map((source) => {
                      const isOpen = expanded.has(source.source_id);
                      return (
                        <Fragment key={source.source_id}>
                          <tr
                            className={
                              isOpen ? "bg-stone-50" : "hover:bg-stone-50/60"
                            }
                          >
                            <td className="px-4 py-4 align-top">
                              <p className="font-medium text-stone-950">
                                {source.title || "—"}
                              </p>
                            </td>
                            <td className="px-4 py-4 align-top text-stone-700">
                              {source.publisher || "—"}
                            </td>
                            <td className="px-4 py-4 align-top text-stone-700">
                              {source.source_type || "—"}
                            </td>
                            <td className="px-4 py-4 align-top">
                              <ReuseValueBadge value={source.reuse_value} />
                            </td>
                            <td className="px-4 py-4 align-top leading-6 text-stone-600">
                              {source.caveats ? (
                                source.caveats
                              ) : (
                                <span className="text-stone-400">
                                  None recorded
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-4 align-top">
                              {source.url ? (
                                <a
                                  href={source.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs font-medium text-stone-900 underline-offset-2 hover:underline"
                                >
                                  Open
                                  <span aria-hidden>↗</span>
                                </a>
                              ) : (
                                <span className="text-xs text-stone-400">
                                  —
                                </span>
                              )}
                            </td>
                            <td className="px-3 py-4 text-right align-top">
                              <button
                                type="button"
                                onClick={() => toggleRow(source.source_id)}
                                aria-expanded={isOpen}
                                aria-controls={`audit-${source.source_id}`}
                                className="inline-flex h-8 items-center justify-center border border-stone-300 bg-white px-2.5 text-xs font-medium text-stone-700 hover:border-stone-500 hover:bg-stone-50"
                              >
                                {isOpen ? "Hide" : "Audit"}
                              </button>
                            </td>
                          </tr>
                          {isOpen ? (
                            <tr
                              id={`audit-${source.source_id}`}
                              className="bg-stone-100/80"
                            >
                              <td colSpan={7} className="px-4 py-5">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                                  Audit details
                                </p>
                                <dl className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                  <AuditField
                                    label="source_id"
                                    value={source.source_id}
                                    mono
                                  />
                                  <AuditField
                                    label="publication_date"
                                    value={source.publication_date}
                                    mono
                                  />
                                  <AuditField
                                    label="access_date"
                                    value={source.access_date}
                                    mono
                                  />
                                  <AuditField
                                    label="language"
                                    value={source.language}
                                    mono
                                  />
                                </dl>
                                <div className="mt-4">
                                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                                    notes
                                  </p>
                                  {source.notes ? (
                                    <p className="mt-2 text-xs leading-6 text-stone-700">
                                      {source.notes}
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

        <footer className="flex flex-col gap-3 border-t border-stone-300 pt-8 text-sm leading-7 text-stone-700 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Continue reading:{" "}
            <Link
              href="/methodology"
              className="font-medium text-stone-950 underline-offset-2 hover:underline"
            >
              Methodology
            </Link>{" "}
            ·{" "}
            <Link
              href="/explorer"
              className="font-medium text-stone-950 underline-offset-2 hover:underline"
            >
              Evidence Explorer
            </Link>
          </p>
          <p className="text-xs text-stone-500">
            Ledger covers every public record cited by the beta dataset.
          </p>
        </footer>
      </div>
    </main>
  );
}

function LedgerStat({
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

function ReuseValueBadge({ value }: { value: string }) {
  if (!value) return <span className="text-xs text-stone-400">—</span>;
  const lower = value.toLowerCase();
  const tone =
    lower === "high"
      ? "border-stone-900 bg-stone-950 text-stone-50"
      : lower === "medium"
        ? "border-stone-400 bg-stone-100 text-stone-800"
        : "border-stone-300 bg-white text-stone-700";
  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.16em] ${tone}`}
    >
      {value}
    </span>
  );
}

function AuditField({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
        {label}
      </dt>
      <dd
        className={`mt-1 text-xs text-stone-800 ${
          mono ? "font-mono" : "leading-6"
        }`}
      >
        {value ? value : <span className="text-stone-400">—</span>}
      </dd>
    </div>
  );
}
