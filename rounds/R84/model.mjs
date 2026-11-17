// Parameter study, not a site survey, structural design or equipment selection.
// 2027 non-leap year; local CEST (UTC+2). No dependencies. node model.mjs
const rad=Math.PI/180,deg=180/Math.PI;
function solar(day,h){const lat=47.481733*rad,lon=19.139058,g=2*Math.PI/365*(day-1+(h-12)/24),e=229.18*(.000075+.001868*Math.cos(g)-.032077*Math.sin(g)-.014615*Math.cos(2*g)-.040849*Math.sin(2*g)),dec=.006918-.399912*Math.cos(g)+.070257*Math.sin(g)-.006758*Math.cos(2*g)+.000907*Math.sin(2*g)-.002697*Math.cos(3*g)+.00148*Math.sin(3*g),ha=(h*60+e+4*lon-120)/4*rad-Math.PI;const east=-Math.cos(dec)*Math.sin(ha),north=Math.cos(lat)*Math.sin(dec)-Math.sin(lat)*Math.cos(dec)*Math.cos(ha),up=Math.sin(lat)*Math.sin(dec)+Math.cos(lat)*Math.cos(dec)*Math.cos(ha);return {elevation:Math.asin(up)*deg,azimuth:(Math.atan2(east,north)*deg+360)%360,east,north,up}}
function shade(s,w,l,h,x,y,z){if(s.up<=0||h<=z)throw Error("Unsupported geometry");const cx=x-(h-z)*s.east/s.up,cy=y-(h-z)*s.north/s.up;return Math.max(0,Math.min(2,cx+w/2)-Math.max(-2,cx-w/2))*Math.max(0,Math.min(1.5,cy+l/2)-Math.max(-1.5,cy-l/2))/12}
const samples=[172,196,227].flatMap(d=>Array.from({length:21},(_,i)=>solar(d,10+i/4)));
function evaluate(w,l,h,x,y){const vals=samples.flatMap(s=>[0,1].map(z=>shade(s,w,l,h,x,y,z)));return {min:Math.min(...vals),avg:vals.reduce((a,b)=>a+b,0)/vals.length}}
function optimize(w,l,h){let best=null;for(let i=-16;i<=16;i++){for(let j=-16;j<=16;j++){const x=i/4,y=j/4,o=evaluate(w,l,h,x,y);if(!best||o.min>best.min+1e-10||(Math.abs(o.min-best.min)<1e-10&&o.avg>best.avg+1e-10))best={x,y,...o}}}return best}
function load(p,g){const n=p.n+2,v=n*p.lps*3.6,dt=p.to-26;const solar=p.glass*p.irr*g/1000,trans=p.H*dt/1000,vent=.33*v*dt/1000,people=(p.n*60+2*75)/1000,other=.48,latent=(p.n*45+2*55)/1000+1.2*v/3600*2500*p.dw;const sensible=solar+trans+vent+people+other;return {solar,trans,vent,people,other,latent,sensible,total:sensible+latent}}
const cases=[{"name":"enyhébb","n":15,"lps":5,"to":32,"glass":8,"irr":250,"H":70,"dw":0.001},{"name":"közép","n":25,"lps":7,"to":35,"glass":12,"irr":500,"H":90,"dw":0.003},{"name":"stressz","n":30,"lps":10,"to":38,"glass":16,"irr":700,"H":120,"dw":0.005}];
const shadow=[[6,5,3],[8,6,3],[6,5,2.5]].map(([w,l,h])=>({w,l,h,center:evaluate(w,l,h,0,0),best:optimize(w,l,h)}));
const orientations=[0,90,180,270].map(a=>{const gain=Array.from({length:28},(_,i)=>{const s=solar(196,9+(i+.5)*.25);return 700*Math.max(0,s.east*Math.sin(a*rad)+s.north*Math.cos(a*rad))+50+.1*(700*s.up+100)});return {az:a,max:Math.max(...gain),integral:gain.reduce((a,b)=>a+b,0)*.25/1000}});
const solarTable=[10,12,13,14,15].map(h=>{const s=solar(196,h);return {h,alt:s.elevation,az:s.azimuth,shadow:3/Math.tan(s.elevation*rad),e:-3*s.east/s.up,n:-3*s.north/s.up}});
const loads=cases.map(p=>({name:p.name,base:load(p,.55),inner:load(p,.35),outside:load(p,.1375)}));
const near=(a,b)=>Math.abs(a-b)<1e-8;
const checks=()=>[
["unit sun vectors",samples.every(s=>near(s.east*s.east+s.north*s.north+s.up*s.up,1))],
["63 positive solar samples",samples.length===63&&samples.every(s=>s.up>0)],
["morning east / afternoon west",solar(196,10).east>0&&solar(196,15).east<0],
["noon south",solar(196,13).north<0],
["zenith centered rectangle",near(shade({east:0,north:0,up:1},6,5,3,0,0,0),1)],
["no overlap",near(shade({east:0,north:0,up:1},6,5,3,20,20,0),0)],
["25% overlap exact",near(shade({east:0,north:0,up:1},2,1.5,3,0,0,0),.25)],
["shadow range",shadow.every(s=>s.center.min>=0&&s.best.avg<=1+1e-10)],
["grid candidate beats centered minimum",shadow.every(s=>s.best.min>=s.center.min-1e-10)],
["larger model min improves",shadow[1].best.min>shadow[0].best.min],
["shading gain 2475 W",near(loads[1].base.solar-loads[1].outside.solar,2.475)],
["latent calculation",near(loads[1].base.latent,2.936)],
["energy balance",loads.every(s=>["base","inner","outside"].every(k=>near(s[k].total,s[k].sensible+s[k].latent)))],
["unchanged fresh air",loads.every(s=>near(s.base.vent,s.outside.vent)&&near(s.base.latent,s.outside.latent))],
["total gains monotonic",loads.every(s=>s.base.total>s.inner.total&&s.inner.total>s.outside.total)],
["base total exceeds historic nominal 3.5 even shaded",loads[1].outside.total>3.5],
["lower nominal total below stress shaded",loads[2].outside.total>7],
["three-season ratio",near(2670050/3220000,.8292080745341615)]
];
const cs=checks();if(cs.some(x=>!x[1]))throw Error(JSON.stringify(cs));
console.log(JSON.stringify({shadow,orientations,solarTable,loads,checks:cs},null,2));
