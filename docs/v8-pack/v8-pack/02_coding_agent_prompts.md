# V8 Coding Agent Prompts

## Prompt 01 - Clarify copy and remove confusing language

Paste this into Claude Code or Codex:

```text
Read the repo before changing files.

Goal:
Make the public copy clearer for a professional reader. The current site overuses "test", "evidence rows", and source-method language in places where readers need interpretation.

Files to edit only if needed:
- app/page.tsx
- components/atlas/city-signal-map.tsx
- components/atlas/lab-to-fab-chain.tsx
- data/editorial/article-brief.ts

Rules:
- Smallest coherent diff.
- No new data.
- No new dependencies.
- No em dashes.
- Do not change source IDs, data schemas, or routes.
- Do not use these words in new copy: actually, surface, landscape, robust, leverage, sharpens, unlocks, harnesses, comprehensive, nuanced.

Required changes:
1. Keep the homepage hero question if present: "Can China staff its chip-tooling push?"
2. Outside the hero, replace repeated "test" language with clearer terms:
   - "workforce question"
   - "support-capacity question"
   - "public-record check"
   - "signals to watch"
3. Replace prominent "evidence rows" with "public records" or "source records" unless the text is in explorer/methodology.
4. Rename the geography section heading to:
   "Source coverage by city"
5. Geography section body should say:
   "This map shows where the beta dataset has public records. It does not show talent density, workforce size, or city capability. Large nodes usually mean filings, park documents, shortage notices, or official sources are easier to observe there."
6. Rename any section heading similar to "Where public records go quiet" to:
   "Where filings stop short"
7. Change lab-to-fab heading from "The staffing test runs from lab tool to fab routine" to:
   "The hard part starts after the product claim"
8. Keep methodology caveats, but do not make them headlines on the homepage.

After changes:
- Tell me exactly which files changed.
- Run npm run lint and npm run build if you can.
```

## Prompt 02 - Add workforce interpretation cards

```text
Read the repo before changing files.

Goal:
Make the firm workforce numbers satisfying. Each firm card should answer what the number means, why someone should care, and what would change the assessment.

Files to edit:
- data/editorial/firm-workforce-snapshots.ts
- components/atlas/firm-workforce-chart.tsx

Do not edit other files.

Rules:
- No new dependencies.
- No new numbers.
- Do not infer segment-specific headcount.
- Do not invent workforce categories.
- Preserve existing figure arrays and source status badges.
- Keep the diff small.

Data model change:
Add optional fields to FirmWorkforceSnapshot:
- numberRead: string
- strongerSignal: string
- reasonableInference: string
- doNotInfer: string

Populate them:

AMEC:
numberRead: "AMEC's R&D scale supports the view that its etch story is being built through a research-heavy organization. Advanced etch depends on plasma behavior, chamber design, materials interaction, and process control."
strongerSignal: "Growth in field application engineers, service training, chamber matching, advanced-memory validation, and repeat customer deployment."
reasonableInference: "The filing supports an R&D-intensive reading of AMEC, not a customer-support reading."
doNotInfer: "Do not infer etch-specific service depth or installed-base support from the R&D count."

ACM Research Shanghai:
numberRead: "ACM's after-sales service category is the closest disclosed measure in this set to customer-site support. That matters because clean and strip tools depend heavily on process support at the fab."
strongerSignal: "A split between field service, installation, applications engineering, and tool-family support."
reasonableInference: "ACM gives a stronger public service signal than firms that disclose only R&D and degree mix."
doNotInfer: "Do not infer clean-specific staffing or customer success from the aggregate after-sales number."

NAURA:
numberRead: "NAURA's scale makes it a broad equipment group rather than a single-segment specialist. Its R&D and customer-service figures show organizational mass, but they blur tool-family depth."
strongerSignal: "Headcount or hiring split by etch, deposition, furnace, wet, service, and applications roles."
reasonableInference: "NAURA has visible organizational scale across equipment categories."
doNotInfer: "Do not read whole-firm R&D or service categories as deposition-specific or etch-specific depth."

Piotech:
numberRead: "Piotech keeps the deposition story from being swallowed by NAURA. Its filings show R&D concentration and deposition product breadth, but not a full customer-support organization."
strongerSignal: "Application and service capacity tied to PECVD, ALD, SACVD, HDPCVD, and Flowable CVD product families."
reasonableInference: "Piotech is a focused deposition vendor with visible R&D investment."
doNotInfer: "Do not infer mature installed-base support from deposition product breadth alone."

Component change:
Under each firm's editorialRead, add a bordered panel titled "How to read this number". Show numberRead, strongerSignal, reasonableInference, and doNotInfer in compact rows.

After changes, run lint and build if available.
```

