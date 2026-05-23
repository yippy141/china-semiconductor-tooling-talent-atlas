# 06 Research Plan: PhD and Institution Module

Do not build this into the current homepage unless the data are ready. Use it as a V6.5 or V7 module.

## Why this module is useful

Readers understand firm filings more easily if they also see the upstream education pipeline. The key question is not "How many STEM graduates does China produce?" The key question is which disciplines feed toolmaking roles and where those disciplines are institutionally concentrated.

## Why it should not be rushed

The current evidence product is strongest on firm disclosures, product families, and public records. A PhD module needs more careful official data work. Broad engineering and science counts are too coarse. Discipline-level PhD completions may require university reports, MOE tables, CNKI thesis counts, or proxy datasets.

## Target research question

> Which PRC disciplines and institutions feed the role families needed for etch, deposition, metrology/inspection, and lithography-adjacent equipment work?

## Minimum viable data

- MOE graduate discipline catalog
- National PhD graduates by broad field
- Province-level postgraduate totals
- Authorized doctoral/master points for IC Science and Engineering where available
- Institution pages for optics, instrumentation, materials, chemical engineering, precision instruments, microelectronics
- Firm pages or filings tying those disciplines to roles

## Better data

- Discipline-level PhD graduates by institution
- Thesis counts by discipline and keyword
- Job postings by firm and role family
- University-enterprise joint training programs
- Alumni placement if available

## Proposed visuals

1. Discipline-to-tool segment matrix
2. Upstream formal supply funnel
3. Institution cluster map
4. Firm demand vs discipline feeder chart
5. Data-quality ladder: official count, proxy, unavailable

## Deep Research prompt

```text
Task:
Build a source inventory and feasibility memo for a future module on PRC PhD and institution pipelines feeding semiconductor manufacturing equipment talent.

Scope:
- Mainland PRC only
- Semiconductor manufacturing equipment only
- Segments: etch/clean/strip, deposition, metrology/inspection, lithography sidebar
- No individual-level mapping

Questions:
1. Which official PRC sources report PhD graduates by field, discipline, province, and institution?
2. Can any public source give discipline-level PhD completions for physics, chemistry, materials, chemical engineering, optical engineering, instrumentation, mechanical engineering, control, electronic science, and IC science?
3. Which institutions have the strongest public evidence as feeders for tooling-relevant roles?
4. What source gaps prevent clean measurement?
5. What visualizations are possible without overclaiming?

Output tables:
- source_inventory
- discipline_to_tool_segment
- institution_candidates
- available_metrics
- infeasible_metrics
- recommended_viz

Rules:
- Do not write an essay.
- Do not estimate exact discipline PhD counts unless a source supports it.
- Mark direct counts vs proxies.
- Include source URLs and caveats.
```
