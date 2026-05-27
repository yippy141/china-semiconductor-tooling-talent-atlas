import Link from "next/link";
import { readerPaths } from "@/data/editorial/reader-paths";

export function ReaderPaths() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:px-10 sm:py-16 lg:px-12">
      <header className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Reader paths
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Start with the question you have
        </h2>
      </header>

      <div className="mt-8 grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 sm:grid-cols-2 lg:grid-cols-3">
        {readerPaths.map((path) => (
          <Link
            key={path.question}
            href={path.href}
            className="group flex min-h-48 flex-col justify-between bg-white p-6 transition-colors hover:bg-stone-50 sm:p-7"
          >
            <span className="text-lg font-semibold tracking-tight text-stone-950">
              {path.question}
            </span>
            <span className="mt-5 text-sm leading-7 text-stone-700">
              {path.answer}
            </span>
            <span className="mt-5 text-sm font-semibold text-stone-950 underline-offset-4 group-hover:underline">
              Open path -&gt;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
