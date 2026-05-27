import Link from "next/link";
import { FirmIndexGrid } from "@/components/atlas/firm-index-grid";
import {
  fullFirmProfiles,
  lightFirmProfiles,
} from "@/data/editorial/firm-profiles";

export default function FirmsPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-10 sm:px-10 lg:px-12">
        <header className="border-b-2 border-stone-900 pb-8">
          <nav
            aria-label="Firm index navigation"
            className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500"
          >
            <Link href="/" className="hover:text-stone-950">
              Home
            </Link>
            <Link href="/monitor" className="hover:text-stone-950">
              Monitor
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
              Firm index
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Chinese toolmakers to watch
            </h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-800">
              Product claims are easy to find. The harder question is whether
              firms are building the staff and support functions needed for
              production use.
            </p>
          </div>
        </header>

        <FirmIndexGrid
          fullProfiles={fullFirmProfiles}
          lightProfiles={lightFirmProfiles}
        />

        <p className="max-w-3xl border-t border-stone-300 pt-5 text-xs leading-6 text-stone-600">
          The index separates fuller dossiers from lighter watch cards based on
          current public-source coverage. Use it to compare disclosure depth,
          not to rank firms or measure technical performance.
        </p>
      </div>
    </main>
  );
}
