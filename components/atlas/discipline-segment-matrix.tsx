import Link from "next/link";
import disciplinesData from "@/data/generated/disciplines.json";
import { segmentProfiles } from "@/data/editorial/segment-profiles";

type Discipline = {
  discipline_id: string;
  moe_code: string;
  name_cn: string;
  name_en: string;
  discipline_type: string;
  most_relevant_segments: string;
  relevance_notes: string;
};

const disciplines = disciplinesData as Discipline[];

const segmentColumns = segmentProfiles.map((profile) => ({
  id: profile.id,
  label: profile.label,
}));

function parseSegments(value: string): Set<string> {
  return new Set(
    value
      .split(";")
      .map((piece) => piece.trim())
      .filter(Boolean),
  );
}

export function DisciplineSegmentMatrix() {
  return (
    <section
      aria-labelledby="discipline-segment-matrix-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <h3
          id="discipline-segment-matrix-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          Why broad STEM numbers are too blunt.
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          Each row is an MOE-coded discipline. A marked cell means the
          catalogue lists that segment among the discipline&apos;s most
          relevant tooling segments.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
              <th scope="col" className="px-6 py-3 sm:px-8">
                Discipline
              </th>
              {segmentColumns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-3 py-3 text-center"
                >
                  <Link
                    href={`/segments/${column.id}`}
                    className="underline-offset-4 hover:text-stone-950 hover:underline"
                  >
                    {column.label}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {disciplines.map((discipline) => {
              const relevant = parseSegments(discipline.most_relevant_segments);
              return (
                <tr
                  key={discipline.discipline_id}
                  className="border-b border-stone-200 align-top"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 text-left font-normal sm:px-8"
                  >
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-semibold tracking-tight text-stone-950">
                        {discipline.name_en}
                      </span>
                      <span className="text-[11px] text-stone-500">
                        {discipline.name_cn}
                        <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.18em]">
                          MOE {discipline.moe_code}
                        </span>
                        <span className="ml-2 text-[10px] uppercase tracking-[0.18em]">
                          · {discipline.discipline_type}
                        </span>
                      </span>
                      <span className="mt-1 text-xs leading-6 text-stone-600">
                        {discipline.relevance_notes}
                      </span>
                    </div>
                  </th>
                  {segmentColumns.map((column) => {
                    const isMarked = relevant.has(column.id);
                    const labelText = isMarked
                      ? `${discipline.name_en} is most relevant to ${column.label}`
                      : `${discipline.name_en} is outside the most relevant discipline set for ${column.label}`;
                    return (
                      <td
                        key={column.id}
                        className="px-3 py-4 text-center"
                      >
                        {isMarked ? (
                          <span
                            className="inline-flex h-6 w-6 items-center justify-center bg-stone-900 text-[11px] font-semibold text-stone-50"
                            aria-label={labelText}
                          >
                            <span aria-hidden>•</span>
                          </span>
                        ) : (
                          <span
                            className="inline-block h-6 w-6 border border-dashed border-stone-300"
                            aria-label={labelText}
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p className="border-t border-stone-200 px-6 py-4 text-[11px] leading-6 text-stone-500 sm:px-8">
        Source: MOE 2022 graduate catalogue. Cells map disciplines to segments;
        they do not count graduates working in equipment firms.
      </p>
    </section>
  );
}
