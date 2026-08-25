(() => {
  const VIEWS = [
    { view:'home',         hash:'#home',         bodyClass:'home-active',        selector:'.hero' },
    { view:'about',        hash:'#about',        bodyClass:'about-active',       selector:'.about-panel' },
    { view:'experience',   hash:'#experience',   bodyClass:'experience-active',  selector:'.experience-panel' },
    { view:'arsenal',      hash:'#arsenal',      bodyClass:'arsenal-active',     selector:'.arsenal-rebuild' },
    { view:'education',    hash:'#education',    bodyClass:'education-active',   selector:'#education' },
    { view:'publications', hash:'#publications', bodyClass:'publication-active', selector:'#publications' },
    { view:'beyond',       hash:'#beyond',       bodyClass:'beyond-active',      selector:'#beyond' },
    { view:'connect',      hash:'#connect',      bodyClass:'connect-active',     selector:'#connect-panel' },
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
    return style;
  }

  function renderPanel({ id, className, html, styleId, css, parent = '.content' }) {
    const container = document.querySelector(parent);
    if (!container) return null;
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

  function bindPanelRoute({ hash, show, hide }) {
    onReady(() => {
      const link = document.querySelector(`.sidebar nav a[href="${hash}"]`);
      if (!link) return;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        show();
      });
      window.addEventListener('hashchange', () => {
        if (window.location.hash === hash) show();
        else hide();
      });
      if (window.location.hash === hash) show();
    });
  }

  function loadScriptOnce(src, flagName) {
    if (document.querySelector(`script[data-${flagName}]`)) return;
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.dataset[flagName] = '';
    document.body.appendChild(script);
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
    onReady,
    injectStyle,
    renderPanel,
    removePanel,
    setActiveNav,
    setBodyView,
    activateView,
    bindPanelRoute,
    loadScriptOnce,
    gradientText,
    panelVisibilityCss,
  };
})();
