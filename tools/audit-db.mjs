import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import vm from 'node:vm';

const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const dbFiles=fs.readdirSync(path.join(root,'data')).filter(n=>/^db-\d+\.js$/.test(n)).sort((a,b)=>Number(a.match(/\d+/)[0])-Number(b.match(/\d+/)[0]));
let b64='';
for(const f of dbFiles){
  const s=read('data/'+f);
  const m=s.match(/\+\s*("[\s\S]*")\s*;?\s*$/);
  if(!m) throw new Error(`Cannot parse ${f}`);
  b64+=JSON.parse(m[1]);
}
const db=JSON.parse(zlib.gunzipSync(Buffer.from(b64,'base64')).toString('utf8'));

const sandbox={window:{},console:{info(){},warn(){},log(){}}};
vm.createContext(sandbox);
const run=p=>vm.runInContext(read(p),sandbox,{filename:p});
run('rich.js');
run('data/verified-import.js');
for(const f of fs.readdirSync(path.join(root,'data')).filter(n=>/^verified-batch-\d+\.js$/.test(n)).sort()) run('data/'+f);
const rich=sandbox.window.ANTDEX_RICH||{};
const conflicts=sandbox.window.ANTDEX_IMPORT_CONFLICTS||[];

const PLACEHOLDER=/^(待核|未核实|待物种级核实|待补|暂无|未知)$/i;
const TEMPLATE=/图鉴收录条目|图鉴收录层|等待逐项核入|只保留可靠分类骨架|来源入口|当前仅展示已核实|未核实不填|不使用属级习性直接替代|公开数据库补充|原站.*恢复|历史资料|恢复状态|完整详情会按需读取公开百科简介|仅在原始描述.*(?:TL|body length)|可靠物种资料明确给出.*(?:TL|body length)|后导入/i;
const usable=v=>{if(v==null||v==='')return false;const s=Array.isArray(v)?v.filter(Boolean).join('、'):String(v).trim();return !!s&&!PLACEHOLDER.test(s)&&!TEMPLATE.test(s)};

const C={sci:'s',zh:'z',subfamily:'f',subfamilyZh:'fz',genus:'g',summary:'sm',distribution:'d',habitat:'h',ecoTags:'et',nest:'n',diet:'di',colony:'co',worker:'w',soldier:'so',queen:'q',male:'m',identification:'idn',behavior:'b',flight:'fl',temp:'t',humidity:'hu',difficulty:'df',safety:'sa'};
const A={sci:'s',zh:'z',subfamily:'f',subfamilyZh:'fz',genus:'g',summary:'lsm',distribution:'ld',habitat:'lh',ecoTags:'let',nest:'ln',diet:'ldi',worker:'lw',workerDetail:'lwd',queen:'lq',temp:'lt',humidity:'lhu',husbandryWarning:'lhw',nameNote:'lnn'};
const expand=(o,map)=>Object.fromEntries(Object.entries(map).map(([k,v])=>[k,o?.[v]]));
const conf=(db.c||[]).map(o=>expand(o,C));
const cand=(db.a||[]).map(o=>expand(o,A));
const bySci=new Map();
for(const x of [...cand,...conf]){
  if(!x.sci)continue;
  const cur=bySci.get(x.sci)||{};
  for(const [k,v] of Object.entries(x))if(!usable(cur[k])&&usable(v))cur[k]=v;
  bySci.set(x.sci,cur);
}
for(const [sci,r] of Object.entries(rich)){
  const cur=bySci.get(sci)||{sci};
  for(const [k,v] of Object.entries(r))if(usable(v))cur[k]=v;
  bySci.set(sci,cur);
}

const FACT_FIELDS=['summary','distribution','habitat','ecoTags','nest','diet','colony','worker','workerDetail','soldier','queen','male','identification','behavior','ecology','flight','temp','humidity','difficulty','safety','husbandryWarning','nomenclature','nameNote'];
const CORE_FIELDS=['summary','distribution'];
const DETAIL_FIELDS=['identification','ecology','nest','diet','behavior','colony','flight','nomenclature'];
const groups={};
for(const r of bySci.values()){
  const sf=r.subfamily||'Unknown';
  const g=groups[sf]??={subfamily:sf,subfamilyZh:r.subfamilyZh||'',total:0,withAny:0,withCore:0,withDetail:0,empty:0,species:[]};
  g.total++;
  const factCount=FACT_FIELDS.filter(k=>usable(r[k])).length;
  const coreCount=CORE_FIELDS.filter(k=>usable(r[k])).length;
  const detailCount=DETAIL_FIELDS.filter(k=>usable(r[k])).length;
  if(factCount)g.withAny++;else g.empty++;
  if(coreCount===CORE_FIELDS.length)g.withCore++;
  if(detailCount>=2)g.withDetail++;
  g.species.push({sci:r.sci,zh:r.zh||'',genus:r.genus||'',factCount,missingCore:CORE_FIELDS.filter(k=>!usable(r[k])),missingDetail:DETAIL_FIELDS.filter(k=>!usable(r[k]))});
}
for(const g of Object.values(groups)){
  g.completeness=Number((g.withCore/g.total*100).toFixed(1));
  g.species.sort((a,b)=>a.factCount-b.factCount||a.sci.localeCompare(b.sci));
}
const subfamilies=Object.values(groups).sort((a,b)=>a.completeness-b.completeness||b.total-a.total||a.subfamily.localeCompare(b.subfamily));
const result={generatedAt:new Date().toISOString(),totalSpecies:bySci.size,verifiedRecords:Object.keys(rich).length,conflicts,subfamilies};
fs.writeFileSync(path.join(root,'data','audit-inventory.json'),JSON.stringify(result,null,2)+'\n');
let md='# AntDex 全库补全审计\n\n';
md+=`生成时间：${result.generatedAt}\n\n总物种：**${result.totalSpecies}**；已有 verified/rich 记录：**${result.verifiedRecords}**；导入冲突：**${conflicts.length}**。\n\n`;
md+='| 亚科 | 物种数 | 有任意有效资料 | 首页核心齐全 | 有较完整详情 | 空壳 | 核心完成率 |\n|---|---:|---:|---:|---:|---:|---:|\n';
for(const g of subfamilies)md+=`| ${g.subfamily}${g.subfamilyZh?` · ${g.subfamilyZh}`:''} | ${g.total} | ${g.withAny} | ${g.withCore} | ${g.withDetail} | ${g.empty} | ${g.completeness}% |\n`;
md+='\n## 每个亚科优先补齐名单\n\n';
for(const g of subfamilies){
  md+=`### ${g.subfamily}${g.subfamilyZh?` · ${g.subfamilyZh}`:''}\n\n`;
  const todo=g.species.filter(s=>s.missingCore.length||s.factCount<3);
  if(!todo.length){md+='核心资料已覆盖。\n\n';continue}
  for(const s of todo)md+=`- ${s.zh?s.zh+' · ':''}${s.sci} — 有效字段 ${s.factCount}；缺核心：${s.missingCore.join(', ')||'无'}\n`;
  md+='\n';
}
fs.writeFileSync(path.join(root,'data','AUDIT_STATUS.md'),md);
console.log(`Audited ${result.totalSpecies} species in ${subfamilies.length} subfamilies; conflicts=${conflicts.length}`);
for(const g of subfamilies)console.log(`${g.subfamily}\t${g.total}\tcore ${g.withCore}\tempty ${g.empty}\t${g.completeness}%`);
