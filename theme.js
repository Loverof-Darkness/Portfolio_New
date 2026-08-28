(() => {
  'use strict';

  /*
   * Dynamic theme engine
   * - Every page load/reload gets a different visual theme.
   * - Accent colors are intentionally separated from body text colors so
   *   vibrant themes remain easy to read.
   * - Dark backgrounds preserve the portfolio's scientific / cinematic feel.
   */
  const themes = [
    {name:'Deep Ocean',bg:'#03070B',surface:'#07111A',surface2:'#0B1722',text:'#F8FDFF',soft:'#E6F7FF',muted:'#AFC3CF',primary:'#22D3EE',secondary:'#60A5FA',tertiary:'#A78BFA',glow:.92,hue:0,radius:'10px',panelRadius:'10px',geometry:'tech'},
    {name:'Emerald Lab',bg:'#03100A',surface:'#071A12',surface2:'#0C251A',text:'#F4FFF9',soft:'#E1FFF1',muted:'#B2CEC0',primary:'#34D399',secondary:'#2DD4BF',tertiary:'#A7F3D0',glow:.92,hue:8,radius:'14px',panelRadius:'14px',geometry:'soft'},
    {name:'Amber Protocol',bg:'#100702',surface:'#1A0E05',surface2:'#241407',text:'#FFFDF5',soft:'#FFF4D6',muted:'#D0BE9B',primary:'#FBBF24',secondary:'#FB923C',tertiary:'#FB7185',glow:.90,hue:165,radius:'7px',panelRadius:'6px',geometry:'sharp'},
    {name:'Ultraviolet',bg:'#090313',surface:'#12071D',surface2:'#1A0C27',text:'#FCFAFF',soft:'#F1E9FF',muted:'#C7B8D8',primary:'#A78BFA',secondary:'#C084FC',tertiary:'#22D3EE',glow:.98,hue:225,radius:'18px',panelRadius:'16px',geometry:'soft'},
    {name:'Crimson Signal',bg:'#100307',surface:'#19060D',surface2:'#240B14',text:'#FFF9FA',soft:'#FFE4EA',muted:'#D3AFB8',primary:'#FB7185',secondary:'#F43F5E',tertiary:'#F9A8D4',glow:.90,hue:285,radius:'6px',panelRadius:'5px',geometry:'sharp'},
    {name:'Arctic Glass',bg:'#04101A',surface:'#081722',surface2:'#0E2130',text:'#F8FCFF',soft:'#E8F7FF',muted:'#B3C8D8',primary:'#38BDF8',secondary:'#818CF8',tertiary:'#C4B5FD',glow:.88,hue:190,radius:'12px',panelRadius:'12px',geometry:'glass'},
    {name:'Toxic Lime',bg:'#0A0B02',surface:'#141506',surface2:'#1C1C08',text:'#FEFFF4',soft:'#F3FFD1',muted:'#CBD09F',primary:'#A3E635',secondary:'#FDE047',tertiary:'#67E8F9',glow:.94,hue:65,radius:'5px',panelRadius:'4px',geometry:'sharp'},
    {name:'Monochrome',bg:'#050505',surface:'#0D0D0D',surface2:'#151515',text:'#FFFFFF',soft:'#F1F5F9',muted:'#B8C0C9',primary:'#F8FAFC',secondary:'#CBD5E1',tertiary:'#FFFFFF',glow:.64,hue:0,radius:'3px',panelRadius:'3px',geometry:'minimal'},
    {name:'Electric Blue',bg:'#030811',surface:'#071321',surface2:'#0C1D2D',text:'#F8FBFF',soft:'#E8F4FF',muted:'#AEC1D5',primary:'#3B82F6',secondary:'#06B6D4',tertiary:'#8B5CF6',glow:.94,hue:210,radius:'9px',panelRadius:'8px',geometry:'tech'},
    {name:'Plasma Orchid',bg:'#09040E',surface:'#14091A',surface2:'#1D0E26',text:'#FFFAFF',soft:'#F8E8FF',muted:'#CBB8D2',primary:'#E879F9',secondary:'#C084FC',tertiary:'#67E8F9',glow:.98,hue:275,radius:'13px',panelRadius:'11px',geometry:'soft'},
    {name:'Solar Flare',bg:'#0D0601',surface:'#1A0C03',surface2:'#281207',text:'#FFFDF7',soft:'#FFF1C7',muted:'#D2B894',primary:'#F97316',secondary:'#FACC15',tertiary:'#FB7185',glow:.95,hue:28,radius:'8px',panelRadius:'7px',geometry:'sharp'},
    {name:'Ruby Laser',bg:'#0D0204',surface:'#19050A',surface2:'#25080F',text:'#FFF9FA',soft:'#FFE3E8',muted:'#D3AEB6',primary:'#F43F5E',secondary:'#FB7185',tertiary:'#F59E0B',glow:.98,hue:345,radius:'8px',panelRadius:'6px',geometry:'tech'},
    {name:'Cyan Reactor',bg:'#011013',surface:'#031A1D',surface2:'#05262A',text:'#F4FFFF',soft:'#D9FEFF',muted:'#A8CFD2',primary:'#06F0FF',secondary:'#14B8A6',tertiary:'#84CC16',glow:1.04,hue:180,radius:'11px',panelRadius:'9px',geometry:'tech'},
    {name:'Magenta Void',bg:'#0A0310',surface:'#17071C',surface2:'#220A29',text:'#FFF9FF',soft:'#FBE7FF',muted:'#CBB2D0',primary:'#EC4899',secondary:'#D946EF',tertiary:'#818CF8',glow:1.02,hue:300,radius:'16px',panelRadius:'14px',geometry:'soft'},
    {name:'Royal Sapphire',bg:'#020610',surface:'#071126',surface2:'#0B1834',text:'#F7FAFF',soft:'#E7EEFF',muted:'#AEBBCE',primary:'#6366F1',secondary:'#3B82F6',tertiary:'#22D3EE',glow:.98,hue:235,radius:'10px',panelRadius:'8px',geometry:'glass'},
    {name:'Neon Mint',bg:'#02100C',surface:'#061A14',surface2:'#09261D',text:'#F5FFFB',soft:'#DEFFF1',muted:'#A9CBBE',primary:'#2DD4BF',secondary:'#22C55E',tertiary:'#A3E635',glow:.96,hue:155,radius:'15px',panelRadius:'13px',geometry:'soft'},
    {name:'Hyper Gold',bg:'#090700',surface:'#171100',surface2:'#241900',text:'#FFFDF5',soft:'#FFF2BD',muted:'#D0BD86',primary:'#FACC15',secondary:'#F59E0B',tertiary:'#22D3EE',glow:.96,hue:52,radius:'5px',panelRadius:'4px',geometry:'sharp'},
    {name:'Blue Magma',bg:'#07050A',surface:'#11101B',surface2:'#1B1628',text:'#FAFBFF',soft:'#EDE9FE',muted:'#BBB8CB',primary:'#38BDF8',secondary:'#F43F5E',tertiary:'#F59E0B',glow:1.0,hue:330,radius:'10px',panelRadius:'8px',geometry:'tech'},
    {name:'Jade Aurora',bg:'#03100F',surface:'#071A18',surface2:'#0B2521',text:'#F4FFFE',soft:'#DFFFFA',muted:'#A8C7C2',primary:'#10B981',secondary:'#06B6D4',tertiary:'#8B5CF6',glow:.95,hue:145,radius:'13px',panelRadius:'11px',geometry:'glass'},
    {name:'Solar Cyan',bg:'#071016',surface:'#0B1720',surface2:'#10242E',text:'#FCFEFF',soft:'#E7FBFF',muted:'#B4C8D0',primary:'#22D3EE',secondary:'#F59E0B',tertiary:'#F97316',glow:1.0,hue:195,radius:'8px',panelRadius:'7px',geometry:'sharp'},
  ];

  const storageKey = 'portfolio:last-theme-index';
  const previous = Number.parseInt(localStorage.getItem(storageKey) || '-1', 10);
  let index = Math.floor(Math.random() * themes.length);
  if (themes.length > 1 && index === previous) {
    index = (index + 1 + Math.floor(Math.random() * (themes.length - 1))) % themes.length;
  }
  localStorage.setItem(storageKey, String(index));

  const theme = themes[index];
  const root = document.documentElement;
  root.dataset.theme = theme.name.toLowerCase().replace(/\s+/g, '-');
  root.dataset.geometry = theme.geometry;

  const vars = {
    '--theme-bg': theme.bg,
    '--theme-surface': theme.surface,
    '--theme-surface-2': theme.surface2,
    '--theme-text': theme.text,
    '--theme-text-soft': theme.soft,
    '--theme-muted': theme.muted,
    '--theme-primary': theme.primary,
    '--theme-secondary': theme.secondary,
    '--theme-tertiary': theme.tertiary,
    '--theme-glow': String(theme.glow),
    '--theme-radius': theme.radius,
    '--theme-panel-radius': theme.panelRadius,
    '--theme-hue': `${theme.hue}deg`,
    '--black': theme.bg,
    '--white': theme.text,
    '--muted': theme.muted,
    '--cyan': theme.primary,
    '--violet': theme.secondary,
    '--pink': theme.tertiary,
    '--surface-0': theme.bg,
    '--surface-1': theme.surface,
    '--surface-2': theme.surface2,
    '--surface-3': theme.surface2,
    '--text': theme.text,
    '--text-soft': theme.soft,
    '--text-muted': theme.muted,
  };
  Object.entries(vars).forEach(([name, value]) => root.style.setProperty(name, value));

  const style = document.createElement('style');
  style.id = 'dynamic-theme-style';
  style.textContent = `
:root{
  --theme-border:color-mix(in srgb,var(--theme-primary) 58%,transparent);
  --theme-border-soft:color-mix(in srgb,var(--theme-primary) 32%,transparent);
  --theme-border-faint:color-mix(in srgb,var(--theme-primary) 18%,transparent);
  --theme-shadow:color-mix(in srgb,var(--theme-primary) 12%,transparent);
  --theme-panel:color-mix(in srgb,var(--theme-surface) 90%,transparent);
}

html,body{background:var(--theme-bg)!important;color:var(--theme-text)!important}
body{
  --cyan:var(--theme-primary)!important;
  --violet:var(--theme-secondary)!important;
  --pink:var(--theme-tertiary)!important;
  background:
    radial-gradient(circle at 76% 15%,color-mix(in srgb,var(--theme-secondary) 6%,transparent),transparent 34%),
    radial-gradient(circle at 20% 86%,color-mix(in srgb,var(--theme-primary) 5%,transparent),transparent 32%),
    var(--theme-bg)!important;
}

/* High contrast text system: accent colors are decorative, not the main copy color. */
body,p,li,small,time,label,input,textarea,.summary .typing-line,.experience-subtitle,.publication-summary,.arsenal-rebuild-intro,.education-header p{
  color:var(--theme-text-soft)!important;
}
body h1,body h2,body h3,body h4,body h5,body h6,.intro-heading,.summary,.experience-card h3,.publication-title,.education-degree,.education-institution,.arsenal-rebuild-card h3{
  color:var(--theme-text)!important;
}

#molecule-bg{background:var(--theme-bg)!important;filter:hue-rotate(var(--theme-hue)) saturate(calc(.9 + var(--theme-glow)*.4)) brightness(calc(.92 + var(--theme-glow)*.08));opacity:.92!important}
.bg-vignette{opacity:calc(.70 + var(--theme-glow)*.16)!important;background:linear-gradient(90deg,color-mix(in srgb,var(--theme-bg) 84%,transparent),transparent 44%),radial-gradient(circle at 72% 38%,transparent 0 22%,color-mix(in srgb,var(--theme-bg) 30%,transparent) 58%,color-mix(in srgb,var(--theme-bg) 92%,transparent) 100%)!important}

.sidebar{background:color-mix(in srgb,var(--theme-surface) 94%,transparent)!important;border-right-color:var(--theme-border-soft)!important;box-shadow:18px 0 50px color-mix(in srgb,var(--theme-primary) 6%,#000)!important}
.brand-mark,h1 strong,.about-heading,.experience-heading,.arsenal-rebuild-header h2,.education-header h2,.publication-heading,.beyond-header h2,.connect-header h2{
  background-image:linear-gradient(100deg,#FFFFFF 0%,var(--theme-primary) 48%,var(--theme-secondary) 100%)!important;
}

.role{
  background:none!important;
  background-image:none!important;
  background-color:transparent!important;
  -webkit-background-clip:initial!important;
  background-clip:initial!important;
  -webkit-text-fill-color:var(--theme-text)!important;
  color:var(--theme-text)!important;
  text-shadow:0 0 18px color-mix(in srgb,var(--theme-primary) 20%,transparent)!important;
}
.role::before,.role::after{display:none!important;content:none!important}

.sidebar nav a,.sidebar nav a svg,.socials a{color:var(--theme-muted)!important}
.sidebar nav a:hover,.sidebar nav a.active{
  color:#FFFFFF!important;
  border-color:var(--theme-border)!important;
  background:linear-gradient(90deg,color-mix(in srgb,var(--theme-primary) 15%,transparent),color-mix(in srgb,var(--theme-secondary) 4%,transparent))!important;
  box-shadow:inset 3px 0 var(--theme-primary),0 0 24px var(--theme-shadow)!important;
}
.sidebar nav a:hover svg,.sidebar nav a.active svg,.socials a:hover{color:var(--theme-primary)!important;border-color:var(--theme-border)!important}

.cv-button,.text-link,.publication-button,.socials a{
  border-color:var(--theme-border)!important;
  color:var(--theme-primary)!important;
  background:color-mix(in srgb,var(--theme-primary) 5%,transparent)!important;
  border-radius:var(--theme-radius)!important;
}
.cv-button:hover,.text-link:hover,.publication-button:hover,.socials a:hover{background:color-mix(in srgb,var(--theme-primary) 12%,transparent)!important;box-shadow:0 0 30px color-mix(in srgb,var(--theme-primary) 18%,transparent)!important}

.metrics,.overview,.about-profile-card,.experience-card,.education-card,.arsenal-rebuild-card,.publication-info-row>div,.contact-card,.beyond-card,.lab-card,.instrument-visual,.publication-book-cover{
  border-color:var(--theme-border-soft)!important;
  border-radius:var(--theme-panel-radius)!important;
  background-color:var(--theme-panel)!important;
  box-shadow:inset 0 0 28px color-mix(in srgb,var(--theme-primary) 3%,transparent),0 0 25px color-mix(in srgb,var(--theme-primary) calc(8%*var(--theme-glow)),transparent)!important;
}

.about-profile-card::before{border-color:var(--theme-border-faint)!important}
.about-profile-label,.section-label,.education-kicker,.publication-kicker,.connect-kicker,.arsenal-rebuild-number,.experience-company,.publication-journal{color:var(--theme-primary)!important}
.about-profile-title span{color:var(--theme-primary)!important}

.hero-copy::before,.kicker span{color:var(--theme-primary)!important}
.typing-caret,.instrument-base,.skill i,.career-track-progress,.rail-progress{background:linear-gradient(90deg,var(--theme-primary),var(--theme-secondary),var(--theme-tertiary))!important;box-shadow:0 0 14px color-mix(in srgb,var(--theme-primary) 48%,transparent)!important}
.typing-line.is-typing span,.intro-heading.is-typing strong{background-image:linear-gradient(90deg,var(--theme-text) 0%,var(--theme-primary) 55%,var(--theme-secondary) 100%)!important}

.portrait-glow{background:radial-gradient(circle,color-mix(in srgb,var(--theme-primary) 19%,transparent),color-mix(in srgb,var(--theme-secondary) 12%,transparent) 40%,transparent 72%)!important}
.portrait-wrap::before{border-color:var(--theme-border-faint)!important;background:radial-gradient(circle at 50% 32%,color-mix(in srgb,var(--theme-primary) 11%,transparent),transparent 48%),linear-gradient(160deg,color-mix(in srgb,var(--theme-surface-2) 55%,transparent),color-mix(in srgb,var(--theme-bg) 36%,transparent))!important}

.experience-card.current,.experience-card.previous{border-color:var(--theme-border)!important}
.career-track-line{background:var(--theme-border-faint)!important}
.career-start .career-dot,.career-transition .career-dot,.career-now .career-dot{background:var(--theme-primary)!important;border-color:var(--theme-text)!important;box-shadow:0 0 0 4px color-mix(in srgb,var(--theme-primary) 10%,transparent),0 0 18px color-mix(in srgb,var(--theme-primary) 68%,transparent)!important}

.education-card{--accent:var(--theme-primary)!important}
.education-card:nth-child(even){--accent:var(--theme-secondary)!important}
.education-badge,.education-number,.education-action{color:var(--accent)!important;border-color:var(--accent)!important}
.education-card .education-detail{color:var(--theme-muted)!important}

.arsenal-rebuild-card:hover{border-color:var(--theme-primary)!important;background:linear-gradient(145deg,color-mix(in srgb,var(--theme-primary) 8%,var(--theme-surface)),color-mix(in srgb,var(--theme-secondary) 6%,var(--theme-bg)))!important}
.arsenal-rebuild-card p{color:var(--theme-primary)!important}

.publication-meta-pill{border-color:var(--theme-border)!important;color:var(--theme-primary)!important}
.publication-button.primary{border-color:var(--theme-primary)!important;color:var(--theme-primary)!important}
.publication-button.secondary{border-color:var(--theme-secondary)!important;color:var(--theme-secondary)!important}
.publication-book-cover{background:linear-gradient(160deg,color-mix(in srgb,var(--theme-primary) 12%,var(--theme-surface)),color-mix(in srgb,var(--theme-bg) 78%,#07111c) 58%,color-mix(in srgb,var(--theme-secondary) 12%,var(--theme-bg)))!important}
.publication-platform{border-color:var(--theme-border-soft)!important;background:radial-gradient(ellipse at center,color-mix(in srgb,var(--theme-primary) 24%,transparent),color-mix(in srgb,var(--theme-secondary) 17%,transparent) 45%,transparent 72%)!important}

/* Make secondary/tertiary accents available to framed components too. */
[data-theme] .contact-card:hover,.contact-card:focus-within,.beyond-card:hover,.beyond-card:focus-within{border-color:var(--theme-primary)!important}
[data-theme] .contact-card .icon,[data-theme] .beyond-card .icon{color:var(--theme-primary)!important}

[data-geometry=tech] .about-profile-card,[data-geometry=tech] .experience-card,[data-geometry=tech] .arsenal-rebuild-card{clip-path:polygon(0 0,98.8% 0,100% 10%,100% 90%,98.8% 100%,0 100%,1.2% 90%,1.2% 10%)!important}
[data-geometry=soft] .about-profile-card,[data-geometry=soft] .experience-card,[data-geometry=soft] .arsenal-rebuild-card{clip-path:none!important;border-radius:var(--theme-panel-radius)!important}
[data-geometry=sharp] .about-profile-card,[data-geometry=sharp] .experience-card,[data-geometry=sharp] .arsenal-rebuild-card{clip-path:polygon(0 0,98.7% 0,100% 12%,100% 88%,98.7% 100%,0 100%,1.3% 88%,1.3% 12%)!important;border-radius:var(--theme-panel-radius)!important}
[data-geometry=glass] .about-profile-card,[data-geometry=glass] .experience-card,[data-geometry=glass] .arsenal-rebuild-card,[data-geometry=glass] .education-card{backdrop-filter:blur(20px) saturate(135%)!important;-webkit-backdrop-filter:blur(20px) saturate(135%)!important;border-radius:var(--theme-panel-radius)!important}
[data-geometry=minimal] .about-profile-card,[data-geometry=minimal] .experience-card,[data-geometry=minimal] .arsenal-rebuild-card,[data-geometry=minimal] .education-card{backdrop-filter:blur(6px)!important;-webkit-backdrop-filter:blur(6px)!important;box-shadow:inset 0 0 18px color-mix(in srgb,var(--theme-primary) 2%,transparent)!important}

@media(prefers-reduced-motion:reduce){#molecule-bg{filter:none!important}}
  `;
  document.head.appendChild(style);

  window.portfolioTheme = Object.freeze({...theme,index});
})();