## Prompt 03 - Reset map concept

```text
Read the repo before changing files.

Goal:
Make the map concept honest and useful. It should be a source coverage map, not a talent geography map.

Files to edit:
- components/atlas/city-signal-map.tsx
- lib/atlas-analytics.ts only if the map currently counts manual inference rows through topCitiesByEvidence

Rules:
- No new dependencies.
- Do not change city positions.
- Do not add GIS libraries.
- Do not change the China SVG asset.
- No new data files.

Required behavior:
1. Node size should be based on substantive records only.
2. Exclude observations where evidence_type === "manual_inference".
3. Exclude entity_type === "source" or entity_type === "proxy_source" if those appear in observations.
4. Rename labels:
   - "evidence rows" -> "public records"
   - "source IDs" -> "source documents"
5. Heading:
   "Source coverage by city"
6. Deck:
   "The map shows where this beta dataset has public records. It does not show talent density, workforce size, or city capability."
7. Legend should say:
   "Node size = source-backed records in this dataset"
8. Add a small link below the map:
   "Want the talent geography? Start with the supply pipeline ->" linking to /supply.

After changes, run lint and build if available.
```

## Prompt 04 - Add Talent Supply Pipeline page

```text
Read the repo before changing files.

Goal:
Add a second-click page that answers where relevant talent might come from, without claiming exact discipline-specific PhD counts.

Files to create/edit:
- app/supply/page.tsx
- app/page.tsx

Do not edit data schemas or generated JSON.

Rules:
- No new dependencies.
- Use existing disciplines data from data/generated/disciplines.json if needed.
- Use existing segment profiles if needed.
- No invented graduate counts.
- No university rankings.
- No claims that a university "produces etch talent".

Create /supply page with title:
"Talent supply pipeline"

Deck:
"Tooling talent does not come from one major. Etch draws on plasma, surface chemistry, materials, RF, controls, and process engineering. Deposition draws on thin films, precursor chemistry, vacuum behavior, and chamber control. Metrology draws on optics, instrumentation, algorithms, calibration, and field support. This page maps the disciplines and institutions that plausibly feed those role families, and marks where official data stop."

Sections:
1. "What official data can count"
   Explain: broad postgraduate totals, province-level postgraduate totals, MOE discipline categories, authorized degree points, school and lab presence.
2. "What official data cannot isolate"
   Explain: plasma-etch PhDs, ALD process engineers, field application engineers, placement into AMEC or NAURA, customer-site support roles.
3. "Feeder disciplines"
   Render a table from data/generated/disciplines.json with MOE code, English name, Chinese name, relevant segments, and relevance notes.
4. "Supply, demand, absorption"
   Explain the three layers:
   Supply = universities, disciplines, labs.
   Demand = shortage lists and job postings.
   Absorption = firms, parks, service teams, customer deployments.
5. "Research still needed"
   List the future research pass: degree-point table, institution pipeline table, city supply-demand join, comparator context.

Homepage change:
Add a compact teaser card after the discipline matrix or near the source trail:
Title: "Where might the talent come from?"
Body: "The supply page separates formal training from firm absorption. It maps feeder disciplines now and marks the institution-level counts that need a dedicated research pass."
Link: /supply

After changes, run lint and build if available.
```

## Prompt 05 - Add global context module

