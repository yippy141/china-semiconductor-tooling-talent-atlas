import {
  evidenceGroupLabels,
  evidenceTypeGroups,
  observationsByEvidenceGroup,
  observationsByEvidenceType,
  type EvidenceGroup,
} from "@/lib/atlas-analytics";

type Tier = {
  group: EvidenceGroup;
  index: string;
  framing: string;
  description: string;
  weightLabel: string;
  accent: string;
  rule: string;
};

const tiers: Tier[] = [
  {
    group: "direct_public_record",
    index: "01",
    framing: "Load-bearing",
    description:
      "Filings, official directories, industry presence, and shortage notices. These are disclosures that exist on the public record and can be re-checked at source.",
    weightLabel: "Strongest analytical weight",
    accent: "bg-stone-900",
    rule: "border-stone-900",
  },
  {
    group: "analytical_proxy",
    index: "02",
    framing: "Supporting",
    description:
      "Job postings, research-output indicators, and expert secondary sources. Directional context that helps frame the picture but should not be read as a measurement.",
    weightLabel: "Use as context, not as measurement",
    accent: "bg-amber-700",
    rule: "border-amber-700",
  },
  {
    group: "taxonomy_scaffold",
    index: "03",
    framing: "Navigational",
    description:
      "Manual inferences that link MOE disciplines and structural categories to tooling segments. They help readers navigate the monitor, but they are not evidence of real-world activity.",
    weightLabel: "Scaffolding only — not real-world signal",
    accent:
      "bg-[repeating-linear-gradient(135deg,#a8a29e_0,#a8a29e_4px,transparent_4px,transparent_8px)]",
    rule: "border-stone-400 border-dashed",
  },
];

const countByGroup = new Map<string, number>(
  observationsByEvidenceGroup.map((row) => [row.id, row.count]),
);

const subTypesByGroup: Record<
  EvidenceGroup,
  { label: string; count: number }[]
> = {
  direct_public_record: [],
  analytical_proxy: [],
  taxonomy_scaffold: [],
};

for (const row of observationsByEvidenceType) {
  const group = evidenceTypeGroups[row.id];
  if (!group) continue;
  subTypesByGroup[group].push({ label: row.label, count: row.count });
}

const numberFormatter = new Intl.NumberFormat("en-US");

export function EvidenceLadder() {
  return (
    <section
      aria-labelledby="evidence-ladder-heading"
      className="border border-stone-300 bg-stone-50"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Evidence ladder
        </p>
        <h3
          id="evidence-ladder-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          Three tiers of evidence
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-700">
          The monitor combines direct public records, analytical proxies, and
          taxonomy scaffolding. Each tier is reported separately.
        </p>
      </header>

      <ol className="flex flex-col">
        {tiers.map((tier) => {
          const groupLabel = evidenceGroupLabels[tier.group];
          const total = countByGroup.get(tier.group) ?? 0;
          const subTypes = subTypesByGroup[tier.group];

          return (
            <li
              key={tier.group}
              className={`relative grid grid-cols-1 gap-6 border-b ${tier.rule} px-6 py-8 last:border-b-0 sm:px-8 md:grid-cols-[8.5rem_1fr_10rem] md:items-start md:gap-8`}
            >
              <span
                aria-hidden
                className={`absolute left-0 top-0 h-full w-1.5 ${tier.accent}`}
              />

              <div className="pl-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Tier {tier.index}
                </p>
                <p className="mt-2 text-lg font-semibold tracking-tight text-stone-900">
                  {tier.framing}
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-stone-500">
                  {tier.weightLabel}
                </p>
              </div>

              <div className="pl-2 md:pl-0">
                <h4 className="text-xl font-semibold tracking-tight text-stone-950">
                  {groupLabel}
                </h4>
                <p className="mt-2 text-sm leading-7 text-stone-700">
                  {tier.description}
                </p>
                {subTypes.length > 0 ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {subTypes.map((subType) => (
                      <li
                        key={subType.label}
                        className="inline-flex items-baseline gap-2 border border-stone-300 bg-white px-2.5 py-1 text-xs text-stone-700"
                      >
                        <span>{subType.label}</span>
                        <span className="font-mono text-[11px] text-stone-500">
                          {numberFormatter.format(subType.count)}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="pl-2 md:border-l md:border-stone-200 md:pl-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  Rows in tier
                </p>
                <p className="mt-1 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
                  {numberFormatter.format(total)}
                </p>
                {tier.group === "taxonomy_scaffold" ? (
                  <p className="mt-3 text-[11px] leading-5 text-stone-500">
                    Helps navigation. Does not, on its own, show real-world
                    activity.
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="border-t border-stone-200 px-6 py-4 text-[11px] leading-6 text-stone-500 sm:px-8">
        Counts reflect the current observation set. No tier is rolled up into a
        single capability or visibility score.
      </p>
    </section>
  );
}
