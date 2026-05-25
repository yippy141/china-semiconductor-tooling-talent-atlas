# 02 — Information architecture

The proposed home page section list. Each row maps directly to a block in
`app/page.tsx`. *Status* indicates what the coding agent is being asked to do
in `04`.

## Sections, in order

| # | Section | Component(s) | Status in v7 | Source data |
| - | --- | --- | --- | --- |
| — | Masthead strip | `AtlasMasthead` (new) | **add** | `data/generated/manifest.json` for date; nav strings static |
| § | Hero | inline JSX in `app/page.tsx` + `AnchorFirmsExhibit` (new) | **rewrite** | `articleBrief.heroClaim`, `firmWorkforceSnapshots` |
| 01 | The argument | `TheArgument` (new) + existing `ArticleStatStrip` | **add, replaces 2 existing blocks** | `articleBrief.findings`, `homepageInsights`, `lib/atlas-analytics.ts` |
| 02 | Exhibits | `FirmWorkforceChart`, `DisciplineSegmentMatrix`, `ToolmakerFootprintGrid`, `ComparatorFrame` | **untouched** order may shift | existing |
| 03 | Geography | `CitySignalMap` | **untouched** | existing |
| 04 | Visibility | `LabToFabChain` | **untouched** | existing |
| 05 | Source trail | inline dark section | **demote eyebrow only** | `articleBrief.nextClicks` |

## What lives in each section

### Masthead strip — `AtlasMasthead`
Thin sticky bar above the hero. Three slots:
- Left: publication mark — *“China Semiconductor Tooling Talent Atlas”* in tracked Plex Sans 11px.
- Right: nav strings (Brief / Firms / Segments / Explorer / Methodology) +
  small metadata (issue + date) pulled from `manifest.json`.
- Bottom: 1px solid `border-stone-900` rule.

Not interactive beyond `<Link>`s. No search, no menu icon. Border-bottom only.

### Hero
Two-column grid on `lg`, single column on mobile.

**Left:**
- Kicker — *“Tooling Talent · Issue 04 · May 24, 2026”* (read date from manifest).
- Display title — `Can China staff its chip-tooling push?` — sentence case, italic on *chip-tooling* (accent color).
- Standfirst (dek) — two sentences pulled from `articleBrief.heroClaim.rendered`.
- Action row — one primary CTA *Read the brief* + two quiet text links *or jump to firm dossiers · inspect source rows*.
- Beta caveat — 10–11px tracked Plex Sans muted, with link to /methodology.

**Right:**
- `AnchorFirmsExhibit` — four firms, one figure each. Renders from `firmWorkforceSnapshots`. Picks the first `source_checked` figure for each firm; falls back to `figures[0]` if none.

Removes: `Core question` aside, two of three CTAs, headline-weight beta caveat.

### 01 The argument — `TheArgument`
Single section. Three-column grid on `lg`:
- Column 1 (96px): gutter — section number + label.
- Column 2: drop-cap lede paragraph — first ~90 words of `/essay` (single source of truth). Body in serif, 19/1.5.
- Column 3: three numbered findings — pulled from `homepageInsights` (first three by default, picked by PM in `05`). Each is `<h4>` + `<p>`, separated by 1px `border-stone-300` hairlines. No card backgrounds. No per-card eyebrows.

Below the grid, a *source-base* band:
- Left gutter label: `Source base`.
- Four numbers: `43`, `143`, `4`, `4` (from `lib/atlas-analytics.ts`).
- Each with caption underneath: `Public sources`, `Evidence rows`, `Tool segments`, `Firm snapshots`.

Replaces both the existing `<AnalystBriefRail/>` and the inline Findings
section. Existing `<ArticleStatStrip/>` is replaced by the band inside this
component — the underlying `lib/atlas-analytics.ts` exports are reused.

### 02 Exhibits
Unchanged in v7. The existing components keep their current API:
`FirmWorkforceChart`, `DisciplineSegmentMatrix`, `ToolmakerFootprintGrid`,
`ComparatorFrame`. v7 only asks for:
- Suggested visual order: `DisciplineSegmentMatrix` first (it answers
  *"why STEM is the wrong denominator"*, which is the first finding above), then
  `FirmWorkforceChart`, then `ComparatorFrame`, then
  `ToolmakerFootprintGrid`. This is **optional**; the prompt in `04` calls
  out the reorder as a single-line change.
- Per-component header eyebrows are removed — the section opener carries the
  eyebrow, the exhibits carry only their own `<h3>`.

### 03 Geography — `CitySignalMap`
Untouched. Already in the right register. Just gets a fresh section number.

### 04 Visibility — `LabToFabChain`
Untouched.

### 05 Source trail
The dark `bg-stone-950` section at the foot. v7 only removes its per-card
eyebrow inflation and tightens the headline. The 5-link nav stays.

## Where existing data lives

| File | Used by |
| --- | --- |
| `data/editorial/article-brief.ts` | hero copy, findings, source-trail nextClicks |
| `data/editorial/homepage-insights.ts` | the four-card analyst brief — three will be reused in `TheArgument` |
| `data/editorial/firm-workforce-snapshots.ts` | dossier exhibits, the new `AnchorFirmsExhibit` |
| `data/generated/manifest.json` | date stamp for masthead |
| `lib/atlas-analytics.ts` | the 43/143/4/4 source-base figures |

The coding agent must not change any of these. New files in
`data/editorial/` are only added if PM explicitly opts in to a Track F
extension (none planned).
