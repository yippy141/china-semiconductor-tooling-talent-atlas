import { firmWorkforceSnapshots } from "@/data/editorial/firm-workforce-snapshots";
import { segmentProfiles } from "@/data/editorial/segment-profiles";
import {
  nonTaxonomyEvidenceRows,
  totalSources,
} from "@/lib/atlas-analytics";

const findings = [
  {
    number: "01",
    title: "Broad STEM totals are the wrong denominator.",
    body: "Etch, deposition, metrology, and lithography-adjacent tools each draw on a different mix of plasma, thin-film, optical, controls, and field-support talent. A national graduate total collapses those mixes into one number.",
  },
  {
    number: "02",
    title: "Listed-firm filings are the clearest workforce window.",
    body: "AMEC, ACM Research Shanghai, NAURA, and Piotech disclose more useful detail than education statistics: R&D scale, technical staff, degree mix, after-sales categories, and product-family breadth.",
  },
  {
    number: "03",
    title: "Customer-site support is the hardest layer to see.",
    body: "Product pages show ambition; filings show parts of the organization. Public sources rarely show installation practice, chamber matching, field calibration, service training, or recovery after maintenance.",
  },
];

export function TheArgument() {
  const bands = [
    { value: totalSources, label: "Sources cited" },
    {
      value: nonTaxonomyEvidenceRows.length,
      label: "Direct & proxy evidence rows",
    },
    { value: segmentProfiles.length, label: "Tool segments tracked" },
    {
      value: firmWorkforceSnapshots.length,
      label: "Firm workforce snapshots",
    },
  ];

  return (
    <section
      aria-labelledby="argument-heading"
      className="border-t border-rule-hair"
    >
      <div className="mx-auto w-full max-w-[1240px] px-6 py-16 sm:px-10 lg:px-14 lg:py-20">
        <h2
          id="argument-heading"
          className="max-w-4xl font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-ink sm:text-[2.6rem]"
        >
          The public record shows scale before customer-site depth.
        </h2>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-ink-soft">
          Most coverage of China&apos;s chip-tooling push tracks product
          launches: a new etch platform from Shanghai, a deposition tool out of
          Shenyang, a metrology product tied to a domestic fab. Those launches
          matter. They describe only the first half of what a foundry needs.
          The vendor-side question is whether the firm shipping the tool can
          install it, tune it, match it across chambers, recover it after
          maintenance, and support repeat deployment inside a customer&apos;s
          ramp.
        </p>

        <ol className="mt-12 grid grid-cols-1 divide-y divide-rule-hair border-y border-rule-hair lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {findings.map((finding) => (
            <li
              key={finding.number}
              className="flex flex-col gap-3 py-7 lg:px-8 lg:py-8 lg:first:pl-0 lg:last:pr-0"
            >
              <p className="font-mono text-[11px] font-semibold text-muted">
                {finding.number}
              </p>
              <h3 className="text-lg font-semibold leading-snug tracking-tight text-ink">
                {finding.title}
              </h3>
              <p className="text-sm leading-7 text-ink-soft">
                {finding.body}
              </p>
            </li>
          ))}
        </ol>

        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule-hair pt-8 sm:grid-cols-4">
          {bands.map((band) => (
            <div key={band.label} className="flex flex-col gap-1.5">
              <dt className="order-2 text-[11px] uppercase tracking-[0.18em] text-muted">
                {band.label}
              </dt>
              <dd className="order-1 font-mono text-2xl font-semibold tabular-nums text-ink">
                {band.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
