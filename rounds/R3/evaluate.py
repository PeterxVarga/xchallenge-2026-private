from pathlib import Path
import json
p=Path('rounds/R3')
x=json.loads((p/'model-input.json').read_text())
total=sum(x['capex'].values())
stage=sum(x['stage_one'].values())
reserve=x['capex']['reserve']
assert total==2200000 and stage==350000 and stage<total<x['budget_cap']
assert x['capex']['sensors_24_x_23500']==24*23500
tco=total+2*x['year2_3_opex_each']
assert tco==2900000
n=x['trees']['treatment']
res=[]
for s in x['scenario']:
 baseline=n*s['cycles']*s['litres']/1000
 saved=baseline*s['saving_share']
 res.append(dict(name=s['name'],baseline_m3=round(baseline,3),hypothetical_saved_m3=round(saved,3),avoided_water_cost_at_assumed_marginal_cost=round(saved*x['hypothetical_delivery_huf_per_m3'],2),status='SCENARIO_ONLY'))
base=x['scenario'][1]
scales=[dict(trees=i,baseline_m3=round(i*base['cycles']*base['litres']/1000,3),saved_m3=round(i*base['cycles']*base['litres']/1000*base['saving_share'],3),status='SENSITIVITY_NOT_VERIFIED_OR_SCALING_COST') for i in x['scale_examples']]
out=dict(status='PLANNING_ONLY',first_year=total,stage_A=stage,stage_B_max=total-stage,headroom=x['budget_cap']-total,nonreserve=total-reserve,tco_3y=tco,annualized_pilot_cost=round(tco/3,2),scenarios=res,scales=scales,stress=[dict(pct=i,spend=round((total-reserve)*(1+i/100)),within_cap=(total-reserve)*(100+i)<=x['budget_cap']*100) for i in (10,25,40,50,60)])
assert res[1]['hypothetical_saved_m3']==17.28 and scales[1]['saved_m3']==144
(p/'model-results.json').write_text(json.dumps(out,indent=2,ensure_ascii=False)+'\n')
print(json.dumps(out,ensure_ascii=False))
