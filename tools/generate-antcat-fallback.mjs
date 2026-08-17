import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd(),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const report=JSON.parse(read('data/generated-core-report.json'));
const targets=(report.failed||[]).map(x=>x.sci).filter(Boolean);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const decode=s=>String(s||'').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;|&apos;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#(\d+);/g,(_,n)=>String.fromCharCode(+n));
const strip=s=>decode(String(s||'').replace(/<script[\s\S]*?<\/script>/gi,' ').replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ')).replace(/\s+/g,' ').trim();
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const zhRegion=new Intl.DisplayNames(['zh-CN'],{type:'region'}),enRegion=new Intl.DisplayNames(['en'],{type:'region'}),countries={};
for(let a=65;a<=90;a++)for(let b=65;b<=90;b++){const c=String.fromCharCode(a,b);try{const e=enRegion.of(c),z=zhRegion.of(c);if(e&&z&&e!==c)countries[e.toUpperCase()]=z}catch{}}
Object.assign(countries,{'U.S.A.':'美国','USA':'美国','U.S.A':'美国','CHINA':'中国','TAIWAN':'台湾','HONG KONG':'香港','RUSSIA':'俄罗斯','U.S.S.R.':'前苏联','KAZAKHSTAN':'哈萨克斯坦','KYRGYZSTAN':'吉尔吉斯斯坦','TAJIKISTAN':'塔吉克斯坦','INDIA':'印度','SRI LANKA':'斯里兰卡','MYANMAR':'缅甸','BURMA':'缅甸','JAPAN':'日本','MONGOLIA':'蒙古','MEXICO':'墨西哥','BRAZIL':'巴西','ARGENTINA':'阿根廷','COSTA RICA':'哥斯达黎加','PANAMA':'巴拿马','COLOMBIA':'哥伦比亚','PERU':'秘鲁','ECUADOR':'厄瓜多尔','VENEZUELA':'委内瑞拉','MALAYSIA':'马来西亚','INDONESIA':'印度尼西亚','PHILIPPINES':'菲律宾','VIETNAM':'越南','THAILAND':'泰国','NEPAL':'尼泊尔','BHUTAN':'不丹','PAKISTAN':'巴基斯坦','ALGERIA':'阿尔及利亚','SPAIN':'西班牙','GREECE':'希腊','FRANCE':'法国','ITALY':'意大利','AUSTRALIA':'澳大利亚','NEW ZEALAND':'新西兰','PAPUA NEW GUINEA':'巴布亚新几内亚','MADAGASCAR':'马达加斯加'});
const countryKeys=Object.keys(countries).sort((a,b)=>b.length-a.length);
function translateLocality(text){let out=String(text||'');for(const k of countryKeys)out=out.replace(new RegExp(esc(k),'gi'),countries[k]);return out.replace(/\b(Palearctic|Nearctic|Neotropic|Afrotropic|Indomalaya|Australasia|Oceania)\b\.?/gi,'').replace(/\s+/g,' ').replace(/\s*\.\s*/g,'；').replace(/；+/g,'；').replace(/[；\s]+$/,'').trim()}
async function fetchHtml(url){for(let i=0;i<4;i++){const c=new AbortController(),tm=setTimeout(()=>c.abort(),15000);try{const r=await fetch(url,{headers:{'User-Agent':'AntDex-data-generator/1.0 (+https://github.com/Zeneas-66/antdex)'},signal:c.signal});if(r.status===429){await sleep(1500*(i+1));continue}if(!r.ok)throw new Error('HTTP '+r.status);return await r.text()}finally{clearTimeout(tm)}}throw new Error('rate limited')}
function parseExact(html,sci){const rows=[...String(html).matchAll(/<tr\b[\s\S]*?<\/tr>/gi)].map(m=>m[0]);for(const row of rows){const text=strip(row);if(!new RegExp('(^|\\s)'+esc(sci)+'(?=\\s|$)','i').test(text))continue;const cells=[...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(m=>strip(m[1]));if(!cells.length)continue;const href=(row.match(/href=["'](\/catalog\/\d+)["']/i)||[])[1];if(!href)continue;const first=cells[0],status=first.replace(new RegExp('^'+esc(sci)+'\\s*','i'),'').trim()||'status not parsed';const protonym=cells[2]||cells[cells.length-1]||'';return{href,status,protonym,cells}}
return null}
function typeInfo(sci,p){let x=String(p||'').replace(new RegExp('^'+esc(sci)+'\\s*','i'),'');x=x.replace(/^.*?\([a-z.qmswerg\s,]+\)\s*/i,'');return translateLocality(x)}
function currentName(status){const m=status.match(/(?:current valid taxon|obsolete combination of)\s+([A-Z][a-zA-Z.-]+\s+[a-zA-Z.-]+)/i);return m?.[1]||''}
const results={},failed=[];
for(let i=0;i<targets.length;i++){
 const sci=targets[i];try{const u='https://antcat.org/catalog/search?qq='+encodeURIComponent(sci),html=await fetchHtml(u),p=parseExact(html,sci);if(!p)throw new Error('exact AntCat row not found');const loc=typeInfo(sci,p.protonym),valid=/\bvalid\b/i.test(p.status)&&!/junior synonym|obsolete combination|homonym|unavailable|incertae/i.test(p.status),cur=currentName(p.status),statusZh=valid?'AntCat 当前列为有效分类单元':cur?`AntCat 当前将该名称处理为 ${cur} 的历史/非现行名称`:`AntCat 当前状态：${p.status}`;const intro=valid?`${sci} 是 AntCat 当前接受的蚂蚁分类单元。${loc?`其模式或原始描述信息指向${loc}。`:''}`:`${sci} 是数据库保留的历史分类名称。${statusZh}。${loc?`原始类型信息指向${loc}。`:''}`;results[sci]={status:'人工兜底核验·AntCat分类目录',summary:intro,distribution:loc?`AntCat 模式/原始描述产地信息：${loc}。该信息用于确认分类来源，不等同于完整现生分布范围。`:'AntCat 已核对该分类名称，但当前可解析页面未提供可安全转换的完整地理范围；本条仅保留分类状态。',nomenclature:statusZh+(p.protonym?`；AntCat 原始类型条目：${p.protonym}`:''),nameNote:cur?`当前对应名称：${cur}`:undefined,sources:[["AntCat · "+sci,'https://antcat.org'+p.href,'当前分类状态与类型信息']]};for(const k of Object.keys(results[sci]))if(results[sci][k]===undefined)delete results[sci][k]}catch(e){failed.push({sci,reason:e.message})}await sleep(250)
}
fs.writeFileSync(path.join(root,'data','verified-batch-13.js'),`(()=>{'use strict';\nconst B=${JSON.stringify(results,null,2)};\nwindow.ANTDEX_IMPORT?.('verified-batch-13-antcat-fallback',B);\n})();\n`);
fs.writeFileSync(path.join(root,'data','antcat-fallback-report.json'),JSON.stringify({generatedAt:new Date().toISOString(),target:targets.length,generated:Object.keys(results).length,failed},null,2)+'\n');
console.log(`target=${targets.length} generated=${Object.keys(results).length} failed=${failed.length}`);for(const x of failed)console.log('FAIL',x.sci,x.reason);
