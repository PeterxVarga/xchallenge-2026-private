import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {searchDocuments,extractCards,planAdmission,packet} from './workbench.mjs';
const d=JSON.parse(fs.readFileSync(new URL('./findings.json',import.meta.url),'utf8'));
const src={path:'rounds/test/TEST.md',ref:'a'.repeat(40),blob:'b'.repeat(40)};
const card={id:'test-new-finding',family:'HOME',kind:'LOCAL_PLAN',locator:'## Evidence',claim:'new planned intervention',limit:'no delivery proof',decision:'verify'};
const body=c=>'## Evidence\n\n~~~finding-json\n'+JSON.stringify(c)+'\n~~~\n';
test('accent insensitive corpus search with path and line',()=>{const r=searchDocuments({'rounds/x.md':'# A\nÚjhegyi zajvédelem\n'},'ujhegyi zajvedelem');assert.equal(r[0].line,2);assert.equal(r[0].status,'UNREVIEWED_SOURCE_MATCH');});
test('empty search rejected',()=>assert.throws(()=>searchDocuments({},'')));
test('unmarked prose cannot be admitted',()=>assert.throws(()=>extractCards('## Evidence\nClaim')));
test('admission append only and idempotent',()=>{const p=planAdmission(d,'test',src,body(card));assert.equal(p.added,1);assert.equal(d.findings.some(f=>f.id===card.id),false);assert.equal(planAdmission(p.next,'test',src,body(card)).added,0);});
test('duplicate different finding rejected',()=>{const p=planAdmission(d,'test',src,body(card));assert.throws(()=>planAdmission(p.next,'test',src,body({...card,claim:'changed'})),/collision/);});
test('unresolved locator and false category rejected',()=>{assert.throws(()=>planAdmission(d,'test',src,body({...card,locator:'## absent'})));assert.throws(()=>planAdmission(d,'test',src,body({...card,kind:'CERTIFIED'})));});
test('source identity collision rejected',()=>{const p=planAdmission(d,'test',src,body(card));assert.throws(()=>planAdmission(p.next,'test',{...src,blob:'c'.repeat(40)},body(card)));});
test('decision packet carries unresolved gate and provenance',()=>{const p=packet(d,'WATER');assert.ok(p.blockers.some(f=>f.id==='water-gap'));assert.ok(p.evidence.every(f=>f.provenance.ref));assert.equal(p.decision,'OPEN_NOT_FIELD_VALIDATED');});

test('missing source ID rejected',()=>assert.throws(()=>planAdmission(d,undefined,src,body(card))));
