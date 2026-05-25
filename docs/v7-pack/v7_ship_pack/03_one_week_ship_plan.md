# 03 — One-week ship plan

## Day 1 — Full V7 homepage pass

Complete the two-day sprint. The homepage is the highest-priority surface.

Done means:

- Typography tokens applied.
- Hero recomposed.
- Anchor-firm exhibit renders curated source-checked figures.
- Argument consolidated.
- Exhibit order corrected.
- Redundant uppercase eyebrows removed.

## Day 2 — Firm dossier polish

Goal: make the firm pages feel like next-click intelligence products.

Each full dossier should answer:

1. What does this firm make?
2. Which tool segments does it touch?
3. What workforce signal is visible?
4. What would change the assessment?
5. What should the reader not infer?
6. Which source rows back the page?

Do not add new firms this week. Polish the existing ones.

## Day 3 — Explorer and source trail

Goal: the explorer should be an audit surface, not the main story.

Default settings:

- Hide taxonomy scaffolding.
- Hide source-infrastructure rows.
- Show direct public records first.
- Support URL filters from firm and city links.

Homepage source-trail cards should send users to:

- Firm dossiers.
- Segment pages.
- Explorer.
- Source ledger.
- Methodology.

## Day 4 — Essay page and README

Goal: remove startup residue.

The essay should read as a standalone brief. The README should describe the actual product, not a starter app.

The README should include:

- product question;
- scope;
- routes;
- data pipeline;
- what the data can and cannot show;
- local development commands;
- update workflow.

## Day 5 — Visual QA and copy audit

Run the QA checklist in `06_qa_checklist.md`.

Search the repo for these strings:

```bash
grep -R "not a" -n app components data/editorial || true
grep -R "surface\|sharpens\|landscape\|robust\|unlock\|leverage\|visibility is not depth\|actually" -n app components data/editorial || true
```

Replace only user-facing text. Do not rewrite source notes or internal docs unless they appear on the site.

## Day 6 — Boss/advisor demo path

Practice the 2-minute and 7-minute scripts in `07_demo_script.md`.

Record a quick screen walkthrough. Watch it once. Fix only what blocks comprehension.

## Day 7 — final deployment

Run:

```bash
npm run build:data
npm run lint
npm run build
```

Deploy. After deployment, click through the public Vercel URL on desktop and mobile.

Ship when the homepage can answer this within 30 seconds:

> This site tracks whether Chinese chip-tooling firms are building the staff and support systems needed to make domestic equipment work in fabs.
