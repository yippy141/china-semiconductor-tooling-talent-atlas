import Link from "next/link";
import { monitoringQuestions } from "@/data/editorial/monitoring-questions";

export function MonitoringQuestions() {
  return (
    <section
      aria-labelledby="monitoring-questions-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Corporate and policy briefing
        </p>
        <h3
          id="monitoring-questions-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          What to watch next
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-700">
          Corporate and policy users need more than product announcements.
          Stronger signals show whether a firm is building the people and
          routines that move a tool from lab result to customer-site operation.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 md:grid-cols-2">
        {monitoringQuestions.map((card) => (
          <article
            key={card.id}
            className="flex h-full flex-col gap-5 bg-white p-6 sm:p-7"
          >
            <header>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                Watch question
              </p>
              <h4 className="mt-2 text-lg font-semibold tracking-tight text-stone-950">
                {card.title}
              </h4>
            </header>

            <Block label="Watch signal" body={card.watchSignal} />
            <Block label="Stronger signal" body={card.strongerSignal} />

            <div className="border-t border-dashed border-stone-300 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700">
                Do not infer
              </p>
              <p className="mt-2 text-xs leading-6 text-stone-600">
                {card.doNotInfer}
              </p>
            </div>

            <Link
              href={card.link.href}
              className="mt-auto inline-flex items-center text-sm font-semibold text-stone-900 hover:text-stone-700"
            >
              {card.link.label} &rarr;
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
        {label}
      </p>
      <p className="mt-2 text-sm leading-7 text-stone-700">{body}</p>
    </div>
  );
}
