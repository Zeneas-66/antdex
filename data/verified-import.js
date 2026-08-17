(()=>{'use strict';
const PLACEHOLDER=/^(待核|未核实|待物种级核实|待补|暂无|未知)$/i;
const TEMPLATE=/图鉴收录条目|图鉴收录层|等待逐项核入|只保留可靠分类骨架|来源入口|当前仅展示已核实|未核实不填|不使用属级习性直接替代|公开数据库补充|原站.*恢复|历史资料|恢复状态|完整详情会按需读取公开百科简介|仅在原始描述.*(?:TL|body length)|可靠物种资料明确给出.*(?:TL|body length)|后导入/i;
const clean=v=>{if(v==null)return'';const s=Array.isArray(v)?v.filter(Boolean):String(v).trim();if(Array.isArray(s))return s;if(!s||PLACEHOLDER.test(s)||TEMPLATE.test(s))return'';return s};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
window.ANTDEX_IMPORT_CONFLICTS=window.ANTDEX_IMPORT_CONFLICTS||[];
window.ANTDEX_IMPORT_LOG=window.ANTDEX_IMPORT_LOG||[];
window.ANTDEX_IMPORT=function(batchId,batch){
  const root=window.ANTDEX_RICH=window.ANTDEX_RICH||{};
  let inserted=0,filled=0,conflicts=0;
  for(const [sci,raw] of Object.entries(batch||{})){
    if(!sci||!raw||typeof raw!=='object')continue;
    const incoming={...raw};
    if(incoming.sci&&incoming.sci!==sci){
      window.ANTDEX_IMPORT_CONFLICTS.push({batchId,sci,field:'sci',existing:sci,incoming:incoming.sci,reason:'key mismatch'});conflicts++;continue;
    }
    delete incoming.sci;
    const cur=root[sci]||{};
    const next={...cur};
    if(!root[sci])inserted++;
    for(const [k,v0] of Object.entries(incoming)){
      const v=clean(v0);if(v===''||(Array.isArray(v)&&!v.length))continue;
      const old=clean(cur[k]);
      if(old===''||(Array.isArray(old)&&!old.length)){next[k]=v;filled++;continue;}
      if(k==='sources'&&Array.isArray(v)){
        const merged=[...(Array.isArray(cur.sources)?cur.sources:[])];
        for(const item of v){if(!merged.some(x=>same(x,item)))merged.push(item)}
        next.sources=merged;continue;
      }
      if(!same(old,v)){
        window.ANTDEX_IMPORT_CONFLICTS.push({batchId,sci,field:k,existing:old,incoming:v,reason:'existing verified value preserved'});conflicts++;
      }
    }
    root[sci]=next;
  }
  const summary={batchId,inserted,filled,conflicts,total:Object.keys(batch||{}).length};
  window.ANTDEX_IMPORT_LOG.push(summary);
  console.info('[AntDex import]',summary);
  if(conflicts)console.warn('[AntDex import conflicts]',window.ANTDEX_IMPORT_CONFLICTS.filter(x=>x.batchId===batchId));
  return summary;
};
})();
