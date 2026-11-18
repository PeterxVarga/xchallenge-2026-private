// R212 concept research only. Node.js, no dependencies. Synthetic inputs, not a validated thermal comfort or engineering design model.
function model(step=300,grid=.5){
 const rad=Math.PI/180, sig=5.670374419e-8, lat=47.48*rad;
 const variants=[["roof36",9,4,-.5,-1,1],["roof42",10.5,4,-.5,-1,1],["wing15",9,4,-.5,-1,.15],["wing35",9,4,-.5,-1,.35],["wing65",9,4,-.5,-1,.65]];
 const weather=[["clear",23,35,27,850,70],["hotNight",28,39,30,900,95],["mutedSun",23,32,26,450,110]];
 const dates=[172,196,222,236], pts=[];
 for(let x=-3+grid/2;x<3;x+=grid)for(let y=-2+grid/2;y<2;y+=grid)pts.push([x,y]);
 const solar=(N,h)=>{let g=2*Math.PI/365*(N-1+(h-12)/24), E=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g)),d=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g),H=((60*h+E+4*19.13-120)/4-180)*rad;return [-Math.cos(d)*Math.sin(H),Math.cos(lat)*Math.sin(d)-Math.sin(lat)*Math.cos(d)*Math.cos(H),Math.sin(lat)*Math.sin(d)+Math.cos(lat)*Math.cos(d)*Math.cos(H)]};
 const tr=(p,z,v,s)=>{let [name,w,l,ox,oy,tau]=v,[e,n,u]=s;if(u<=0)return 1;let x=p[0],y=p[1],ex=e/u,ny=n/u,rz=2.7-z;let roof=Math.abs(x+rz*ex-ox)<=w/2&&Math.abs(y+rz*ny-oy)<=l/2;let a=1;if(tau<1&&Math.abs(ex)>1e-10){let t=(ox-w/2-x)/ex;if(t>=0&&z+t>=1.2&&z+t<=2.7&&Math.abs(y+t*ny-oy)<=2)a=tau}return a*(roof?.03:1)};
 const all=[];
 for(let v of variants)for(let w of weather)for(let N of dates){
  const [,amin,amax,deep,dni,diff]=w, steps=86400/step,pn=pts.length;
  const T=Array(pn).fill(deep), force=[];
  for(let i=0;i<steps;i++){let h=i*step/3600,s=solar(N,h),D=s[2]>0?dni*s[2]:0,A=(amin+amax)/2+(amax-amin)/2*Math.cos(2*Math.PI*(h-16)/24), diffuse=s[2]>0?diff:0;force.push({h,D,A,diffuse,ground:pts.map(p=>tr(p,0,v,s)),head:pts.map(p=>tr(p,1.1,v,s))})}
  let agg={am:[0,0,0,0],pm:[0,0,0,0]};
  for(let day=0;day<5;day++)for(let f of force){let {h,D,A,diffuse,ground,head}=f, bucket=h>=10&&h<12?"am":h>=15&&h<17?"pm":null;let a=0,b=0,c=0;for(let j=0;j<pn;j++){let t=T[j],rr=D>0?A+2:A-10;let q=.8*(D*ground[j]+diffuse)-9*(t-A)-4*(t-deep)-.92*sig*((t+273.15)**4-(rr+273.15)**4);if(day===4&&bucket){a+=t;b+=D*head[j];c+=.3*sig*(t+273.15)**4}T[j]=t+step*q/120000}if(day===4&&bucket){let r=agg[bucket];r[0]+=a/pn;r[1]+=b/pn;r[2]+=c/pn;r[3]++}}
  all.push({variant:v[0],weather:w[0],N,am:agg.am.slice(0,3).map(x=>x/agg.am[3]),pm:agg.pm.slice(0,3).map(x=>x/agg.pm[3])});
 }
 const summary=[];for(let v of variants)for(let w of weather){let rows=all.filter(x=>x.variant===v[0]&&x.weather===w[0]);summary.push({variant:v[0],weather:w[0],am:[0,1,2].map(i=>rows.reduce((s,a)=>s+a.am[i],0)/rows.length),pm:[0,1,2].map(i=>rows.reduce((s,a)=>s+a.pm[i],0)/rows.length)})}
 return {step,grid,all,summary};
}
const base=model(), refined=model(150,.25);
console.log(JSON.stringify({base,refined}, null, 2));
