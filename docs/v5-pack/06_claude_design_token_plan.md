# Claude Design token plan

Use Claude Design for visual judgment, not research and not code.

## Token budget rule

Do not upload the full repo. Upload screenshots and one or two relevant components only.

## Use case 1: homepage first two scrolls

Upload:

- Screenshot of current homepage hero.
- Screenshot of current findings section.
- Screenshot of DGA AI Decrypted page 4 or 7 as a style reference.

Prompt:

```text
You are reviewing a client-facing geopolitical technology brief.

Audience:
- semiconductor equipment firms
- DGA/Eurasia/McKinsey-style strategy readers
- Bloomberg/Economist-style data readers

Task:
Critique the first two scrolls only. Do not rewrite the whole site.

I need:
1. What the first screen should make clear in 10 seconds.
2. Which current elements distract from the argument.
3. A proposed layout for the hero and first exhibit.
4. Tailwind-level design guidance, not full code.
5. What not to change.

Constraints:
- No new data.
- No fake metrics.
- Serious editorial style.
- No SaaS styling.
```

## Use case 2: map visual

Upload:

- Screenshot of current city map.
- `components/atlas/city-signal-map.tsx` only.

Prompt:

```text
Critique only the city map component.

Problem:
The city dots appear without a recognizable mainland China outline.

Task:
Suggest a visual treatment that makes this read as a schematic mainland China map without adding GIS dependencies.

Output:
1. Visual hierarchy notes.
2. How to layer a schematic outline behind the dots.
3. Label placement fixes.
4. Tailwind classes or SVG layout guidance.
5. What to keep.
```

## Use case 3: firm dossier page

Upload:

- Screenshot of one firm page.
- `app/firms/[slug]/page.tsx`.
- `data/editorial/firm-profiles.ts`.

Prompt:

```text
Review the firm dossier page as a corporate intelligence card.

Audience:
- Lam Research strategy or GR team
- Applied Materials or KLA competitor-monitoring reader

Task:
Make the page answer three questions faster:
1. What does this firm do?
2. Which tool segment does it touch?
3. What should I watch next?

Output:
- Proposed page order.
- Components to emphasize.
- Copy changes for headings.
- Design guidance.
- No new data.
```

## What not to ask Claude Design

Do not ask:

- Build the full website.
- Rewrite all copy.
- Verify sources.
- Generate China data.
- Create exact code patches.

Use Claude Code or Codex for code changes after the design direction is clear.
