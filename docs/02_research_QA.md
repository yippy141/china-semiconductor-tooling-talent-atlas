# Research QA Review - May 2026

## Verdict
Proceed to the coding MVP, but treat the observation table as staging. The literature/gap pass, taxonomy pass, and source-ledger pass are successful enough to proceed. The observation-extraction pass is not successful and should be discarded as a final evidence table.

## Why the first three passes succeeded
- The literature/gap memo correctly narrowed the project to a public-source, aggregate, role-family atlas for Mainland PRC semiconductor equipment, not a broad China STEM map.
- The taxonomy pass created the key intellectual asset: a capability-first mapping from etch/clean/strip, deposition, metrology/inspection, and lithography-sidebar problems to role families and MOE disciplines.
- The source ledger identified observation-generating source classes: MOE education tables, local HRSS shortage directories, official company/park pages, and research-output proxy systems.

## Why the observation pass failed
The fourth pass stated that it could not access the approved source ledger and therefore produced zero fully compliant rows. Its provisional rows focused on broad national R&D, 5G, data-center, education, and AI+ indicators. Those are mostly irrelevant to the v1 tooling taxonomy because they do not map to specific segments, role families, firms, institutions, or tooling bottlenecks.

## What changed in this updated pack
- Normalized the source ledger into `data/raw/sources.csv`.
- Normalized taxonomy spreadsheets into clean CSV files.
- Fixed malformed professional-degree rows in `disciplines.csv` for 0854, 0855, and 0856.
- Added institutions, industry entities, city signals, source keywords, and segment bottlenecks.
- Created a staging `observations.csv` with 172 source-backed rows for dashboard development.

## Before public release
Verify the top 20-30 dashboard-visible observations directly against primary sources, especially company filings, shortage-list attachments, and park/cluster pages. Keep all visual language as "public evidence signal" rather than "talent score" or "capability score."
