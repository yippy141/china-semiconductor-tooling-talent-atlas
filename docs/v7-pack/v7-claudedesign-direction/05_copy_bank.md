# 05 — Copy bank

Every string the v7 home page renders. Source-traced. No new claims.
The coder pastes from this file; the PM can audit by diff.

## §1 — Hero

### Kicker
> Tooling Talent &nbsp;·&nbsp; Issue 04 &nbsp;·&nbsp; May 24, 2026

Coder note: the date is read from `data/generated/manifest.json` (build
timestamp). The *Issue 04* counter is editorial. If PM has not approved an
issue counter (see question 6 in `01_pm_decision_brief.md`), render
*"Beta · May 24, 2026"* instead.

### Title
> Can China staff its <em>chip-tooling</em> push?

- Sentence case, not title case.
- *chip-tooling* is italic and rendered in `text-accent-deep`.
- Source: `articleBrief.hero.title` — note the existing string is title-case
  ("Can China Staff Its Chip-Tooling Push?"). v7 prefers sentence case. If
  PM wants to preserve title case, override the rendered string to match the
  existing data.

### Standfirst (dek)
> Chinese toolmakers are adding products and R&D staff. The harder test is
> whether they can build the field engineers, service teams, calibration
> routines, and customer-support systems that make equipment work in fabs.

Source: `articleBrief.heroClaim.rendered`. Verbatim.

### Primary CTA
> Read the brief →

Links to `/essay`.

### Secondary text (quiet, beneath the primary)
> or jump to firm dossiers &nbsp;·&nbsp; inspect source rows

- *firm dossiers* links to `/firms`.
- *inspect source rows* links to `/explorer`.

### Beta footnote (small caps, 10–11px tracked, muted)
> Beta public-source monitor &nbsp;·&nbsp; counts reflect source coverage,
> not workforce size &nbsp;·&nbsp; methodology

- *methodology* links to `/methodology`.

### AnchorFirmsExhibit caption
> Exhibit 01 &nbsp;·&nbsp; Listed-firm disclosure

### AnchorFirmsExhibit title
> What the four anchors disclose.

### AnchorFirmsExhibit rows
The component picks the first `source_checked` figure for each snapshot.
With the current data the rows resolve to:

| Firm | Segment chip | Figure | Label |
| --- | --- | --- | --- |
| AMEC | Etch · Shanghai | **1,548** | R&D personnel |
| ACM Research | Wet clean · Shanghai | **1,228** | Technical staff |
| NAURA | Deposition+ · Beijing | **21,101** | Total employees |
| Piotech | Deposition · Shenyang | **638** | R&D personnel |

The coder must not hard-code these strings. They are produced by the
selection rule in Prompt 2. The table above is for PM sanity-check only.

### AnchorFirmsExhibit footnote
> Categories are not interchangeable. R&D, technical staff and total-employee
> counts should not be summed across firms. See dossiers for denominators.

Source: paraphrased from `articleBrief.heroClaim.reviewNotes` + the caveat
field on each firm snapshot. PM should approve before ship.

---

## §2 — The argument (section 01)

### Section kicker
> § &nbsp;01 &nbsp;The argument

### Section title
> The public record shows scale<br/>before customer-site depth.

Source: `articleBrief.findings` headline string — the same sentence already
heads the existing Findings section on the home, verbatim.

### Drop-cap lede paragraph
> Most coverage of China's chip-tooling push tracks the same scoreboard — a
> new etch platform from Shanghai, a fresh deposition tool out of Shenyang.
> The launches are genuine. They describe only the first half of what a
> foundry needs. The vendor-side question is not whether the box ships, but
> whether the firm shipping it can install, tune, match and recover the tool
> inside a customer's ramp. The public record now shows enough to say where
> that harder problem is being staffed and where it is still being skipped.

Source: lifted with light editing from the first two paragraphs of
`/essay` section 01 (`app/essay/page.tsx`). Verbatim if PM prefers single
source of truth; or coder imports the first paragraph string directly from a
new `data/editorial/essay.ts` if PM wants strict alignment.

