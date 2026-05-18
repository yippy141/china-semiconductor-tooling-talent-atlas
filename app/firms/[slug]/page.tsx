import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import sourcesData from "@/data/generated/sources.json";
import {
  firmProfileBySlug,
  firmProfiles,
  type FirmProfile,
} from "@/data/editorial/firm-profiles";

type SourceRecord = (typeof sourcesData)[number];

const sourceById = new Map<string, SourceRecord>(
  sourcesData.map((source) => [source.source_id, source]),
);

export function generateStaticParams() {
  return firmProfiles.map((profile) => ({ slug: profile.slug }));
}

type FirmPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function FirmPage({ params }: FirmPageProps) {
  const { slug } = await params;
  const profile = firmProfileBySlug.get(slug);

  if (!profile) notFound();

  const sources = profile.source_ids
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source): source is SourceRecord => Boolean(source));

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10">
        <header className="border-b-2 border-stone-900 pb-8">
          <nav
            aria-label="Firm dossier navigation"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500"
          >
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <Link href="/explorer" className="hover:text-stone-950">
              Explorer
            </Link>
          </nav>

          <div className="mt-6 flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <span className="font-mono text-stone-800">Firm dossier</span>
            <span aria-hidden className="text-stone-400">
              /
            </span>
            <span className="text-stone-500">{profile.headquarters}</span>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_16rem] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {profile.name}
              </h1>
              <p className="mt-2 text-lg text-stone-600">{profile.nameCn}</p>
              <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-800">
                {profile.oneLine}
              </p>
            </div>

            <dl className="border border-stone-300 bg-white p-5">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Headquarters
                </dt>
                <dd className="mt-2 text-2xl font-semibold tracking-tight">
                  {profile.headquarters}
                </dd>
              </div>
              <div className="mt-5 border-t border-stone-200 pt-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Firm ID
                </dt>
                <dd className="mt-2 font-mono text-sm text-stone-700">
                  {profile.firmId}
                </dd>
              </div>
            </dl>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {profile.segments.map((segment) => (
              <li
                key={segment}
                className="border border-stone-300 bg-stone-50 px-3 py-1.5 text-xs font-medium text-stone-700"
              >
                {segment}
              </li>
            ))}
          </ul>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="border border-stone-300 bg-white p-6 sm:p-8">
            <SectionEyebrow>Analyst read</SectionEyebrow>
            <p className="mt-3 text-base leading-8 text-stone-700">
              {profile.analystRead}
            </p>
          </article>

          <aside className="border border-stone-300 bg-stone-50 p-6 sm:p-8">
            <SectionEyebrow>Boundary condition</SectionEyebrow>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              Workforce figures on this page are published firm-level signals.
              They should not be read as segment-specific headcount.
            </p>
          </aside>
        </section>

        <section
          aria-labelledby="product-families"
          className="border border-stone-300 bg-white"
        >
          <SectionHeader
            id="product-families"
            eyebrow="Public product record"
            title="Product families"
            description="These entries summarize how existing source records place the firm in the monitor. They are evidence pointers, not technical performance claims."
          />
          <div className="grid gap-px bg-stone-200 md:grid-cols-3">
            {profile.productFamilies.map((family) => (
              <article
                key={`${family.source_id}-${family.label}`}
                className="bg-white p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  {family.segment}
                </p>
                <h3 className="mt-3 text-lg font-semibold tracking-tight">
                  {family.label}
                </h3>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {family.publicRecord}
                </p>
                <SourcePill sourceId={family.source_id} />
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="workforce-signals"
          className="border border-stone-300 bg-white"
        >
          <SectionHeader
            id="workforce-signals"
            eyebrow="Listed-company disclosure"
            title="Workforce signals"
            description="Values are copied from the current firm workforce snapshots. They describe firm-level public evidence signal, not product-line staffing."
          />
          <div className="grid gap-px bg-stone-200 md:grid-cols-3">
            {profile.workforceSignals.map((signal) => (
              <article
                key={`${signal.source_id}-${signal.label}`}
                className="bg-white p-6"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  {signal.label}
                </p>
                <p className="mt-3 font-mono text-3xl font-semibold tracking-tight">
                  {signal.value}
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-700">
                  {signal.note}
                </p>
                <SourcePill sourceId={signal.source_id} />
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <ListPanel
            eyebrow="What to watch"
            title="Signals worth checking next"
            items={profile.watchSignals}
          />
          <ListPanel
            eyebrow="Do not infer"
            title="Limits of the public record"
            items={profile.doNotInfer}
          />
        </section>

        <section
          aria-labelledby="firm-sources"
          className="border border-stone-300 bg-white"
        >
          <SectionHeader
            id="firm-sources"
            eyebrow="Source trail"
            title="Sources"
            description="The dossier only uses source IDs already present in the local source ledger."
          />
          <div className="divide-y divide-stone-200">
            {sources.map((source) => (
              <article
                key={source.source_id}
                className="grid gap-4 px-6 py-5 sm:px-8 md:grid-cols-[1fr_auto] md:items-start"
              >
                <div>
                  <p className="font-mono text-xs font-semibold text-stone-500">
                    {source.source_id}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight">
                    {source.title}
                  </h3>
                  <p className="mt-1 text-sm text-stone-600">
                    {source.publisher} · {source.source_type}
                  </p>
                  {source.notes ? (
                    <p className="mt-3 text-sm leading-7 text-stone-700">
                      {source.notes}
                    </p>
                  ) : null}
                  {source.caveats ? (
                    <p className="mt-3 text-xs leading-6 text-stone-500">
                      Caveat: {source.caveats}
                    </p>
                  ) : null}
                </div>
                {source.url ? (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-10 items-center justify-center border border-stone-300 px-4 text-sm font-semibold text-stone-800 hover:border-stone-950 hover:text-stone-950"
                  >
                    View source
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
      {children}
    </p>
  );
}

function SectionHeader({
  id,
  eyebrow,
  title,
  description,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-stone-200 px-6 py-6 sm:px-8">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 id={id} className="mt-3 text-2xl font-semibold tracking-tight">
        {title}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
        {description}
      </p>
    </header>
  );
}

function ListPanel({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: FirmProfile["watchSignals"];
}) {
  return (
    <section className="border border-stone-300 bg-white p-6 sm:p-8">
      <SectionEyebrow>{eyebrow}</SectionEyebrow>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">{title}</h2>
      <ul className="mt-6 space-y-3 text-sm leading-7 text-stone-700">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <span
              aria-hidden
              className="mt-3 inline-block h-px w-4 shrink-0 bg-stone-400"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SourcePill({ sourceId }: { sourceId: string }) {
  const source = sourceById.get(sourceId);

  return (
    <p className="mt-5 inline-flex max-w-full border border-stone-300 bg-stone-50 px-2.5 py-1 font-mono text-[11px] text-stone-600">
      {source?.source_id ?? sourceId}
    </p>
  );
}
