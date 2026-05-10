import Link from "next/link";

const boundaries = [
  "Counts are public evidence signals, not capability scores or rankings.",
  "Observations remain staging evidence until manually verified against source rows.",
  "The atlas does not estimate headcount, yield learning, or tacit production know-how.",
  "Mainland PRC is the default scope unless a row is explicitly labeled otherwise.",
  "No individual-level personal data belongs in this product.",
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="border-b border-stone-300 pb-8">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            <Link href="/" className="hover:text-stone-950">
              Dashboard
            </Link>
            <Link href="/essay" className="hover:text-stone-950">
              Essay
            </Link>
          </nav>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Methodology
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            How to read this atlas
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone-700">
            This project is an editorial evidence product. It organizes public
            signals about semiconductor tooling talent, keeps source IDs
            visible, and separates direct evidence from proxy evidence.
          </p>
        </header>

        <section className="rounded-lg border border-stone-300 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Reading Rules
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-stone-700">
            {boundaries.map((boundary) => (
              <li key={boundary} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-500"
                />
                <span>{boundary}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-stone-300 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold tracking-tight">
            Evidence Strength
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-700">
            Evidence strength describes how clearly a public source supports an
            observation. It is not a claim about engineering quality, market
            share, production readiness, or labor-market size.
          </p>
        </section>
      </div>
    </main>
  );
}
