# 01 — V7 decisions

## My read on the Claude Design pack

The Claude Design pack is directionally right. It identifies the right hierarchy problems: one lede repeated three times, scattered hero CTAs, card-heavy layout, hidden credibility numbers, and caveats in the wrong place.

I would change four decisions before implementation.

## Decision 1 — ship the Full track, not Medium

Claude recommends Medium as the safe default. For a shippable professional version, take the Full track.

Reason: the site's main problem is not just visual register. It is duplicated argument structure. If you stop after typography and hero recomposition, the page will look better but still feel repetitive. Consolidating the Analyst Brief, findings grid, and stat strip into one argument section is the change that makes the product feel edited.

Ship: A + B + C.

## Decision 2 — use serif headlines, sans body

Claude's default is serif everywhere. I would use serif headlines and standfirsts, with IBM Plex Sans for body text, captions, UI, tables, filters, dossiers, and explorer rows.

Reason: this is not only an essay. It is a monitor with firm pages and tables. Sans body text will read better in dossiers, filters, charts, and source-ledger pages. Serif headlines still give the product the publication feel you want.

Ship: Source Serif 4 for display and section titles. IBM Plex Sans for body and interface. IBM Plex Mono for IDs and source codes.

## Decision 3 — curate the hero firm figures

Do not let the hero exhibit choose the first source-checked figure automatically. The first source-checked figure may be a total-employee number, which can dominate the panel without serving the thesis.

The hero exhibit should show the most thesis-relevant disclosure for each firm:

- AMEC: R&D personnel.
- ACM Research Shanghai: after-sales service personnel, or technical personnel if after-sales is not available.
- NAURA: sales and customer-service personnel, or R&D personnel if support staff is not available.
- Piotech: R&D personnel.

This makes the exhibit about organization, not just scale.

Implementation: add a `heroFigureLabel` or `heroFigureKey` to each firm snapshot in `data/editorial/firm-workforce-snapshots.ts`, or select by preferred label inside `AnchorFirmsExhibit`. Do not create new values.

## Decision 4 — keep the map, but do not make it the centerpiece

The map is useful once the reader understands what the site is about. It should sit after the argument, workforce exhibit, and role matrix. It is orientation, not thesis.

The strongest homepage order is:

1. Masthead.
2. Hero plus anchor-firm exhibit.
3. The argument.
4. Discipline-to-segment matrix.
5. Firm workforce chart.
6. Comparator frame.
7. Toolmaker footprint grid.
8. City map.
9. Lab-to-fab chain.
10. Source trail.

## What not to do in V7

Do not add broad PhD totals to the homepage. The idea is good, but it needs its own research pass. Broad science and engineering counts will pull the project back toward the generic China talent story you worked hard to escape.

Do not add Three.js. The page needs editorial discipline before cinematic polish.

Do not add hard Western comparator numbers. Use a qualitative comparator frame only, unless each number has a source and denominator.
