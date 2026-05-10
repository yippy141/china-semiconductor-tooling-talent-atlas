# Data Dictionary - China Semiconductor Tooling Talent Atlas v1

## Evidence principle
Use evidence strength, not capability score. This project maps public evidence signals for human-capital formation and bottlenecks. It does not directly measure talent stocks, industrial capability, yield learning, or tacit production know-how.

## Segments
- `etch_clean`: etch / clean / strip
- `deposition`: deposition / thin films
- `metrology_inspection`: metrology / inspection
- `lithography_sidebar`: lithography sidebar only
- `all`: only used in source-keyword/proxy files, not for core segment scoring

## Evidence types
- `official_stat`: official quantitative statistic
- `official_policy`: policy document or government announcement
- `shortage_signal`: shortage list, talent catalog, recruitment policy, labor-market signal
- `institutional_capacity`: degree authorization, school, lab, research center, key discipline
- `industry_presence`: firm, industrial park, supplier cluster, manufacturing ecosystem
- `job_posting_proxy`: role demand inferred from job postings
- `research_output_proxy`: papers, patents, grants, standards, labs
- `expert_secondary`: think-tank, consulting, industry report, academic synthesis
- `manual_inference`: analyst-coded inference from source-backed evidence

## Confidence labels
- `high`: source directly supports the observation
- `medium`: source supports the observation through a reasonable proxy
- `low`: source is relevant but indirect, promotional, outdated, or incomplete

## Core table schemas
### sources.csv
`source_id,title,publisher,source_type,url,publication_date,language,access_date,reuse_value,caveats,notes`

### capabilities.csv
`capability_id,segment,segment_id_original,segment_name,capability_name,plain_english_description,core_technical_problems,public_proxy_examples,suggested_primary_sources,bottleneck_relevance,notes`

### role_families.csv
`role_family_id,segment,segment_id_original,role_family,plain_english_description,typical_titles,typical_skills,experience_level,observability,tacit_knowhow_observable,public_proxies,suggested_primary_sources`

### disciplines.csv
`discipline_id,moe_code,name_cn,name_en,pinyin,discipline_type,most_relevant_segments,relevance_notes,example_keyword_anchor,source_id,suggested_primary_sources`

### observations.csv
`observation_id,entity_type,entity_id,city,province,segment,capability_id,indicator_name,indicator_value,indicator_unit,evidence_type,confidence,source_id,year,notes`

## Observation rule
Every observation row must answer: what is the claim, who or what does it refer to, which segment does it support, what source supports it, and how confident are we?

No `source_id`, no row.

## Important caveat for the included observations
The included `observations.csv` is a development/staging file. It is valid for testing the dashboard data model because every row has a source_id and maps to the v1 taxonomy. It is not yet publication-grade. Before public release, verify the highest-visibility rows directly against the primary sources and replace broad taxonomy rows with more specific extracted rows where possible.
