# R33 — HŐTÁBOR: a helyi hőségriadóterv szolgáltatási megvalósítása
2026-11-17 | X-Challenge | PARTIAL | NO_SEND | NO_PRESENTATION. R32 main bf71b8bf8fffa398481dc261d46e8f9c7ab63d6f, blob e91f9dd5c788ffa6e424cbeac598b82e0e30c6a1; R31 master d0b1a255bd4c571a84301978b2b50398def45827 reopened. This is the competitive-advantage and concept decision annex; no field intervention, paid installation, outreach, or change to historic documents.

## 1. Strongest falsification: existing Kőbánya plan found
Original 222/2025 proposal incl plan, 25 PDF pages: https://www.kobanya.hu/?action=getfile&fid=205851&module=news&v=de5573bee645f12bcada833a953ea1cb . Found via official 15 April committee agenda https://www.kobanya.hu/?action=list&fname=kkb_eloterj_202504&module=news . Parsed full document available, visually inspected PDF pages 16–21 (printed 12–17), not complete visual audit. Existing R28 record of 133/2025 (IV.17.) adoption; current annex and actual execution need operator confirmation. The child-institution section (printed p15) already calls for closer observation, cooling and shade, continuous room-temperature measurement and hydration. Printed pp12–14 already discuss coordination, exposed façades, cooled places, temporary shading, ventilation and existing municipal measures. Printed pp14/17 already establish alerts to institutions; no alternative warning chain. No detailed Tekergők two-site service allocation, provider approval/meal and supervision reservation, or service-level outcome ledger specified in reviewed relevant sections. Absence here is not proof of absence from individual institution plans or actual practice. Use as integration baseline and do not collect new individual medical or child data; no interference with required observations by qualified staff.
International strongest counterexamples:
- https://cdri.world/heat-smart-schools/ full HTML: already integrates governance, forecasts, physical measures, nutrition/water and practice drills. Three modules alone not novel.
- https://knowledge.aidr.org.au/resources/ajem-october-2025-citizen-science-for-cooler-schools-improving-heat-resilience-in-educational-settings/ full HTML: co-designed heat mapping, preparation/response checklists, activity scheduling and existing cycles. Reuse rather than reproduce an audit toolkit. Toolkit field research does not demonstrate all built interventions.
- https://www.gov.uk/guidance/looking-after-children-and-those-in-early-years-settings-before-and-during-hot-weather-teachers-and-other-educational-professionals full HTML last update 8 July 2026: timetable, building operation and protection actions; not Hungarian law.
- https://doi.org/10.1016/j.crm.2022.100437 HeatReady Schools, indexed and full 403. Already proposes school readiness and alternative indoor activities.
- https://www.sciencedirect.com/science/article/abs/pii/S2210670724000131 campus heat resilience/thermal comfort assessment/walkable route framework, indexed, full 403. Do not claim first heat-based routing.
- https://www.cn.nysed.gov/content/waiver-now-available-excessive-heat-3 indexed US summer food programme alternative service in excessive heat; specific regulatory setting, no local transferability. Do not claim novelty in moving meals in heat globally.
Thus local operational gap, not new science, is the claim. User-supplied R11 brief permits known approaches applied locally; no winning-score claims.

