(() => {
  const loadConnect = () => {
    if (window.location.hash !== '#connect') return;
    const s = document.createElement('script');
    s.src = './connect.js?v=3';
    s.defer = true;
    document.body.appendChild(s);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadConnect, { once: true });
  else loadConnect();
})();
