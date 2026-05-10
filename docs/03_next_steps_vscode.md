# Next Steps in VS Code

## 1. Create the dashboard repo
Open VS Code. Open Terminal -> New Terminal. Run:

```bash
cd Desktop
npx create-next-app@latest china-semiconductor-tooling-talent-atlas
```

Choose:
- TypeScript: Yes
- ESLint: Yes
- Tailwind CSS: Yes
- src/ directory: No
- App Router: Yes
- Turbopack: Yes
- Import alias: Yes

Then:

```bash
cd china-semiconductor-tooling-talent-atlas
npm install zod csv-parse recharts lucide-react
mkdir -p data/raw data/generated scripts lib components/talent-atlas app/methodology app/essay
```

Copy the `data/raw` folder and `AGENTS.md` from this pack into the new repo.

## 2. First coding-agent prompt
Paste this into Claude Code or Codex in VS Code:

```text
Read this repository before making changes.

Context:
This is a Next.js App Router + TypeScript + Tailwind project for an editorial evidence product called China Semiconductor Tooling Talent Atlas.

Rules:
- Make the smallest coherent diff.
- Do not rewrite unrelated files.
- Do not invent data.
- Use local CSV files and generated JSON.
- No database.
- No authentication.
- No map yet.
- Explain changes for a beginner.

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
- Check that observation capability_id values exist in capabilities.csv when not blank.
- Add npm script build:data.
- Do not modify unrelated files.
- After changes, tell me exactly what files changed and what command to run.
```

## 3. Run checks after each agent pass
```bash
npm run build:data
npm run lint
npm run build
```

## 4. Build the dashboard shell next
After the data pipeline passes, ask the agent to create a simple homepage with KPI cards, segment filter, capability matrix, evidence table, and methodology link. Do not add a map until the data model and basic UI work.
