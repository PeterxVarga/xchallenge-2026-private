# X-Challenge research registry — current entrypoint
2026-11-18 | topic OPEN | NO_SEND, NO_PROTOTYPE, NO_PRESENTATION, NO_PURCHASE, no fieldwork. Scope: this repository only.
## Current decision
No topic selected. R11 controls eligibility/rubric (five equal factors, no numerical cap, first pilot/start within six months, meaningful summer 2027). Root DECISION.md and older Readme text are historical, not current decision authority. Use R160, R159, R158, R156 and both parallel R151/R152-range records; round labels are NOT unique identifiers, use path + pinned ref + blob. R152–R200 is one previous report, not 49 independently executed rounds. Existing archived X-only observations and methodology are preserved, not replaced or imported wholesale. This is a local registry projection, not a fork of the Unified Intelligence Engine.
- CAMP / HŐTÉR: strongest documented historical operational heat problem; first verification priority; 2027 ordinary scope and residual UNKNOWN.
- HOME / HŐOTTHON ÉJ, CSEND, HŐKÖLCSÖN, HŐPANEL 365: serious challenger family; noise/retrofit and phase-one panel planning routes documented; independent heat protection must not duplicate eligible or planned works. Occupied hot room, DEA scope, permissions, prices and summer 2027 residual UNKNOWN.
- PLAY / HŐJÁTÉK KONTAKT (R158): conditional playground microclimate challenger; approved ordinary shade is baseline, remaining thermal gap UNKNOWN.
- PRESCHOOL / HŐOVI NYÁR: common operator and documented existing cooling; actual summer site and unmet thermal need UNKNOWN.
- CARE / HŐMENEDÉK24: concentrated prolonged care, historical actual occupancy; hot room and approvals UNKNOWN.
- WATER / KŐHŰTŐ: conditional technical challenger, HOLD on flow/temperature/permit/nearby demand/cost; no groundwater or equipment feasibility assertion.
- RECOVERY / HŐCSERE: conditional technical reserve; useful simultaneous cooling and hot-water demand, compatibility and incremental economics UNKNOWN.
- TRANSIT / HŐÚT: conditional service-access challenger, three existing street plans and historical reserve-list status; actual route heat gap, use and permission UNKNOWN. HŐPIHENŐ is a conditional worker-rest variant, not a new employer or safety obligation.
- TRANSIT and SCHOOL other variants reserve; avoid duplicating funded or planned projects; actual service gap needed.
No numeric score or invented readiness percentage. Qualitative decision aid, not jury verdict.
## Query the machine-readable findings
`findings.json` is a curated subset: 74 decision-critical findings from 16 repository documents at the recorded baseline plus explicitly admitted later reports. It includes counterevidence, assumptions and unresolved gates, not just supporting evidence. External source verification is inherited from the cited report, not repeated in this consolidation. The ID names are stable; a finding is not a round, citation count or unique external source. Every item has source ID, locator, claim, limit and consequence. Source map pins a commit and blob. Original URLs and evidence accessibility are in the referenced research document; do not promote a search abstract/model to verified outcome. Existing 78 historical observations are not counted as newly imported, and all prior 56 ideas are not individually indexed here.
Node 18+ in repo checkout (no external package/network necessary):
```sh
node research/registry.mjs check
node research/registry.mjs query HOME
node research/registry.mjs query HOME LOCAL_HISTORICAL Újhegyi
node research/registry.mjs blockers WATER
node research/registry.mjs blockers
node --test research/registry.test.mjs
```
Check verifies schema, duplicate IDs, evidence-type classification, document availability, locator presence, and repo-local Git blob hashes; these are **integrity** checks, not factual certification or field tests. Use pinned original via GitHub when checkout differs. Query returns matching records, not physical feasibility or completeness. UNKNOWN is not zero. LOCAL_HISTORICAL means historical report/event, not current site proof; LOCAL_PLAN is not delivery; UPSTREAM is precedent not local proof; MODEL is a hypothetical calculation; RULE is governance.
## Research cycle (one vertical slice, not more admin)
1. Load registry, relevant blockers and R11; consult the full source records before acting. Search only for new facts that can change the decision; consider at least three real paths and an independent simpler counterexample. Avoid duplicated source audits.
2. Research and optimize the physical, economic and adoption alternative with traced evidence, date and scope; compare ordinary baseline and do not mix impact units. Document anything that falsifies the favorite.
3. Write one consolidated report in rounds/ with new noncolliding PATH, not a claim of many rounds by numbering. Preserve original source URLs, observed state, acquisition limits, contradictory evidence, model vs local measurement and permission limits.
4. Register actionable findings using reviewed finding-json cards and workbench admission below; commit the report first, then capture exact blob. Append correction IDs rather than silently editing earlier facts. Put explicit correction references in claim/decision and reconcile blockers with new evidence. Old UNKNOWN entries remain visible until a separately reviewed supersession mechanism exists; no automatic resolution. Do not delete the historical report. Run check and regression tests and query affected family after update. A check failure is not approval to repin blindly. Keep README current decision pointer, never overwrite historical material with a new claim.
5. Close with demonstrated change, unresolved decision, and next best ROI; final topic OPEN unless user explicitly chooses. No automatic fieldwork, presentation, outreach, external deployment or buying. Local read-only tool only; no cron, cloud pipeline or automatic extraction enabled.
## Entry references (full source reports, independent variants preserved)
- [Official brief record](../rounds/R11/DECISION.md)
- [R122–150 integrated competition](../rounds/R122-R150/INTEGRATED_CONCEPT_TOURNAMENT.md)
- [R151 three finalists](../rounds/R151/THREE_FINALISTS.md) and [R151 breakthrough](../rounds/R151/GLOBAL_BREAKTHROUGH_INNOVATION.md)
- [R152–200 integrated alternate study](../rounds/R152-R200/ULTIMATE_CONCEPT_OPTIMIZATION.md), [R152 geometry](../rounds/R152/MAXIMUM_WINNING_CONCEPT_ENGINEERING.md)
- [R153 local plans](../rounds/R153/MAXIMUM_WINNING_POTENTIAL.md), [R154 cross-sector](../rounds/R154/CONCEPT_BREAKTHROUGH.md), [R155 engineering](../rounds/R155/ULTIMATE_CONCEPT_OPTIMIZATION.md), [R156 silent cooling](../rounds/R156/LOCAL_EVIDENCE_AND_SILENT_COOLING.md)


