import Link from "next/link";
import type { FirmProfile } from "@/data/editorial/firm-profiles";

type FirmIndexGridProps = {
  fullProfiles: FirmProfile[];
  lightProfiles: FirmProfile[];
};

export function FirmIndexGrid({
  fullProfiles,
  lightProfiles,
}: FirmIndexGridProps) {
  return (
    <div className="flex flex-col gap-12">
      <FirmSection
        id="full-dossiers"
        eyebrow="Section 1"
        title="Full dossiers"
        description="These firms have enough current source coverage for a fuller product and workforce-read page."
        profiles={fullProfiles}
      />
      <FirmSection
        id="lighter-watch-cards"
        eyebrow="Section 2"
        title="Lighter watch cards"
        description="These firms belong in the monitor, but their current records need cautious handling before the site makes stronger claims."
        profiles={lightProfiles}
      />
    </div>
  );
}

function FirmSection({
  id,
  eyebrow,
  title,
  description,
  profiles,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  profiles: FirmProfile[];
}) {
  return (
    <section aria-labelledby={id}>
      <div className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          {eyebrow}
        </p>
        <h2
          id={id}
          className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {title}
        </h2>
        <p className="mt-4 text-sm leading-7 text-stone-700">
          {description}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 md:grid-cols-2">
        {profiles.map((profile) => (
          <FirmCard key={profile.slug} profile={profile} />
        ))}
      </div>
    </section>
  );
}

function FirmCard({ profile }: { profile: FirmProfile }) {
  return (
    <Link
      href={`/firms/${profile.slug}`}
      className="group flex min-h-80 flex-col bg-white p-6 transition-colors hover:bg-stone-50 sm:p-7"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            {profile.headquarters}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
            {profile.name}
          </h3>
          <p className="mt-1 text-sm text-stone-500">{profile.nameCn}</p>
        </div>
        <span className="border border-stone-300 bg-stone-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-600">
          {profile.profileType === "full" ? "Dossier" : "Watch card"}
        </span>
      </div>

      <p className="mt-5 text-sm leading-7 text-stone-700">
        {profile.oneLine}
      </p>

      <ul className="mt-5 flex flex-wrap gap-2">
        {profile.segments.map((segment) => (
          <li
            key={segment}
            className="border border-stone-300 bg-stone-50 px-2.5 py-1 text-[11px] text-stone-700"
          >
            {segment}
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-dashed border-stone-300 pt-5">
        <p className="text-xs leading-6 text-stone-600">
          {profile.productFamilies.length} product-record{" "}
          {profile.productFamilies.length === 1 ? "entry" : "entries"} ·{" "}
          {profile.source_ids.length} public{" "}
          {profile.source_ids.length === 1 ? "source" : "sources"}
        </p>
        <span className="mt-4 inline-flex text-sm font-semibold text-stone-950 underline-offset-4 group-hover:underline">
          Open {profile.profileType === "full" ? "dossier" : "watch card"} -&gt;
        </span>
      </div>
    </Link>
  );
}
