(() => {
  const diagnostics = window.portfolioDiagnostics;
  const guard = (scope, fn) => (diagnostics ? diagnostics.guard(scope, fn) : fn);

  // Visit lifecycle:
  // - A brand-new tab always starts with the original design.
  // - Reloads in that tab become dynamic immediately after the first load.
  // - If the tab is opened/reloaded after 5 minutes from the tab's start,
  //   that load becomes original again and starts a fresh 5-minute window.
  // sessionStorage is intentionally used so a new tab has its own lifecycle.
  const tabStartedKey = 'portfolio:tab-started-at';
  const now = Date.now();
  const FIVE_MINUTES = 5 * 60 * 1000;
  const previousStart = Number.parseInt(sessionStorage.getItem(tabStartedKey) || '0', 10);
  const originalLoad = !previousStart || (now - previousStart) >= FIVE_MINUTES;

  if (originalLoad) {
    // This load is the fresh/original state. Restart the 5-minute window.
    sessionStorage.setItem(tabStartedKey, String(now));
  }

  // Only load the dynamic engines for a normal reload within the active window.
  // This makes browser reload / Ctrl+R / Ctrl+Shift+R follow the same decision.
  if (!originalLoad) {
    const themeScript = document.createElement('script');
    themeScript.src = './theme.js?v=7';
    themeScript.async = false;
    document.head.appendChild(themeScript);

    const backgroundScript = document.createElement('script');
    backgroundScript.src = './background.js?v=5';
    backgroundScript.async = false;
    document.head.appendChild(backgroundScript);
  }

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
  window.addEventListener('hashchange', guard('view hashchange', onHashChange));

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
