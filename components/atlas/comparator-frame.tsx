import { comparatorFrames } from "@/data/editorial/comparator-frames";

export function ComparatorFrame() {
  return (
    <section
      aria-labelledby="comparator-frame-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Comparator frame
        </p>
        <h3
          id="comparator-frame-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          How to read a toolmaker workforce signal
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          Mature equipment firms are not only R&amp;D shops. They run field
          service, applications engineering, calibration, training,
          spare-parts, and customer-support systems around an installed base.
          Chinese filings show parts of that structure. They rarely show the
          full customer-site layer.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200">
        {comparatorFrames.map((row) => (
          <article
            key={row.id}
            className="grid gap-6 bg-white p-6 sm:p-7 lg:grid-cols-[1.1fr_1.2fr_1.2fr]"
          >
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                Chinese focus
              </p>
              <h4 className="mt-2 text-lg font-semibold tracking-tight text-stone-950">
                {row.chinaFocus}
              </h4>
              <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                Reference peers
              </p>
              <p className="mt-2 text-sm font-medium leading-6 text-stone-800">
                {row.referencePeers}
              </p>
              <p className="mt-4 text-xs leading-6 text-stone-500">
                {row.segment}
              </p>
            </div>

            <SignalList label="Compare on" items={row.compareOn} />
            <SignalList label="Do not compare on" items={row.doNotCompareOn} />

            <p className="border-t border-dashed border-stone-300 pt-4 text-sm leading-7 text-stone-700 lg:col-span-3">
              <span className="font-semibold text-stone-950">Reader use: </span>
              {row.readerUse}
            </p>
          </article>
        ))}
      </div>

      <p className="border-t border-stone-200 px-6 py-4 text-[11px] leading-6 text-stone-500 sm:px-8">
        References frame what disclosures can mean. Not rankings, parity
        claims, or performance measures.
      </p>
    </section>
  );
}

function SignalList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
        {label}
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-stone-700">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span aria-hidden className="text-stone-400">
              -
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
