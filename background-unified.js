(()=>{'use strict';
const TOTAL=16,CORE=12,KEY='portfolio:background-unified-bag-v1';
let bag=[];try{bag=JSON.parse(localStorage.getItem(KEY)||'[]')}catch{bag=[]}
if(!Array.isArray(bag)||bag.length===0||bag.some(i=>!Number.isInteger(i)||i<0||i>=TOTAL)){bag=Array.from({length:TOTAL},(_,i)=>i);for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]]]}}
const chosen=bag.shift();localStorage.setItem(KEY,JSON.stringify(bag));
window.__PORTFOLIO_FORCED_MAIN_BACKGROUND=chosen<CORE?chosen:-1;
window.__PORTFOLIO_FORCED_EXTRA_BACKGROUND=chosen>=CORE?chosen-CORE:-1;
const script=document.createElement('script');
script.src=chosen<CORE?'./background-core.js?v=1':'./background-extras-core.js?v=1';
script.async=false;
script.dataset.backgroundChoice=String(chosen);
document.head.appendChild(script);
})();
