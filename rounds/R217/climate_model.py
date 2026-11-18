import urllib.request,urllib.parse,json,hashlib,datetime,statistics
SITES=["Győr","Budapest","Szeged"]
V=["temperature_2m","relative_humidity_2m","dew_point_2m","cloud_cover","wind_speed_10m","shortwave_radiation"]
CONFIGS=[("air12",28,12,0,.9,False),("air24",28,24,0,.9,False),("air48",28,48,0,.9,False),("sky24",28,24,120,.9,False),("air24large",28,24,0,1.8,False),("gap_air24",26,24,0,.9,False),("gap_air48",26,48,0,.9,False),("gap_air96",26,96,0,.9,False),("gap_sky24",26,24,120,.9,False),("gap_air48large",26,48,0,1.8,False),("gap_air48_oracle",26,48,0,.9,True)]
def run(x,year):
 h=x["hourly"];n=len(h["time"])
 assert n==2400 and len(set(h["time"]))==n and x["utc_offset_seconds"]==0
 assert all(len(h[k])==n and all(isinstance(z,(int,float)) for z in h[k]) for k in V)
 assert all(datetime.datetime.fromisoformat(b)-datetime.datetime.fromisoformat(a)==datetime.timedelta(hours=1) for a,b in zip(h["time"],h["time"][1:]))
 assert all(0<=r<=100 for r in h["relative_humidity_2m"]) and all(0<=c<=100 for c in h["cloud_cover"])
 rows=[((datetime.datetime.fromisoformat(t)+datetime.timedelta(hours=2)).isoformat(timespec="minutes"),*v) for t,*v in zip(h["time"],*[h[k] for k in V])]
 rows=[r for r in rows if f"{year}-05-25"<=r[0]<f"{year}-09-01"];start=f"{year}-06-01"
 valid=[r for r in rows if r[0]>=start];hot=[r for r in valid if 12<=int(r[0][11:13])<16 and r[1]>=30];eligible=[r for r in hot if r[3]<=26]
 assert len(rows)==2376 and len(valid)==2208
 days={r[0][:10] for r in hot};all_hot_days={r[0][:10] for r in rows if 12<=int(r[0][11:13])<16 and r[1]>=30 and r[3]<=26};nights={}
 for r in rows:
  hour=int(r[0][11:13])
  if hour<6 or hour>=22:
   key=(datetime.date.fromisoformat(r[0][:10])+datetime.timedelta(days=hour>=22)).isoformat()
   nights.setdefault(key,[]).append(r)
 preceding=[nights[d] for d in days if d in nights and len(nights[d])==8]
 results={}
 for label,phase,ua,sky,cap,oracle in CONFIGS:
  store=served=need=charge_hours=added=0.;daily={}
  for ts,t,rh,dp,cloud,wind,rad in rows:
   hour=int(ts[11:13]);store=max(0,store-.005)
   nextday=(datetime.date.fromisoformat(ts[:10])+datetime.timedelta(days=hour>=22)).isoformat()
   if (hour<6 or hour>=22) and (not oracle or nextday in all_hot_days):
    q=min(180,max(0,ua*(phase-2-t))+(sky*(1-cloud/100) if t<phase else 0))*.7/1000
    charge=min(cap-store,q);store+=charge
    if ts>=start:
     added+=charge;charge_hours+=charge>1e-9
   if 12<=hour<16 and t>=30 and dp<=26:
    use=min(store,.18);store-=use
    if ts>=start:
     served+=use;need+=.18
     d=daily.setdefault(ts[:10],[0,0]);d[0]+=use;d[1]+=.18
   assert -1e-9<=store<=cap+1e-9
  full=sum(a>=b-1e-8 for a,b in daily.values());streak=worst=0;prev=None
  for d,(a,b) in sorted(daily.items()):
   date=datetime.date.fromisoformat(d)
   if a<b-1e-8:streak=streak+1 if prev and (date-prev).days==1 else 1;worst=max(worst,streak)
   else:streak=0
   prev=date
  assert abs(need-.18*len(eligible))<1e-8 and 0<=served<=need+1e-8
  results[label]=[round(served,4),round(need,4),full,len(daily),worst,int(charge_hours),round(added,4)]
 return dict(hours=len(valid),hot=len(hot),hot_days=len(days),eligible=len(eligible),blocked=len(hot)-len(eligible),night_samples=len(preceding),warm_nights=sum(min(r[1] for r in n)>=20 for n in preceding),night_mean=round(statistics.mean(r[1] for n in preceding for r in n),1) if preceding else None,night_cloud=round(statistics.mean(r[4] for n in preceding for r in n),1) if preceding else None,hot_wind_kmh=round(statistics.mean(r[5] for r in hot),1) if hot else None,hot_solar_Wm2=round(statistics.mean(r[6] for r in hot),1) if hot else None,results=results)
def main():
 records=[]
 for year in range(2022,2027):
  q=dict(latitude="47.69,47.50,46.25",longitude="17.65,19.04,20.15",start_date=f"{year}-05-24",end_date=f"{year}-08-31",hourly=",".join(V),models="era5",timezone="GMT")
  with urllib.request.urlopen("https://archive-api.open-meteo.com/v1/archive?"+urllib.parse.urlencode(q),timeout=30) as r:raw=r.read()
  data=json.loads(raw);assert len(data)==3
  for name,x in zip(SITES,data):
   h=x["hourly"];row=dict(year=year,site=name,grid=[x["latitude"],x["longitude"]],canonical_hourly_sha256=hashlib.sha256(json.dumps(h,sort_keys=True,separators=(",",":"),ensure_ascii=True).encode()).hexdigest(),**run(x,year));records.append(row)
 def agg(rs):
  return {k:[round(sum(r["results"][k][0] for r in rs)/sum(r["results"][k][1] for r in rs)*100,1),round(sum(r["results"][k][0] for r in rs),4),round(sum(r["results"][k][1] for r in rs),4),sum(r["results"][k][2] for r in rs),max(r["results"][k][4] for r in rs),sum(r["results"][k][5] for r in rs)] for k,*_ in CONFIGS}
 print(json.dumps(dict(total=agg(records),y2024=agg([r for r in records if r["year"]==2024]),szeged2024=agg([r for r in records if r["year"]==2024 and r["site"]=="Szeged"]),records=records),ensure_ascii=False,separators=(",",":")),flush=True)
if __name__=="__main__":main()
