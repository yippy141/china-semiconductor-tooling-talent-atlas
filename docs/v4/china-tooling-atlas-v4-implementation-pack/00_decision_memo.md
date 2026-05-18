# Decision memo

## Current state

The site now has a real product skeleton: homepage, explorer, methodology, source ledger, evidence ladder, city map, capability matrix, and firm snapshots. The scope is disciplined: mainland PRC, semiconductor manufacturing equipment, etch/clean/strip, deposition, metrology/inspection, and lithography as a sidebar.

The problem is not the stack. The problem is the first read.

A visitor still has to work too hard to understand the point. The homepage says the data are partial before it says what the user should watch. The map has city dots but no recognizable China. The firm cards mention AMEC, ACM Research Shanghai, and NAURA, but there is nowhere to click to learn what they do. The explorer is useful, but it reads like an audit table.

## Product diagnosis

The site is still centered on the dataset. V4 should center on the monitoring question.

Current implicit promise:

> Here is an evidence product about public signals.

Better promise:

> Here is what to watch in China’s semiconductor-equipment talent system.

That shift matters. C-suites, government-relations teams, and analysts do not need a database first. They need a readout, then a drill-down path.

## What I agree with in the Claude plan

The Claude instruction pack gets several things right:

1. The copy is too defensive.
2. The map needs a mainland outline.
3. Homepage elements need click-through.
4. The phrase "not a X" appears too often in headings.
5. Source IDs and audit language should live in drill-down views, not in the main story.

## What I would change

Claude’s plan sends clicks mostly to the explorer and external filings. That is not enough.

A user who clicks AMEC should not land in a generic table. They should land on an AMEC page that explains:

- what AMEC does,
- which segments it touches,
- what workforce data it discloses,
- what a corporate analyst should watch next,
- what not to infer from the public record,
- which sources back the page.

The same goes for NAURA and ACM Research Shanghai. These firm pages solve the "no next click" problem better than filtered tables alone.

## V4 product bet

Build a small dossier layer.

The new core architecture should be:

```text
Homepage = editorial briefing
Firm pages = next-click intelligence dossiers
Segment pages = technical translation layer
Explorer = audit table
Source ledger = provenance
Methodology = limits and source criticism
```

Do not make the map the hero. Fix it, but keep it as a wayfinding element. The strongest user path is not map first. It is:

```text
Question -> finding -> firm or segment dossier -> evidence rows -> source
```

## What this demonstrates to employers

For DGA-ASG or Eurasia Group, it shows that you can turn public records into a monitoring framework.

For McKinsey, it shows problem structuring, segmentation, source discipline, and client implications.

For Bloomberg or The Economist, it shows visual explanation and data-backed reporting.

For semiconductor firms, it shows you know the difference between product claims, workforce structure, and production know-how.
