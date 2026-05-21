import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col justify-center px-6 py-16 sm:px-10 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
          China Semiconductor Tooling Talent Atlas
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          Can China Staff Its Chip-Tooling Push?
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8 text-stone-700 sm:text-xl sm:leading-9">
          Public filings and company records show Chinese toolmakers adding
          R&amp;D scale and product breadth. The harder test is whether they
          are building field engineers, service teams, calibration routines,
          and customer-support capacity.
        </p>

        <nav
          aria-label="Primary routes"
          className="mt-10 grid grid-cols-1 gap-px border border-stone-300 bg-stone-300 sm:grid-cols-2"
        >
          {[
            ["Reference monitor", "/monitor"],
            ["Firm dossiers", "/firms"],
            ["Evidence explorer", "/explorer"],
            ["Methodology", "/methodology"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="bg-stone-50 px-5 py-4 text-sm font-semibold text-stone-950 transition-colors hover:bg-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}
