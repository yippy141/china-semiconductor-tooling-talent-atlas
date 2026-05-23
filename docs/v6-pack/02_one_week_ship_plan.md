# 02 One-Week Ship Plan

This plan assumes the two-day sprint is complete.

## Day 3: make the article real

Goal: turn `/essay` into a clean longform piece that stands on its own.

Working title:

> The Talent Test Behind China's Chip-Tooling Push

Structure:

1. Opening: product announcements do not prove fab support.
2. What toolmaking talent means: role families by segment.
3. What listed firms disclose: AMEC, ACM Research Shanghai, NAURA, Piotech.
4. Where the public record thins out: field support, calibration, chamber recovery.
5. What to watch: filings, hiring, service teams, validation language.
6. How to use the monitor: source rows, firm pages, methodology.

Do not write the essay as a method page. Write it as a piece a ChinaPower or Bloomberg reader can understand without seeing the dashboard.

Commit:

```bash
git add .
git commit -m "Rewrite essay as standalone brief"
```

## Day 4: firm pages as analyst dossiers

Goal: make firm pages the main next-click layer.

Each firm page should answer:

- What does the firm make?
- Which in-scope segments does it touch?
- What workforce or product evidence is visible?
- What would change the assessment?
- What should the reader not infer?
- Where are the source rows?

Priority firms:

- AMEC
- NAURA
- ACM Research Shanghai
- Piotech
- Jingce
- SMEE
- BEIM

Piotech must be a full dossier. It is too useful for deposition to leave as a watchlist item.

Commit:

```bash
git add .
git commit -m "Upgrade firm pages into dossiers"
```

## Day 5: visual hierarchy pass

Goal: make the homepage feel like a brief, not a feed.

Changes:

- Put the Analyst Brief rail in the first screen on desktop.
- Use the workforce chart as the first major exhibit.
- Move the city map after firm and segment exhibits.
- Add section numbers: 01, 02, 03.
- Cut repeated "bottom line" labels.
- Make chart notes small and factual.

Commit:

```bash
git add .
git commit -m "Improve homepage section hierarchy"
```

## Day 6: verification sprint

Goal: source-check only visible claims.

Verify:

- Hero claim
- Four Analyst Brief cards
- Firm workforce figures
- Piotech product claims
- Toolmaker footprint grid
- Comparator module language
- Any number shown above the fold

Add or update fields where available:

```text
verificationStatus
sourceAnchor
reviewNotes
```

Minimum statuses:

- source_checked
- needs_check
- staging

Commit:

```bash
git add .
git commit -m "Source-check visible claims"
```

## Day 7: final language and demo pass

Goal: remove AI language and rehearse.

Run a search for banned words and phrases:

```bash
grep -Rni "sharpens\|surface\|robust\|nuanced\|landscape\|leverage\|unlock\|why this matters\|actually\|not a census\|visibility is not depth" app components data || true
```

For each hit, decide whether to cut, replace, or keep in methodology only.

Run final checks:

```bash
npm run build:data
npm run lint
npm run build
```

Deploy.

Commit:

```bash
git add .
git commit -m "Prepare V6 public beta"
```