```text
Read the repo before changing files.

Goal:
Add a small context module that explains why the numbers matter internationally without creating a China-versus-West scorecard.

Files to create/edit:
- data/editorial/global-context.ts
- components/atlas/global-talent-context.tsx
- app/page.tsx

Rules:
- No new dependencies.
- No hard-number country comparisons unless the number already exists in source ledger or data files.
- Use qualitative context if source data is not already present.
- Keep this module short.

Create data/editorial/global-context.ts with three context cards:

1. title: "Talent is a global semiconductor constraint"
body: "New fabs and tool supply chains are creating demand for engineers, technicians, and customer-support roles faster than many training systems can supply them."
sourceNote: "Use Deloitte, SIA/Oxford, and McKinsey sources from the ledger as framing."

2. title: "China's STEM scale matters, but toolmaking is narrower"
body: "China's broad STEM pipeline gives domestic toolmakers a large upstream pool. The question is whether that pool converts into plasma, thin-film, optics, controls, service, and applications teams."
sourceNote: "Use CSET STEM PhD framing and MOE discipline sources as context."

3. title: "Support organizations separate product claims from production tools"
body: "Mature equipment vendors compete through installed-base support, applications engineering, spare parts, training, and field service. Chinese filings show pieces of this structure, but not consistently by tool family."
sourceNote: "Use firm filings and comparator frame."

Component:
Render the three cards under a section heading:
"How to read the scale"

Add to homepage after the workforce chart and before the comparator frame.
```


## Prompt 06 - Add answer paths

```text
Read the repo before changing files.

Goal:
Add a homepage section that tells different readers where to go. This should answer the question: what is this site for?

Files to create/edit:
- data/editorial/reader-paths.ts
- components/atlas/reader-paths.tsx
- app/page.tsx

Rules:
- No new dependencies.
- No new claims or numbers.
- Keep the section short.
- Do not add user tracking, forms, or state.

Create data/editorial/reader-paths.ts with six cards:

1. question: "Which Chinese toolmakers should I watch?"
href: "/firms"
answer: "Start with AMEC, NAURA, ACM Research Shanghai, Piotech, Jingce, SMEE, and BEIM."

2. question: "What does etch, deposition, or metrology require?"
href: "/segments/deposition"
answer: "Open the segment briefs to see which role families and disciplines sit behind each tool family."

3. question: "Where might the talent come from?"
href: "/supply"
answer: "Use the supply page for feeder disciplines, institutions, and the limits of official education data."

4. question: "What should a corporate analyst monitor?"
href: "/firms/amec"
answer: "Look for field application hiring, service training, customer validation, repeat orders, and support categories."

5. question: "Where is the source record strongest?"
href: "/explorer"
answer: "Use the explorer and map to inspect filings, park documents, shortage notices, and source records by city or firm."

6. question: "How reliable is this?"
href: "/methodology"
answer: "Read the methodology and source ledger for evidence types, verification status, and limits."

Component:
Render as a clean card grid titled:
"Start with the question you have"

Add to homepage after the hero or after the workforce chart.

After changes, run lint and build if available.
```

## Prompt 07 - Substack integration and final polish

```text
Read the repo before changing files.

Goal:
Prepare the site to work as the interactive companion to a Substack essay.

Files to edit:
- app/page.tsx
- app/essay/page.tsx
- README.md

Rules:
- No new dependencies.
- Keep the on-site brief accessible for now.
- Do not add a Substack URL unless I provide one.

Changes:
1. Homepage primary CTA should remain "Read the brief" until a Substack URL exists.
2. Add a small note near the brief CTA:
   "A longer essay version will publish separately. This site is the interactive source companion."
3. In app/essay/page.tsx, add a top note:
   "This on-site brief is the working version of the essay. A public essay link will be added after publication."
4. Rewrite README.md so it describes the current project, routes, local commands, and beta status. Remove create-next-app starter language.
5. Add a final checklist to README:
   npm run build:data
   npm run lint
   npm run build

After changes, run all checks.
```
