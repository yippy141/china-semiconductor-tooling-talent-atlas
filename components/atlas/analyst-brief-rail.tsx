import Link from "next/link";
import { homepageInsights } from "@/data/editorial/homepage-insights";

export function AnalystBriefRail() {
  return (
    <section
      aria-labelledby="analyst-brief-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Analyst brief
        </p>
        <h2
          id="analyst-brief-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          Read the public evidence signal before the counts.
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-px bg-stone-200 lg:grid-cols-4">
        {homepageInsights.map((insight) => (
          <article
            key={insight.id}
            className="flex min-h-full flex-col bg-white p-6 sm:p-7"
          >
            <h3 className="text-lg font-semibold leading-snug tracking-tight text-stone-950">
              {insight.title}
            </h3>
            <p className="mt-4 text-sm leading-7 text-stone-700">
              {insight.finding}
            </p>

            <div className="mt-5 border-t border-dashed border-stone-300 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                Record shows
              </p>
              <p className="mt-2 text-xs leading-6 text-stone-600">
                {insight.recordShows}
              </p>
            </div>

            <div className="mt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-700">
                Limit
              </p>
              <p className="mt-2 text-xs leading-6 text-stone-600">
                {insight.limit}
              </p>
            </div>

            <Link
              href={insight.href}
              className="mt-6 inline-flex items-center text-sm font-semibold text-stone-900 hover:text-stone-700"
            >
              {insight.linkLabel} &rarr;
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
