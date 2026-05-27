import Link from "next/link";

const linkClass =
  "font-medium text-stone-900 underline decoration-stone-400 decoration-1 underline-offset-4 transition-colors hover:decoration-stone-900";

const sections = [
  { number: "01", title: "Product announcements leave fab support open." },
  { number: "02", title: "What toolmaking talent means." },
  { number: "03", title: "What listed firms disclose." },
  { number: "04", title: "Where the public record thins out." },
  { number: "05", title: "What to watch." },
  { number: "06", title: "How to use the monitor." },
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
          <p className="mt-6 border border-stone-300 bg-white p-4 text-sm leading-7 text-stone-700">
            This on-site brief is the working version of the essay. A public
            essay link will be added after publication.
          </p>
          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
            Brief
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            The Talent Test Behind China&apos;s Chip-Tooling Push
          </h1>
          <p className="mt-6 text-base leading-8 text-stone-700">
            Beijing has spent four years pouring money into semiconductor
            equipment. The product launches are easy to count. The people
            who make those tools work inside customer fabs are harder to
            see. The public record now shows enough to say where that
            harder problem is being solved and where it is being skipped.
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
              Product announcements leave fab support open.
            </h2>
            <p>
              Most coverage of China&apos;s push into chip-making equipment
              tracks the same scoreboard: a new etch platform from
              Shanghai, a fresh deposition tool out of Shenyang, another
              workaround for U.S. export controls. The launches are genuine
              and describe only the first half of what a foundry needs.
            </p>
            <p>
              A semiconductor fab needs more than a machine. It needs a vendor
              that can ship the tool to a cleanroom in Wuxi or Hefei, install
              it without contaminating the line, hand-tune the recipe to that
              fab&apos;s wafer flow, match chamber-to-chamber drift across a
              population, recover the tool after every preventive-maintenance
              cycle, and come back the next year with a unit that behaves the
              same way. Applied
              Materials, Lam Research, and Tokyo Electron sell that whole
              package. The question for AMEC, NAURA, ACM Research
              Shanghai, and Piotech is whether they can build the same
              package. The box is only the starting point.
            </p>
            <p>
              Product catalogues capture the box. Field work decides whether
              the package exists. That work shows up in annual-report workforce
              tables, recruitment listings for field-application engineers,
              customer-validation language buried in financing prospectuses,
              and training programs at vocational schools. Those documents
              exist, spread across more sources than the average product-launch
              headline.
            </p>
            <p>
              This brief reads those documents as a single record and asks
              one question: does the public evidence show Chinese
              equipment firms staffing the layer between R&amp;D and the
              fab floor?
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
              What toolmaking talent means.
            </h2>
            <p>
              &ldquo;Semiconductor talent&rdquo; usually arrives as a
              national STEM number: graduates per year, engineers per capita,
              advanced-degree share. Tool firms need a narrower denominator.
              Etch tools, deposition platforms, and overlay metrology systems
              draw on different labor pools. A country can be well supplied in
              one and thinly staffed in another.
            </p>
            <p>
              Etch and clean tools, the segment AMEC anchors and ACM Research
              Shanghai serves through wet processing, run on plasma physicists,
              surface chemists, wet-chemistry process engineers, and
              field-application engineers who can keep chambers matched after
              rework. The bottleneck specific to this segment is
              high-aspect-ratio profile control with low damage, and post-etch
              residue removal that preserves pattern.
            </p>
            <p>
              Deposition tools, the heart of NAURA&apos;s and Piotech&apos;s
              product breadth, need thin-film scientists, ALD, CVD, and PVD
              process engineers, vacuum and gas-delivery specialists, and
              validation engineers who follow a tool out of the lab and into a
              customer&apos;s ramp. The defining problem is conformal film
              growth at production-worthy throughput, with stable chamber
              behavior across maintenance cycles.
            </p>
            <p>
              Metrology and inspection tools, where Jingce Electronics and BEIM
              operate, pull optical and imaging scientists, algorithm and data
              engineers, and field-calibration specialists onto the same team.
              The work is optics-plus-software integration that holds
              sensitivity without false alarms, and recalibration inside the
              customer&apos;s line.
            </p>
            <p>
              Lithography-adjacent work, the deliberate sidebar in this brief,
              is the hardest of the four. SMEE sits here. The work combines
              optical engineering, stage and mechatronics control, and
              contamination discipline. Each segment draws on a different mix
              of physics, chemistry, materials, instrument science, optics, and
              control science programs. National graduate totals collapse those
              mixes into one number.
            </p>
            <p>
              One pattern repeats across all four. Research scientists
              and production engineers leave public traces: patents,
              filings, conference papers. Technicians leave fewer.
              Chamber seasoning, alarm triage, tool matching, and
              handoff routines during a fab ramp leave almost none.
              These are precisely the skills that decide whether a tool
              sold this quarter generates a repeat order next quarter.
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
              What listed firms disclose.
            </h2>
            <p>
              Four firms make the question tractable from outside.
            </p>
            <p>
              <Link href="/firms/amec" className={linkClass}>
                AMEC
              </Link>
              , Shanghai&apos;s etch anchor, reports 1,548 R&amp;D
              personnel, 52.24% of all employees, and discloses that
              57.88% of that R&amp;D layer holds a master&apos;s or
              doctoral degree. The composition is the part that matters.
              Half of the company is in R&amp;D, and more than half of
              that R&amp;D layer carries an advanced degree. For a firm
              whose competition is Lam Research, that is the signature of a
              science-heavy product organisation. Service depth remains less
              visible.
            </p>
            <p>
              <Link
                href="/firms/acm-research-shanghai"
                className={linkClass}
              >
                ACM Research Shanghai
              </Link>{" "}
              discloses a different shape. The firm reports 2,485 total
              employees and 1,228 technical personnel, 49.42% of the
              firm. The filing labels the figure technical staff, and the
              distinction is meaningful: wet-clean tools live or die on
              the engineers who keep them running in a customer fab. ACM
              is the closest the public record comes to a Chinese
              equipment firm whose disclosed structure leans toward the
              process-support layer.
            </p>
            <p>
              <Link href="/firms/naura" className={linkClass}>
                NAURA Technology Group
              </Link>{" "}
              in Beijing is the scale case: 21,101 total employees and
              6,511 R&amp;D personnel, a 30.86% R&amp;D share. NAURA
              spans deposition, etch, clean, furnaces, RTP, and epi tools,
              which is why the company-wide numbers cannot be split by
              tool family from the outside. Read them as scale signals
              for a broad equipment group. A tool-family headcount would need
              separate disclosure.
            </p>
            <p>
              <Link href="/firms/piotech" className={linkClass}>
                Piotech
              </Link>
              , based in Shenyang, narrows the lens to deposition. Its
              public materials map a product portfolio: PECVD, ALD,
              SACVD, HDPCVD, Flowable CVD, hybrid-bonding tools,
              deposition-adjacent metrology. That portfolio is unusually specific
              for a non-listed Chinese vendor. Piotech does not yet
              publish the workforce tables the listed three do, which is
              the relevant disclosure gap: a pure-play deposition vendor
              with detailed product language and no public workforce
              structure.
            </p>
            <p>
              The four together carry different sub-questions. AMEC
              answers whether a focused Chinese etch firm has built a
              science-heavy R&amp;D layer. ACM Research Shanghai answers
              whether a wet-process firm has built a visible technical-
              staff layer. NAURA answers whether a multi-tool group has
              reached the scale of its international peers in raw
              R&amp;D bodies. Piotech answers whether a younger
              deposition specialist has narrowed its product story
              enough to be tracked at all. The field-support question remains
              open, and the missing disclosure is part of the signal.
            </p>
            <p>
              Keep workforce categories separate. AMEC does not publish a
              total-employee figure on this slate. ACM does not publish degree
              composition. NAURA does not break out service or after-sales
              staff. R&amp;D headcount, technical staff, and service teams
              should not be added into a single score. The{" "}
              <Link
                href="/methodology"
                className={linkClass}
              >
                methodology page
              </Link>{" "}
              spells out the rules.
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
              Where the public record thins out.
            </h2>
            <p>
              Treat the path from lab to fab as four steps: build the
              tool, install it at the customer site, tune the process
              window, keep it stable. Public visibility falls off step by
              step.
            </p>
            <p>
              Building tools is the most-disclosed step. Product pages,
              filings, and patents describe new platforms and product
              families in fairly granular language. R&amp;D personnel
              counts speak to this layer, and so does almost every
              announcement the international press picks up.
            </p>
            <p>
              Installing tools at customer sites is the next layer down
              and noticeably quieter. Service-team scale and field-
              engineering hiring leave traces in recruitment pages and
              the occasional annual-report sentence, but rarely in
              numbered form. None of the four firms above publishes a
              service-team headcount the way an Applied Materials or a
              Tokyo Electron does.
            </p>
            <p>
              Tuning the process window, from recipe development to defect-
              feedback loops and chamber-match work, happens inside one
              customer&apos;s fab and stays there. The firm that supplied
              the tool knows what it learned. The competitor in the next
              city does not. The public record almost never describes
              this layer except in retrospect, when a customer announces
              that a domestically supplied tool has cleared qualification.
            </p>
            <p>
              Keeping tools stable across maintenance cycles is the
              deepest layer and the weakest signal of all. Chamber
              seasoning, alarm triage, tool matching, handoff timing,
              and fab etiquette during a ramp are routines that no one
              writes down for outsiders. They are also the routines that
              decide whether a sale becomes a relationship.
            </p>
            <p>
              This asymmetry reflects what gets written down. Product launches
              generate documents. Service teams generate the tools&apos;
              reputation, which generates the next order, which is what
              eventually shows up in revenue. The lag between the work and its
              public trace is the hardest part of this question.
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
              What to watch.
            </h2>
            <p>
              Four kinds of evidence are worth tracking through 2026 and
              into 2027.
            </p>
            <p>
              <strong>Customer-validation language by tool family.</strong>{" "}
              Generic &ldquo;passed customer testing&rdquo; lines have
              been routine for years. The useful version is platform-
              specific: a named etch product family qualified at a named
              fab, a deposition platform cleared at a logic node, a
              metrology tool integrated into a defined inspection step.
              AMEC, NAURA, ACM, and Piotech filings and product news are
              the primary sources to read for this language. The
              specificity is the signal.
            </p>
            <p>
              <strong>Field-application and service hiring volume.</strong>{" "}
              Recruitment pages already list titles like field-
              application engineer, equipment installation engineer, and
              service application engineer. The trend over twelve months
              matters more than any one posting. A firm that is adding
              dozens of field engineers in Hefei and Wuxi is preparing
              for an installed-base ramp. A firm without that pattern is
              betting on a different business model.
            </p>
            <p>
              <strong>Repeat-order disclosures.</strong> Deposition and
              metrology tools earn their reputations through chamber
              matching and calibration discipline. A repeat order from
              the same customer for the same platform is the cleanest
              external proof those routines exist inside the vendor. A
              first order proves the catalog. A second order, on the
              same line, proves the package.
            </p>
            <p>
              <strong>Service-team scale.</strong> The category exists in
              international toolmakers&apos; disclosures and is largely
              absent from Chinese ones. The moment a Chinese equipment
              firm publishes a service or after-sales headcount on its
              own, separate from &ldquo;other staff,&rdquo; is the
              moment the public record starts answering the second half
              of the staffing question.
            </p>
            <p>
              Training and chief-technician programs sit alongside the
              four above. The Ministry of Education catalog and the
              professional-degree categories (Electronic Information,
              Mechanical, Materials and Chemical Engineering) imply a
              pipeline. Chief-technician studios and firm-internal
              training pages would show whether that pipeline is being
              absorbed into specific company organisations.
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
              How to use the monitor.
            </h2>
            <p>
              The brief on the homepage is the short version of this
              piece. The dataset behind it is open. Three entry points
              cover most uses.
            </p>
            <p>
              The{" "}
              <Link href="/firms" className={linkClass}>
                firm dossiers
              </Link>{" "}
              are the main next click. Each dossier answers: what the
              firm makes, which in-scope segments it touches, what
              workforce or product evidence is visible, what would
              change the read, and what the reader should not infer.
              The AMEC, NAURA, ACM Research Shanghai, and Piotech pages
              are the priority. SMEE, Jingce Electronics, and BEIM
              cover the metrology and lithography-adjacent sidebars.
            </p>
            <p>
              The{" "}
              <Link href="/monitor" className={linkClass}>
                monitor
              </Link>{" "}
              and{" "}
              <Link href="/explorer" className={linkClass}>
                source explorer
              </Link>{" "}
              expose the underlying observation rows. Each row points
              back to a public source, such as a filing, a product page, a
              recruitment notice, or a policy document, with a
              verification status attached. Readers should treat
              observation rows as staging until manually checked
              against the source. The figures cited for AMEC, ACM
              Research Shanghai, and NAURA carry a &ldquo;needs manual
              filing check&rdquo; flag for that reason.
            </p>
            <p>
              The{" "}
              <Link href="/methodology" className={linkClass}>
                methodology page
              </Link>{" "}
              records the rules. Mainland PRC only. Public sources
              only. No individual-level data. No composite capability
              score. Direct evidence is distinguished from analytical
              proxies and from taxonomy-scaffold rows. R&amp;D
              headcount, technical staff, and service staff are tracked
              as separate categories and never added together.
            </p>
            <p>
              The public record has not answered the staffing question yet.
              Chinese toolmakers are visibly building products and R&amp;D
              scale. The harder layer, the engineers, technicians, and routines
              that decide whether tools work in a customer&apos;s fab, is
              partly visible, partly inferred, and largely still to be
              disclosed. The monitor is built to follow that disclosure as it
              arrives.
            </p>
          </section>
        </article>

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
