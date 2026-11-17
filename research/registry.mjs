#!/usr/bin/env node
// Dependency-free research registry. Node >=18. Read-only; no network or deployment.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
function validate(d,documents){const e=[];if(d.schema!==1)e.push("schema");if(!Array.isArray(d.findings)||!Array.isArray(d.families)||!d.sources||typeof d.sources!=="object")return [...e,"shape"];const ids=new Set(),allowed=["RULE","LOCAL_HISTORICAL","LOCAL_PLAN","UPSTREAM","MODEL","UNKNOWN"];for(const [k,s] of Object.entries(d.sources)){if(!s||!/^rounds\/[A-Za-z0-9_/-]+\.md$/.test(s.path)||s.path.includes("..")||!(/^[0-9a-f]{40}$/.test(s.blob))||!(/^[0-9a-f]{40}$/.test(s.ref)))e.push("source "+k);}for(const f of d.findings){if(!f||!f.id||ids.has(f.id))e.push("duplicate/missing id "+f?.id);ids.add(f?.id);if(!d.families.includes(f.family)||!allowed.includes(f.kind))e.push("classification "+f.id);for(const k of ["id","locator","claim","limit","decision"])if(typeof f[k]!=="string"||!f[k].trim())e.push("missing "+k+" "+f.id);if(!Object.hasOwn(d.sources,f.source))e.push("unresolved source "+f.id);else if(documents&&!(documents[f.source]||"").includes(f.locator))e.push("unresolved locator "+f.id);}return e}
function select(d,family="ALL",kind="",term=""){return d.findings.filter(f=>(family==="ALL"||f.family===family)&&(!kind||f.kind===kind)&&(!term||[f.id,f.claim,f.limit,f.decision].join(" ").toLocaleLowerCase("hu-HU").includes(term.toLocaleLowerCase("hu-HU"))))}
export {validate,select};
const self=fileURLToPath(import.meta.url);
if(process.argv[1]&&path.resolve(process.argv[1])===path.resolve(self)){
 const root=path.resolve(path.dirname(self),'..');
 const data=JSON.parse(fs.readFileSync(path.join(root,'research/findings.json'),'utf8'));
 const cmd=process.argv[2]||'check';
 const docs={}, integrity=[];
 if(cmd==='check'){
   for(const [id,s] of Object.entries(data.sources)){try{
     const b=fs.readFileSync(path.join(root,s.path));
     const sha=crypto.createHash('sha1').update(Buffer.from('blob '+b.length+String.fromCharCode(0))).update(b).digest('hex');
     // Git hashes the UTF-8 file bytes and the "blob LENGTH\0" header.
     if(sha!==s.blob) integrity.push('source drift '+id+' (review and repin; do not silently accept)');
     docs[id]=b.toString('utf8');
   }catch(e){integrity.push('source unavailable '+id);}}
   const errors=[...validate(data,docs),...integrity];
   console.log(JSON.stringify({ok:errors.length===0,findings:data.findings.length,sources:Object.keys(data.sources).length,errors},null,2));
   process.exitCode=errors.length?1:0;
 }else if(cmd==='query'||cmd==='blockers'){
   const errors=validate(data);if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}
   else console.log(JSON.stringify(select(data,process.argv[3]||'ALL',cmd==='blockers'?'UNKNOWN':(process.argv[4]||''),cmd==='blockers'?'':(process.argv[5]||'')),null,2));
 }else{console.error('Usage: node research/registry.mjs check | query [FAMILY] [KIND] [TERM] | blockers [FAMILY]');process.exitCode=2;}
}
