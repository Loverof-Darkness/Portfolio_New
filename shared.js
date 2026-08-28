(() => {
  const diagnostics = window.portfolioDiagnostics;
  const guard = (scope, fn) => (diagnostics ? diagnostics.guard(scope, fn) : fn);
  const tabStartedKey = 'portfolio:tab-started-at';
  const now = Date.now();
  const FIVE_MINUTES = 5 * 60 * 1000;
  const previousStart = Number.parseInt(sessionStorage.getItem(tabStartedKey) || '0', 10);
  const originalLoad = !previousStart || (now - previousStart) >= FIVE_MINUTES;
  if (originalLoad) sessionStorage.setItem(tabStartedKey, String(now));
  if (!originalLoad) {
    const themeScript = document.createElement('script'); themeScript.src='./theme.js?v=11'; themeScript.async=false; document.head.appendChild(themeScript);
    const fontScript = document.createElement('script'); fontScript.src='./font-curator.js?v=3'; fontScript.async=false; document.head.appendChild(fontScript);
    const backgroundScript = document.createElement('script'); backgroundScript.src='./background.js?v=8'; backgroundScript.async=false; document.head.appendChild(backgroundScript);
    const extraScript = document.createElement('script'); extraScript.src='./background-extras.js?v=1'; extraScript.async=false; document.head.appendChild(extraScript);
  }
  const VIEWS=[{view:'home',hash:'#home',bodyClass:'home-active',selector:'.hero'},{view:'about',hash:'#about',bodyClass:'about-active',selector:'.about-panel'},{view:'experience',hash:'#experience',bodyClass:'experience-active',selector:'.experience-panel'},{view:'arsenal',hash:'#arsenal',bodyClass:'arsenal-active',selector:'.arsenal-rebuild'},{view:'education',hash:'#education',bodyClass:'education-active',selector:'#education'},{view:'publications',hash:'#publications',bodyClass:'publication-active',selector:'#publications'},{view:'beyond',hash:'#beyond',bodyClass:'beyond-active',selector:'#beyond'},{view:'connect',hash:'#connect',bodyClass:'connect-active',selector:'#connect-panel'}];
  function onReady(fn){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn,{once:true});else fn();}
  function installMagicTab(){onReady(()=>{const nav=document.querySelector('.sidebar nav');if(!nav||nav.querySelector('[data-magic-reload="true"]'))return;const magic=document.createElement('a');magic.href='#magic';magic.dataset.magicReload='true';magic.setAttribute('aria-label','Open the Multiverse');magic.title='Open the Multiverse';magic.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-25 12 12)"></ellipse><ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(25 12 12)"></ellipse><circle cx="18.9" cy="7.2" r="1.15" fill="currentColor" stroke="none"></circle></svg><span>OPEN THE MULTIVERSE</span>`;magic.addEventListener('click',guard('magic reload',(event)=>{event.preventDefault();sessionStorage.setItem(tabStartedKey,String(Date.now()));window.location.reload();}));nav.appendChild(magic);});}
  installMagicTab();
  function loadAboutResponsiveFix(){const existing=document.getElementById('about-responsive-fix');if(existing)existing.remove();const link=document.createElement('link');link.id='about-responsive-fix';link.rel='stylesheet';link.href='./about-responsive-fix.css?v=1';document.head.appendChild(link);}
  function injectStyle(id,css){document.getElementById(id)?.remove();const style=document.createElement('style');style.id=id;style.textContent=css;document.head.appendChild(style);const polish=document.getElementById('professional-polish');if(polish)document.head.appendChild(polish);loadAboutResponsiveFix();return style;}
  function renderPanel({id,className,html,styleId,css,parent='.content',scope=id}){const container=document.querySelector(parent);if(!container){diagnostics?.reportMissing(scope,`${parent} container`);return null;}document.getElementById(id)?.remove();document.getElementById(styleId)?.remove();const section=document.createElement('section');section.id=id;section.className=className;section.innerHTML=html;container.appendChild(section);injectStyle(styleId,css);return section;}
  function removePanel(id,styleId){document.getElementById(id)?.remove();document.getElementById(styleId)?.remove();}
  function setActiveNav(hash){document.querySelectorAll('.sidebar nav a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')===hash));}
  function setBodyView(bodyClass){VIEWS.forEach(({bodyClass:viewClass})=>document.body.classList.remove(viewClass));if(bodyClass)document.body.classList.add(bodyClass);}
  function activateView(hash){const view=VIEWS.find(entry=>entry.hash===hash);if(!view)return;setBodyView(view.bodyClass);setActiveNav(hash);}
  const onHashChange=()=>{const hash=VIEWS.some(entry=>entry.hash===window.location.hash)?window.location.hash:'#home';activateView(hash);};window.addEventListener('hashchange',guard('view hashchange',onHashChange));
  function bindPanelRoute({hash,show,hide,scope=hash}){onReady(()=>{const link=document.querySelector(`.sidebar nav a[href="${hash}"]`);if(!link){diagnostics?.reportMissing(scope,`the ${hash} sidebar link`);return;}link.addEventListener('click',guard(scope,event=>{event.preventDefault();show();}));window.addEventListener('hashchange',guard(scope,()=>{if(window.location.hash===hash)show();else hide();}));if(window.location.hash===hash)guard(scope,show)();});}
  function gradientText(gradient){return `background:${gradient};-webkit-background-clip:text;background-clip:text;color:transparent;`;}
  function panelVisibilityCss(){return VIEWS.map(({bodyClass,selector})=>{const hidden=VIEWS.filter(entry=>entry.bodyClass!==bodyClass).map(entry=>`body.${bodyClass} ${entry.selector}`).join(',');return `${hidden}{display:none!important}`;}).join('');}
  injectStyle('panel-visibility-style',panelVisibilityCss());window.Portfolio={VIEWS,renderPanel,removePanel,activateView,bindPanelRoute,gradientText};
})();