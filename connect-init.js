(() => {
  const src = './connect.js?v=3';

  const loadConnect = () => {
    if (window.location.hash !== '#connect') return;
    const diagnostics = window.portfolioDiagnostics;
    if (diagnostics) {
      diagnostics
        .loadScript(src)
        .catch((error) => diagnostics.reportError('connect script load', error));
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.defer = true;
    s.addEventListener('error', () => console.error(`[portfolio] failed to load ${src}`), { once: true });
    document.body.appendChild(s);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadConnect, { once: true });
  else loadConnect();
})();
