# 01 Two-Day Sprint for Friends and Advisors

Goal: make the product understandable in one sitting. Do not chase new research. Do not rebuild the app. Fix the front door, the first two scrolls, and the next click.

## Before you start

Open VS Code.

Open terminal:

```bash
git status
git add .
git commit -m "Checkpoint V5 before executive brief sprint"
git checkout -b v6-executive-brief
npm run build:data
npm run lint
npm run build
```

If the build fails, stop. Paste the error into Claude Code or Codex and ask it to fix only the build error.

## Day 1, Block 1: merge the insight systems

Purpose: your best ideas are split between the homepage and monitor. Merge them into one clear Analyst Brief near the top of the homepage.

Create:

```text
data/editorial/homepage-insights.ts
components/atlas/analyst-brief-rail.tsx
```

Use four cards:

1. Broad STEM counts are the wrong denominator.
2. Firm filings are the best public workforce window.
3. Shanghai and Beijing produce the most records.
4. Customer-site support is the hardest layer to see.

Each card should have:

```text
title
finding
recordShows
limit
href
```

Do not call these caveats. Use the label "Limit" in small text.

Acceptance checks:

- The four cards appear immediately after the hero.
- No card title uses "not a" language.
- No card says "the atlas should" or "the brief should".
- Every card links to a firm page, monitor filter, segment page, or methodology anchor.

Commit:

```bash
git add .
git commit -m "Add analyst brief rail"
```

## Day 1, Block 2: rewrite the first screen

Purpose: make the site answer the colleague's question: what is this for?

Homepage hero should answer:

- What is the question?
- What is the answer in one sentence?
- Who should care?
- Where should I click next?

Hero copy:

Title:

> Can China Staff Its Chip-Tooling Push?

Deck:

> Chinese toolmakers are adding products and R&D staff. The harder test is whether they can build field engineers, service teams, calibration routines, and customer-support systems that make equipment work in fabs.

Small note, not headline:

> Beta public-source monitor. Counts show source coverage, not workforce size.

Primary buttons:

```text
Read the brief
Open firm dossiers
Inspect source rows
```

Acceptance checks:

- A first-time visitor can explain the site in one sentence.
- The beta note is below the main claim.
- The word "atlas" is not the main title.

Commit:

```bash
git add .
git commit -m "Rewrite homepage hero around staffing question"
```

## Day 1, Block 3: add next-click routes from the first screen

Purpose: solve the "no next click" problem before design polish.

Required links:

- Firm workforce chart cards link to `/firms/amec`, `/firms/acm-research-shanghai`, `/firms/naura`.
- Piotech card links to `/firms/piotech`.
- Segment cards link to `/segments/{segment}`.
- City map nodes link to `/monitor?city={city}` or `/explorer?city={city}`.
- Analyst Brief cards link into the relevant section.

Acceptance checks:

- Every major card has a click target.
- Clicking a firm name teaches the reader what that firm does.
- Clicking a segment name teaches the reader what roles the segment needs.

Commit:

```bash
git add .
git commit -m "Add next-click links from homepage"
```

## Day 2, Block 1: add firm comparator frame

Purpose: give readers a way to interpret Chinese workforce disclosures without pretending to rank them against Western firms.

Create:

```text
data/editorial/comparator-frames.ts
components/atlas/comparator-frame.tsx
```

Module title:

> How to read a toolmaker workforce signal

Body:

> Mature equipment firms are not only R&D shops. They run field service, applications engineering, calibration, training, spare-parts, and customer-support systems around an installed base. Chinese filings show parts of that structure. They rarely show the full customer-site layer.

Comparator rows:

- AMEC compared with Lam Research as an etch/process-equipment reference.
- NAURA and Piotech compared with Applied Materials and Tokyo Electron as broad deposition/process-equipment references.
- ACM Research Shanghai compared with SCREEN, Lam Research, and TEL as clean and wafer-processing references.
- Jingce, BEIM, and Skyverse compared with KLA as metrology/inspection references.
- SMEE compared with ASML, Nikon, and Canon as lithography-sidebar references.

Fields:

```ts
chinaFocus
referencePeers
segment
compareOn
doNotCompareOn
readerUse
```

Acceptance checks:

- No Western numerical claims unless already source-checked.
- The module says what comparison is useful for.
- The module does not imply catch-up or parity.

Commit:

```bash
git add .
git commit -m "Add comparator frame"
```

## Day 2, Block 2: add denominator labels to workforce section

Purpose: prevent overclaiming and make the strongest firm data credible.

Add labels:

- Total employees
- R&D personnel, share of total employees
- Technical staff, as disclosed by firm
- After-sales or service staff, as disclosed by firm
- Master's and doctoral degree holders, denominator stated explicitly

Add note:

> Firms use different workforce categories. R&D share, technical staff, service staff, and advanced-degree counts are not interchangeable.

Acceptance checks:

- No chart implies one comparable talent score.
- Every percentage states its denominator.
- ACM's technical staff are not mislabeled as R&D staff.

Commit:

```bash
git add .
git commit -m "Clarify workforce denominators"
```

## Day 2, Block 3: advisor test build

Run:

```bash
npm run build:data
npm run lint
npm run build
git status
```

Deploy to Vercel.

Send advisors this prompt with the link:

```text
I am testing whether the front page makes sense to a smart reader who has not followed the project. Please spend 5 minutes on the homepage and answer three questions:

1. What do you think this site is for?
2. What is the most interesting thing you learned?
3. Where did you want to click next?

Please also flag any sentence that sounds like AI writing or empty consulting language.
```
