from pathlib import Path
import json,re,csv
p=Path('rounds/R2')
x=json.loads((p/'input.json').read_text())
assert len(x['sources'])==25 and len({s[0] for s in x['sources']})==25
s=Path('archive/heat-portfolio.txt').read_text()
rows=re.findall(r'^\|\s*(\d{2})\s*\|\s*([^|]+)\|\s*([JTMHN])\s*\|\s*([^|]+)\|',s,re.M)
assert len(rows)==56
groups={i:g for g,ids in x['crossGroups'].items() for i in ids}
assert sum(map(len,x['crossGroups'].values()))==56 and set(groups)==set(range(1,57))
with (p/'portfolio-crosswalk.csv').open('w',newline='') as f:
 w=csv.writer(f,lineterminator='\n');w.writerow(['original_id','original_name','historical_status','historical_falsifier','R2_comparison_family','status_note'])
 for i,n,st,k in rows:w.writerow([i,n.strip(),st,k.strip(),groups[int(i)],'Historical gate retained; mapped to comparative family; not individually re-audited'])
with (p/'sources.jsonl').open('w') as f:
 for i,u,t,a,c in x['sources']:f.write(json.dumps(dict(id=i,url=u,type=t,access=a,claim=c,review_date='2026-11-17'),ensure_ascii=False)+'\n')
results=[]
for m in x['models']:
 total=sum(m['items'].values()); reserve=m['items']['reserve']; base=total-reserve;tco=total+2*m['annual_followup']
 assert 0<base<total<=3000000
 results.append(dict(id=m['id'],first_year=total,nonreserve=base,headroom=3000000-total,tco_3y=tco,metric=m['metric'],status='PLANNING_ONLY',stress=[dict(pct=k,spend=round(base*(100+k)/100),within_cap=base*(100+k)<=300000000) for k in [0,10,20,25,30,35,40,50]],scenarios=[dict(name=z['name'],season_units=z['people']*z['days']*z['hours']*z['delta'],three_season_units=3*z['people']*z['days']*z['hours']*z['delta'],cost_per_unit_3y=round(tco/(3*z['people']*z['days']*z['hours']*z['delta']),2)) for z in m['scenarios']]))
assert [z['first_year'] for z in results]==[2750000,2700000,2400000]
assert [z['tco_3y'] for z in results]==[3110000,3140000,3400000]
(p/'scenario-results.json').write_text(json.dumps(results,ensure_ascii=False,indent=2)+'\n')
print('R2_CHECK',len(rows),'catalogue ids;',len(x['sources']),'source records;',len(results),'budget models')
for r in results:print(r['id'],r['first_year'],r['tco_3y'],r['scenarios'])