## 2. Final differentiation: pre-approved service continuity packages
Name HŐTÁBOR 4.0 retained, subtitle proposed: Hőségálló gyermekellátás – a szolgáltatás mozogjon, ne a gyermek. One local implementation inside existing alert/operating framework, not another general heat plan. Use a shared simple sheet/calendar and daily human decision, not new software.
Preparation: record each necessary service (supervised session/meal), group aggregated numbers, exact id/time windows, location and room availability with adult-inclusive capacity, staffing and accessibility, provider/hygiene/diet eligibility, equipment state, safe fallback and cost. Each bundle must pre-reserve both activity and meal resources and any approved waiting area, time, staff and transport/setup. A: current safe ordinary plan. B: deliver approved catering to cultural centre if programme must stay. C: portable equivalent instructor/material to school where justified. M2/M3 improve room/yard only if measured independent residual or demonstrably unblock specific service slot. Physical modules not compulsory if ordinary operation sufficient.
On forecast/municipal warning or supervisor identified issue before actual provider deadline: check approval, available capacities including existing bookings, service equivalence, heat protection/water, adult coverage and actual cost. Unknown is not available; no double booking, no forced unsafe walking, no substituting programme to fake success. Human safety determination and ordinary override precede optimization, and emergency procedures supersede all plans. A already solves residual -> no incremental spend. If a genuine avoidable exposure remains within safe options, compare net exposure over whole day and full cost within authorised envelope; human considers access/equity and staff effects, not auto-safety or compulsory min-exposure. No permissible option -> HOLD, invoke established safe contingency/stop dangerous activity; never hold essential child care/meal arbitrarily.
End: one aggregate daily record of actual compared safe plan, avoided exposure, equivalent programme/meal delivery, changes, downtime/failures, additional staff/cost and rationale. Investment prioritization from repeated unmet service slots and separate thermal measurements, with no compulsory threshold. No new software, cameras or person tracking.

## 3. Concrete synthetic feasibility example
Two groups of 30 children +3 adults (not a staffing recommendation). Fictional protected cultural and school activity rooms each 70 total; approved meal rooms 40 total each; two 30-minute 33-person slots to satisfy adult-inclusive count only. Separate waiting, service turnaround, staffing, travel and hygiene still need real validation. Programme 60 minutes for both groups, staggered meal room slots [90,120),[120,150) as abstract relative minutes; one room can host both groups only if capacity 66 and pedagogical/safety permissions actually hold.
A baseline ordinary authorised safe day has hypothetical 20 min avoidable exposure per child; not historical travel measurement. B/ C hypothetical zero exposure relative to selected minutes and equivalent programme. B incremental12k, C8k excludes C setup; compare only after setup already authorised (full R32 first season B590k,C630k). Not pricing a real day. At 60 children one day potential 20 child-hours, 5 days 100,20 days 400. If actual ordinary baseline after improvements has just 5 net minutes, annual100 child-hours at 590k=5900 Ft/h vs 1475 at400h. If ordinary already removes all, zero incremental benefit and STOP. No deliberately unsafe comparator.
A room occupancy comparison is not actual heat safety; standalone toy function uses externally asserted safety/approval and does not check all real dimensions (specific required adult coverage, waiting and changeover, travel constraints, dietary details, HVAC, weather, individualized needs). The function is illustrative, never a safety decision system or deployed product. Group overlap, total occupancy and concurrent reservations explicitly tested; interval endpoint equal treated non-overlap only, actual buffer required.

