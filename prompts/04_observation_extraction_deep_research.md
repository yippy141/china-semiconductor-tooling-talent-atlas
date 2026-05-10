From the approved source ledger, produce observation rows for the dashboard.

Output columns:
observation_id,entity_type,entity_id,city,province,segment,capability_id,indicator_name,indicator_value,indicator_unit,evidence_type,confidence,source_id,year,notes

Rules:
- Every row must cite a source_id from sources.csv.
- Use qualitative values when the source is qualitative.
- Do not invent numbers.
- Use confidence high / medium / low.
- Explain why each evidence_type was chosen.
- Do not include individual-level personal data.
- Mainland PRC only unless explicitly labeled.
