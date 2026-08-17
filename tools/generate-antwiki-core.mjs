import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import vm from 'node:vm';

const root=process.cwd(),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const dbFiles=fs.readdirSync(path.join(root,'data')).filter(n=>/^db-\d+\.js$/.test(n)).sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0]));
let b64='';for(const f of dbFiles){const m=read('data/'+f).match(/\+\s*("[\s\S]*")\s*;?\s*$/);if(!m)throw new Error(`Cannot parse ${f}`);b64+=JSON.parse(m[1])}
const db=JSON.parse(zlib.gunzipSync(Buffer.from(b64,'base64')).toString('utf8'));
const C=o=>({sci:o.s,zh:o.z,subfamily:o.f,subfamilyZh:o.fz,genus:o.g,summary:o.sm,distribution:o.d});
const A=o=>({sci:o.s,zh:o.z,subfamily:o.f,subfamilyZh:o.fz,genus:o.g,summary:o.lsm,distribution:o.ld});
const bySci=new Map();for(const x of [...(db.a||[]).map(A),...(db.c||[]).map(C)]){if(!x.sci)continue;const cur=bySci.get(x.sci)||{};for(const [k,v] of Object.entries(x))if((cur[k]==null||cur[k]==='')&&v!=null&&v!=='')cur[k]=v;bySci.set(x.sci,cur)}
const sandbox={window:{},console:{info(){},warn(){},log(){}}};vm.createContext(sandbox);const run=p=>vm.runInContext(read(p),sandbox,{filename:p});run('rich.js');run('data/verified-import.js');for(const f of fs.readdirSync(path.join(root,'data')).filter(n=>/^verified-batch-\d+\.js$/.test(n)&&n!=='verified-batch-99.js').sort())run('data/'+f);
const PLACEHOLDER=/^(待核|未核实|待物种级核实|待补|暂无|未知)$/i,TEMPLATE=/图鉴收录条目|图鉴收录层|等待逐项核入|只保留可靠分类骨架|来源入口|当前仅展示已核实|未核实不填|不使用属级习性直接替代|公开数据库补充|原站.*恢复|历史资料|恢复状态|完整详情会按需读取公开百科简介|仅在原始描述.*(?:TL|body length)|可靠物种资料明确给出.*(?:TL|body length)|后导入/i;
const usable=v=>{if(v==null||v==='')return false;const s=Array.isArray(v)?v.filter(Boolean).join('、'):String(v).trim();return !!s&&!PLACEHOLDER.test(s)&&!TEMPLATE.test(s)};
for(const [sci,r] of Object.entries(sandbox.window.ANTDEX_RICH||{})){const cur=bySci.get(sci)||{sci};for(const [k,v] of Object.entries(r))if(usable(v))cur[k]=v;bySci.set(sci,cur)}
// Load the previous generated batch as an accumulator, but never let it override manual records.
let previousGenerated={};if(fs.existsSync(path.join(root,'data','verified-batch-99.js'))){const s={window:{ANTDEX_IMPORT_GENERATED:(_id,b)=>{previousGenerated=b||{}}},console};vm.createContext(s);try{vm.runInContext(read('data/verified-batch-99.js'),s,{filename:'data/verified-batch-99.js'})}catch{previousGenerated={}}}
const hasGeneratedCore=sci=>usable(previousGenerated[sci]?.summary)||usable(previousGenerated[sci]?.distribution);
const targets=[...bySci.values()].filter(x=>['Myrmicinae','Formicinae'].includes(x.subfamily)&&(!usable(x.summary)||!usable(x.distribution))&&!hasGeneratedCore(x.sci)).sort((a,b)=>a.sci.localeCompare(b.sci));
const zhRegion=new Intl.DisplayNames(['zh-CN'],{type:'region'}),sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function jfetch(u){for(let attempt=0;attempt<6;attempt++){const c=new AbortController(),tm=setTimeout(()=>c.abort(),20000);try{const r=await fetch(u,{headers:{'User-Agent':'AntDex-data-generator/1.0 (+https://github.com/Zeneas-66/antdex)'},signal:c.signal});if(r.status===429){const h=Number(r.headers.get('retry-after')),delay=Number.isFinite(h)&&h>0?h*1000:1200*Math.pow(2,attempt);await sleep(Math.min(delay,20000));continue}if(!r.ok)throw new Error('HTTP '+r.status);return await r.json()}finally{clearTimeout(tm)}}throw new Error('HTTP 429 after retries')}
const norm=s=>String(s||'').toLowerCase().replace(/\([^)]*\)/g,'').replace(/[^a-z0-9]+/g,' ').trim();
async function gbif(r){
 const murl=new URL('https://api.gbif.org/v1/species/match');murl.searchParams.set('name',r.sci);murl.searchParams.set('kingdom','Animalia');const m=await jfetch(murl);await sleep(180);
 const rank=String(m.rank||'').toUpperCase();if(!['SPECIES','SUBSPECIES','VARIETY'].includes(rank))throw new Error('unsafe rank '+(rank||'none'));
 const requested=norm(r.sci),matched=norm(m.scientificName||m.canonicalName||''),accepted=norm(m.acceptedScientificName||'');if(!matched.startsWith(requested)&&!requested.startsWith(matched)&&!(accepted&&accepted.startsWith(requested)))throw new Error('unsafe name match '+(m.scientificName||''));
 const key=m.usageKey||m.speciesKey||m.acceptedUsageKey;if(!key)throw new Error('no taxon key');
 const ourl=new URL('https://api.gbif.org/v1/occurrence/search');ourl.searchParams.set('taxon_key',key);ourl.searchParams.set('limit','0');ourl.searchParams.set('facet','country');ourl.searchParams.set('facet_limit','300');const o=await jfetch(ourl);await sleep(180);
 const facet=(o.facets||[]).find(f=>String(f.field).toUpperCase()==='COUNTRY');const counts=(facet?.counts||[]).filter(x=>x.name&&x.count>0).sort((a,b)=>b.count-a.count);if(!counts.length)throw new Error('no country occurrence');
 const countries=counts.map(x=>{try{return zhRegion.of(x.name)||x.name}catch{return x.name}});return{countries:[...new Set(countries)],key,total:o.count||counts.reduce((s,x)=>s+x.count,0),match:m};
}
const fresh={},failed=[];let cursor=0;async function worker(){while(true){const i=cursor++;if(i>=targets.length)return;const r=targets[i];try{const g=await gbif(r);const dist=g.countries.join('、'),name=r.zh||r.sci,sf=r.subfamilyZh||r.subfamily;fresh[r.sci]={status:'自动基础核验·GBIF occurrence',summary:usable(r.summary)?undefined:`${name}${r.zh?`（${r.sci}）`:''}是${sf?sf+' ':''}${r.genus||r.sci.split(' ')[0]}属的一种。GBIF 当前可检索的物种级观测/标本记录涉及${dist}。`,distribution:usable(r.distribution)?undefined:`GBIF 当前物种级观测/标本记录涉及：${dist}。该列表表示公开 occurrence 记录所在国家/地区，不等同于完整天然分布范围。`,sources:[["GBIF · "+r.sci,"https://www.gbif.org/species/"+g.key,"物种匹配与 occurrence 国家记录"]]};for(const k of Object.keys(fresh[r.sci]))if(fresh[r.sci][k]===undefined)delete fresh[r.sci][k]}catch(e){failed.push({sci:r.sci,reason:e.message})}}}
await Promise.all(Array.from({length:2},worker));
const results={...previousGenerated,...fresh};
fs.writeFileSync(path.join(root,'data','verified-batch-99.js'),`(()=>{'use strict';\nconst B=${JSON.stringify(results,null,2)};\nwindow.ANTDEX_IMPORT_GENERATED?.('generated-gbif-core',B);\n})();\n`);
fs.writeFileSync(path.join(root,'data','generated-core-report.json'),JSON.stringify({generatedAt:new Date().toISOString(),source:'GBIF Species API + occurrence country facet',previous:Object.keys(previousGenerated).length,targetThisRun:targets.length,newGenerated:Object.keys(fresh).length,totalGenerated:Object.keys(results).length,failed},null,2)+'\n');
console.log(`previous=${Object.keys(previousGenerated).length} target=${targets.length} fresh=${Object.keys(fresh).length} total=${Object.keys(results).length} failed=${failed.length}`);for(const x of failed.slice(0,180))console.log('FAIL',x.sci,x.reason);
