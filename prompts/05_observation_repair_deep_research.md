# Observation Repair Deep Research Prompt

Task: produce publication-grade observation rows from the approved source ledger and taxonomy files.

Attached files to use:
- data/raw/sources.csv
- data/raw/capabilities.csv
- data/raw/role_families.csv
- data/raw/disciplines.csv
- data/raw/institutions.csv
- data/raw/industry_entities.csv
- data/raw/city_signals.csv

Hard rules:
- Mainland PRC only.
- Semiconductor manufacturing equipment only.
- Segments: etch_clean, deposition, metrology_inspection, lithography_sidebar.
- Every row must use a source_id that exists in sources.csv.
- No row may use PENDING_sources_csv.
- Do not create generic macro rows for 5G, data centers, AI+ policy, or national R&D unless they directly support a tooling-talent claim.
- Do not create exact numerical indicators from qualitative sources.
- Label direct measures vs proxies clearly.

Output columns:
observation_id,entity_type,entity_id,city,province,segment,capability_id,indicator_name,indicator_value,indicator_unit,evidence_type,confidence,source_id,year,notes

Priority rows:
1. Company product-category presence and workforce-composition signals from official company pages and corporate filings.
2. Institution/lab/program presence from official university and MOE/NDRC sources.
3. City shortage signals from Shenzhen, Bao'an, Tianjin, Chengdu-Chongqing, and Shanghai official directories.
4. Industrial-cluster signals from Lingang, Beijing E-Town, Suzhou Industrial Park, and Xiamen Haicang.
5. Research-output proxy availability from CNIPA, NSFC, Wanfang, NSTRS, and CSCD.

Return CSV only plus a short note listing rows that need manual verification.
