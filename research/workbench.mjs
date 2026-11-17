#!/usr/bin/env node
// Local evidence workbench; no external APIs, no autonomous promotion.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {validate,select} from './registry.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const git=(...args)=>execFileSync('git',args,{cwd:root,encoding:'utf8',maxBuffer:32*1024*1024}).trimEnd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const norm=s=>String(s).normalize('NFD').replace(/\p{M}/gu,'').toLowerCase();
const registry=()=>JSON.parse(read('research/findings.json'));
const tracked=()=>git('ls-files','-z').split('\0').filter(Boolean);
const eligible=p=>/^(rounds|archive|evidence|methodology)\//.test(p)&&/\.(md|txt|jsonl|json)$/.test(p);
export function searchDocuments(docs,query,limit=12){
 const terms=norm(query).trim().split(/\s+/).filter(Boolean);
 if(!terms.length||!Number.isInteger(limit)||limit<1||limit>100)throw Error('query and 1–100 results required');
 const hits=[];
 for(const [p,body] of Object.entries(docs)){
  const lines=body.split(/\r?\n/);
  let heading='';
  for(let i=0;i<lines.length;i++){
   if(/^#{1,6} /.test(lines[i]))heading=lines[i];
   const context=lines.slice(Math.max(0,i-1),i+2).join(' ');
   const n=norm(context);
   if(!terms.every(t=>n.includes(t)))continue;
   const score=terms.reduce((a,t)=>a+(norm(lines[i]).includes(t)?2:1),0);
   if(!lines[i].trim())continue;
   hits.push({path:p,line:i+1,heading,score,excerpt:lines[i].slice(0,700),context:context.slice(0,1000),status:'UNREVIEWED_SOURCE_MATCH'});
  }
 }
 hits.sort((a,b)=>b.score-a.score||a.path.localeCompare(b.path)||a.line-b.line);
 const result=[];
 for(const h of hits){if(result.some(x=>x.path===h.path&&Math.abs(x.line-h.line)<3))continue;result.push(h);if(result.length===limit)break;}
 return result;
}
export function extractCards(body){
 const cards=[];
 const re=/^~~~finding-json\s*\r?\n([\s\S]*?)\r?\n~~~[ \t]*$/gm;
 for(const m of body.matchAll(re)){
  const card=JSON.parse(m[1]);
  if(!card||typeof card!=='object'||Array.isArray(card))throw Error('invalid finding block');
  cards.push(card);
 }
 if(!cards.length)throw Error('no explicitly reviewed finding-json blocks');
 return cards;
}
export function planAdmission(d,sourceId,source,body){
 if(typeof sourceId!=='string'||!/^[a-z0-9][a-z0-9-]*$/.test(sourceId))throw Error('invalid source id');
 const next=structuredClone(d);
 if(next.sources[sourceId]&&JSON.stringify(next.sources[sourceId])!==JSON.stringify(source))throw Error('source id collision');
 next.sources[sourceId]=source;
 let added=0;const seen=new Set();
 for(const card of extractCards(body)){
  for(const k of ['id','family','kind','locator','claim','limit','decision'])if(typeof card[k]!=='string'||!card[k].trim())throw Error('missing '+k);
  if(!/^[a-z0-9][a-z0-9-]*$/.test(card.id)||seen.has(card.id))throw Error('duplicate or invalid card id');
  seen.add(card.id);
  if(!body.split(/\r?\n/).includes(card.locator)||!/^#{1,6} /.test(card.locator))throw Error('locator must be an exact heading');
  const f=Object.fromEntries(['id','family','kind','locator','claim','limit','decision'].map(k=>[k,card[k]]));
  f.source=sourceId;
  // No automatic reclassification of existing evidence or resolution of UNKNOWN.
  const old=next.findings.find(x=>x.id===f.id);
  if(old){if(Object.keys(f).some(k=>old[k]!==f[k]))throw Error('finding id collision: '+f.id);continue;}
  next.findings.push(f);added++;
 }
 const errs=validate(next);if(errs.length)throw Error(errs.join('; '));
 return {next,added};
}
export function packet(d,family){
 if(!d.families.includes(family)||family==='ALL')throw Error('explicit candidate family required');
 const attach=f=>({...f,provenance:d.sources[f.source]});
 const items=select(d,family).map(attach);
 return {family,decision:'OPEN_NOT_FIELD_VALIDATED',rules:select(d,'ALL','RULE').filter(f=>f.family==='ALL').map(attach),blockers:items.filter(f=>f.kind==='UNKNOWN'),evidence:items.filter(f=>f.kind!=='UNKNOWN'),warning:'No listed blocker does not mean ready; only reviewed evidence subset. No numeric jury ranking.'};
}
function requireIntegrity(d){
 const docs={};
 for(const [id,s] of Object.entries(d.sources)){
  if(git('hash-object','--',s.path)!==s.blob)throw Error('source drift: '+id);
  if(git('rev-parse',s.ref+':'+s.path)!==s.blob)throw Error('pinned source mismatch: '+id);
  docs[id]=read(s.path);
 }
 const errs=validate(d,docs);if(errs.length)throw Error(errs.join('; '));
}
function main(){
 const [cmd,a,b,c]=process.argv.slice(2);
 const d=registry();
 const entries=tracked().filter(eligible);
 if(cmd==='coverage'){
  const counts={};for(const p of entries){const k=p.split('/')[0];counts[k]=(counts[k]||0)+1;}
  const legacy=read('evidence/profile-observations.jsonl').split(/\r?\n/).filter(Boolean).map(JSON.parse);
  console.log(JSON.stringify({trackedEligibleDocuments:entries.length,byDirectory:counts,roundMarkdown:entries.filter(p=>p.startsWith('rounds/')&&p.endsWith('.md')).length,legacyObservationRows:legacy.length,legacyProfileCounts:legacy.reduce((a,r)=>(a[r.profile]=(a[r.profile]||0)+1,a),{}),curatedFindings:d.findings.length,pinnedDocuments:Object.keys(d.sources).length,warning:'Counts are retrieval coverage, not unique validated facts or field readiness.'},null,2));
 }else if(cmd==='search'){
  const docs=Object.fromEntries(entries.map(p=>[p,read(p)]));
  const ref=git('rev-parse','HEAD');
  console.log(JSON.stringify(searchDocuments(docs,a,Number(b||12)).map(h=>{
   const blob=git('hash-object','--',h.path);
   let pinned=null;
   try{if(git('rev-parse',ref+':'+h.path)===blob)pinned=ref;}catch{}
   return {...h,blob,ref:pinned,sourceState:pinned?'COMMITTED':'WORKING_TREE_UNPINNED'};
  }),null,2));
 }else if(cmd==='packet'){
  requireIntegrity(d);console.log(JSON.stringify(packet(d,a),null,2));
 }else if(cmd==='admit'){
  if(!a||!entries.includes(a)||!a.startsWith('rounds/')||!a.endsWith('.md'))throw Error('admit only a tracked round Markdown report');
  if(c!==undefined&&c!=='--apply')throw Error('unknown argument');
  requireIntegrity(d);
  const ref=git('rev-parse','HEAD'),blob=git('rev-parse',ref+':'+a);
  if(git('hash-object','--',a)!==blob)throw Error('uncommitted source changes; commit report first');
  const prior=d.sources[b];
  const source=prior&&prior.path===a&&prior.blob===blob?prior:{path:a,ref,blob};
  const plan=planAdmission(d,b,source,read(a));requireIntegrity(plan.next);
  if(c==='--apply'&&plan.added){
   const target=path.join(root,'research/findings.json'),temp=target+'.tmp-'+process.pid;
   fs.writeFileSync(temp,JSON.stringify(plan.next,null,2)+'\n',{flag:'wx'});fs.renameSync(temp,target);
  }
  console.log(JSON.stringify({mode:c==='--apply'?'APPLY':'PREVIEW',added:plan.added,total:plan.next.findings.length,source,review:'Explicit author-reviewed cards; integrity is not external factual verification.'},null,2));
 }else throw Error('coverage | search "terms" [limit] | packet FAMILY | admit rounds/...md source-id [--apply]');
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))try{main()}catch(e){console.error(e.message);process.exitCode=1;}
