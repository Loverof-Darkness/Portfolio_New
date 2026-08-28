(() => {
  const diagnostics = window.portfolioDiagnostics;
  const guard = (scope, fn) => (diagnostics ? diagnostics.guard(scope, fn) : fn);

  // First-ever load stays on the original portfolio design. Dynamic theme,
  // typography, and background begin from the second load onward.
  const loadKey = 'portfolio:dynamic-started';
  const firstLoad = localStorage.getItem(loadKey) !== '1';
  if (firstLoad) localStorage.setItem(loadKey, '1');

  // Load theme first, then the procedural background engine before dynamic views.
  const themeScript = document.createElement('script');
  themeScript.src = './theme.js?v=4';
  themeScript.async = false;
  document.head.appendChild(themeScript);

  const backgroundScript = document.createElement('script');
  backgroundScript.src = './background.js?v=2';
  backgroundScript.async = false;
  document.head.appendChild(backgroundScript);

  function restoreOriginalDesign() {
    if (!firstLoad) return;

    // theme.js / background.js may already have executed before shared.js
    // reaches DOMContentLoaded, so restore the original presentation after
    // all synchronous startup scripts have settled.
    const restore = () => {
      document.getElementById('dynamic-theme-style')?.remove();
      document.getElementById('dynamic-background-style')?.remove();
      document.getElementById('dynamic-bg')?.remove();

      const molecule = document.getElementById('molecule-bg');
      if (molecule) {
        molecule.style.removeProperty('opacity');
        molecule.style.removeProperty('visibility');
        molecule.style.removeProperty('filter');
      }

      document.documentElement.removeAttribute('data-theme');
      document.documentElement.removeAttribute('data-geometry');
      document.documentElement.removeAttribute('data-font');

      [
        '--theme-bg','--theme-surface','--theme-surface-2','--theme-text','--theme-muted',
        '--theme-primary','--theme-secondary','--theme-tertiary','--theme-glow','--theme-radius',
        '--theme-panel-radius','--theme-hue','--theme-font-body','--theme-font-heading',
        '--theme-font-mono','--theme-font-weight','--theme-heading-weight','--theme-font-tracking',
        '--black','--white','--muted','--cyan','--violet','--pink','--surface-0','--surface-1',
        '--surface-2','--surface-3','--text','--text-soft','--text-muted'
      ].forEach((name) => document.documentElement.style.removeProperty(name));

      delete window.portfolioTheme;
      delete window.portfolioBackground;
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(restore, 0), { once:true });
    } else {
      setTimeout(restore, 0);
    }
  }

  restoreOriginalDesign();

  const VIEWS = [
    { view:'home',         hash:'#home',        bodyClass:'home-active',        selector:'.hero' },
    { view:'about',        hash:'#about',       bodyClass:'about-active',       selector:'.about-panel' },
    { view:'experience',   hash:'#experience',  bodyClass:'experience-active',  selector:'.experience-panel' },
    { view:'arsenal',      hash:'#arsenal',     bodyClass:'arsenal-active',     selector:'.arsenal-rebuild' },
    { view:'education',    hash:'#education',   bodyClass:'education-active',  selector:'#education' },
    { view:'publications', hash:'#publications',bodyClass:'publication-active', selector:'#publications' },
    { view:'beyond',       hash:'#beyond',      bodyClass:'beyond-active',      selector:'#beyond' },
    { view:'connect',      hash:'#connect',     bodyClass:'connect-active',    selector:'#connect-panel' },
  ];

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once:true });
    } else {
      fn();
    }
  }

  function injectStyle(id, css) {
    document.getElementById(id)?.remove();
    const style = document.createElement('style');
    style.id = id;
    style.textContent = css;
    document.head.appendChild(style);
    const polish = document.getElementById('professional-polish');
    if (polish) document.head.appendChild(polish);
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
    injectStyle(styleId, css);
    return section;
  }

  function removePanel(id, styleId) {
    document.getElementById(id)?.remove();
    document.getElementById(styleId)?.remove();
  }

  function setActiveNav(hash) {
    document.querySelectorAll('.sidebar nav a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === hash);
    });
  }

  function setBodyView(bodyClass) {
    VIEWS.forEach(({ bodyClass: viewClass }) => document.body.classList.remove(viewClass));
    if (bodyClass) document.body.classList.add(bodyClass);
  }

  function activateView(hash) {
    const view = VIEWS.find((entry) => entry.hash === hash);
    if (!view) return;
    setBodyView(view.bodyClass);
    setActiveNav(hash);
  }

  const onHashChange = () => {
    const hash = VIEWS.some((entry) => entry.hash === window.location.hash)
      ? window.location.hash
      : '#home';
    activateView(hash);
  };
  window.addEventListener(
    'hashchange',
    guard('view hashchange', onHashChange),
  );

  function bindPanelRoute({ hash, show, hide, scope = hash }) {
    onReady(() => {
      const link = document.querySelector(`.sidebar nav a[href="${hash}"]`);
      if (!link) {
        diagnostics?.reportMissing(scope, `the ${hash} sidebar link`);
        return;
      }
      link.addEventListener('click', guard(scope, (event) => {
        event.preventDefault();
        show();
      }));
      window.addEventListener('hashchange', guard(scope, () => {
        if (window.location.hash === hash) show();
        else hide();
      }));
      if (window.location.hash === hash) guard(scope, show)();
    });
  }

  function gradientText(gradient) {
    return `background:${gradient};-webkit-background-clip:text;background-clip:text;color:transparent;`;
  }

  function panelVisibilityCss() {
    return VIEWS.map(({ bodyClass, selector }) => {
      const hidden = VIEWS
        .filter((entry) => entry.bodyClass !== bodyClass)
        .map((entry) => `body.${bodyClass} ${entry.selector}`)
        .join(',');
      return `${hidden}{display:none!important}`;
    }).join('');
  }

  injectStyle('panel-visibility-style', panelVisibilityCss());
  window.Portfolio = {
    VIEWS,
    renderPanel,
    removePanel,
    activateView,
    bindPanelRoute,
    gradientText,
  };
})();
