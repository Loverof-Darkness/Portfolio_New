(() => {
  const diagnostics = window.portfolioDiagnostics;
  const guard = (scope, fn) => diagnostics ? diagnostics.guard(scope, fn) : fn;
  const startedKey = 'portfolio:tab-started-at';
  const now = Date.now();
  const fiveMinutes = 5 * 60 * 1000;
  const previousStart = Number.parseInt(sessionStorage.getItem(startedKey) || '0', 10);
  const originalMode = !previousStart || now - previousStart >= fiveMinutes;
  const dynamicMode = !originalMode;

  window.__PORTFOLIO_DYNAMIC_MODE = dynamicMode;
  if (originalMode) sessionStorage.setItem(startedKey, String(now));

  // In dynamic mode script.js still contains the legacy molecule renderer.
  // Its canvas is removed, but its animation callback would otherwise keep
  // scheduling empty frames forever. Block only callbacks belonging to that
  // legacy renderer; GalaxyJS animation callbacks remain untouched.
  if (dynamicMode) {
    const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);
    window.requestAnimationFrame = (callback) => {
      if (typeof callback === 'function') {
        let source = '';
        try { source = Function.prototype.toString.call(callback); } catch (_) {}
        if (source.includes('drawBackground()') && source.includes('drawBonds()') && source.includes('drawAtoms(')) return 0;
      }
      return nativeRequestAnimationFrame(callback);
    };
  }

  const loadScript = (src) => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = false;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });

  const loadStyle = (href, id) => new Promise((resolve, reject) => {
    if (id && document.getElementById(id)) return resolve();
    const base = href.split('?')[0];
    if (!id && document.querySelector(`link[href^="${base}"]`)) return resolve();
    const link = document.createElement('link');
    if (id) link.id = id;
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load ${href}`));
    document.head.appendChild(link);
  });

  loadStyle('./professional-polish.css?v=4', 'professional-polish').catch((e) => console.warn('Professional styles:', e));
  loadStyle('./mobile-responsive.css?v=2', 'mobile-responsive').catch((e) => console.warn('Mobile styles:', e));
  loadStyle('./viewport-compat.css?v=1', 'viewport-compat').catch((e) => console.warn('Viewport styles:', e));

  const showPoster = () => {
    const existing = document.getElementById('galaxy-dynamic-bg');
    if (existing) return existing;
    document.getElementById('molecule-bg')?.remove();
    const poster = document.createElement('div');
    poster.id = 'galaxy-dynamic-bg';
    poster.setAttribute('aria-hidden', 'true');
    poster.style.cssText = [
      'position:fixed', 'inset:0', 'width:100vw', 'height:100dvh',
      'z-index:0', 'pointer-events:none', 'overflow:hidden',
      'background:radial-gradient(circle at 68% 42%,rgba(103,232,249,.10),transparent 34%),radial-gradient(circle at 35% 65%,rgba(167,139,250,.08),transparent 40%),var(--theme-bg,#05070A)'
    ].join(';');
    document.body.prepend(poster);
    return poster;
  };

  if (dynamicMode) {
    showPoster();
    const themePromise = loadScript('./theme.js?v=15').catch((e) => {
      console.warn('Theme engine:', e);
      throw e;
    });
    loadScript('./font-curator.js?v=7').catch((e) => console.warn('Font engine:', e));
    themePromise.then(() => loadStyle('./theme-panels.css?v=2', 'theme-panels')).catch((e) => console.warn('Theme panel engine:', e));
    loadScript('./vendor/galaxy.min.js?v=3.4.0').then(() => loadScript('./galaxy-background.js?v=5')).catch((e) => console.warn('GalaxyJS background engine:', e));
  }

  const views = [
    ['home', '#home', 'home-active', '.hero'],
    ['about', '#about', 'about-active', '.about-panel'],
    ['experience', '#experience', 'experience-active', '.experience-panel'],
    ['arsenal', '#arsenal', 'arsenal-active', '.arsenal-rebuild'],
    ['education', '#education', 'education-active', '#education'],
    ['publications', '#publications', 'publication-active', '#publications'],
    ['beyond', '#beyond', 'beyond-active', '#beyond'],
    ['connect', '#connect', 'connect-active', '#connect-panel']
  ];

  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  };

  function installMagicLink() {
    ready(() => {
      const nav = document.querySelector('.sidebar nav');
      if (!nav || nav.querySelector('[data-magic-reload="true"]')) return;
      const link = document.createElement('a');
      link.href = '#magic';
      link.dataset.magicReload = 'true';
      link.setAttribute('aria-label', 'Open the Multiverse');
      link.title = 'Open the Multiverse';
      link.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"></circle><ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-25 12 12)"></ellipse><ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(25 12 12)"></ellipse><circle cx="18.9" cy="7.2" r="1.15" fill="currentColor" stroke="none"></circle></svg><span>OPEN THE MULTIVERSE</span>';
      link.addEventListener('click', guard('magic reload', (event) => {
        event.preventDefault();
        sessionStorage.setItem(startedKey, String(Date.now()));
        location.reload();
      }));
      nav.appendChild(link);
    });
  }
  installMagicLink();

  function loadAboutFix() {
    return loadStyle('./about-responsive-fix.css?v=2', 'about-responsive-fix');
  }

  function inject(id, css) {
    document.getElementById(id)?.remove();
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    loadAboutFix().catch((e) => console.warn('About responsive styles:', e));
    const themePanels = document.getElementById('theme-panels');
    if (themePanels) document.head.appendChild(themePanels);
    return style;
  }

  function renderPanel({ id, className, html, styleId, css, parent = '.content', scope = id }) {
    const container = document.querySelector(parent);
    if (!container) {
      diagnostics?.reportMissing(scope, `${parent} container`);
      return null;
    }
    document.getElementById(id)?.remove();
    document.getElementById(styleId)?.remove();
    const section = document.createElement('section');
    section.id = id;
    section.className = className;
    section.innerHTML = html;
    container.appendChild(section);
    inject(styleId, css);
    return section;
  }

  function removePanel(id, styleId) {
    document.getElementById(id)?.remove();
    document.getElementById(styleId)?.remove();
  }

  function setNav(hash) {
    document.querySelectorAll('.sidebar nav a').forEach((link) => link.classList.toggle('active', link.getAttribute('href') === hash));
  }

  function activate(hash) {
    const view = views.find((item) => item[1] === hash);
    if (!view) return;
    views.forEach((item) => document.body.classList.remove(item[2]));
    document.body.classList.add(view[2]);
    setNav(hash);
  }

  function bindPanelRoute({ hash, show, hide, scope = hash }) {
    ready(() => {
      const link = document.querySelector(`.sidebar nav a[href="${hash}"]`);
      if (!link) {
        diagnostics?.reportMissing(scope, `the ${hash} sidebar link`);
        return;
      }
      link.addEventListener('click', guard(scope, (event) => {
        event.preventDefault();
        show();
      }));
      window.addEventListener('hashchange', guard(scope, () => location.hash === hash ? show() : hide()));
      if (location.hash === hash) guard(scope, show)();
    });
  }

  function gradientText(value) {
    return `background:${value};-webkit-background-clip:text;background-clip:text;color:transparent;`;
  }

  function panelVisibilityCSS() {
    return views.map(([, , bodyClass]) => {
      const selectors = views.filter((view) => view[2] !== bodyClass).map((view) => `body.${bodyClass} ${view[3]}`).join(',');
      return selectors ? `${selectors}{display:none!important}` : '';
    }).join('');
  }

  inject('panel-visibility-style', panelVisibilityCSS());

  window.Portfolio = Object.freeze({
    VIEWS: views.map(([view, hash, bodyClass, selector]) => ({ view, hash, bodyClass, selector })),
    renderPanel,
    removePanel,
    activateView: activate,
    bindPanelRoute,
    gradientText,
  });
})();
