import { globalContextCards } from "@/data/editorial/global-context";

export function GlobalTalentContext() {
  return (
    <section
      aria-labelledby="global-talent-context-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <h3
          id="global-talent-context-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          How to read the scale
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          The firm numbers sit inside a wider talent constraint. Use them as
          context for disclosure strength and avoid country scorecard readings.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-3">
        {globalContextCards.map((card) => (
          <article key={card.title} className="bg-white p-6 sm:p-7">
            <h4 className="text-lg font-semibold tracking-tight text-stone-950">
              {card.title}
            </h4>
            <p className="mt-4 text-sm leading-7 text-stone-700">
              {card.body}
            </p>
            <p className="mt-5 border-t border-dashed border-stone-300 pt-4 text-[11px] leading-6 text-stone-500">
              {card.sourceNote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
