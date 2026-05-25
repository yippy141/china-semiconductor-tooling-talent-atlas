# v7 — Design direction pack

A handoff bundle for the **home page hierarchy + visual register** of the
China Semiconductor Tooling Talent Atlas. This pack does **not** introduce new
data, new tabs, or new components beyond what the home already loads. It
re-typesets and re-orders what is already there.

The home today loads as `app/page.tsx`. It renders, in order:

1. Hero (`HomePage` inline)
2. `<AnalystBriefRail/>` — four cards
3. `<ArticleStatStrip/>` — coverage counts
4. Findings — three cards (`articleBrief.findings`)
5. `<FirmWorkforceChart/>` &nbsp;·&nbsp; `<DisciplineSegmentMatrix/>` &nbsp;·&nbsp; `<ToolmakerFootprintGrid/>` &nbsp;·&nbsp; `<ComparatorFrame/>`
6. `<CitySignalMap/>`
7. `<LabToFabChain/>`
8. Source-trail dark section

The v7 critique is that sections 2, 3, 4 do the same job in three different
layouts; the hero scatters attention across three CTAs and a pull-out; and the
whole page is set in default sans on white cards, which reads as SaaS rather
than as the editorial brief the product is.

## Who reads what

| File | Read by | Length | Purpose |
| --- | --- | --- | --- |
| [`00_critique_summary.md`](./00_critique_summary.md) | PM, design lead, you | ~5 min | Diagnosis. Six points on hierarchy, what to remove, what not to change. |
| [`01_pm_decision_brief.md`](./01_pm_decision_brief.md) | **PM AI** | ~10 min | Three implementation tracks (light / medium / full) with trade-offs, scope, time. Open questions to think through before building. |
| [`02_information_architecture.md`](./02_information_architecture.md) | PM + coder | ~5 min | New section order for `app/page.tsx`. What each section does, what it replaces, where existing components fit. |
| [`03_design_tokens_spec.md`](./03_design_tokens_spec.md) | Coder | ~10 min | Exact Tailwind v4 `@theme inline` block for `globals.css`. Type system, color palette, spacing, rules. Drop-in. |
| [`04_coding_agent_prompts.md`](./04_coding_agent_prompts.md) | **Claude Code + Codex in VS Code** | per-prompt | 7 sequential prompts in the v6-pack style. Smallest coherent diff each. Run `npm run lint && npm run build` between. |
| [`05_copy_bank.md`](./05_copy_bank.md) | Coder + PM | reference | Exact strings for hero, lede, three findings, captions, masthead. Pulled from the existing brief — no new claims. |
| [`06_qa_checklist.md`](./06_qa_checklist.md) | Reviewer | reference | Acceptance criteria. Visual / typographic / data-integrity / no-regression. |

## How to use this in VS Code

1. PM reads `00` and `01`. Picks a track. Answers the open questions at the foot of `01`.
2. Coder opens `02` + `03` + `05` in side panels for reference.
3. Coder runs prompts from `04` one at a time in Claude Code or Codex. Both agents understand the same prompts; the prompts read the repository before changing anything.
4. After each prompt commits clean, run `06` against the change.

## Constraints (from `AGENTS.md`)

- Smallest coherent diff per pass.
- Editorial product, not SaaS.
- No new dependencies beyond what's in `package.json`.
- No new data sources. No scraping. No DB.
- Never invent claims, numbers, or sources.
- Mainland PRC only.

This pack honors all of those. The only dependency it touches is the
`next/font/google` shipped with Next 16 (no install needed).

## What changes, at a glance

```
home page  v6 (today)                       home page  v7 (proposed)
───────────────────────────────             ───────────────────────────────
[ HERO ]                                    [ MASTHEAD strip ]
  3 equal CTAs                              [ HERO ]
  Core Question pull-out                      ONE primary CTA + 2 quiet links
  Beta caveat (headline weight)               Lede exhibit (4 anchor firms)
                                              Beta caveat (footnote weight)

[ 01 Analyst brief — 4 cards ]   ─┐
[ Stat strip — 4 counts ]         │ merge   [ 01  The argument ]
[ 02 Findings — 3 cards ]        ─┘           Drop-cap lede paragraph
                                              3 numbered findings (prose)
                                              Source-base band (43 / 143 / 4 / 4)

[ 03 Exhibits ]                              [ 02 Exhibits ]
  FirmWorkforceChart                           FirmWorkforceChart
  DisciplineSegmentMatrix                      DisciplineSegmentMatrix
  ToolmakerFootprintGrid                       ToolmakerFootprintGrid
  ComparatorFrame                              ComparatorFrame

[ 04 Geography ]                             [ 03 Geography ]  ← unchanged
  CitySignalMap                                CitySignalMap

[ 05 Visibility ]                            [ 04 Visibility ] ← unchanged
  LabToFabChain                                LabToFabChain

[ 06 Source trail ]                          [ 05 Source trail ] ← unchanged
```

Everything below the argument is preserved as-is. The two sections being
consolidated are the ones the critique identifies as restating the same three
findings.
