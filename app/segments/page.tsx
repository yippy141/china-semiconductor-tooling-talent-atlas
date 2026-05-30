import Link from "next/link";
import { CapabilityRoleMatrix } from "@/components/atlas/capability-role-matrix";

export default function SegmentsPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-10 sm:px-8 lg:px-10">
        <header className="border-b-2 border-stone-900 pb-8">
          <nav
            aria-label="Segment overview navigation"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500"
          >
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <Link href="/firms" className="hover:text-stone-950">
              Firms
            </Link>
            <Link href="/explorer" className="hover:text-stone-950">
              Explorer
            </Link>
            <Link href="/methodology" className="hover:text-stone-950">
              Methodology
            </Link>
          </nav>

          <div className="mt-8 max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
              Segment overview
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              What tool segments require
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-800">
              Etch, deposition, metrology, and lithography-adjacent work draw
              on different role families and leave different kinds of public
              records. Start here, then open the segment brief that matches
              your question.
            </p>
          </div>
        </header>

        <CapabilityRoleMatrix />
      </div>
    </main>
  );
}
