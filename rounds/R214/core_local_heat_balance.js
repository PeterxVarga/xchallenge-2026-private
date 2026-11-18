// R214 synthetic concept calculation. Node.js, no dependencies. NOT a validated comfort, pediatric safety, or construction model.
function core(){
 const S=5.670374419e-8,K=t=>t+273.15,rad=(a,b)=>S*(K(a)**4-K(b)**4),dew=(t,rh)=>{const g=Math.log(rh/100)+17.27*t/(237.3+t);return 237.3*g/(17.27-g)};
 function Frect(x,y,w,h,d){const f=(u,v)=>Math.atan(u*v/(d*Math.sqrt(d*d+u*u+v*v)));return (f(w/2-x,h/2-y)-f(-w/2-x,h/2-y)-f(w/2-x,-h/2-y)+f(-w/2-x,-h/2-y))/(4*Math.PI)}
 const persons=[[-.75,-.55],[-.75,.55],[.75,-.55],[.75,.55]],fs=persons.map(([x,y])=>({overhead:Frect(x,y,2,2,1.6),side:Frect(x,0,2,1,1.35-y)+Frect(x,0,2,1,1.35+y)}));
 const cases=[[32,35,37],[35,40,40],[35,65,40],[38,60,43],[40,75,45]].map(([a,rh,bg])=>{const dp=dew(a,rh),p=Math.max(26,dp+2),s=Math.max(28,dp+2),c=s<34?20*.2*(34-s):0,seatW=c>0?4*c+.4*(Math.max(0,5*(a-s))+Math.max(0,.9*rad(bg,s))):0,panelW=p<bg&&p<a?4*(Math.max(0,5*(a-p))+Math.max(0,.9*rad(bg,p))):0,E=(q,aux)=>q>0?(1.3*q/2.5+aux)/1000:0,delta=F=>bg-(F*.9*K(p)**4+(1-F*.9)*K(bg)**4)**.25+273.15;
 return {a,rh,bg,dp,p,s,c,seatW,panelW,seatKW:E(seatW,60),panelKW:E(panelW,80),hybridKW:E(seatW+panelW,100),overheadDelta:delta(fs[0].overhead),sideDelta:delta(fs[0].side),hypotheticalF25Delta:delta(.25)}});
 const econ=[300000,600000,1000000].map(cap=>({cap,first:1.2*cap+60000+160*.45*150,five:1.2*cap+5*(60000+160*.45*150)}));
 return {fs,cases,econ,checks:{bounds:fs.every(f=>f.overhead>=0&&f.side>=0&&f.side<1&&f.overhead<1),symmetry:fs.every(f=>Math.abs(f.side-fs[0].side)<1e-12&&Math.abs(f.overhead-fs[0].overhead)<1e-12),equalTemperature:Math.abs(rad(35,35))<1e-12}};
}
console.log(JSON.stringify(core(),null,2));
