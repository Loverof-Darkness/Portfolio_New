(() => {
  const enforceConnectLayout = () => {
    const panel = document.getElementById('connect-panel');
    if (!panel) return;

    // Force the Connect section to the top-left regardless of any older runtime CSS.
    panel.style.setProperty('display', 'flex', 'important');
    panel.style.setProperty('flex-direction', 'column', 'important');
    panel.style.setProperty('justify-content', 'flex-start', 'important');
    panel.style.setProperty('align-items', 'flex-start', 'important');
    panel.style.setProperty('height', '100vh', 'important');
    panel.style.setProperty('min-height', '100vh', 'important');
    panel.style.setProperty('padding-top', '24px', 'important');
    panel.style.setProperty('overflow', 'auto', 'important');

    const header = panel.querySelector('.connect-header');
    if (header) {
      header.style.setProperty('width', '100%', 'important');
      header.style.setProperty('max-width', '950px', 'important');
      header.style.setProperty('text-align', 'left', 'important');
      header.style.setProperty('margin', '0', 'important');
      header.style.setProperty('align-self', 'flex-start', 'important');
    }

    const icons = panel.querySelector('.connect-icons');
    if (icons) {
      icons.style.setProperty('margin-top', '4px', 'important');
      icons.style.setProperty('align-self', 'flex-start', 'important');
    }
  };

  const ensureConnect = () => {
    if (window.renderConnect) window.renderConnect();
    requestAnimationFrame(() => requestAnimationFrame(enforceConnectLayout));
  };

  window.addEventListener('hashchange', () => {
    if (location.hash === '#connect') ensureConnect();
  });

  if (location.hash === '#connect') ensureConnect();

  const observer = new MutationObserver(() => {
    if (location.hash === '#connect') enforceConnectLayout();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
