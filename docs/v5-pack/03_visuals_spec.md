# Visual specification

## Visual 1: Firm workforce chart

### Question it answers

Which listed Chinese equipment firms disclose workforce scale and technical staffing categories?

### Data source

Use `data/editorial/firm-workforce-snapshots.ts`.

### Minimum data

- AMEC: R&D personnel, R&D share, advanced-degree share or count.
- ACM Research Shanghai: total employees, technical or R&D category, after-sales or service if available.
- NAURA: total employees, R&D personnel, R&D share, service or customer-service category if available.

### Chart form

Use a grouped bar chart or stacked rows. Do not force all firms into identical categories if the filing labels differ. Label the chart clearly:

> Firm-level workforce disclosures, latest source-checked filing

Footnote:

> Categories follow each firm's filing. They are not segment-specific headcounts.

### Why this matters

This is the most corporate-relevant exhibit. It turns the project from a talent concept into a public-record monitor of firm organization.

## Visual 2: Toolmaker footprint grid

### Question it answers

Which Chinese firms appear in which parts of the tool stack?

### Firms

Full cards:

- AMEC
- NAURA
- ACM Research Shanghai
- Piotech
- Jingce Electronics
- SMEE
- BEIM

Watchlist cards:

- Kingsemi
- HWATSING
- SiCarrier
- Skyverse if source-checked

### Columns

- Etch / clean / strip
- Deposition
- Metrology / inspection
- Lithography-adjacent

### Cell labels

Use terms like:

```text
Core source
Some exposure
Sidebar
Needs source check
No current record
```

Do not use checkmarks alone. A checkmark without text hides uncertainty.

### Why this matters

A reader can see in one exhibit why Piotech belongs in deposition, Jingce and BEIM belong in metrology, and SMEE belongs in the lithography sidebar.

## Visual 3: Discipline-to-segment matrix

### Question it answers

Why broad STEM counts are too blunt for semiconductor tooling.

### Data source

Use `data/generated/disciplines.json`.

### Rows

Use the 14 MOE-coded disciplines already in the dataset.

### Columns

- Etch / clean / strip
- Deposition
- Metrology / inspection
- Lithography-adjacent

### Cell rule

If `most_relevant_segments` includes the segment, mark the cell. The label should show why the discipline matters, not just that it maps.

Example:

```text
Physics -> plasma, optics, surface effects
Chemistry -> wet clean, strip, precursors
Optical engineering -> inspection, overlay, lithography optics
```

### Why this matters

This is the educational part of the article. It explains tooling talent without asking the reader to care about your schema.

## Visual 4: Lab-to-fab chain

### Question it answers

Where does public evidence stop?

### Steps

```text
Academic discipline
R&D team
Prototype tool
Customer validation
Field application
Service and calibration
Repeat deployment
```

### Public record strength

Show the first four steps as easier to document and the final three as harder to see.

### Why this matters

This exhibit carries the central argument: Chinese firms can publish product and R&D signals while the customer-site part remains harder to measure.

## Visual 5: City map

### Question it answers

Where do current public records cluster?

### Rule

The map is secondary. It should orient the reader, not carry the thesis.

### Required fix

Add a recognizable schematic mainland China outline. Use `public/china-mainland-schematic.svg` and position city dots over it. Label it:

> Schematic mainland outline. City placement is approximate.

### Why this matters

The project uses the word atlas. The current dot field does not satisfy that expectation.
