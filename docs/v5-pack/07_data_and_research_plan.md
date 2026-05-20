# Data and research plan

## Do you need more Deep Research right now?

Run one targeted pass only. Do not run another broad literature pass.

The broad research question is settled. Existing materials already support the narrow wedge: mainland PRC, semiconductor manufacturing equipment, etch/clean/strip, deposition, metrology/inspection, lithography as sidebar.

What remains is source checking and firm expansion.

## Targeted Deep Research pass

Use this prompt:

```text
Task:
Create a public-source firm expansion table for the China Semiconductor Tooling Talent Atlas.

Scope:
- Mainland PRC semiconductor equipment firms only.
- In-scope segments: etch/clean/strip, deposition, metrology/inspection, lithography-adjacent sidebar.
- Public sources only for public-site claims.
- Do not use internal client notes or private SharePoint files as public citations.

Firms to check:
- Piotech
- Jingce Electronics
- SMEE
- BEIM
- Kingsemi
- HWATSING
- SiCarrier
- Skyverse Technology, only if public sources are strong enough

Return tables only:
1. firm_profiles
   slug | name_en | name_cn | headquarters | primary_segment | why_it_belongs | public_sources | confidence | public_site_status
2. product_families
   firm_slug | product_or_family | segment | source_url | source_title | source_type | claim_status
3. workforce_or_service_signals
   firm_slug | signal | value_if_any | source_url | source_type | caveat
4. site_copy_candidates
   firm_slug | one_sentence_role | what_to_watch | what_not_to_infer
5. reject_or_hold
   firm | reason to exclude or hold for later

Rules:
- Do not produce prose essay.
- Do not claim capability parity with foreign toolmakers.
- Mark unverifiable or promotional claims as needs_verification.
- Prefer official company pages, annual reports, stock exchange filings, and government sources.
```

## What to do with your Lam-oriented sheets

Use them as private triage. They are valuable for deciding which firms and products matter.

Do not put internal spreadsheets, meeting notes, or SharePoint citations on the public site.

For public pages, every claim should point to one of:

- official company page
- annual report or exchange filing
- official government source
- public industry or think-tank report

## Piotech

Piotech should become a full dossier.

Reason:
Piotech gives the deposition story a dedicated firm rather than leaving deposition to NAURA and AMEC.

Safe public wording:

> Piotech is a deposition-focused equipment firm. Its public product trail points to PECVD, ALD, SACVD, HDPCVD, Flowable CVD, and related deposition categories.

Avoid:

> Piotech has caught up with Lam.
> Piotech can replace foreign deposition tools.
> Piotech proves China has solved deposition.

## Jingce

Jingce should become a metrology/inspection dossier if the public filing is strong enough.

Safe public wording:

> Jingce gives the monitor a metrology and inspection anchor. Its public records are useful because they list front-end measurement and inspection categories rather than generic semiconductor equipment activity.

## SMEE

SMEE should remain a lithography-adjacent sidebar dossier.

Safe public wording:

> SMEE belongs in the sidebar because lithography draws on a different talent mix: optics, alignment, stages, focus, contamination control, and calibration.

## BEIM

BEIM can be a light metrology/inspection dossier.

Safe public wording:

> BEIM is useful as a metrology/inspection reference point because its public company profile names inspection and measurement categories that connect to optics, precision measurement, and defect review.

## SiCarrier

Keep as watchlist, not full dossier.

Reason:
Public reporting is strategically interesting but easy to overstate. It can pull the project into Huawei, lithography, and political claims before the data is ready.

Safe wording:

> SiCarrier is a watchlist entity. The public record is not yet strong enough for a full dossier in this release.

## PhD and institution module

This is a good future module, but not the center of this week's release.

What you can count now:

- Broad national postgraduate and doctoral totals by field where MOE publishes them.
- Official discipline categories from the MOE graduate discipline catalog.
- Province-level postgraduate totals where MOE publishes them.
- Authorized IC-related degree points and selected university departments.

What you cannot cleanly count yet:

- Annual PRC PhDs in plasma physics directly tied to etch.
- Annual PRC PhDs in ALD or thin-film process engineering directly tied to deposition.
- Exact placement from universities into Chinese equipment firms.
- Experienced field application engineers by segment.

Future research prompt:

```text
Task:
Build a public-source talent supply appendix for semiconductor-equipment feeder disciplines in mainland China.

Goal:
Estimate what can be counted officially and what requires proxies.

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

Return:
1. official_countable_metrics
2. proxy_metrics
3. top institution sources
4. missing data
5. suggested visuals

Rules:
- Separate exact official counts from proxies.
- Do not infer field-specific PhD counts where only broad science/engineering totals exist.
- Mainland PRC only.
```