## R157 — native source-to-decision workbench
Use a full Git history checkout (pinned ancestor refs must be available). The workbench uses the existing JSON registry and standard Node/Git; no external packages or services.
```sh
node research/workbench.mjs coverage
node research/workbench.mjs search "zajvedelmi nyilaszaro" 12
node research/workbench.mjs packet HOME
node research/workbench.mjs packet WATER
node research/workbench.mjs admit rounds/R157/SOURCE_TO_DECISION.md r157
node research/workbench.mjs admit rounds/R157/SOURCE_TO_DECISION.md r157 --apply
node research/registry.mjs check
node --test research/registry.test.mjs research/workbench.test.mjs
```
Search covers tracked textual reports, archives, historical observation export and methodology; accent-insensitive lexical matching in line context, NOT semantic search. Hits are unreviewed, with line, path, content hash and commit if clean. Historical snippets do not gain present-day validity. A decision packet returns curated findings, source provenance and explicit unknowns; no empty-list readiness claim.
Admission requires author-reviewed, explicitly delimited finding-json blocks as in R157, exact Markdown heading locator, stable ID, family, kind, claim, limit and decision. Preview does not write. --apply appends the cards atomically after checking both current and pinned source hashes; unchanged rerun adds nothing; collisions are rejected. It does not interpret unrestricted prose, certify external sources, automatically retire blockers, call an LLM or run on a schedule. Use a new report path/ID for a correction. Source report must already be committed and unchanged. Keep workbench writes serialized by a single operator.
Baseline measured in native checkout: 81 eligible textual files (61 round Markdown), 78 legacy observation rows, 36 curated findings / 12 sources. R157 adds one report and four curated cards, two are confirmation/interpretation of existing context rather than new independent events. The original PDF evidence is linked, not embedded. No site/field acceptance.
[R157 source and decision record](../rounds/R157/SOURCE_TO_DECISION.md).

R158 scope: reuse the central research engine; engine development belongs to its owning lane. When live relay access is unavailable, use the pinned X-only export and direct sources, disclose fallback, and keep new evidence in the registry. Native runtime validation remains pending for R158.

R159 update: HŐTÉR retains the strongest documented historical local need; HŐPANEL 365 has a confirmed preparation-phase link, not a construction grant; HŐCSERE remains conditional. No topic freeze, prototype or presentation. Live shared-engine relay unavailable; pinned export and direct-source fallback used. Registry additions and document readback checked; native runtime validation for R158–159 remains pending. No engine development in this lane.

R160: scoped native X-only read of the original shared research database succeeded (78 observations); no newer payload count or complete live research execution proven. No engine change. HŐÚT remains conditional, with Kőrösi first-stage renovation and existing street proposals in baseline. [R160](../rounds/R160/THERMAL_ACCESS_AND_RECOVERY_TOURNAMENT.md). Native registry validation after R158–R160 completed on isolated full-history Fedora checkout at 79777510a28541acf200d909874fd4363ef34f65: 74 findings / 16 sources, zero integrity errors; 16/16 regression tests passed; TRANSIT decision packet 12 evidence records and explicit r160-route-gap; exit 0, clean working tree. This verifies repository-local integrity and retrieval, not local physical heat outcomes.
