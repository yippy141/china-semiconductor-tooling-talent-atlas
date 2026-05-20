# One-week sprint plan

## Before you touch code

Open VS Code. Open the project folder. Open the terminal.

Run:

```bash
git status
npm run build:data
npm run lint
npm run build
```

If all pass:

```bash
git add .
git commit -m "Checkpoint before v5 brief-first reset"
git checkout -b v5-brief-first
```

If any command fails, fix that before starting the sprint.

## Day 1: Move the current homepage to `/monitor`

Why: The current homepage is useful as a monitor, but it should not be the first thing readers see.

Result:

```text
/         article-led brief
/monitor  current dashboard-style monitor
```

Use Prompt 1 in `04_code_agent_prompts.md`.

After the agent changes files:

```bash
npm run build:data
npm run lint
npm run build
git diff
git add .
git commit -m "Move current monitor to monitor route"
```

What you are learning: in Next.js App Router, each `page.tsx` file creates a route. Moving `app/page.tsx` content to `app/monitor/page.tsx` preserves the old page while freeing `/` for the article.

## Day 2: Add article data and homepage brief

Why: The homepage needs an argument, not a tour of the data.

Result:

```text
data/editorial/article-brief.ts
app/page.tsx
```

The new homepage should have:

- Title.
- Deck.
- Three findings.
- Three visuals.
- Links to firm pages, segment pages, monitor, explorer, and methodology.

Use Prompt 2.

Run checks and commit:

```bash
npm run lint
npm run build
git add .
git commit -m "Create article-led homepage"
```

What you are learning: keep opinionated writing in `data/editorial` when it may be reused. Keep layout in `app/page.tsx` and components.

## Day 3: Add firm index and expand firm dossiers

Why: This solves the no-next-click problem. A reader who sees NAURA or Piotech should be able to click and learn what that firm does.

Result:

```text
/firms
/firms/amec
/firms/naura
/firms/acm-research-shanghai
/firms/piotech
/firms/jingce-electronics
/firms/smee
/firms/beim
```

Use Prompt 3.

Run checks and commit.

What you are learning: a dynamic route like `app/firms/[slug]/page.tsx` only renders pages for objects listed in `firmProfiles`. Adding a firm usually means editing data first, then the page renders automatically.

## Day 4: Add three visuals

Why: The site needs exhibits that teach the reader something in one glance.

Build these:

1. Firm workforce chart.
2. Toolmaker footprint grid.
3. Discipline-to-segment matrix.

Use Prompt 4.

Run checks and commit.

What you are learning: Recharts turns a data array into a chart. The hard part is not the chart library. The hard part is deciding what a chart should say.

## Day 5: Fix or demote the map

Why: A map without a recognizable China outline makes the word `atlas` feel empty.

Result:

```text
public/china-mainland-schematic.svg
components/atlas/city-signal-map.tsx
```

Use Prompt 5.

The map should be a supporting visual. The article should not depend on it.

Run checks and commit.

## Day 6: Rewrite the essay page as the longform version

Why: The homepage can be scannable. The essay page should carry the full written argument.

Result:

```text
/essay
```

Use Prompt 6.

Run checks and commit.

## Day 7: Language audit, QA, deploy

Use `05_copy_bank.md` to remove abstract phrases.

Run:

```bash
npm run build:data
npm run lint
npm run build
```

Then push and deploy.

```bash
git status
git add .
git commit -m "Polish v5 brief-first release"
git push
```

Open Vercel. Click through:

```text
/ -> /firms/piotech -> /segments/deposition -> /explorer -> /sources -> /methodology
```

What you are learning: a good product is not a set of pages. It is a path through a question.