### Reproducible synthetic model and 16 fixture outcomes
Run the declarations and fixture checks in a JS environment; this same code executed in the connector session before writing, all 16/16 expected outcomes matched. No hardware/field test.
```javascript
function evaluate(p, e) {
  if(p.approval!==true||p.safe!==true||p.equivalent!==true||p.ac!==true||!Number.isFinite(p.cost)||p.cost<0||p.cost>e.budget||!Number.isFinite(p.exposure)||p.exposure<0)return false;
  for(const g of e.groups){for(const service of ["program","meal"]){if(p.tasks.filter(t=>t.group===g.id&&t.service===service&&t.approved===true).length!==1)return false;}}
  for(const t of p.tasks){if(!e.groups.some(g=>g.id===t.group)||!["program","meal"].includes(t.service)||t.approved!==true||t.end<=t.start||!Number.isFinite(t.start)||!Number.isFinite(t.end)||!Number.isFinite(t.load)||t.load!==e.groups.find(g=>g.id===t.group).people||!e.resources[t.room]||e.resources[t.room].usable!==true||e.resources[t.room].capacity==null)return false;}
  const overlaps=(a,b)=>a.start<b.end&&b.start<a.end;
  for(const g of e.groups){const a=p.tasks.filter(t=>t.group===g.id);if(a.some((x,i)=>a.some((y,j)=>i<j&&overlaps(x,y))))return false;}
  for(const [room,res] of Object.entries(e.resources)){const a=[...p.tasks.filter(t=>t.room===room),...(res.bookings||[])];for(const start of [...new Set(a.map(x=>x.start))])if(a.filter(x=>x.start<=start&&start<x.end).reduce((z,x)=>z+x.load,0)>res.capacity)return false;}
  return true;
}
function choose(plans,e) {
 if(e.residual===false){return plans.some(p=>p.id==="A"&&evaluate(p,e))?"A":"HOLD";}
 if(e.residual!==true)return "HOLD";
 const ok=plans.filter(p=>evaluate(p,e)).sort((a,b)=>a.exposure-b.exposure||a.cost-b.cost||a.id.localeCompare(b.id));
 return ok[0]?.id??"HOLD";
}
const mk=(id,roomProgram,roomMeal,exp,cost)=>({id,approval:true,safe:true,equivalent:true,ac:true,exposure:exp,cost,tasks:["G1","G2"].flatMap((group,i)=>[{group,service:"program",room:roomProgram,start:0,end:60,load:33,approved:true},{group,service:"meal",room:roomMeal,start:90+i*30,end:120+i*30,load:33,approved:true}])});
const fixture=()=>({env:{residual:true,budget:25000,groups:[{id:"G1",people:33},{id:"G2",people:33}],resources:{school:{capacity:70,usable:true},culture:{capacity:70,usable:true},canteen:{capacity:40,usable:true},mealCulture:{capacity:40,usable:true}}},plans:[mk("A","culture","canteen",20,0),mk("B","culture","mealCulture",0,12000),mk("C","school","canteen",0,8000)]});
const cases=[
  ["Ordinary operation already resolves gap","A",(f)=>{f.env.residual=false;}],
  ["Equal effect; portable program cheaper","C",f=>{}],
  ["Portable program not equivalent","B",f=>{f.plans[2].equivalent=false;}],
  ["Meal room not approved; portable works","C",f=>{f.env.resources.mealCulture.usable=false;}],
  ["Both upgrades unavailable; approved ordinary fallback","A",f=>{f.plans[2].equivalent=false;f.env.resources.mealCulture.usable=false;}],
  ["Shared cultural space already booked","C",f=>{f.env.resources.culture.bookings=[{start:0,end:60,load:20}];}],
  ["Room cap too small for combined groups","B",f=>{f.env.resources.school.capacity=50;}],
  ["Meal approval missing","C",f=>{f.plans[1].tasks[1].approved=null;}],
  ["No safe plan","HOLD",f=>{f.plans.forEach(p=>p.safe=false);}],
  ["Unknown residual","HOLD",f=>{f.env.residual=null;}],
  ["No approved spending for alternatives","A",f=>{f.env.budget=0;}],
  ["Cooling fails at school","B",f=>{f.env.resources.school.usable=false;}],
  ["Staggering removed; both meal groups overlap","B",f=>{f.plans[2].tasks.find(t=>t.group==="G2"&&t.service==="meal").start=90;}],
  ["A and C unavailable, B missing a meal","HOLD",f=>{f.plans[0].safe=false;f.plans[2].safe=false;f.plans[1].tasks.pop();}],
  ["Unknown room capacity not available","B",f=>{f.env.resources.school.capacity=null;}],
  ["Negative cost rejected","B",f=>{f.plans[2].cost=-1;}]
];
for(const [name,expected,mutate] of cases){const f=fixture();mutate(f);const actual=choose(f.plans,f.env);if(actual!==expected)throw Error(name+":"+actual);}
```
| scenario | expected | observed |
|---|---|---|
| Ordinary operation already resolves gap | A | A |
| Equal effect; portable program cheaper | C | C |
| Portable program not equivalent | B | B |
| Meal room not approved; portable works | C | C |
| Both upgrades unavailable; approved ordinary fallback | A | A |
| Shared cultural space already booked | C | C |
| Room cap too small for combined groups | B | B |
| Meal approval missing | C | C |
| No safe plan | HOLD | HOLD |
| Unknown residual | HOLD | HOLD |
| No approved spending for alternatives | A | A |
| Cooling fails at school | B | B |
| Staggering removed; both meal groups overlap | B | B |
| A and C unavailable, B missing a meal | HOLD | HOLD |
| Unknown room capacity not available | B | B |
| Negative cost rejected | B | B |

