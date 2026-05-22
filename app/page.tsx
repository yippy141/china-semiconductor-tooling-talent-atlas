import Link from "next/link";
import { articleBrief } from "@/data/editorial/article-brief";
import { ArticleStatStrip } from "@/components/atlas/article-stat-strip";
import { LabToFabChain } from "@/components/atlas/lab-to-fab-chain";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <section className="border-b border-stone-300 bg-stone-50">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 sm:px-10 sm:py-20 lg:grid-cols-[1fr_19rem] lg:px-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              China Semiconductor Tooling Talent Atlas
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
              {articleBrief.hero.title}
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-700 sm:text-xl sm:leading-9">
              {articleBrief.hero.deck}
            </p>
            <p className="mt-6 max-w-3xl text-base leading-8 text-stone-700">
              {articleBrief.hero.intro}
            </p>

            <nav
              aria-label="Primary article links"
              className="mt-10 flex flex-wrap gap-3"
            >
              {articleBrief.primaryLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex h-11 items-center justify-center px-5 text-sm font-semibold transition-colors ${
                    index === 0
                      ? "bg-stone-950 text-stone-50 hover:bg-stone-800"
                      : "border border-stone-300 bg-white text-stone-950 hover:border-stone-950"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <aside className="border-l-2 border-stone-900 pl-6 lg:self-end">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Core question
            </p>
            <p className="mt-4 text-lg font-semibold leading-7 tracking-tight text-stone-950">
              Are Chinese semiconductor-equipment firms building the workforce
              and support organizations needed to make domestic tools work in
              customer fabs?
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 lg:px-12">
        <ArticleStatStrip />
      </section>

      <section className="border-y border-stone-300 bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Three findings
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              The public record shows scale before customer-site depth.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 lg:grid-cols-3">
            {articleBrief.findings.map((finding) => (
              <article key={finding.title} className="bg-white p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                  {finding.eyebrow}
                </p>
                <h3 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-stone-950">
                  {finding.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-stone-700">
                  {finding.body}
                </p>
                <p className="mt-5 border-t border-dashed border-stone-300 pt-4 text-xs leading-6 text-stone-600">
                  {finding.evidenceRead}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
        <div className="max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            Exhibit slots
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Three visuals will make the argument scannable.
          </h2>
          <p className="mt-4 text-base leading-7 text-stone-700">
            These slots hold the article structure for the next visual pass.
            They describe what each exhibit should prove without inventing
            values.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {articleBrief.exhibitSlots.map((slot) => (
            <article
              key={slot.title}
              className="border border-stone-300 bg-white p-6"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
                {slot.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {slot.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-stone-700">
                {slot.body}
              </p>
              <p className="mt-5 border-t border-stone-200 pt-4 text-xs font-medium leading-6 text-stone-500">
                {slot.status}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-14 sm:px-10 sm:pb-20 lg:px-12">
        <LabToFabChain />
      </section>

      <section className="bg-stone-950 text-stone-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-10 sm:py-20 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-400">
              Open the source trail
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Use the monitor when you want the receipts.
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-400">
              The homepage is the brief. The supporting pages let you inspect
              firm dossiers, segment briefs, evidence rows, and public source
              records.
            </p>
          </div>

          <nav
            aria-label="Next clicks"
            className="mt-10 grid grid-cols-1 gap-px border border-stone-800 bg-stone-800 sm:grid-cols-2 lg:grid-cols-5"
          >
            {articleBrief.nextClicks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex min-h-40 flex-col justify-between bg-stone-950 p-5 transition-colors hover:bg-stone-900"
              >
                <span className="text-lg font-semibold tracking-tight text-stone-50">
                  {link.label}
                </span>
                <span className="mt-4 text-xs leading-6 text-stone-500 group-hover:text-stone-300">
                  {link.description}
                </span>
              </Link>
            ))}
          </nav>

          <p className="mt-10 max-w-3xl text-[11px] leading-6 text-stone-500">
            {articleBrief.footnote}
          </p>
        </div>
      </section>
    </main>
  );
}
