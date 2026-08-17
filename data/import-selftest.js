(()=>{'use strict';
const expect=[
"Myrmecia brevinoda","Cataglyphis pallida","Myrmecia acuta","Myrmecia analis","Myrmecia comata","Myrmecia desertorum","Myrmecia esuriens","Myrmecia flammicollis","Myrmecia flavicoma","Myrmecia forceps","Atta cephalotes","Atta sexdens","Atta laevigata","Acromyrmex rugosus","Myrmecia aberrans","Myrmecia arnoldi","Myrmecia auriventris","Myrmecia banksi","Myrmecia borealis","Myrmecia croslandi","Myrmecia dimidiata",
"Paraponera clavata","Leptanilla revelierii","Leptanilla taiwanensis","Opamyrma hungvuong","Myopopone castanea","Mystrium camillae","Stigmatomma mulanae","Stigmatomma octodentatum","Stictoponera bicolor","Stictoponera coccina","Stictoponera coxalis","Stictoponera quadrutinodules","Stictoponera treta",
"Myrmecia chrysogaster","Myrmecia gratiosa","Myrmecia gulosa","Myrmecia hirsuta","Myrmecia mandibularis","Myrmecia nigriscapa","Myrmecia nigrocincta","Myrmecia pyriformis"
];
const required={
 "Myrmecia brevinoda":["summary","worker","queen","ecology"],
 "Myrmecia desertorum":["summary","distribution","habitat","ecology"],
 "Paraponera clavata":["summary","distribution","nest","diet","colony"],
 "Leptanilla taiwanensis":["summary","distribution","habitat","diet"],
 "Myopopone castanea":["summary","distribution","nest","diet","worker"],
 "Stigmatomma octodentatum":["summary","distribution","habitat","worker"],
 "Stictoponera coccina":["summary","distribution","worker"],
 "Myrmecia nigrocincta":["summary","distribution","queen","colony"],
 "Myrmecia pyriformis":["summary","distribution","behavior","colony"]
};
const missing=expect.filter(k=>!window.ANTDEX_RICH?.[k]),invalid=[],fieldMissing=[];
for(const k of expect){const r=window.ANTDEX_RICH?.[k];if(!r)continue;if(!r.summary||!r.distribution)invalid.push(k)}
for(const [sci,fields] of Object.entries(required)){const r=window.ANTDEX_RICH?.[sci]||{};for(const field of fields){if(!r[field])fieldMissing.push(`${sci}.${field}`)}}
const schemaNeed=['summary','distribution','habitat','nest','diet','colony','worker','workerDetail','soldier','queen','male','identification','behavior','ecology','flight','temp','humidity','difficulty','safety','husbandryWarning','nomenclature','nameNote','sources'];
const schema=new Set(window.ANTDEX_IMPORT_SCHEMA||[]),schemaMissing=schemaNeed.filter(k=>!schema.has(k));
const state={ok:false,missing,invalid,fieldMissing,schemaMissing,dbMissing:[],dbCheck:'pending',conflicts:[...(window.ANTDEX_IMPORT_CONFLICTS||[])],imports:[...(window.ANTDEX_IMPORT_LOG||[])]};
window.ANTDEX_IMPORT_SELFTEST=state;
const report=()=>{state.ok=!state.missing.length&&!state.invalid.length&&!state.fieldMissing.length&&!state.schemaMissing.length&&!state.dbMissing.length&&!state.conflicts.length;if(!state.ok)console.warn('[AntDex selftest]',state);else console.info('[AntDex selftest]',state)};
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
