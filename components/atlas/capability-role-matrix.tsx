import capabilitiesData from "@/data/generated/capabilities.json";
import roleFamiliesData from "@/data/generated/role_families.json";
import { segmentProfiles } from "@/data/editorial/segment-profiles";

type SegmentCounts = {
  capabilities: number;
  roleFamilies: number;
};

const countsBySegment: Record<string, SegmentCounts> = (() => {
  const counts: Record<string, SegmentCounts> = {};

  for (const profile of segmentProfiles) {
    counts[profile.id] = { capabilities: 0, roleFamilies: 0 };
  }

  for (const capability of capabilitiesData) {
    const segment = capability.segment;
    if (counts[segment]) counts[segment].capabilities += 1;
  }

  for (const roleFamily of roleFamiliesData) {
    const segment = roleFamily.segment;
    if (counts[segment]) counts[segment].roleFamilies += 1;
  }

  return counts;
})();

export function CapabilityRoleMatrix() {
  return (
    <section
      aria-labelledby="capability-role-matrix-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Capability and role matrix
        </p>
        <h3
          id="capability-role-matrix-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          What &ldquo;tooling talent&rdquo; actually means, by segment.
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          Why this matters: the equipment race is not generic STEM headcount.
          Each tool family relies on a specific mix of role families,
          process-window judgement, and customer-ramp know-how — and public
          sources reveal these in uneven ways.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 md:grid-cols-2 lg:grid-cols-4">
        {segmentProfiles.map((profile) => {
          const counts = countsBySegment[profile.id];
          return (
            <article
              key={profile.id}
              className="flex h-full flex-col gap-6 bg-white p-6"
            >
              <header className="flex flex-col gap-2 border-b border-stone-200 pb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Segment
                </p>
                <h4 className="text-lg font-semibold tracking-tight text-stone-950">
                  {profile.label}
                </h4>
                <p className="text-sm leading-6 text-stone-700">
                  {profile.plainEnglishDefinition}
                </p>
                {counts ? (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                    {counts.capabilities} capabilities ·{" "}
                    {counts.roleFamilies} role families catalogued
                  </p>
                ) : null}
              </header>

              <MatrixBlock
                label="Key role families"
                items={profile.keyRoleFamilies}
              />

              <MatrixBlock
                label="Likely bottlenecks"
                items={profile.likelyBottlenecks}
              />

              <MatrixBlock
                label="Public signals"
                items={profile.publicSignals}
              />

              <div className="mt-auto border-t border-dashed border-stone-300 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700">
                  Caveat
                </p>
                <p className="mt-2 text-xs leading-6 text-stone-600">
                  {profile.caveat}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function MatrixBlock({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
        {label}
      </p>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-stone-800">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              aria-hidden
              className="mt-2 inline-block h-px w-3 shrink-0 bg-stone-400"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
