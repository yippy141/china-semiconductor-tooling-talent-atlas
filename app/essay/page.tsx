import Link from "next/link";

const linkClass =
  "font-medium text-stone-900 underline decoration-stone-400 decoration-1 underline-offset-4 transition-colors hover:decoration-stone-900";

const sections = [
  { number: "01", title: "China's tool race has a workforce test." },
  { number: "02", title: "Broad STEM numbers are too blunt." },
  { number: "03", title: "Each tool family needs a different workforce." },
  { number: "04", title: "What listed firms disclose." },
  { number: "05", title: "Why Piotech belongs in the deposition story." },
  { number: "06", title: "Where public records go quiet." },
  { number: "07", title: "What to monitor next." },
];

function slugFor(number: string) {
  return `section-${number}`;
}

export default function EssayPage() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-950">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <header className="border-b border-stone-300 pb-10">
          <nav className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
            <Link href="/" className="hover:text-stone-950">
              ← Homepage brief
            </Link>
          </nav>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            Essay
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Can China Staff Its Chip-Tooling Push?
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-700">
            The longform version of the homepage argument. It walks through
            what the public record currently shows about China&apos;s
            semiconductor-equipment workforce, where the record goes quiet,
            and which signals are worth following next.
          </p>

          <nav
            aria-label="Sections"
            className="mt-8 border-t border-stone-200 pt-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
              Sections
            </p>
            <ol className="mt-3 grid grid-cols-1 gap-1 text-sm text-stone-700 sm:grid-cols-2">
              {sections.map((section) => (
                <li key={section.number}>
                  <a
                    href={`#${slugFor(section.number)}`}
                    className="hover:text-stone-950"
                  >
                    <span className="font-mono text-[11px] text-stone-500">
                      {section.number}
                    </span>{" "}
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </header>

        <article className="flex flex-col gap-14 text-base leading-8 text-stone-800">
          <section
            id={slugFor("01")}
            aria-labelledby={`${slugFor("01")}-heading`}
            className="space-y-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
              01
            </p>
            <h2
              id={`${slugFor("01")}-heading`}
              className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
            >
              China&apos;s tool race has a workforce test.
            </h2>
            <p>
              The standard scoreboard for China&apos;s semiconductor-equipment
              push is product news: a new etch tool, a fresh ALD platform,
              another round of export-control workarounds. That coverage
              answers the easy half of the question.
            </p>
            <p>
              The harder half is what happens after a tool ships. Can a
              Chinese supplier install it at a customer fab, tune the recipe,
              match chambers across a population, recover after maintenance,
              and come back for the next purchase? Those tasks are people
              problems, not catalog problems.
            </p>
            <p>
              Public records expose the catalog problems first. A company
              page can list product families. A filing can disclose R&amp;D
              personnel. The dataset behind this site catalogs 172
              observation rows across 43 sources and seven firm dossiers —
              enough to map what is publicly visible, not enough to claim a
              workforce count.
            </p>
            <p>
              The Atlas reads each tool segment separately because each one
              demands a different organisation: a different mix of academic
              disciplines, a different set of role families, a different
              kind of customer interface. A national &ldquo;STEM
              headcount&rdquo; figure would conceal all of that. The{" "}
              <Link href="/methodology" className={linkClass}>
                methodology note
              </Link>{" "}
              spells out the rules.
            </p>
            <p>
              This essay walks through what that public record currently
              shows, where it goes quiet, and what to watch next.
            </p>
          </section>

          <section
            id={slugFor("02")}
            aria-labelledby={`${slugFor("02")}-heading`}
            className="space-y-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
              02
            </p>
            <h2
              id={`${slugFor("02")}-heading`}
              className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
            >
              Broad STEM numbers are too blunt.
            </h2>
            <p>
              A top-line STEM enrollment number cannot tell you whether a
              country can build chip-equipment teams. It cannot say whether
              plasma physicists are coming out of one school and ALD
              chemists out of another, or whether optical-engineering
              programs are large enough to staff a metrology vendor.
            </p>
            <p>
              The MOE 2022 graduate catalog identifies 14 academic
              disciplines that map onto tooling work in mainland PRC. The
              mapping is uneven.
            </p>
            <p>
              <Link href="/segments/etch_clean" className={linkClass}>
                Etch, clean, and strip
              </Link>{" "}
              leans on <strong>physics</strong> (plasma, surface
              interactions) and <strong>chemistry</strong> (wet clean,
              strip chemistry, precursors).{" "}
              <Link href="/segments/deposition" className={linkClass}>
                Deposition
              </Link>{" "}
              draws on <strong>materials science</strong>,{" "}
              <strong>chemical engineering</strong>, and{" "}
              <strong>chemistry</strong>.{" "}
              <Link
                href="/segments/metrology_inspection"
                className={linkClass}
              >
                Metrology and inspection
              </Link>{" "}
              pulls from <strong>optical engineering</strong>,{" "}
              <strong>instrument science</strong>, and{" "}
              <strong>computer science</strong> for defect classification
              and image software.{" "}
              <Link
                href="/segments/lithography_sidebar"
                className={linkClass}
              >
                Lithography-adjacent work
              </Link>{" "}
              wants <strong>optical engineering</strong>,{" "}
              <strong>mechanical engineering</strong>, and{" "}
              <strong>control science</strong> on the same team.
            </p>
            <p>
              A handful of disciplines cross the whole tool stack:
              Integrated Circuit Science and Engineering (MOE 1401),
              Electronic Science and Technology (0809), and the
              professional-degree categories Electronic Information (0854)
              and Mechanical (0855). Most others are concentrated in two or
              three segments. The discipline-to-segment matrix on the
              homepage shows that pattern at a glance.
            </p>
            <p>
              A national STEM total hides the alignments. A segment-by-
              segment view is the lowest resolution at which the question
              becomes answerable from public sources.
            </p>
          </section>

          <section
            id={slugFor("03")}
            aria-labelledby={`${slugFor("03")}-heading`}
            className="space-y-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
              03
            </p>
            <h2
              id={`${slugFor("03")}-heading`}
              className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
            >
              Each tool family needs a different workforce.
            </h2>
            <p>
              The segment briefs catalog 16 role families and 8 likely
              bottlenecks across the four tooling areas. They do not all
              live in the same kind of organisation.
            </p>
            <p>
              <Link href="/segments/etch_clean" className={linkClass}>
                Etch, clean, and strip
              </Link>{" "}
              needs plasma and surface scientists, etch and clean process
              engineers, field application engineers, and PM technicians
              who can keep chambers matched after rework. The recurring
              bottleneck is high-aspect-ratio profile control with low
              damage, together with post-etch residue removal that does
              not lose pattern.
            </p>
            <p>
              <Link href="/segments/deposition" className={linkClass}>
                Deposition
              </Link>{" "}
              needs thin-film scientists, ALD/CVD/PVD process engineers,
              vacuum and gas-delivery specialists, and validation engineers
              who follow a tool from prototype into the customer&apos;s
              ramp. The recurring bottleneck is conformal HAR film growth
              at production-worthy throughput, with stable chamber behavior
              across PM cycles.
            </p>
            <p>
              <Link
                href="/segments/metrology_inspection"
                className={linkClass}
              >
                Metrology and inspection
              </Link>{" "}
              wants optical and imaging scientists, algorithm and data
              engineers, and field-calibration specialists. The recurring
              bottleneck is optics-plus-algorithms integration that
              reduces false alarms without losing sensitivity, and
              fab-specific calibration in production.
            </p>
            <p>
              <Link
                href="/segments/lithography_sidebar"
                className={linkClass}
              >
                Lithography-adjacent work
              </Link>{" "}
              is the deliberate sidebar in this Atlas. It pulls optical,
              stage-control, and mechatronic skill into one team. Its
              bottlenecks are opto-mechatronic integration for overlay and
              focus, and contamination discipline plus process-window
              recovery.
            </p>
            <p>
              One pattern runs through every segment&apos;s role-family
              records. Research scientists and production engineers are
              reasonably visible in public sources. Technicians are less
              visible. Tacit production know-how — chamber seasoning,
              alarm triage, tool matching, handoff timing, fab etiquette
              during a ramp — is &ldquo;weakly observable&rdquo; by
              design, because none of those routines are written down for
              outsiders.
            </p>
          </section>

          <section
            id={slugFor("04")}
            aria-labelledby={`${slugFor("04")}-heading`}
            className="space-y-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
              04
            </p>
            <h2
              id={`${slugFor("04")}-heading`}
              className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
            >
              What listed firms disclose.
            </h2>
            <p>
              Three listed companies make the exercise tractable. Each one
              publishes enough workforce structure to give the public
              record real numbers.
            </p>
            <p>
              <Link href="/firms/amec" className={linkClass}>
                AMEC
              </Link>
              , the Shanghai etch anchor, reports 1,548 R&amp;D personnel
              — 52.24% of total staff — and a 57.88% master&apos;s-or-
              doctoral share within that R&amp;D layer. AMEC&apos;s filing
              is the cleanest match between a product-line story (etch
              product breadth) and a workforce composition signal (a
              science-heavy R&amp;D layer).
            </p>
            <p>
              <Link
                href="/firms/acm-research-shanghai"
                className={linkClass}
              >
                ACM Research Shanghai
              </Link>
              , the wet-clean and strip story, reports 2,485 total
              employees and 1,228 R&amp;D personnel, a 49.42% R&amp;D
              share. ACM does not publish the same advanced-degree
              breakdown, but the public source ledger treats it as the
              most disclosing firm for the service-heavy structure that
              wet-clean tools demand.
            </p>
            <p>
              <Link href="/firms/naura" className={linkClass}>
                NAURA Technology Group
              </Link>{" "}
              is the scale case: 21,101 total employees, 6,511 R&amp;D
              personnel, a 30.86% R&amp;D share. NAURA spans deposition,
              etch, clean, furnaces, RTP, and epi tools — which is
              precisely why its whole-firm numbers cannot be split by
              tool family from the outside.
            </p>
            <p>
              What is missing matters as much as what is present. AMEC
              does not publish a total-employee figure on this slate; ACM
              does not publish the degree composition; NAURA does not
              publish service-team headcount separately. The homepage
              chart shows only the categories every firm discloses; a
              small companion table marks the rest &ldquo;not disclosed
              in current filing.&rdquo;
            </p>
            <p>
              These are firm-level figures, not segment-specific
              headcounts. None of them should be read as &ldquo;how many
              people work on etch&rdquo; or &ldquo;how many people support
              deposition.&rdquo; They are scale and R&amp;D-intensity
              signals at the company perimeter.
            </p>
          </section>

          <section
            id={slugFor("05")}
            aria-labelledby={`${slugFor("05")}-heading`}
            className="space-y-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
              05
            </p>
            <h2
              id={`${slugFor("05")}-heading`}
              className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
            >
              Why Piotech belongs in the deposition story.
            </h2>
            <p>
              A dedicated deposition firm matters here because it sharpens
              what the bigger three blur.{" "}
              <Link href="/firms/piotech" className={linkClass}>
                Piotech
              </Link>
              , based in Shenyang, focuses on deposition: PECVD, ALD,
              SACVD, HDPCVD, Flowable CVD, hybrid-bonding tools, and
              deposition-adjacent metrology.
            </p>
            <p>
              Its public source trail is specific to deposition product
              families. The official company page maps the category. The
              2025 financing report frames deposition demand mechanics
              and product families. That makes Piotech the clearest
              pure-play public anchor for the{" "}
              <Link href="/segments/deposition" className={linkClass}>
                deposition segment
              </Link>
              , even though it does not publish the firm-level workforce
              tables the listed three do.
            </p>
            <p>
              The combination is the useful part. NAURA gives the broad
              scale signal but is a multi-tool group. AMEC gives a
              deposition-exposed R&amp;D layer but is anchored in etch.
              Piotech narrows the lens to deposition product breadth
              without claiming a workforce structure. The three answer
              different sub-questions: how big the equipment-side R&amp;D
              organisation is, how science-heavy it is, and how
              specialised the deposition product families have become.
            </p>
            <p>
              What Piotech does not yet supply, in the public record:
              customer-validation specifics by tool family, repeat-order
              language for individual platforms, and field-application or
              service hiring at scale. Those are watch signals, not
              indictments.
            </p>
            <p>
              The same construction repeats elsewhere.{" "}
              <Link
                href="/firms/jingce-electronics"
                className={linkClass}
              >
                Jingce Electronics
              </Link>{" "}
              in Wuhan and{" "}
              <Link href="/firms/beim" className={linkClass}>
                BEIM
              </Link>{" "}
              in Beijing anchor the metrology and inspection story.{" "}
              <Link href="/firms/smee" className={linkClass}>
                SMEE
              </Link>{" "}
              in Shanghai sits in the lithography-adjacent sidebar. Each
              one widens what the public record can describe; none of
              them, alone, can carry it.
            </p>
          </section>

          <section
            id={slugFor("06")}
            aria-labelledby={`${slugFor("06")}-heading`}
            className="space-y-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
              06
            </p>
            <h2
              id={`${slugFor("06")}-heading`}
              className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
            >
              Where public records go quiet.
            </h2>
            <p>
              The Atlas treats the path from lab to fab as four steps:
              build the tool, install it at the customer site, tune the
              process window, keep it stable. Visibility falls off step
              by step.
            </p>
            <p>
              Building tools is the most-disclosed step. Product pages,
              filings, and patents describe new platforms and product
              families. The R&amp;D personnel counts above speak to this
              stage.
            </p>
            <p>
              Installing tools at customer sites is less visible.
              Service-team scale and field-engineering hiring leave
              traces in recruitment pages and the occasional annual-
              report sentence, but rarely in numbered form.
            </p>
            <p>
              Tuning the process window is the layer the role-family
              data labels &ldquo;more visible&rdquo; for production
              engineers but only &ldquo;partly observable&rdquo; for the
              underlying judgement. Recipe development, defect-feedback
              loops, and chamber-match work happen inside one
              customer&apos;s fab and stay there.
            </p>
            <p>
              Keeping tools stable is the layer the data flags
              &ldquo;weakly observable&rdquo; — chamber seasoning, alarm
              triage, tool matching, handoff timing, fab etiquette
              during a ramp. These are the tacit production routines
              that decide whether a sale becomes a repeat purchase.
            </p>
            <p>
              That is the dataset&apos;s central admission. Even at 172
              observation rows and 31 city-signal entries, the public
              record describes product organisations far better than it
              describes customer-site organisations. That is not a flaw
              in the data collection. It is a feature of what gets
              written down in filings, product pages, and recruitment
              ads.
            </p>
          </section>

          <section
            id={slugFor("07")}
            aria-labelledby={`${slugFor("07")}-heading`}
            className="space-y-5"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-stone-500">
              07
            </p>
            <h2
              id={`${slugFor("07")}-heading`}
              className="text-2xl font-semibold tracking-tight text-stone-950 sm:text-3xl"
            >
              What to monitor next.
            </h2>
            <p>
              The next year&apos;s worth of useful evidence is mostly
              already named in the dataset. The role-family and
              bottleneck rows list specific watch signals. A few are
              worth pulling forward.
            </p>
            <p>
              Customer-validation language by tool family — not generic
              &ldquo;passed customer testing&rdquo; lines, but
              tool-platform-specific language from{" "}
              <Link href="/firms/amec" className={linkClass}>
                AMEC
              </Link>
              ,{" "}
              <Link href="/firms/naura" className={linkClass}>
                NAURA
              </Link>
              ,{" "}
              <Link
                href="/firms/acm-research-shanghai"
                className={linkClass}
              >
                ACM Research Shanghai
              </Link>
              , and{" "}
              <Link href="/firms/piotech" className={linkClass}>
                Piotech
              </Link>{" "}
              filings or product news.
            </p>
            <p>
              Field-application and service hiring volume. Recruitment
              pages already track titles like field application engineer,
              equipment installation engineer, and service application
              engineer. The trend over time matters more than any single
              posting.
            </p>
            <p>
              Repeat-order disclosures, especially for deposition and
              metrology tools, where chamber matching and calibration
              routines decide whether one win turns into ten.
            </p>
            <p>
              Training and chief-technician programs. The MOE catalog
              and the professional-degree categories (Electronic
              Information, Mechanical, Materials and Chemical
              Engineering) imply a pipeline. Chief-technician studios
              and company training pages would show whether the pipeline
              is being absorbed into specific firm organisations.
            </p>
            <p>
              The{" "}
              <Link href="/explorer" className={linkClass}>
                Atlas explorer
              </Link>{" "}
              is built for this kind of monitoring: it filters
              observation rows by segment, city, evidence type, and
              source. The{" "}
              <Link href="/monitor" className={linkClass}>
                monitor page
              </Link>{" "}
              holds the dashboard view. The{" "}
              <Link href="/sources" className={linkClass}>
                sources ledger
              </Link>{" "}
              lists every public record the dataset references.
            </p>
            <p>
              The framing question stays the same. China&apos;s
              toolmakers are visibly building product breadth and R&amp;D
              scale. The harder, slower work is staffing the layer that
              decides whether tools work in customer fabs. The public
              record can flag direction. On its own, it cannot score
              outcomes.
            </p>
          </section>
        </article>

        <aside
          aria-labelledby="methodology-note-heading"
          className="border border-stone-300 bg-white p-6 text-sm leading-7 text-stone-700 sm:p-7"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-500">
            Methodology note
          </p>
          <h2
            id="methodology-note-heading"
            className="mt-2 text-lg font-semibold tracking-tight text-stone-950"
          >
            What the numbers in this essay mean.
          </h2>
          <p className="mt-4">
            All counts refer to records in this dataset, not industry
            totals or workforce censuses. The current build catalogs 43
            sources, 172 observation rows, 14 capability records, 14
            MOE-coded disciplines, 16 role families, 8 segment
            bottlenecks, and 31 city-signal entries. Mainland PRC only.
          </p>
          <p className="mt-4">
            Observation rows are treated as staging until manually
            verified against the underlying source. The filing-disclosed
            workforce figures cited for AMEC, ACM Research Shanghai, and
            NAURA carry a &ldquo;needs manual filing check&rdquo; flag in
            the monitor and should be confirmed against the relevant 2025
            annual reports before any external citation.
          </p>
          <p className="mt-4">
            The Atlas distinguishes direct public records from analytical
            proxies and from taxonomy-scaffold rows. It does not produce a
            composite capability score. It does not infer individual-level
            data. The full set of rules sits in the{" "}
            <Link href="/methodology" className={linkClass}>
              methodology page
            </Link>
            .
          </p>
        </aside>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-300 pt-6 text-xs text-stone-500">
          <Link href="/" className="hover:text-stone-950">
            ← Back to homepage brief
          </Link>
          <span>
            Public records only. Mainland PRC. No individual-level data.
          </span>
        </footer>
      </div>
    </main>
  );
}
