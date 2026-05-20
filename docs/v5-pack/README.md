# V5 implementation pack: brief-first China chip tooling project

This pack resets the project around one user promise:

> Help analysts judge whether Chinese semiconductor-equipment firms are building the workforce and support organizations needed to move tools from product claims into customer fabs.

The current site has good plumbing: data pipeline, explorer, source ledger, methodology, firm pages, and segment pages. The public product still reads too much like a catalog of rows. V5 turns it into a readable article with a few strong visuals and links into the existing reference layers.

## What changes in V5

- The homepage becomes an article-led brief, not a dashboard tour.
- The existing monitor moves to `/monitor` so nothing is lost.
- Firm pages become the main next click.
- Piotech, Jingce, SMEE, and BEIM are added as firm pages or watch cards where current sources support them.
- The map gets a recognizable mainland schematic, but the map no longer carries the argument.
- The explorer, methodology, and source ledger remain as audit tools.

## Use order

1. Read `00_decision_memo.md`.
2. Follow `01_week_sprint.md` day by day.
3. Use the prompts in `04_code_agent_prompts.md` with Claude Code or Codex.
4. Keep `05_copy_bank.md` open during every writing pass.
5. Use `06_claude_design_token_plan.md` only after the article structure is in place.
6. Run the QA checklist before deploying.

## What not to do this week

- Do not add rare earths, GPU design, advanced packaging, HBM, or EDA.
- Do not make a real-time claim.
- Do not build a database.
- Do not build a full GIS map.
- Do not publish internal SharePoint notes or client files.
- Do not promise exact headcount by plasma physics, ALD, or lithography specialization.

## Status language

Use this status line in the footer or methodology page:

> Beta evidence brief. Public records only. Counts describe records in the dataset, not workforce totals or technical performance.
