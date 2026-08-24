(() => {
  const ensureConnect = () => {
    if (window.renderConnect) window.renderConnect();
  };
  window.addEventListener('hashchange', () => {
    if (location.hash === '#connect') setTimeout(ensureConnect, 0);
  });
  if (location.hash === '#connect') setTimeout(ensureConnect, 0);
})();
