(()=>{'use strict';
const expect=["Myrmecia brevinoda","Cataglyphis pallida","Myrmecia acuta","Myrmecia analis","Myrmecia comata","Myrmecia desertorum","Myrmecia esuriens","Myrmecia flammicollis","Myrmecia flavicoma","Myrmecia forceps","Atta cephalotes","Atta sexdens","Atta laevigata","Acromyrmex rugosus"];
const missing=expect.filter(k=>!window.ANTDEX_RICH?.[k]);
const invalid=[];
for(const k of expect){const r=window.ANTDEX_RICH?.[k];if(!r)continue;if(!r.summary&&!r.distribution&&!r.identification&&!r.ecology)invalid.push(k)}
const state={ok:!missing.length&&!invalid.length,missing,invalid,dbMissing:[],dbCheck:'pending',conflicts:[...(window.ANTDEX_IMPORT_CONFLICTS||[])],imports:[...(window.ANTDEX_IMPORT_LOG||[])]};
window.ANTDEX_IMPORT_SELFTEST=state;
const report=()=>{state.ok=!state.missing.length&&!state.invalid.length&&!state.dbMissing.length&&!state.conflicts.length;if(!state.ok)console.warn('[AntDex selftest]',state);else console.info('[AntDex selftest]',state)};
report();
(async()=>{try{
  if(!window.ANTDEX_DB_GZ){state.dbCheck='no-db';report();return}
  if(!('DecompressionStream' in window)){state.dbCheck='unsupported';report();return}
  const bin=Uint8Array.from(atob(window.ANTDEX_DB_GZ),c=>c.charCodeAt(0));
  const text=await new Response(new Blob([bin]).stream().pipeThrough(new DecompressionStream('gzip'))).text();
  const db=JSON.parse(text),names=new Set([...(db.c||[]).map(o=>o.s),...(db.a||[]).map(o=>o.s)].filter(Boolean));
  state.dbMissing=expect.filter(k=>!names.has(k));state.dbCheck='done';report();
}catch(e){state.dbCheck='error: '+(e?.message||e);report()}})();
})();
