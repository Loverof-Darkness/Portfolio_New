(() => {
  'use strict';

  const themes = [
    {name:'Deep Ocean',bg:'#05070A',surface:'#081019',surface2:'#0B1622',text:'#E6F7FF',muted:'#9FB2BF',primary:'#67E8F9',secondary:'#A78BFA',tertiary:'#F9A8D4',glow:.92,hue:0,radius:'10px',panelRadius:'10px',geometry:'tech'},
    {name:'Emerald Lab',bg:'#06110D',surface:'#091A15',surface2:'#0D211A',text:'#ECFFF6',muted:'#A5BDB4',primary:'#6EE7B7',secondary:'#5EEAD4',tertiary:'#A7F3D0',glow:.90,hue:12,radius:'14px',panelRadius:'14px',geometry:'soft'},
    {name:'Amber Protocol',bg:'#110A04',surface:'#1A1008',surface2:'#21150B',text:'#FFF8E7',muted:'#C7B79B',primary:'#FCD34D',secondary:'#FDBA74',tertiary:'#FCA5A5',glow:.88,hue:165,radius:'7px',panelRadius:'6px',geometry:'sharp'},
    {name:'Ultraviolet',bg:'#0C0714',surface:'#130B1E',surface2:'#1A1028',text:'#FAF7FF',muted:'#B9AFCB',primary:'#C4B5FD',secondary:'#A78BFA',tertiary:'#67E8F9',glow:.96,hue:225,radius:'18px',panelRadius:'16px',geometry:'soft'},
    {name:'Crimson Signal',bg:'#12070B',surface:'#1B0A11',surface2:'#24101A',text:'#FFF5F7',muted:'#C9ADB5',primary:'#FB7185',secondary:'#FDA4AF',tertiary:'#F9A8D4',glow:.86,hue:285,radius:'6px',panelRadius:'5px',geometry:'sharp'},
    {name:'Arctic Glass',bg:'#07101A',surface:'#0A1723',surface2:'#10202F',text:'#F3FAFF',muted:'#A7BAC9',primary:'#7DD3FC',secondary:'#93C5FD',tertiary:'#C4B5FD',glow:.84,hue:190,radius:'12px',panelRadius:'12px',geometry:'glass'},
    {name:'Toxic Lime',bg:'#100E04',surface:'#171607',surface2:'#1F1D09',text:'#FFFAE8',muted:'#C6C09D',primary:'#FDE047',secondary:'#BEF264',tertiary:'#67E8F9',glow:.90,hue:65,radius:'5px',panelRadius:'4px',geometry:'sharp'},
    {name:'Monochrome',bg:'#090909',surface:'#121212',surface2:'#191919',text:'#F5F5F5',muted:'#A7A7A7',primary:'#E5E7EB',secondary:'#94A3B8',tertiary:'#FFFFFF',glow:.62,hue:0,radius:'3px',panelRadius:'3px',geometry:'minimal'},
    {name:'Electric Blue',bg:'#080C12',surface:'#0C1520',surface2:'#11202F',text:'#F4F8FF',muted:'#A8B7C9',primary:'#60A5FA',secondary:'#22D3EE',tertiary:'#818CF8',glow:.90,hue:210,radius:'9px',panelRadius:'8px',geometry:'tech'},
    {name:'Plasma Orchid',bg:'#0B0910',surface:'#150D19',surface2:'#1D1225',text:'#FBF8FF',muted:'#BEB2C9',primary:'#E879F9',secondary:'#C084FC',tertiary:'#67E8F9',glow:.94,hue:275,radius:'13px',panelRadius:'11px',geometry:'soft'},
    {name:'Sapphire Lab',bg:'#06101A',surface:'#0A1724',surface2:'#0F2132',text:'#EFF8FF',muted:'#A5BACB',primary:'#38BDF8',secondary:'#818CF8',tertiary:'#22D3EE',glow:.93,hue:205,radius:'11px',panelRadius:'10px',geometry:'glass'},
    {name:'Jade Matrix',bg:'#04100C',surface:'#071A13',surface2:'#0B251B',text:'#F0FFF8',muted:'#A1C2B4',primary:'#34D399',secondary:'#2DD4BF',tertiary:'#A3E635',glow:.91,hue:145,radius:'15px',panelRadius:'13px',geometry:'soft'},
    {name:'Neon Tangerine',bg:'#120804',surface:'#1D0E07',surface2:'#29160B',text:'#FFF7EF',muted:'#C9B09A',primary:'#FB923C',secondary:'#FBBF24',tertiary:'#F472B6',glow:.90,hue:25,radius:'8px',panelRadius:'7px',geometry:'sharp'},
    {name:'Ruby Noir',bg:'#100508',surface:'#19090E',surface2:'#241018',text:'#FFF3F6',muted:'#C7A8B1',primary:'#F43F5E',secondary:'#E11D48',tertiary:'#FB7185',glow:.88,hue:335,radius:'7px',panelRadius:'6px',geometry:'sharp'},
    {name:'Aqua Mint',bg:'#031012',surface:'#061A1C',surface2:'#092528',text:'#EDFFFF',muted:'#A1C6C8',primary:'#2DD4BF',secondary:'#67E8F9',tertiary:'#A7F3D0',glow:.93,hue:175,radius:'16px',panelRadius:'15px',geometry:'glass'},
    {name:'Royal Indigo',bg:'#08071A',surface:'#100D25',surface2:'#17133A',text:'#F5F2FF',muted:'#B7B0D1',primary:'#818CF8',secondary:'#A78BFA',tertiary:'#C4B5FD',glow:.96,hue:250,radius:'17px',panelRadius:'15px',geometry:'soft'},
    {name:'Laser Magenta',bg:'#10050F',surface:'#1A0818',surface2:'#250C24',text:'#FFF1FC',muted:'#C6AAC0',primary:'#F472B6',secondary:'#E879F9',tertiary:'#C084FC',glow:.94,hue:320,radius:'12px',panelRadius:'11px',geometry:'tech'},
    {name:'Carbon Cyan',bg:'#05090C',surface:'#0A1116',surface2:'#0F1A21',text:'#F0FAFF',muted:'#9FB6C3',primary:'#22D3EE',secondary:'#06B6D4',tertiary:'#67E8F9',glow:.89,hue:185,radius:'4px',panelRadius:'4px',geometry:'minimal'},
    {name:'Copper Tech',bg:'#100905',surface:'#1A1009',surface2:'#24170D',text:'#FFF9F0',muted:'#C8B49B',primary:'#FB923C',secondary:'#F59E0B',tertiary:'#FCD34D',glow:.87,hue:15,radius:'6px',panelRadius:'5px',geometry:'tech'},
    {name:'Platinum Pulse',bg:'#080A0C',surface:'#101417',surface2:'#171C21',text:'#F7FAFC',muted:'#AEBBC6',primary:'#CBD5E1',secondary:'#67E8F9',tertiary:'#A78BFA',glow:.76,hue:0,radius:'5px',panelRadius:'5px',geometry:'minimal'},
  ];

  const fontProfiles = [
    {name:'Executive Sans',body:'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif',heading:'Inter, Segoe UI, Helvetica Neue, Arial, sans-serif',mono:'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',weight:520,headingWeight:860,tracking:'0'},
    {name:'Modern Geometric',body:'Avenir Next, Avenir, Montserrat, Segoe UI, sans-serif',heading:'Avenir Next, Avenir, Montserrat, Segoe UI, sans-serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace',weight:520,headingWeight:820,tracking:'-0.01em'},
    {name:'Humanist Professional',body:'Source Sans 3, Source Sans Pro, Segoe UI, Arial, sans-serif',heading:'Source Sans 3, Source Sans Pro, Segoe UI, Arial, sans-serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace',weight:520,headingWeight:800,tracking:'0'},
    {name:'Research Editorial',body:'Charter, Georgia, Times New Roman, serif',heading:'Cambria, Georgia, Times New Roman, serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace',weight:500,headingWeight:760,tracking:'-0.015em'},
    {name:'Technical Grotesk',body:'Arial, Helvetica Neue, Helvetica, sans-serif',heading:'Arial, Helvetica Neue, Helvetica, sans-serif',mono:'Consolas, Monaco, ui-monospace, monospace',weight:520,headingWeight:850,tracking:'0.005em'},
    {name:'Swiss Lab',body:'Helvetica Neue, Helvetica, Arial, sans-serif',heading:'Helvetica Neue, Helvetica, Arial, sans-serif',mono:'SFMono-Regular, Menlo, Consolas, monospace',weight:500,headingWeight:780,tracking:'0.015em'},
    {name:'Humanist UI',body:'Gill Sans, Gill Sans MT, Trebuchet MS, Segoe UI, sans-serif',heading:'Gill Sans, Gill Sans MT, Trebuchet MS, Segoe UI, sans-serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace',weight:500,headingWeight:780,tracking:'0'},
    {name:'Classic Academic',body:'Cambria, Georgia, Times New Roman, serif',heading:'Cambria, Georgia, Times New Roman, serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace',weight:500,headingWeight:800,tracking:'-0.01em'},
    {name:'Engineering Mono',body:'IBM Plex Sans, Segoe UI, Arial, sans-serif',heading:'IBM Plex Sans, Segoe UI, Arial, sans-serif',mono:'IBM Plex Mono, SFMono-Regular, Consolas, monospace',weight:500,headingWeight:820,tracking:'0.008em'},
    {name:'Clean Corporate',body:'Segoe UI, Frutiger, Arial, sans-serif',heading:'Segoe UI, Frutiger, Arial, sans-serif',mono:'Cascadia Mono, Consolas, ui-monospace, monospace',weight:520,headingWeight:780,tracking:'0'},
    {name:'Journal Minimal',body:'Palatino Linotype, Book Antiqua, Palatino, Georgia, serif',heading:'Palatino Linotype, Book Antiqua, Palatino, Georgia, serif',mono:'ui-monospace, SFMono-Regular, Consolas, monospace',weight:500,headingWeight:760,tracking:'-0.01em'},
    {name:'Precision UI',body:'Roboto, Arial, Helvetica, sans-serif',heading:'Roboto, Arial, Helvetica, sans-serif',mono:'Roboto Mono, Consolas, ui-monospace, monospace',weight:500,headingWeight:800,tracking:'0.005em'},
  ];

  const storageKey='portfolio:last-theme-index';
  const fontStorageKey='portfolio:last-font-index';
  const previous=Number.parseInt(localStorage.getItem(storageKey)||'-1',10);
  const previousFont=Number.parseInt(localStorage.getItem(fontStorageKey)||'-1',10);
  let index=Math.floor(Math.random()*themes.length);
  let fontIndex=Math.floor(Math.random()*fontProfiles.length);
  if(themes.length>1&&index===previous) index=(index+1+Math.floor(Math.random()*(themes.length-1)))%themes.length;
  if(fontProfiles.length>1&&fontIndex===previousFont) fontIndex=(fontIndex+1+Math.floor(Math.random()*(fontProfiles.length-1)))%fontProfiles.length;
  localStorage.setItem(storageKey,String(index));
  localStorage.setItem(fontStorageKey,String(fontIndex));

  const theme=themes[index];
  const font=fontProfiles[fontIndex];
  const root=document.documentElement;
  root.dataset.theme=theme.name.toLowerCase().replace(/\s+/g,'-');
  root.dataset.geometry=theme.geometry;
  root.dataset.font=font.name.toLowerCase().replace(/\s+/g,'-');

  const vars={
    '--theme-bg':theme.bg,'--theme-surface':theme.surface,'--theme-surface-2':theme.surface2,
    '--theme-text':theme.text,'--theme-muted':theme.muted,'--theme-primary':theme.primary,
    '--theme-secondary':theme.secondary,'--theme-tertiary':theme.tertiary,'--theme-glow':String(theme.glow),
    '--theme-radius':theme.radius,'--theme-panel-radius':theme.panelRadius,'--theme-hue':`${theme.hue}deg`,
    '--theme-font-body':font.body,'--theme-font-heading':font.heading,'--theme-font-mono':font.mono,
    '--theme-font-weight':String(font.weight),'--theme-heading-weight':String(font.headingWeight),'--theme-font-tracking':font.tracking,
    '--black':theme.bg,'--white':theme.text,'--muted':theme.muted,'--cyan':theme.primary,'--violet':theme.secondary,
    '--pink':theme.tertiary,'--surface-0':theme.bg,'--surface-1':theme.surface,'--surface-2':theme.surface2,'--surface-3':theme.surface2,
    '--text':theme.text,'--text-soft':theme.text,'--text-muted':theme.muted
  };
  Object.entries(vars).forEach(([name,value])=>root.style.setProperty(name,value));

  const style=document.createElement('style');
  style.id='dynamic-theme-style';
  style.textContent=`
:root{--theme-border:color-mix(in srgb,var(--theme-primary) 58%,transparent);--theme-border-soft:color-mix(in srgb,var(--theme-primary) 30%,transparent);--theme-border-faint:color-mix(in srgb,var(--theme-primary) 16%,transparent);--theme-shadow:color-mix(in srgb,var(--theme-primary) 10%,transparent)}
html,body{background:var(--theme-bg)!important;color:var(--theme-text)!important}
body{--cyan:var(--theme-primary)!important;--violet:var(--theme-secondary)!important;--pink:var(--theme-tertiary)!important;font-family:var(--theme-font-body)!important;font-weight:var(--theme-font-weight)!important;letter-spacing:var(--theme-font-tracking)!important;background:radial-gradient(circle at 76% 15%,color-mix(in srgb,var(--theme-secondary) 5%,transparent),transparent 34%),radial-gradient(circle at 20% 86%,color-mix(in srgb,var(--theme-primary) 4%,transparent),transparent 32%),var(--theme-bg)!important}
h1,h2,h3,h4,.brand,.role,.about-heading,.experience-heading,.arsenal-rebuild-header h2,.education-header h2,.publication-heading,.beyond-header h2,.connect-header h2{font-family:var(--theme-font-heading)!important;font-weight:var(--theme-heading-weight)!important;letter-spacing:var(--theme-font-tracking)!important}
code,pre,kbd,.section-label,.education-kicker,.publication-kicker,.connect-kicker,.arsenal-rebuild-number,.experience-company,.career-start strong,.career-transition strong,.career-now strong,.sidebar footer,.cv-button,.socials a{font-family:var(--theme-font-mono)!important}
.sidebar nav a,.summary,.intro-heading,.about-profile-title,.experience-card,.education-card,.arsenal-rebuild-card,.publication-summary,.contact-card,.beyond-card{font-family:var(--theme-font-body)!important}
#molecule-bg{background:var(--theme-bg)!important;filter:hue-rotate(var(--theme-hue)) saturate(calc(.75 + var(--theme-glow)*.35)) brightness(calc(.88 + var(--theme-glow)*.12));opacity:.9!important}
.bg-vignette{opacity:calc(.72 + var(--theme-glow)*.16)!important;background:linear-gradient(90deg,color-mix(in srgb,var(--theme-bg) 82%,transparent),transparent 44%),radial-gradient(circle at 72% 38%,transparent 0 22%,color-mix(in srgb,var(--theme-bg) 34%,transparent) 58%,color-mix(in srgb,var(--theme-bg) 90%,transparent) 100%)!important}
.sidebar{background:color-mix(in srgb,var(--theme-surface) 92%,transparent)!important;border-right-color:var(--theme-border-soft)!important;box-shadow:18px 0 50px color-mix(in srgb,var(--theme-primary) 5%,#000)!important}
.brand-mark,h1 strong,.role,.about-heading,.experience-heading,.arsenal-rebuild-header h2,.education-header h2,.publication-heading,.beyond-header h2,.connect-header h2{background-image:linear-gradient(100deg,#fff 0%,var(--theme-primary) 48%,var(--theme-secondary) 100%)!important}
.sidebar nav a,.sidebar nav a svg,.socials a{color:var(--theme-muted)!important}
.sidebar nav a:hover,.sidebar nav a.active{color:var(--theme-text)!important;border-color:var(--theme-border)!important;background:linear-gradient(90deg,color-mix(in srgb,var(--theme-primary) 14%,transparent),transparent)!important;box-shadow:inset 3px 0 var(--theme-primary),0 0 22px var(--theme-shadow)!important}
.sidebar nav a:hover svg,.sidebar nav a.active svg,.socials a:hover{color:var(--theme-primary)!important;border-color:var(--theme-border)!important;filter:drop-shadow(0 0 7px color-mix(in srgb,var(--theme-primary) 34%,transparent))}
.cv-button,.text-link,.publication-button,.socials a{border-color:var(--theme-border)!important;color:var(--theme-primary)!important;background:color-mix(in srgb,var(--theme-primary) 4%,transparent)!important;border-radius:var(--theme-radius)!important}
.cv-button:hover,.text-link:hover,.publication-button:hover,.socials a:hover{background:color-mix(in srgb,var(--theme-primary) 11%,transparent)!important;box-shadow:0 0 28px color-mix(in srgb,var(--theme-primary) 16%,transparent)!important}
.metrics,.overview,.about-profile-card,.experience-card,.education-card,.arsenal-rebuild-card,.publication-info-row>div,.contact-card,.beyond-card,.lab-card,.instrument-visual,.publication-book-cover{border-color:var(--theme-border-soft)!important;border-radius:var(--theme-panel-radius)!important;background-color:color-mix(in srgb,var(--theme-surface) 88%,transparent)!important;box-shadow:inset 0 0 28px color-mix(in srgb,var(--theme-primary) 3%,transparent),0 0 25px color-mix(in srgb,var(--theme-primary) calc(7%*var(--theme-glow)),transparent)!important}
.about-profile-card::before{border-color:var(--theme-border-faint)!important}.about-profile-label,.section-label,.education-kicker,.publication-kicker,.connect-kicker,.arsenal-rebuild-number,.experience-company,.publication-journal{color:var(--theme-primary)!important}.about-profile-title span{color:var(--theme-primary)!important}
.role{background:none!important;background-image:none!important;background-color:transparent!important;-webkit-background-clip:initial!important;background-clip:initial!important;-webkit-text-fill-color:var(--theme-text)!important;color:var(--theme-text)!important;text-shadow:0 0 18px color-mix(in srgb,var(--theme-primary) 18%,transparent)!important}.role::before,.role::after{display:none!important;content:none!important}
.hero-copy::before,.kicker span{color:var(--theme-primary)!important}
.typing-caret,.instrument-base,.skill i,.career-track-progress,.rail-progress{background:linear-gradient(90deg,var(--theme-primary),var(--theme-secondary),var(--theme-tertiary))!important;box-shadow:0 0 14px color-mix(in srgb,var(--theme-primary) 48%,transparent)!important}
.typing-line.is-typing span,.intro-heading.is-typing strong{background-image:linear-gradient(90deg,var(--theme-text) 0%,var(--theme-primary) 55%,var(--theme-secondary) 100%)!important}
.portrait-glow{background:radial-gradient(circle,color-mix(in srgb,var(--theme-primary) 18%,transparent),color-mix(in srgb,var(--theme-secondary) 11%,transparent) 40%,transparent 72%)!important}.portrait-wrap::before{border-color:var(--theme-border-faint)!important;background:radial-gradient(circle at 50% 32%,color-mix(in srgb,var(--theme-primary) 10%,transparent),transparent 48%),linear-gradient(160deg,color-mix(in srgb,var(--theme-surface-2) 55%,transparent),color-mix(in srgb,var(--theme-bg) 32%,transparent))!important}
.experience-card.current,.experience-card.previous{border-color:var(--theme-border)!important}.career-track-line{background:var(--theme-border-faint)!important}.career-start .career-dot,.career-transition .career-dot,.career-now .career-dot{background:var(--theme-primary)!important;border-color:var(--theme-text)!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--theme-primary) 10%,transparent),0 0 18px color-mix(in srgb,var(--theme-primary) 68%,transparent)!important}
.education-card{--accent:var(--theme-primary)!important}.education-card:nth-child(even){--accent:var(--theme-secondary)!important}.education-badge,.education-number,.education-action{color:var(--accent)!important;border-color:var(--accent)!important}
.arsenal-rebuild-card:hover{border-color:var(--theme-primary)!important;background:linear-gradient(145deg,color-mix(in srgb,var(--theme-primary) 7%,var(--theme-surface)),color-mix(in srgb,var(--theme-secondary) 5%,var(--theme-bg)))!important}.arsenal-rebuild-card p{color:var(--theme-primary)!important}
.publication-meta-pill{border-color:var(--theme-border)!important;color:var(--theme-primary)!important}.publication-button.primary{border-color:var(--theme-primary)!important;color:var(--theme-primary)!important}.publication-button.secondary{border-color:var(--theme-secondary)!important;color:var(--theme-secondary)!important}.publication-book-cover{background:linear-gradient(160deg,color-mix(in srgb,var(--theme-primary) 12%,var(--theme-surface)),color-mix(in srgb,var(--theme-bg) 78%,#07111c) 58%,color-mix(in srgb,var(--theme-secondary) 12%,var(--theme-bg)))!important}.publication-platform{border-color:var(--theme-border-soft)!important;background:radial-gradient(ellipse at center,color-mix(in srgb,var(--theme-primary) 24%,transparent),color-mix(in srgb,var(--theme-secondary) 16%,transparent) 45%,transparent 72%)!important}
[data-geometry=tech] .about-profile-card,[data-geometry=tech] .experience-card,[data-geometry=tech] .arsenal-rebuild-card{clip-path:polygon(0 0,98.8% 0,100% 10%,100% 90%,98.8% 100%,0 100%,1.2% 90%,1.2% 10%)!important}
[data-geometry=soft] .about-profile-card,[data-geometry=soft] .experience-card,[data-geometry=soft] .arsenal-rebuild-card{clip-path:none!important;border-radius:var(--theme-panel-radius)!important}
[data-geometry=sharp] .about-profile-card,[data-geometry=sharp] .experience-card,[data-geometry=sharp] .arsenal-rebuild-card{clip-path:polygon(0 0,98.7% 0,100% 12%,100% 88%,98.7% 100%,0 100%,1.3% 88%,1.3% 12%)!important;border-radius:var(--theme-panel-radius)!important}
[data-geometry=glass] .about-profile-card,[data-geometry=glass] .experience-card,[data-geometry=glass] .arsenal-rebuild-card,[data-geometry=glass] .education-card{backdrop-filter:blur(20px) saturate(130%)!important;-webkit-backdrop-filter:blur(20px) saturate(130%)!important;border-radius:var(--theme-panel-radius)!important}
[data-geometry=minimal] .about-profile-card,[data-geometry=minimal] .experience-card,[data-geometry=minimal] .arsenal-rebuild-card,[data-geometry=minimal] .education-card{backdrop-filter:blur(6px)!important;-webkit-backdrop-filter:blur(6px)!important;box-shadow:inset 0 0 18px color-mix(in srgb,var(--theme-primary) 2%,transparent)!important}
@media(prefers-reduced-motion:reduce){#molecule-bg{filter:none!important}}
  `;
  document.head.appendChild(style);

  window.portfolioTheme=Object.freeze({...theme,index,font,fontIndex});
})();