The drop cap is the leading *M*.

### Three findings

Pulled from `homepageInsights[0..2]`. The fourth (`city-records`) is
intentionally omitted — it becomes the standfirst of the Geography section
(Prompt 6).

**01 — `stem-denominator`**
- h4: *Broad STEM totals are the wrong denominator.*
- p:  *Etch, deposition, metrology and lithography-adjacent tools each draw
       on a different mix of plasma, thin-film, optical and controls talent.
       A national graduate total collapses those mixes into one number.*

**02 — `firm-filings`**
- h4: *Listed-firm filings are the clearest workforce window.*
- p:  *AMEC, ACM Research Shanghai, NAURA and Piotech disclose more usable
       detail than education statistics — R&D scale, technical staff, degree
       mix, after-sales categories.*

**03 — `customer-site-support`**
- h4: *Customer-site support is the hardest layer to see.*
- p:  *Product pages show ambition; filings show R&D scale. Whether a firm
       can install, tune and recover a tool inside a customer fab — the
       package question — is barely disclosed.*

Coder note: the existing `homepageInsights[i].finding` and
`homepageInsights[i].title` strings are slightly longer than the prose
above. v7 tightens them by ~30%. If PM wants verbatim use of existing
strings (no copy edits), use `homepageInsights[i].title` for the h4 and
`homepageInsights[i].finding` for the p. Both are equally honest to the
data — the tightening is purely stylistic.

### Source-base band

| Gutter label | Number | Caption |
| --- | --- | --- |
| Source base | 43 | Public sources |
|             | 143 | Evidence rows |
|             | 4 | Tool segments |
|             | 4 | Firm snapshots |

All four numbers are read from `lib/atlas-analytics.ts` + counts of
`segmentProfiles` and `firmWorkforceSnapshots`. They must not be hard-coded.

---

## §3 — Geography standfirst (Prompt 6)

> Shanghai and Beijing lead the current public record set because listed
> firms, industrial parks, universities, and policy documents are easier to
> observe there.

Source: `homepageInsights.find(i => i.id === "city-records").finding` —
verbatim.

---

## §4 — Masthead (Prompt 3)

### Left
> China Semiconductor Tooling Talent Atlas

(Links to `/`.)

### Right — nav
| Label | Href |
| --- | --- |
| Brief | `/essay` |
| Firms | `/firms` |
| Segments | `/segments/deposition` *(or `/segments` — coder confirms)* |
| Explorer | `/explorer` |
| Methodology | `/methodology` |

### Far right — metadata
> Beta · May 24, 2026

(Date read from `data/generated/manifest.json` build timestamp.)

---

## §5 — What does NOT change

These strings are already in the right register. v7 explicitly preserves
them.

- All copy inside `CitySignalMap` (caption, inspector, "node size scales
  with public-record count" note).
- All copy inside `LabToFabChain` (four labels: build / install / tune /
  keep stable).
- All copy inside `ComparatorFrame` (the *Compare on / Do not compare on*
  table — this is the most McKinsey-feeling writing on the site).
- The `source_checked` badge text.
- All copy in the source-trail dark section (`articleBrief.nextClicks`).
- All copy on `/essay`, `/firms`, `/firms/[slug]`, `/segments`, `/explorer`,
  `/sources`, `/methodology`.

---

## §6 — Forbidden strings

v7 explicitly removes these from the home. The coder must verify none
remain after the relevant prompt runs:

- "Core question" (the headline of the removed aside).
- "Analyst brief" as a card-grid eyebrow (it survives, if at all, only as a
  legacy import).
- "Findings" (replaced by "The argument").
- "Read the public evidence signal before the counts." (the
  `AnalystBriefRail` headline).
- "Public sources / Evidence rows / Tool segments / Listed-firm snapshots"
  as a four-card strip with white card backgrounds (the underlying data
  survives in the source-base band; the card chrome does not).
