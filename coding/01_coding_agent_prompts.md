# Coding Agent Prompts

## Repo orientation
Read this repository before making changes.

Context:
This is a Next.js App Router + TypeScript + Tailwind project for an editorial evidence product called China Semiconductor Tooling Talent Atlas.

Tasks:
1. Summarize the repo structure.
2. Identify where pages live.
3. Identify where data should live.
4. Recommend the smallest implementation path.
5. Do not write code yet.

## Data pipeline
You are working in a Next.js App Router + TypeScript + Tailwind project.

Task:
Create a minimal CSV-to-JSON data pipeline.

Files to create:
- scripts/build-data.mjs
- lib/talent-data.ts if needed
- data/generated/.gitkeep

Requirements:
- Read CSV files from data/raw.
- Use csv-parse and zod.
- Validate required columns.
- Fail with helpful errors if IDs are missing.
- Check that observation source_id values exist in sources.csv.
- Add npm script build:data.
- Do not modify unrelated files.
- Do not generate fake research data.
- After changes, tell me exactly what files changed and what command to run.

## Dashboard shell
Create the first dashboard page.

Requirements:
- Next.js App Router
- TypeScript
- Tailwind
- Use JSON files from data/generated
- Header with title, thesis, caveat, and methodology link
- KPI cards: sources, observations, capabilities, institutions
- Segment filter
- Capability matrix
- Evidence table
- Empty states
- No map yet
- No fake data
- Do not modify unrelated files

## Methodology page
Create app/methodology/page.tsx.

Requirements:
- Explain what the project measures and does not measure.
- Define evidence types and confidence levels.
- Explain update cadence.
- Include caveats about tacit production know-how.
- Link back to home.
- Keep the style editorial and calm.

## Charts
Add charts only after the data table works.

Visuals:
1. Bar chart: observations by segment.
2. Bar chart: observations by evidence type.
3. Matrix: capabilities by segment.

Use Recharts.
Do not add maps yet.
