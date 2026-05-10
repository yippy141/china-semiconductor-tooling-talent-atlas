# China Semiconductor Tooling Talent Atlas

## Product stance
This is an editorial evidence product, not a SaaS app.
Prioritize clarity, source transparency, and caveats over visual spectacle.

## Data rules
- Never invent data.
- Every observation must have a source_id.
- Do not create exact values from qualitative claims.
- Distinguish direct evidence from proxy evidence.
- Use "public evidence signal" or "evidence strength," not "capability score."
- Mainland PRC only unless explicitly labeled otherwise.
- Do not include individual-level personal data.
- Treat observations.csv as staging until manually verified.

## Technical rules
- Use Next.js App Router, TypeScript, Tailwind.
- Keep dependencies minimal.
- Use local CSV and generated JSON for v1.
- Do not add a database.
- Do not add authentication.
- Do not scrape without a separate reviewed plan.
- Do not add a map until the data pipeline, methodology page, evidence table, and capability matrix work.

## Working style
- Make the smallest coherent diff.
- Do not rewrite unrelated files.
- Explain changes for a beginner.
- Run build checks after each implementation pass.
