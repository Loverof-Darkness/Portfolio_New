(() => {
  const loadConnect = () => {
    const s = document.createElement('script');
    s.src = './connect.js?v=1';
    s.defer = true;
    document.body.appendChild(s);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', loadConnect);
  else loadConnect();
})();
