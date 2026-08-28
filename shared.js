(() => {
  const diagnostics = window.portfolioDiagnostics;
  const guard = (scope, fn) => (diagnostics ? diagnostics.guard(scope, fn) : fn);

  // First visit in a tab is always the original design. A brand-new tab also
  // starts original. After five minutes without a visit, that tab is treated
  // as new again. Otherwise reloads use the randomized engines.
  const sessionKey = 'portfolio:tab-visit-start';
  const dynamicKey = 'portfolio:dynamic-started';
  const FIVE_MINUTES = 5 * 60 * 1000;
  const now = Date.now();
  const previousStart = Number.parseInt(sessionStorage.getItem(sessionKey) || '0', 10);
  const staleTab = !previousStart || (now - previousStart) >= FIVE_MINUTES;
  const firstLoad = staleTab || sessionStorage.getItem(dynamicKey) !== '1';

  if (firstLoad) {
    sessionStorage.setItem(sessionKey, String(now));
    sessionStorage.removeItem(dynamicKey);
  }

  // Do not load dynamic engines on the first/new/stale visit. This guarantees
  // the original design is the only design shown for that opening.
  if (!firstLoad) {
    const themeScript = document.createElement('script');
    themeScript.src = './theme.js?v=6';
    themeScript.async = false;
    document.head.appendChild(themeScript);

    const backgroundScript = document.createElement('script');
    backgroundScript.src = './background.js?v=4';
    backgroundScript.async = false;
    document.head.appendChild(backgroundScript);
  }

  // The current original visit is now complete; its next reload becomes dynamic.
  if (firstLoad) sessionStorage.setItem(dynamicKey, '1');

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
