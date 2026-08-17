(()=>{'use strict';
const expect=["Myrmecia brevinoda","Cataglyphis pallida","Myrmecia acuta","Myrmecia analis","Myrmecia comata","Myrmecia desertorum","Myrmecia esuriens","Myrmecia flammicollis","Myrmecia flavicoma","Myrmecia forceps","Atta cephalotes","Atta sexdens","Atta laevigata","Acromyrmex rugosus"];
const missing=expect.filter(k=>!window.ANTDEX_RICH?.[k]);
const invalid=[];
for(const k of expect){const r=window.ANTDEX_RICH?.[k];if(!r)continue;if(!r.summary&&!r.distribution&&!r.identification&&!r.ecology)invalid.push(k)}
window.ANTDEX_IMPORT_SELFTEST={ok:!missing.length&&!invalid.length,missing,invalid,conflicts:[...(window.ANTDEX_IMPORT_CONFLICTS||[])],imports:[...(window.ANTDEX_IMPORT_LOG||[])]};
if(!window.ANTDEX_IMPORT_SELFTEST.ok||window.ANTDEX_IMPORT_SELFTEST.conflicts.length)console.warn('[AntDex selftest]',window.ANTDEX_IMPORT_SELFTEST);else console.info('[AntDex selftest]',window.ANTDEX_IMPORT_SELFTEST);
})();
