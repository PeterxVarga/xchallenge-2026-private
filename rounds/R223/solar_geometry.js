// R223 synthetic shadow geometry; NOAA approximate solar equations, not GIS or engineering.
// Run: node solar_geometry.js
const rad=Math.PI/180,deg=1/rad,lat=47.481733*rad,lon=19.139058;
function sun(d,h){
 const g=2*Math.PI/365*(d-1+(h-12)/24);
 const eq=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g));
 const dec=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(2*g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g);
 const ha=(h*60+eq+4*lon-120)/4*rad-Math.PI;
 const e=-Math.cos(dec)*Math.sin(ha),n=Math.cos(lat)*Math.sin(dec)-Math.sin(lat)*Math.cos(dec)*Math.cos(ha),z=Math.sin(lat)*Math.sin(dec)+Math.cos(lat)*Math.cos(dec)*Math.cos(ha);
 return {e,n,z,elev:Math.asin(z)*deg,az:(Math.atan2(e,n)*deg+360)%360};
}
const days=[172,196,227]; // 2027 June21 July15 Aug15, clock CEST
const samples=days.flatMap(d=>Array.from({length:13},(_,i)=>({d,h:10+i*.5,...sun(d,10+i*.5)})));
function evalRoof(w,l,H,x,y){
 const coverage=samples.map(s=>{
 const cx=x-H*s.e/s.z,cy=y-H*s.n/s.z;
 const X=Math.max(0,Math.min(4,cx+w/2)-Math.max(-4,cx-w/2));
 const Y=Math.max(0,Math.min(2.5,cy+l/2)-Math.max(-2.5,cy-l/2));
 return X*Y;
 });
 return {w,l,H,x,y,min:Math.min(...coverage),mean:coverage.reduce((a,b)=>a+b,0)/coverage.length};
}
function best(w,l,H){
 let b=null;for(let xi=-40;xi<=40;xi++)for(let yi=-40;yi<=40;yi++){
 const a=evalRoof(w,l,H,xi/10,yi/10);
 if(!b||a.min>b.min+1e-9||Math.abs(a.min-b.min)<=1e-9&&a.mean>b.mean)b=a;
 } return b;
}
const candidates=[[8,6],[6,8],[10,6],[6,10],[10,8],[8,10],[12,6],[6,12]];
const out={site:{lat:lat*deg,lon},dates:days,times:"10–16 CEST / 30 min",target:"8m E-W × 5m N-S; 40 m²; ground plane; rectangular ideal opaque horizontal roofs",solar:samples.filter(s=>s.h%2===0).map(s=>({d:s.d,h:s.h,elev:s.elev,az:s.az,shift3:3/Math.tan(s.elev*rad)})),results:candidates.flatMap(([w,l])=>[2.5,3,4].map(H=>({centered:evalRoof(w,l,H,0,0),optimized:best(w,l,H)})))};
if(out.results.some(a=>a.centered.min<0||a.optimized.mean>40+1e-9||a.optimized.min+1e-9<a.centered.min))throw new Error("bounds");
console.log(JSON.stringify(out,null,2));
