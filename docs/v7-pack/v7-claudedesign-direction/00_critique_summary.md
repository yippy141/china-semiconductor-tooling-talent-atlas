# 00 — Critique summary

> The product is doing the difficult half right: it has refused to invent a
> league table and built a record of denominators instead. The home page just
> hasn't caught up to the seriousness of the work behind it.

## Six observations on hierarchy

**01. One lede, restated three times.** Sections `01 Analyst Brief` (4 cards),
`02 Findings` (3 cards) and the in-body `ComparatorFrame` carry the same three
takeaways — STEM is the wrong denominator, filings are the best window,
customer-site support is invisible. Pick one section to deliver the argument
and let the others do supporting work.

**02. The hero scatters attention.** Three CTAs of equal weight, plus a
`Core question` aside in the right column, plus a beta caveat, plus the title.
The eye has nowhere to land. A serious-publication opener has one primary
entry and lets a single exhibit do the talking on the right.

**03. Equal cards flatten the page.** White rounded-corner cards on a
light-gray field are SaaS dashboard grammar. A brief uses rules, not cards:
hairlines, marginalia, drop caps, indented standfirsts. Cards say *module*;
rules say *publication*.

**04. Eyebrow inflation.** `LISTED-COMPANY DISCLOSURE`,
`COMPARATOR FRAME`, `FIRM WORKFORCE CHART`, `PUBLIC PRODUCT RECORD` — almost
every block opens with its own uppercase kicker. When everything is labelled,
labels stop carrying any meaning. Reserve eyebrows for section openers; let
in-section blocks rely on the section's existing frame.

**05. The credibility numbers are hidden.** `43 / 143 / 4 / 4` is the answer
to *“why should I trust this?”* — it belongs near the standfirst, or
immediately under the argument, not buried between two card grids as a thin
strip.

**06. The caveat is in the wrong place.** *“Beta public-source monitor.
Counts show source coverage, not workforce size.”* is essential, but at
12–14px under the headline it shares headline weight. Move to a methodology
line under the hero CTA in muted Plex Sans, 10–11px, tracked.

## What to remove

- `Core question` `<aside>` in `app/page.tsx` (lines ~85–96).
- Two of three hero CTAs (`Open firm dossiers`, `Inspect source rows`) — keep them as quiet text links beneath the primary.
- Either `<AnalystBriefRail/>` **or** the inline Findings grid — not both. v7 proposes merging into a single `<TheArgument/>`.
- All `bg-stone-200` divider tricks that create card grids (`grid grid-cols-... gap-px bg-stone-200`). Replace with `border-t border-stone-300` hairline rows.
- Per-block uppercase eyebrows inside section bodies (`Listed-company disclosure`, `Firm workforce chart`, `Public product record`). Keep section-opener eyebrows only.

## What not to change

- The editorial restraint. No rankings, no scores, no composite indices. This is the single feature that distinguishes the product from every other China-tech tracker.
- `<CitySignalMap/>`. It is the strongest piece on the page already — reverse-out background, grid, restrained amber highlight, an inspector that names what node size means and what it doesn't. Use it as the visual template for any future exhibit.
- The denominator discipline in `firm-workforce-snapshots.ts`. Every figure declares its denominator and refuses to roll up. Keep visible in the UI.
- The `source_checked` badge + monospace source-id pattern (`CN_FILING_AMEC_2025`). Reuse consistently.
- The `ComparatorFrame`'s *Compare on / Do not compare on* list. Most McKinsey-feeling piece of writing on the site.
- Bilingual firm names (`AMEC / 中微公司`) at dossier heads.

## Other notes

- **Give the brief a date + issue number.** *Issue 04 · May 24, 2026.* Public-source monitors gain credibility by versioning visibly.
- **Lead with an exhibit, not with cards.** The four anchor firms each have one disclosed figure that is interesting on its own (AMEC 52.24% R&D share, ACM 49.42% technical-staff share, NAURA 21,101, Piotech 638). A four-row exhibit beside the headline does more work than the current `Core question` aside.
- **Promote the `<DisciplineSegmentMatrix/>` earlier.** It is the cleverest exhibit. Today it sits below the firm workforce chart; it should sit beside the argument as evidence for *“STEM is the wrong denominator.”*
- **Resist visualizing what the data can't carry.** `<ToolmakerFootprintGrid/>`'s `CORE SOURCE` / `NO CURRENT RECORD` cell labels read as a scorecard to a casual reader, even though the captions say otherwise. Consider re-rendering as a coverage matrix (dots scaled to row-count) so the visual cue matches the analytical one.
- **One typeface change does most of the work.** Moving body and headlines to an editorial serif (Source Serif 4) repositions the entire artefact toward publication.

→ Continue to [`01_pm_decision_brief.md`](./01_pm_decision_brief.md).