## 4. Competitive positioning, proof and decision
Simple shade project: directly reduces solar gains/radiation, important and sufficient for some sites; no automatic claim it ignores utilization or measurement. General plan: existing official chain and readiness requirements, use it. New digital dashboard/AI: rejected; no proof bottleneck information processing, costs and safety risk. Standalone thermal retrofit: strong challenger when primary issue occupied classrooms, even if M1 solved. Selected integrated operational bundle plus evidence-gated asset adaptation: converts existing protection to reliably delivered local service, including meals and fixed cultural programme; explicit resource commitment and actual use, transferability using existing systems, differentiated claim limited to demonstrated local gap. If existing Tekergők arrangements already deliver this, reuse and no duplicate project; if no residual across all modules, reconsider project rather than fabricate value. 
For identical service compare existing ordinary practice at actual 2027 funded baseline, not historical worse conditions. Do not withhold safety for data. Primary M1 endpoint signed net necessary heat-exposed child-minutes and planned equivalent services preserved; M2 occupied degree-hours above pre-registered analytical reference, air quality/daylight/energy; M3 incremental safe protected programme hours; do not sum differing exposure/thermal/added activity measures. Common service delivery endpoint only for truly restored non-overlapping planned activities, might be zero when thermal benefit exists. Actual extra staff minutes and total cost, access/meal entitlements, failures and existing constraints logged. Evaluate combined vs stock-only and each individual module, no unmeasured synergy or claim of health events avoided.
R32 budgets unchanged: 410k five-day B1 pilot, 590k20-day; C630k first-year; one motorized ZIP classroom1.84M; separate new yard1.50M; all3.93M first and5.01M three seasons if all needed. 8 arithmetic checks passed. Do not budget pilot twice. R32 prices remain models, including six-screen geometry and yard size; no bid or appropriated funds. Financial/operational impact unknown, cannot combine different metrics into SROI.
Against equal R11 20% factors: concrete historic problem; local implementation novelty conditional; approvals/provider site unknown; phased budget and alternatives; actual summer measured outcome with failure criteria. No quantitative jury score. The most important falsifier is actual 2027 plan, M1 redundant if fixed then; M2/M3 only with actual independent deficits.

## 5. Deliverables and verification
One minimal preseason bundle pack: group/service requirements, capacity and booking register, authorised plan cards A/B/C and fallback, actual heat protection asset register, quote/approval ledger, daily signed aggregate log plus season evaluation. No more new portals. Reuse existing schedule and local heat plan. Update only once actual facts exist. 
Acceptance: current site and approved resources; staff-only dry run by May17 2027 goal; five justified summer days where feasible; positive incremental net outcome under comparable safe actual baseline; preserved meals, supervision, access, programme and safety; verified costs/operator acceptance. If severe heat, no safe branch or no comparable data, invoke protection, record unavailable outcome, no forced tests or expansion. M2/M3 independently assessed and commissioned only if warranted.
R33 desk comparative research and synthetic example complete; overall PARTIAL, functional/E2E/real-use readiness and deltas UNKNOWN (no implemented/piloted system or comparable field readiness baseline). Two scientific full-text requests 403, indexed abstracts only; reviewed PDF relevant six pages visually, not all25; original institution-specific plans, capacity, quotations, authority and baseline missing. No presentation, outreach, purchasing, or physical work. Next best ROI consolidate a short final decision-ready technical concept (not slide deck) and freeze assumptions; further desk expansion now has diminishing value, actual local facts decide. One owner-approved local inquiry only after separate consent. 
