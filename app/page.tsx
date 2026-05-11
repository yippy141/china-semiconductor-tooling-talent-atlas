import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-5 py-12 sm:px-8 lg:px-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
          Editorial evidence product
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          The Talent Layer of China&apos;s Chip Tooling Push
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-700">
          A visual brief and evidence explorer on China&apos;s semiconductor
          equipment talent signals.
        </p>
        <nav className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/explorer"
            className="inline-flex h-11 items-center border border-stone-950 px-4 text-sm font-medium text-stone-950 transition-colors hover:bg-stone-950 hover:text-white"
          >
            Open explorer
          </Link>
          <Link
            href="/methodology"
            className="inline-flex h-11 items-center border border-stone-300 bg-stone-50 px-4 text-sm font-medium text-stone-700 transition-colors hover:border-stone-500 hover:bg-white"
          >
            Methodology
          </Link>
        </nav>
      </div>
    </main>
  );
}
