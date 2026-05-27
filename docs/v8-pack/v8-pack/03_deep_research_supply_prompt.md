# Deep Research Prompt - Talent Supply Pipeline

Use this only after V8 ships, unless you have spare time. This is for the /supply page expansion.

Task:
Build a public-source talent supply appendix for China Semiconductor Tooling Talent Monitor.

Scope:
- Mainland PRC only.
- Semiconductor manufacturing equipment only.
- Segments: etch/clean/strip, deposition, metrology/inspection.
- Lithography as sidebar.
- No individual-level mapping.
- No capability scores.

Research question:
Which Mainland Chinese universities, disciplines, labs, and degree programs plausibly feed the role families needed for semiconductor manufacturing equipment?

Focus disciplines:
- Physics
- Chemistry
- Materials Science and Engineering
- Chemical Engineering and Technology
- Mechanical Engineering
- Optical Engineering
- Instrument Science and Technology
- Control Science and Engineering
- Electronic Science and Technology
- Integrated Circuit Science and Engineering
- Relevant professional master's categories, especially Electronic Information, Mechanical, and Materials/Chemical Engineering.

Required outputs:

1. official_countable_metrics
metric | source | year | geography | discipline granularity | actual count or proxy | caveat

2. institution_pipeline_table
institution | city | province | relevant school/lab/program | relevant disciplines | linked tooling role families | evidence type | source URL | confidence

3. discipline_to_role_family_table
MOE discipline code | discipline name CN/EN | role families supported | relevant segments | caveats

4. supply_demand_join_table
city | visible supply institutions | nearby equipment firms or parks | shortage/policy signals | what can be inferred | what cannot be inferred

5. comparator_context
what public sources say about semiconductor talent supply in the US, Japan, South Korea, Taiwan, and Europe. Separate official counts, estimates, and qualitative signals. Do not force cross-country equivalence if categories differ.

Rules:
- Separate official counts from proxies.
- Do not infer field-specific PhD counts where only broad science/engineering totals exist.
- Flag annual vs cumulative data.
- Flag PRC vs China including Hong Kong.
- Use primary Chinese sources where possible.
- Tables first, prose second.
