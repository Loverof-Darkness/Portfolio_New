(() => {
  'use strict';

  const backgrounds = [
    { name: 'Warp', type: 'warp', options: { speed: 1.35, colors: ['#67E8F9', '#A78BFA', '#F9A8D4'] } },
    { name: 'Black Hole', type: 'blackHole', options: { radius: 0.2, speed: 1.15 } },
    { name: 'Meteors', type: 'meteors', options: { speed: 1.15 } },
    { name: 'Constellation', type: 'constellation', options: { density: 0.95, speed: 0.55 } },
    { name: 'Orbits', type: 'orbits', options: { speed: 0.8 } },
    { name: 'Fireworks', type: 'fireworks', options: { speed: 1.0 } },
    { name: 'Comets', type: 'comets', options: { speed: 0.9 } },
    { name: 'Vortex', type: 'vortex', options: { speed: 0.8, strength: 1.05 } },
    { name: 'Swarm', type: 'swarm', options: { speed: 0.8, density: 0.75 } },
    { name: 'Flowfield', type: 'flowfield', options: { speed: 0.65, density: 0.7 } },
    { name: 'Clock', type: 'clock', options: { speed: 0.25 } },
    { name: 'Quasar', type: 'quasar', options: { speed: 0.8 } },
    { name: 'Galaxy Merge', type: 'galaxyMerge', options: { speed: 0.45 } },
    { name: 'Spiral Forge', type: 'spiralForge', options: { speed: 0.38, stars: 180000, threeUrl: './vendor/three.module.min.js' } },
    { name: 'Gravity Sim', type: 'gravitySim', options: { speed: 0.42, threeUrl: './vendor/three.module.min.js' } },
    { name: 'Event Horizon', type: 'eventHorizon', options: { tilt: 0.42, speed: 0.45, threeUrl: './vendor/three.module.min.js' } },
  ];

  const BAG_KEY = 'portfolio:galaxy-background-bag-v2';
  const LAST_KEY = 'portfolio:galaxy-background-last-v2';

  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function readBag() {
    try {
      const value = JSON.parse(localStorage.getItem(BAG_KEY) || 'null');
      if (Array.isArray(value) && value.length > 0 && value.every((n) => Number.isInteger(n) && n >= 0 && n < backgrounds.length)) {
        return value;
      }
    } catch (_) {}
    return [];
  }

  let bag = readBag();
  if (bag.length === 0) {
    bag = shuffle(Array.from({ length: backgrounds.length }, (_, i) => i));
    const last = Number.parseInt(localStorage.getItem(LAST_KEY) || '-1', 10);
    if (backgrounds.length > 1 && bag[0] === last) [bag[0], bag[1]] = [bag[1], bag[0]];
  }

  const index = bag.shift();
  localStorage.setItem(BAG_KEY, JSON.stringify(bag));
  localStorage.setItem(LAST_KEY, String(index));
  const selected = backgrounds[index];
  const root = document.documentElement;

  function color(name, fallback) {
    return getComputedStyle(root).getPropertyValue(name).trim() || fallback;
  }

  function ensureHost() {
    let host = document.getElementById('galaxy-dynamic-bg');
    if (!host) {
      host = document.createElement('div');
      host.id = 'galaxy-dynamic-bg';
      host.setAttribute('aria-hidden', 'true');
      document.body.prepend(host);
    }
    host.innerHTML = '';
    host.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none;overflow:hidden;background:var(--theme-bg,#05070A)';
    return host;
  }

  function hideLegacyBackground() {
    const old = document.getElementById('molecule-bg');
    if (old) {
      old.style.opacity = '0';
      old.style.visibility = 'hidden';
      old.style.pointerEvents = 'none';
    }
    const vignette = document.querySelector('.bg-vignette');
    if (vignette) vignette.style.pointerEvents = 'none';
  }

  function mount() {
    if (!window.Galaxy || typeof window.Galaxy.create !== 'function') {
      console.warn('GalaxyJS was not available; keeping the original background.');
      return;
    }

    const host = ensureHost();
    const baseOptions = {
      background: color('--theme-bg', '#05070A'),
      colors: [color('--theme-primary', '#67E8F9'), color('--theme-secondary', '#A78BFA'), color('--theme-tertiary', '#F9A8D4')],
      ...selected.options,
    };

    try {
      const controller = window.Galaxy.create(selected.type, host, baseOptions);
      hideLegacyBackground();
      window.portfolioBackground = Object.freeze({ index, name: selected.name, type: selected.type, controller });
    } catch (error) {
      console.warn(`GalaxyJS background "${selected.name}" failed to mount:`, error);
      host.remove();
    }
  }

  // shared.js injects this script after GalaxyJS has loaded, so do not wait for
  // DOMContentLoaded here. The body already exists when shared.js runs.
  mount();
})();
