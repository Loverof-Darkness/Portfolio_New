(() => {
  'use strict';

  if (!window.__PORTFOLIO_DYNAMIC_MODE) return;

  const nativeRequestAnimationFrame = window.requestAnimationFrame.bind(window);

  window.requestAnimationFrame = (callback) => {
    if (typeof callback === 'function') {
      let source = '';
      try {
        source = Function.prototype.toString.call(callback);
      } catch (_) {}

      // script.js legacy molecule renderer uses all of these drawing helpers.
      // Suppress only that loop; GalaxyJS and every other animation remain intact.
      if (source.includes('drawBackground()') && source.includes('drawBonds()') && source.includes('drawAtoms(')) {
        return 0;
      }
    }
    return nativeRequestAnimationFrame(callback);
  };
})();
