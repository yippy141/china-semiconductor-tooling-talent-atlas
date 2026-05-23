import { articleBrief } from "@/data/editorial/article-brief";

export function LabToFabChain() {
  return (
    <section
      aria-labelledby="lab-to-fab-chain-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Lab-to-fab chain
        </p>
        <h2
          id="lab-to-fab-chain-heading"
          className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          The staffing test runs from lab tool to fab routine.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-stone-700">
          Visibility falls off step by step. Product breadth and R&D headcount
          are disclosed first; customer-site routines rarely are.
        </p>
      </header>

      <ol className="grid grid-cols-1 gap-px bg-stone-200 md:grid-cols-4">
        {articleBrief.labToFabSteps.map((step) => (
          <li key={step.label} className="flex h-full flex-col bg-white p-6">
            <p className="font-mono text-xs font-semibold text-stone-500">
              {step.label}
            </p>
            <h3 className="mt-4 text-lg font-semibold tracking-tight text-stone-950">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-stone-700">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
