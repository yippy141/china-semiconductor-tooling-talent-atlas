import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import capabilitiesData from "@/data/generated/capabilities.json";
import roleFamiliesData from "@/data/generated/role_families.json";
import observationsData from "@/data/generated/observations.json";
import sourcesData from "@/data/generated/sources.json";
import { segmentProfiles } from "@/data/editorial/segment-profiles";

type SourceRecord = (typeof sourcesData)[number];
type Capability = (typeof capabilitiesData)[number];
type RoleFamily = (typeof roleFamiliesData)[number];
type Observation = (typeof observationsData)[number];

const sourceById = new Map<string, SourceRecord>(
  sourcesData.map((source) => [source.source_id, source]),
);

const profileById = new Map(
  segmentProfiles.map((profile) => [profile.id, profile]),
);

export function generateStaticParams() {
  return segmentProfiles.map((profile) => ({ segment: profile.id }));
}

type SegmentPageProps = {
  params: Promise<{
    segment: string;
  }>;
};

export default async function SegmentPage({ params }: SegmentPageProps) {
  const { segment } = await params;
  const profile = profileById.get(segment);

  if (!profile) notFound();

  const capabilities: Capability[] = capabilitiesData.filter(
    (capability) => capability.segment === profile.id,
  );

  const roleFamilies: RoleFamily[] = roleFamiliesData.filter(
    (role) => role.segment === profile.id,
  );

  const observations: Observation[] = observationsData.filter(
    (observation) => observation.segment === profile.id,
  );

  const sources = profile.source_ids
    .map((sourceId) => sourceById.get(sourceId))
    .filter((source): source is SourceRecord => Boolean(source));

  const explorerHref = `/explorer?segment=${profile.id}`;

  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10">
        <header className="border-b-2 border-stone-900 pb-8">
          <nav
            aria-label="Segment brief navigation"
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

          <div className="mt-6 flex items-baseline gap-2 text-[11px] font-semibold uppercase tracking-[0.22em]">
            <span className="font-mono text-stone-800">Segment brief</span>
            <span aria-hidden className="text-stone-400">
              /
            </span>
            <span className="text-stone-500">{profile.id}</span>
          </div>

          <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_16rem] lg:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {profile.label}
              </h1>
              <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-800">
                {profile.plainEnglishDefinition}
              </p>
            </div>

            <dl className="border border-stone-300 bg-white p-5">
              <div>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Catalogued
                </dt>
                <dd className="mt-2 font-mono text-sm text-stone-700">
                  {capabilities.length} capabilities · {roleFamilies.length}{" "}
                  role families
                </dd>
              </div>
              <div className="mt-5 border-t border-stone-200 pt-4">
                <dt className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone-500">
                  Evidence rows in segment
                </dt>
                <dd className="mt-2 font-mono text-sm text-stone-700">
                  {observations.length} observations
                </dd>
              </div>
            </dl>
          </div>

          <div className="mt-6">
            <Link
              href={explorerHref}
              className="inline-flex h-11 items-center justify-center border border-stone-900 bg-stone-900 px-5 text-sm font-semibold text-stone-50 hover:bg-stone-800"
            >
              Open this segment in the evidence explorer &rarr;
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="border border-stone-300 bg-white p-6 sm:p-8">
            <SectionEyebrow>What this segment covers</SectionEyebrow>
            <p className="mt-3 text-base leading-8 text-stone-700">
              {profile.plainEnglishDefinition}
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">
              The four tooling segments in this monitor are not interchangeable.
              Thin-film talent is not lithography talent. Etch talent is not
              metrology talent. This brief lists the role families, bottlenecks,
              and public signals tied specifically to {profile.label.toLowerCase()}.
            </p>
          </article>

          <aside className="border border-stone-300 bg-stone-50 p-6 sm:p-8">
            <SectionEyebrow>Boundary condition</SectionEyebrow>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              {profile.caveat}
            </p>
          </aside>
        </section>

        <section
          aria-labelledby="capabilities"
          className="border border-stone-300 bg-white"
        >
          <SectionHeader
            id="capabilities"
            eyebrow="Capability taxonomy"
            title="Capabilities attached to this segment"
            description="Each capability names a discrete technical problem a competent supplier has to solve. The list is taxonomy, not a score."
          />
          {capabilities.length === 0 ? (
            <p className="px-6 py-6 text-sm text-stone-600 sm:px-8">
              No capabilities are catalogued for this segment yet.
            </p>
          ) : (
            <div className="grid gap-px bg-stone-200 md:grid-cols-2">
              {capabilities.map((capability) => (
                <article
                  key={capability.capability_id}
                  className="bg-white p-6"
                >
                  <p className="font-mono text-[11px] text-stone-500">
                    {capability.capability_id}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight">
                    {capability.capability_name}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">
                    {capability.plain_english_description}
                  </p>
                  {capability.core_technical_problems ? (
                    <p className="mt-3 text-xs leading-6 text-stone-500">
                      Core problems: {capability.core_technical_problems}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>

        <section
          aria-labelledby="role-families"
          className="border border-stone-300 bg-white"
        >
          <SectionHeader
            id="role-families"
            eyebrow="Role families"
            title="Role families attached to this segment"
            description="These are the kinds of people the segment relies on. Public sources reveal each role family with different visibility."
          />
          {roleFamilies.length === 0 ? (
            <p className="px-6 py-6 text-sm text-stone-600 sm:px-8">
              No role families are catalogued for this segment yet.
            </p>
          ) : (
            <div className="grid gap-px bg-stone-200 md:grid-cols-2">
              {roleFamilies.map((role) => (
                <article key={role.role_family_id} className="bg-white p-6">
                  <p className="font-mono text-[11px] text-stone-500">
                    {role.role_family_id}
                  </p>
                  <h3 className="mt-2 text-base font-semibold tracking-tight">
                    {role.role_family}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-stone-700">
                    {role.plain_english_description}
                  </p>
                  {role.typical_titles ? (
                    <p className="mt-3 text-xs leading-6 text-stone-500">
                      Typical titles: {role.typical_titles}
                    </p>
                  ) : null}
                  <p className="mt-3 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    Public observability: {role.observability}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <ListPanel
            eyebrow="Likely bottlenecks"
            title="Where the hard problems sit"
            items={profile.likelyBottlenecks}
          />
          <ListPanel
            eyebrow="Public signals"
            title="What public records tend to reveal"
            items={profile.publicSignals}
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <ListPanel
            eyebrow="What to watch"
            title="Signals worth checking next"
            items={profile.whatToWatch}
          />
          <section className="border border-stone-300 bg-stone-50 p-6 sm:p-8">
            <SectionEyebrow>Do not infer</SectionEyebrow>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight">
              Limits of the public record
            </h2>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-stone-700">
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-3 inline-block h-px w-4 shrink-0 bg-stone-400"
                />
                <span>
                  Capability and role-family counts on this page describe how
                  much taxonomy is catalogued. They are not workforce size, market
                  share, or capability score.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-3 inline-block h-px w-4 shrink-0 bg-stone-400"
                />
                <span>
                  Public signals expose product families and role language. They
                  do not expose yield-learning depth, customer-site quality, or
                  segment-specific headcount.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-3 inline-block h-px w-4 shrink-0 bg-stone-400"
                />
                <span>{profile.caveat}</span>
              </li>
            </ul>
          </section>
        </section>

        <section
          aria-labelledby="segment-sources"
          className="border border-stone-300 bg-white"
        >
          <SectionHeader
            id="segment-sources"
            eyebrow="Source trail"
            title="Anchor sources for this segment"
            description="These are the source records this brief leans on most. The full source ledger is available on the sources page."
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

        <section className="border border-stone-300 bg-white p-6 sm:p-8">
          <SectionEyebrow>Next step</SectionEyebrow>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
            The evidence explorer holds the {observations.length} rows tied to
            this segment. Open it to inspect the underlying records, filter by
            evidence type, and trace each row back to its source.
          </p>
          <div className="mt-5">
            <Link
              href={explorerHref}
              className="inline-flex h-11 items-center justify-center border border-stone-900 bg-stone-900 px-5 text-sm font-semibold text-stone-50 hover:bg-stone-800"
            >
              Open this segment in the evidence explorer &rarr;
            </Link>
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
  items: string[];
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
