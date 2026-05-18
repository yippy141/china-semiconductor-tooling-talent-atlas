# Claude Design workflow with limited tokens

Use Claude Design for visual direction only. Do not use it to reason about data, rewrite methodology, or generate source claims.

## What to upload

Upload only:

1. Screenshot of the homepage hero and findings.
2. Screenshot of the map section.
3. Screenshot of the firm workforce snapshots.
4. Screenshot of the evidence ladder.
5. `app/page.tsx`.
6. `components/atlas/city-signal-map.tsx`.
7. `components/atlas/firm-workforce-snapshots.tsx`.
8. Optional: one DGA report screenshot showing a page layout you like.

Do not upload the full repomix. Do not upload all generated JSON. Do not ask Claude Design to redesign the whole product at once.

## Prompt 1 - homepage visual hierarchy

```text
You are advising on visual design for a client-facing evidence brief.

Product: China Chip Tooling Talent Monitor.
Audience: DGA-ASG, McKinsey, Bloomberg, Eurasia Group, semiconductor-equipment corporate strategy and GR teams.

Task: critique the homepage visual hierarchy and propose a redesign direction for the first 2 scrolls only.

Constraints:
- Do not invent data.
- Do not change the product scope.
- Do not make it SaaS-like.
- Keep it serious, analytical, and editorial.
- The main user question is: what should I watch in China’s semiconductor-equipment talent system?

Output:
1. What should be visually dominant.
2. What should move down the page.
3. A proposed hero layout.
4. A proposed findings layout.
5. Tailwind class guidance, not full code.
6. What not to change.
```

## Prompt 2 - map only

```text
Focus only on the city signal map.

Problem: the current map shows dots but does not visually read as China.

Task:
1. Propose a schematic mainland China map treatment that is recognizable but clearly non-GIS.
2. Suggest how the city labels should be placed.
3. Suggest styling for the outline, grid, nodes, legend, and city inspector.
4. Keep the map secondary to the argument.
5. Do not add a map library.
6. Do not add new data.

Output Tailwind guidance and, if useful, an SVG path concept in 0-100 coordinates.
```

## Prompt 3 - firm dossier card design

```text
Focus only on firm cards and firm profile pages.

Product problem: users want to click AMEC, NAURA, or ACM Research Shanghai and understand what the firm does.

Task:
1. Design a firm card that works on the homepage.
2. Design a firm dossier page layout.
3. Include zones for product families, workforce signals, what to watch, do-not-infer, and source links.
4. Keep the design serious and source-led.
5. Do not use generic SaaS cards.
6. Do not add animation.

Output a visual layout description and Tailwind guidance.
```

## How to save tokens

Ask Claude Design for one screen at a time. Then implement with Claude Code or Codex. Do not ask the design tool to edit the whole repo.

A good handoff prompt to Claude Code is:

```text
Implement the approved visual direction for [specific component]. Use the existing data and architecture. Make the smallest coherent diff. Do not add dependencies. Do not change data logic.
```
