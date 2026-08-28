(() => {
  'use strict';

  // Curated typography personalities. They are intentionally separated by
  // both family AND visible typographic treatment so similar system fallbacks
  // still look meaningfully different.
  const profiles = [
    {name:'Editorial Serif', body:'Georgia, Cambria, Times New Roman, serif', heading:'Georgia, Cambria, Times New Roman, serif', mono:'Consolas, ui-monospace, monospace', weight:470, headingWeight:800, tracking:'-0.018em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Technical Terminal', body:'Courier New, Consolas, Monaco, monospace', heading:'Courier New, Consolas, Monaco, monospace', mono:'Courier New, Consolas, Monaco, monospace', weight:500, headingWeight:800, tracking:'0.055em', style:'normal', transform:'uppercase', variant:'normal', stretch:'normal'},
    {name:'Condensed Command', body:'Arial Narrow, Liberation Sans Narrow, Arial, sans-serif', heading:'Arial Narrow, Liberation Sans Narrow, Arial, sans-serif', mono:'Consolas, monospace', weight:700, headingWeight:900, tracking:'0.03em', style:'normal', transform:'uppercase', variant:'normal', stretch:'condensed'},
    {name:'Humanist Modern', body:'Trebuchet MS, Segoe UI, Arial, sans-serif', heading:'Trebuchet MS, Segoe UI, Arial, sans-serif', mono:'Consolas, monospace', weight:500, headingWeight:800, tracking:'0.008em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Classic Book', body:'Palatino Linotype, Book Antiqua, Palatino, Georgia, serif', heading:'Palatino Linotype, Book Antiqua, Palatino, Georgia, serif', mono:'Consolas, monospace', weight:480, headingWeight:760, tracking:'-0.012em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Display Impact', body:'Arial, Helvetica, sans-serif', heading:'Impact, Haettenschweiler, Arial Black, Arial, sans-serif', mono:'Consolas, monospace', weight:520, headingWeight:900, tracking:'0.018em', style:'normal', transform:'uppercase', variant:'normal', stretch:'condensed'},
    {name:'Elegant Italic', body:'Baskerville, Baskerville Old Face, Georgia, serif', heading:'Baskerville, Baskerville Old Face, Georgia, serif', mono:'Consolas, monospace', weight:470, headingWeight:760, tracking:'-0.01em', style:'italic', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Small Caps Academic', body:'Cambria, Georgia, serif', heading:'Cambria, Georgia, Times New Roman, serif', mono:'Consolas, monospace', weight:500, headingWeight:800, tracking:'0.035em', style:'normal', transform:'none', variant:'small-caps', stretch:'normal'},
    {name:'Clean Swiss', body:'Helvetica Neue, Helvetica, Arial, sans-serif', heading:'Helvetica Neue, Helvetica, Arial, sans-serif', mono:'Menlo, Consolas, monospace', weight:500, headingWeight:760, tracking:'0.028em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Digital Grotesk', body:'Verdana, Geneva, Tahoma, sans-serif', heading:'Verdana, Geneva, Tahoma, sans-serif', mono:'Lucida Console, Consolas, monospace', weight:500, headingWeight:800, tracking:'0.012em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Old Press', body:'Times New Roman, Times, Georgia, serif', heading:'Times New Roman, Times, Georgia, serif', mono:'Courier New, Consolas, monospace', weight:470, headingWeight:800, tracking:'0.025em', style:'normal', transform:'uppercase', variant:'normal', stretch:'normal'},
    {name:'Soft Contemporary', body:'Candara, Calibri, Segoe UI, sans-serif', heading:'Candara, Calibri, Segoe UI, sans-serif', mono:'Cascadia Mono, Consolas, monospace', weight:500, headingWeight:780, tracking:'-0.004em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Bookman Research', body:'Bookman Old Style, Bookman, Georgia, serif', heading:'Bookman Old Style, Bookman, Georgia, serif', mono:'Consolas, monospace', weight:500, headingWeight:780, tracking:'-0.008em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Neo Monospace', body:'Lucida Console, Monaco, Consolas, monospace', heading:'Lucida Console, Monaco, Consolas, monospace', mono:'Lucida Console, Monaco, Consolas, monospace', weight:500, headingWeight:800, tracking:'0.02em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
    {name:'Refined Slab', body:'Rockwell, Rockwell Nova, Courier New, serif', heading:'Rockwell, Rockwell Nova, Courier New, serif', mono:'Consolas, monospace', weight:500, headingWeight:800, tracking:'0.004em', style:'normal', transform:'none', variant:'normal', stretch:'normal'},
  ];

  // Shuffle-bag selection: no font repeats until the whole curated set is used.
  const storageKey='portfolio:font-bag-v2';
  let bag=[];
  try { bag=JSON.parse(localStorage.getItem(storageKey)||'[]'); } catch { bag=[]; }
  if(!Array.isArray(bag) || bag.length===0 || bag.some(i=>i<0||i>=profiles.length)) {
    bag=Array.from({length:profiles.length},(_,i)=>i);
    for(let i=bag.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[bag[i],bag[j]]=[bag[j],bag[i]];}
  }
  const index=bag.shift();
  localStorage.setItem(storageKey,JSON.stringify(bag));

  const profile=profiles[index];
  const root=document.documentElement;
  root.dataset.font=profile.name.toLowerCase().replace(/\s+/g,'-');
  root.style.setProperty('--theme-font-body',profile.body);
  root.style.setProperty('--theme-font-heading',profile.heading);
  root.style.setProperty('--theme-font-mono',profile.mono);
  root.style.setProperty('--theme-font-weight',String(profile.weight));
  root.style.setProperty('--theme-heading-weight',String(profile.headingWeight));
  root.style.setProperty('--theme-font-tracking',profile.tracking);
  root.style.setProperty('--theme-heading-style',profile.style);
  root.style.setProperty('--theme-heading-transform',profile.transform);
  root.style.setProperty('--theme-heading-variant',profile.variant);
  root.style.setProperty('--theme-font-stretch',profile.stretch);

  const style=document.createElement('style');
  style.id='curated-font-style';
  style.textContent=`
    html,body,.sidebar nav a,.summary,.intro-heading,.about-profile-title,.experience-card,.education-card,.arsenal-rebuild-card,.publication-summary,.contact-card,.beyond-card{font-family:var(--theme-font-body)!important;font-weight:var(--theme-font-weight)!important;letter-spacing:var(--theme-font-tracking)!important}
    h1,h2,h3,h4,.brand,.role,.about-heading,.experience-heading,.arsenal-rebuild-header h2,.education-header h2,.publication-heading,.beyond-header h2,.connect-header h2{font-family:var(--theme-font-heading)!important;font-weight:var(--theme-heading-weight)!important;font-style:var(--theme-heading-style)!important;font-variant:var(--theme-heading-variant)!important;font-stretch:var(--theme-font-stretch)!important;letter-spacing:var(--theme-font-tracking)!important;text-transform:var(--theme-heading-transform)!important}
    code,pre,kbd,.section-label,.education-kicker,.publication-kicker,.connect-kicker,.arsenal-rebuild-number,.experience-company,.career-start strong,.career-transition strong,.career-now strong,.sidebar footer,.cv-button,.socials a{font-family:var(--theme-font-mono)!important}
    .summary,.intro-heading{font-style:var(--theme-heading-style)!important}
  `;
  document.getElementById('curated-font-style')?.remove();
  document.head.appendChild(style);
  window.portfolioFont={index,...profile};
})();
