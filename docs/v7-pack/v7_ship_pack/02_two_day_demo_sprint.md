# 02 — Two-day demo sprint

This is the version to show friends and advisors.

## Day 0 — checkpoint

Open VS Code. Open the project folder. Open a new terminal.

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
git commit -m "Checkpoint before v7 executive brief pass"
git checkout -b v7-executive-brief
```

If a command fails, do not start V7. Paste the error into Codex or Claude Code and ask for the smallest fix.

## Day 1 morning — typography and visual register

Run Prompt 1 from `04_coding_agent_prompts.md`.

Expected result: the page no longer looks like a default Tailwind app. It should feel like an editorial brief with warm paper, strong typography, and quieter UI chrome.

Check:

```bash
npm run lint
npm run build
```

Commit:

```bash
git add .
git commit -m "Apply v7 editorial typography tokens"
```

## Day 1 afternoon — hero and anchor-firm exhibit

Run Prompt 2.

Expected result: the hero has one headline, one standfirst, one primary CTA, quiet secondary links, and a right-side exhibit showing four firm disclosures.

Check the hero manually. The right panel must not look like a scoreboard. Each row must say what the number is.

Commit:

```bash
git add .
git commit -m "Recompose homepage hero with anchor firm exhibit"
```

## Day 2 morning — argument consolidation

Run Prompt 3.

Expected result: the old Analyst Brief cards, findings grid, and stat strip collapse into one clean argument section.

The reader should see one argument, not three modules arguing with each other.

Commit:

```bash
git add .
git commit -m "Consolidate homepage argument section"
```

## Day 2 afternoon — exhibit order and language cleanup

Run Prompt 4 and Prompt 5.

Expected result: the discipline matrix appears before the firm workforce chart. This reinforces the idea that broad STEM counts are too blunt. Per-component eyebrows are gone. The page reads like a brief, not a dashboard.

Commit:

```bash
git add .
git commit -m "Reorder exhibits and remove redundant labels"
```

## Demo link test

Run the dev server:

```bash
npm run dev
```

Open the local URL. Test these routes:

- `/`
- `/essay`
- `/firms`
- `/firms/amec`
- `/segments/deposition`
- `/explorer`
- `/methodology`

Then deploy to Vercel.

## What to ask testers

Send this message with the link:

> Please spend five minutes on the homepage and answer three questions: what is this for, what did you learn, and where did you want to click next? Also flag any sentence that sounds vague or AI-written.
