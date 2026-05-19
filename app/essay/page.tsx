import Link from "next/link";

export default function EssayPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="border-b border-stone-300 pb-8">
          <nav className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">
            <Link href="/" className="hover:text-stone-950">
              Dashboard
            </Link>
          </nav>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            Essay
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight">
            What public evidence can and cannot show
          </h1>
        </header>

        <article className="space-y-5 text-base leading-8 text-stone-700">
          <p>
            Semiconductor tooling talent is partly visible in public sources:
            official catalogs, company pages, hiring language, institutions,
            patents, and policy documents. Those sources are useful, but they
            are not a census.
          </p>
          <p>
            Every row in the dataset is treated as an evidence signal, not a
            measurement. The source ID stays visible. Stronger claims are
            reserved for rows checked against the original filing.
          </p>
          <p>
            The hardest forms of know-how are the least visible. Integration
            work, yield learning, chamber recovery, field service judgment,
            and process transfer rarely appear in public records. Read the
            dataset with that silence in mind.
          </p>
        </article>
      </div>
    </main>
  );
}
