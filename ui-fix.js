(()=>{
const replacements=[
  [/正在读取 AntWiki \/ Wikipedia 的物种级正文；英文事实将尝试用 Google 翻译转成中文……/g,'正在整理公开资料…'],
  [/以下为物种级公开资料的短摘要。英文内容优先尝试 Google 机器翻译；机器翻译只改变语言，不改变证据等级。/g,'以下内容按物种级公开资料整理；外文来源会优先显示中文辅助译文，并保留原文入口。'],
  [/自动中文翻译/g,'机器翻译']
];
let scheduled=false;
function clean(){
  const box=document.querySelector('#sourceDetail');
  if(!box)return;
  const w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);
  const nodes=[];while(w.nextNode())nodes.push(w.currentNode);
  for(const n of nodes){
    const old=n.nodeValue;
    let t=old;
    for(const [a,b] of replacements)t=t.replace(a,b);
    if(t!==old)n.nodeValue=t;
  }
}
function scheduleClean(){
  if(scheduled)return;
  scheduled=true;
  requestAnimationFrame(()=>{scheduled=false;clean()});
}
const ob=new MutationObserver(scheduleClean);
ob.observe(document.documentElement,{subtree:true,childList:true});
document.addEventListener('DOMContentLoaded',scheduleClean);
setTimeout(scheduleClean,300);
setTimeout(scheduleClean,1200);
})();