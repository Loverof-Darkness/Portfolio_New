(() => {
  'use strict';
  const profiles = [
    {name:'Executive Neo',body:'Segoe UI, Arial, Helvetica, sans-serif',heading:'Arial, Helvetica, sans-serif',mono:'Consolas, Monaco, ui-monospace, monospace',weight:520,headingWeight:900,tracking:'-0.01em',headingStyle:'normal'},
    {name:'Editorial Classic',body:'Georgia, Cambria, Times New Roman, serif',heading:'Georgia, Cambria, Times New Roman, serif',mono:'Consolas, ui-monospace, monospace',weight:470,headingWeight:800,tracking:'-0.02em',headingStyle:'normal'},
    {name:'Geometric Modern',body:'Century Gothic, Tw Cen MT, Trebuchet MS, sans-serif',heading:'Century Gothic, Tw Cen MT, Arial, sans-serif',mono:'Consolas, ui-monospace, monospace',weight:520,headingWeight:800,tracking:'0.015em',headingStyle:'normal'},
    {name:'Humanist Studio',body:'Trebuchet MS, Segoe UI, Arial, sans-serif',heading:'Trebuchet MS, Segoe UI, Arial, sans-serif',mono:'Consolas, ui-monospace, monospace',weight:500,headingWeight:800,tracking:'0',headingStyle:'normal'},
    {name:'Condensed Authority',body:'Arial Narrow, Liberation Sans Narrow, Arial, sans-serif',heading:'Arial Narrow, Liberation Sans Narrow, Arial, sans-serif',mono:'Consolas, ui-monospace, monospace',weight:650,headingWeight:900,tracking:'0.035em',headingStyle:'normal'},
    {name:'Technical Mono',body:'Consolas, Monaco, Courier New, monospace',heading:'Consolas, Monaco, Courier New, monospace',mono:'Consolas, Monaco, Courier New, monospace',weight:500,headingWeight:800,tracking:'0.018em',headingStyle:'normal'},
    {name:'Slab Research',body:'Rockwell, Roboto Slab, Courier New, serif',heading:'Rockwell, Roboto Slab, Courier New, serif',mono:'Consolas, ui-monospace, monospace',weight:500,headingWeight:800,tracking:'-0.012em',headingStyle:'normal'},
    {name:'Elegant Italic',body:'Baskerville, Baskerville Old Face, Georgia, serif',heading:'Baskerville, Baskerville Old Face, Georgia, serif',mono:'Consolas, ui-monospace, monospace',weight:470,headingWeight:760,tracking:'-0.012em',headingStyle:'italic'},
    {name:'Swiss Precision',body:'Helvetica Neue, Helvetica, Arial, sans-serif',heading:'Helvetica Neue, Helvetica, Arial, sans-serif',mono:'SFMono-Regular, Menlo, Consolas, monospace',weight:500,headingWeight:760,tracking:'0.022em',headingStyle:'normal'},
    {name:'Bookish Academic',body:'Palatino Linotype, Book Antiqua, Palatino, Georgia, serif',heading:'Palatino Linotype, Book Antiqua, Palatino, Georgia, serif',mono:'Consolas, ui-monospace, monospace',weight:480,headingWeight:750,tracking:'-0.01em',headingStyle:'normal'},
    {name:'Ultra Clean',body:'Verdana, Geneva, Tahoma, sans-serif',heading:'Verdana, Geneva, Tahoma, sans-serif',mono:'Consolas, ui-monospace, monospace',weight:500,headingWeight:800,tracking:'0',headingStyle:'normal'},
    {name:'Display Bold',body:'Arial, Helvetica, sans-serif',heading:'Arial Black, Impact, Arial, sans-serif',mono:'Consolas, ui-monospace, monospace',weight:520,headingWeight:900,tracking:'-0.025em',headingStyle:'normal'},
    {name:'Old World Press',body:'Times New Roman, Times, Georgia, serif',heading:'Times New Roman, Times, Georgia, serif',mono:'Courier New, Consolas, monospace',weight:480,headingWeight:800,tracking:'0.005em',headingStyle:'normal'},
    {name:'Digital Lab',body:'Lucida Sans, Lucida Grande, Tahoma, sans-serif',heading:'Lucida Sans, Lucida Grande, Tahoma, sans-serif',mono:'Lucida Console, Consolas, monospace',weight:500,headingWeight:780,tracking:'0.01em',headingStyle:'normal'},
    {name:'Soft Contemporary',body:'Calibri, Candara, Segoe UI, sans-serif',heading:'Calibri, Candara, Segoe UI, sans-serif',mono:'Cascadia Mono, Consolas, monospace',weight:500,headingWeight:780,tracking:'-0.005em',headingStyle:'normal'}
  ];
  const key='portfolio:curated-font-index';
  const previous=Number.parseInt(localStorage.getItem(key)||'-1',10);
  let index=Math.floor(Math.random()*profiles.length);
  if(profiles.length>1&&index===previous) index=(index+1+Math.floor(Math.random()*(profiles.length-1)))%profiles.length;
  localStorage.setItem(key,String(index));
  const profile=profiles[index];
  const root=document.documentElement;
  root.dataset.font=profile.name.toLowerCase().replace(/\s+/g,'-');
  root.style.setProperty('--theme-font-body',profile.body);
  root.style.setProperty('--theme-font-heading',profile.heading);
  root.style.setProperty('--theme-font-mono',profile.mono);
  root.style.setProperty('--theme-font-weight',String(profile.weight));
  root.style.setProperty('--theme-heading-weight',String(profile.headingWeight));
  root.style.setProperty('--theme-font-tracking',profile.tracking);
  root.style.setProperty('--theme-heading-style',profile.headingStyle);
  const style=document.createElement('style');
  style.id='curated-font-style';
  style.textContent=`html,body,body .sidebar nav a,body .summary,body .intro-heading,body .about-profile-title,body .experience-card,body .education-card,body .arsenal-rebuild-card,body .publication-summary,body .contact-card,body .beyond-card{font-family:var(--theme-font-body)!important;font-weight:var(--theme-font-weight)!important;letter-spacing:var(--theme-font-tracking)!important}h1,h2,h3,h4,.brand,.role,.about-heading,.experience-heading,.arsenal-rebuild-header h2,.education-header h2,.publication-heading,.beyond-header h2,.connect-header h2{font-family:var(--theme-font-heading)!important;font-weight:var(--theme-heading-weight)!important;font-style:var(--theme-heading-style)!important;letter-spacing:var(--theme-font-tracking)!important}code,pre,kbd,.section-label,.education-kicker,.publication-kicker,.connect-kicker,.arsenal-rebuild-number,.experience-company,.career-start strong,.career-transition strong,.career-now strong,.sidebar footer,.cv-button,.socials a{font-family:var(--theme-font-mono)!important}`;
  document.getElementById('curated-font-style')?.remove();
  document.head.appendChild(style);
  window.portfolioFont={index,...profile};
})();
