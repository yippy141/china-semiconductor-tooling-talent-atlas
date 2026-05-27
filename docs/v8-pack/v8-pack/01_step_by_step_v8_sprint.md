# V8 Step-by-Step Sprint

## Before starting

Run these commands in VS Code terminal:

```bash
git status
npm run build:data
npm run lint
npm run build
git add .
git commit -m "Checkpoint before v8 interpretation pass"
git checkout -b v8-interpretation-pass
```

If build or lint fails, fix that before starting.

## Step 1 - Replace confusing language

Use Prompt 01 in `02_coding_agent_prompts.md`.

Goal:
- Reduce the word "test" outside the hero.
- Rename evidence-row language to public records or source records.
- Rename map to Source coverage by city.

Files likely touched:
- app/page.tsx
- components/atlas/city-signal-map.tsx
- components/atlas/lab-to-fab-chain.tsx
- data/editorial/article-brief.ts

Run:

```bash
npm run lint
npm run build
```

Commit:

```bash
git add .
git commit -m "Clarify public copy and map language"
```

## Step 2 - Add interpretation cards to workforce chart

Use Prompt 02.

Goal:
Each firm workforce card should answer "What does this number mean?" and "What would change the read?"

Files likely touched:
- data/editorial/firm-workforce-snapshots.ts
- components/atlas/firm-workforce-chart.tsx

Run checks and commit:

```bash
npm run lint
npm run build
git add .
git commit -m "Add workforce interpretation cards"
```

## Step 3 - Reset the map concept

Use Prompt 03.

Goal:
The map becomes a source coverage map with a clear caption. It excludes taxonomy rows by default and links to a future supply page.

Files likely touched:
- components/atlas/city-signal-map.tsx
- lib/atlas-analytics.ts if needed

Run checks and commit.

## Step 4 - Add /supply page scaffold

Use Prompt 04.

Goal:
Create a second-click page explaining the talent supply pipeline and what needs a future research pass.

Files likely touched:
- app/supply/page.tsx
- app/page.tsx
- components/atlas/discipline-segment-matrix.tsx only if adding links

Run checks and commit.

## Step 5 - Add global context / so-what module

Use Prompt 05.

Goal:
Add one module that explains why talent matters internationally, without turning the site into a country ranking.

Files likely touched:
- app/page.tsx
- data/editorial/global-context.ts
- components/atlas/global-talent-context.tsx

Run checks and commit.


## Step 6 - Add answer paths

Use Prompt 06.

Goal:
Let different readers enter the site through their own question. This solves the "what is this for?" problem better than another caveat block.

Files likely touched:
- app/page.tsx
- data/editorial/reader-paths.ts
- components/atlas/reader-paths.tsx

Run checks and commit.

## Step 7 - Substack split and final publish polish

Use Prompt 07.

Goal:
The website becomes the interactive companion. The essay route can become a "Read the essay" gateway or remain as an onsite brief until the Substack link exists.

Run final commands:

```bash
npm run build:data
npm run lint
npm run build
git status
```

Deploy after this passes.
