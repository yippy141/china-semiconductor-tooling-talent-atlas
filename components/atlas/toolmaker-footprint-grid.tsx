import {
  firmProfileBySlug,
  type FirmProfile,
} from "@/data/editorial/firm-profiles";

type FootprintStatus = "core" | "exposure" | "sidebar" | "check" | "none";

type Column = {
  id: string;
  label: string;
  segmentLabel: string;
};

const columns: Column[] = [
  {
    id: "etch_clean",
    label: "Etch / clean / strip",
    segmentLabel: "Etch, clean, and strip",
  },
  {
    id: "deposition",
    label: "Deposition",
    segmentLabel: "Deposition",
  },
  {
    id: "metrology_inspection",
    label: "Metrology / inspection",
    segmentLabel: "Metrology and inspection",
  },
  {
    id: "lithography_sidebar",
    label: "Lithography-adjacent",
    segmentLabel: "Lithography sidebar",
  },
];

const rowSlugs = [
  "amec",
  "naura",
  "acm-research-shanghai",
  "piotech",
  "jingce-electronics",
  "smee",
  "beim",
];

const statusMeta: Record<
  FootprintStatus,
  { label: string; className: string; description: string }
> = {
  core: {
    label: "Core source",
    className: "bg-stone-900 text-stone-50",
    description: "Public records anchor this firm in this segment.",
  },
  exposure: {
    label: "Some exposure",
    className: "bg-stone-200 text-stone-900",
    description:
      "Public records mention this segment as adjacent or partial coverage.",
  },
  sidebar: {
    label: "Sidebar",
    className: "bg-stone-100 text-stone-700 border border-stone-300",
    description:
      "Treated as a context sidebar rather than a primary capability claim.",
  },
  check: {
    label: "Needs source check",
    className: "bg-amber-50 text-amber-900 border border-amber-300",
    description:
      "Light dossier; the full filing should be reviewed before stronger claims.",
  },
  none: {
    label: "No current record",
    className: "bg-stone-50 text-stone-400 border border-dashed border-stone-300",
    description: "No source in the current ledger maps this firm here.",
  },
};

function classifyFootprint(
  firm: FirmProfile,
  column: Column,
): FootprintStatus {
  const matches = firm.productFamilies.filter(
    (family) => family.segment === column.segmentLabel,
  );
  if (matches.length === 0) return "none";

  if (column.id === "lithography_sidebar") return "sidebar";

  const combinedLabel = matches.map((m) => m.label.toLowerCase()).join(" ");
  if (combinedLabel.includes("adjacent") || combinedLabel.includes("exposure")) {
    return "exposure";
  }

  if (firm.profileType === "light") return "check";

  return "core";
}

type FirmRow = {
  profile: FirmProfile;
  cells: { column: Column; status: FootprintStatus }[];
};

const rows: FirmRow[] = rowSlugs
  .map((slug) => firmProfileBySlug.get(slug))
  .filter((profile): profile is FirmProfile => Boolean(profile))
  .map((profile) => ({
    profile,
    cells: columns.map((column) => ({
      column,
      status: classifyFootprint(profile, column),
    })),
  }));

const legendOrder: FootprintStatus[] = [
  "core",
  "exposure",
  "sidebar",
  "check",
  "none",
];

export function ToolmakerFootprintGrid() {
  return (
    <section
      aria-labelledby="toolmaker-footprint-heading"
      className="border border-stone-300 bg-white"
    >
      <header className="flex flex-col gap-3 border-b border-stone-200 px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Toolmaker footprint grid
        </p>
        <h3
          id="toolmaker-footprint-heading"
          className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
        >
          Chinese toolmakers to watch.
        </h3>
        <p className="max-w-3xl text-sm leading-7 text-stone-600">
          Each cell describes how the public record places a firm in a
          segment. Labels are deliberate: a checkmark on its own would hide
          uncertainty, so the grid spells out the strength of the source.
        </p>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone-500">
              <th scope="col" className="px-6 py-3 sm:px-8">
                Firm
              </th>
              {columns.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-3 py-3 text-left"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.profile.slug}
                className="border-b border-stone-200 align-top"
              >
                <th
                  scope="row"
                  className="px-6 py-4 text-left font-normal sm:px-8"
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold tracking-tight text-stone-950">
                      {row.profile.name}
                    </span>
                    <span className="text-[11px] text-stone-500">
                      {row.profile.headquarters}
                    </span>
                  </div>
                </th>
                {row.cells.map(({ column, status }) => {
                  const meta = statusMeta[status];
                  return (
                    <td key={column.id} className="px-3 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${meta.className}`}
                        title={meta.description}
                      >
                        {meta.label}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-stone-200 px-6 py-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
          Cell labels
        </p>
        <ul className="mt-3 grid grid-cols-1 gap-3 text-xs leading-6 text-stone-700 sm:grid-cols-2 lg:grid-cols-5">
          {legendOrder.map((status) => {
            const meta = statusMeta[status];
            return (
              <li key={status} className="flex flex-col gap-1">
                <span
                  className={`inline-flex w-fit items-center px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${meta.className}`}
                >
                  {meta.label}
                </span>
                <span className="text-[11px] leading-5 text-stone-600">
                  {meta.description}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <p className="border-t border-stone-200 px-6 py-4 text-[11px] leading-6 text-stone-500 sm:px-8">
        Source: firm dossiers in this site. The grid summarises the public
        record only; it does not measure tool performance, yield, or
        customer-site depth.
      </p>
    </section>
  );
}
