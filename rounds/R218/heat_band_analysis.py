import urllib.request,urllib.parse,json,hashlib,datetime,statistics
SITES=["Győr","Budapest","Szeged"]
EXPECTED=json.loads("{\"2022-Győr\":\"9c3a0d28c7b8b46805c719284ea05a53a69a9afd7c43d9c95148e988c5d19b7f\",\"2022-Budapest\":\"941d4508e8c7dd89ef532eda22feed954009bfa1af7a822fac2779b98cc27fbc\",\"2022-Szeged\":\"4379bdfceffe5e9068eaae1f49990a28d4538e04a57983e947afd3d5af7b47c3\",\"2023-Győr\":\"6c12e6c9d04778911e493b65823ced85f0570e7e734db63be172a09b280a1f95\",\"2023-Budapest\":\"7a52c69e37da346ac797850428d76439d31c6170e815b04862b4d4dd98741bfd\",\"2023-Szeged\":\"d8aa726f7da864dfd1f7824cf061730d0366ca38f8b4b23e0f7e7e8be6963176\",\"2024-Győr\":\"b8aa9c2d736a26ac0d76894d9f848638e1a9ca2d171b86b2ecf94326aa96c85d\",\"2024-Budapest\":\"a063bbcafcd0f14d30a01bc552b0391ae84c1cac0a77360bfcebd1c9bcf613bc\",\"2024-Szeged\":\"9b8fa15c56b25d993e97867c61a5ea3f4afffe8130fa303c82faa1bc742a155a\",\"2025-Győr\":\"cb5f129c7de82bbf40a35af29ea1d68195b1df98ad4ebac97595e02ba90d0eee\",\"2025-Budapest\":\"1c92698bce682b84e85dcda12ed80ee94d9326ead1c4cd912993d8d2dfbe2a5b\",\"2025-Szeged\":\"0c51ed390a342986319939499b76c9dfb27f1da3ea22b95e4bb7336cbdb23310\",\"2026-Győr\":\"14b40477bdffa0987f048ec79884ec12c71a4fb8e35b9bfb35ce9a25811a81cd\",\"2026-Budapest\":\"8703d1aef3ccb5697b131168422d346bb66d1ca62264f2b67fb668baac444844\",\"2026-Szeged\":\"89d3e500d5f36e505c62814f476fca1e03e2a5f987952dce10b7f05a29c314ea\"}")
V=["temperature_2m","relative_humidity_2m","dew_point_2m","cloud_cover","wind_speed_10m","shortwave_radiation"]
def main():
 records=[]
 for year in range(2022,2027):
  q=dict(latitude="47.69,47.50,46.25",longitude="17.65,19.04,20.15",start_date=f"{year}-05-24",end_date=f"{year}-08-31",hourly=",".join(V),models="era5",timezone="GMT")
  with urllib.request.urlopen("https://archive-api.open-meteo.com/v1/archive?"+urllib.parse.urlencode(q),timeout=30) as r:data=json.load(r)
  assert len(data)==3
  for site,x in zip(SITES,data):
   h=x["hourly"];sha=hashlib.sha256(json.dumps(h,sort_keys=True,separators=(",",":"),ensure_ascii=True).encode()).hexdigest()
   assert sha==EXPECTED[f"{year}-{site}"], (year,site,sha)
   rows=[((datetime.datetime.fromisoformat(t)+datetime.timedelta(hours=2)).isoformat(timespec="minutes"),*v) for t,*v in zip(h["time"],*[h[k] for k in V])]
   rows=[r for r in rows if f"{year}-06-01"<=r[0]<f"{year}-09-01"]
   assert len(rows)==2208
   hot=[r for r in rows if 12<=int(r[0][11:13])<16 and r[1]>=30]
   bands=[[r for r in hot if r[1]<32],[r for r in hot if 32<=r[1]<35],[r for r in hot if r[1]>=35]]
   assert sum(map(len,bands))==len(hot)
   records.append(dict(year=year,site=site,hash=sha,hot=len(hot),bands=list(map(len,bands)),low_grid_wind=sum(r[5]<7.2 for r in hot),solar500=sum(r[6]>=500 for r in hot),maxT=max(r[1] for r in hot),medianRH=statistics.median(r[2] for r in hot)))
 assert sum(r["hot"] for r in records)==2026
 print(json.dumps(records,ensure_ascii=False,separators=(",",":")),flush=True)
if __name__=="__main__":main()
