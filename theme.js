(() => {
  'use strict';

  const themes = [
    {
      name: 'Aether',
      primary: '#00e5ff', secondary: '#8b5cf6', tertiary: '#ff2bd6', glow: 1,
      hue: 0, radius: '10px', panelRadius: '0px', geometry: 'tech',
    },
    {
      name: 'Emerald',
      primary: '#00f5a0', secondary: '#00bbf9', tertiary: '#7cffcb', glow: 1.15,
      hue: 105, radius: '14px', panelRadius: '8px', geometry: 'soft-tech',
    },
    {
      name: 'Solaris',
      primary: '#ffd166', secondary: '#ff7a00', tertiary: '#ff3d81', glow: 1.08,
      hue: 185, radius: '8px', panelRadius: '5px', geometry: 'sharp',
    },
    {
      name: 'Violet Pulse',
      primary: '#b388ff', secondary: '#6c63ff', tertiary: '#00e5ff', glow: 1.2,
      hue: 265, radius: '18px', panelRadius: '12px', geometry: 'soft-tech',
    },
    {
      name: 'Crimson',
      primary: '#ff4d6d', secondary: '#ff8a00', tertiary: '#ff2bd6', glow: 1.05,
      hue: 315, radius: '6px', panelRadius: '4px', geometry: 'sharp',
    },
    {
      name: 'Arctic',
      primary: '#7dd3fc', secondary: '#38bdf8', tertiary: '#c4b5fd', glow: 0.95,
      hue: 165, radius: '12px', panelRadius: '9px', geometry: 'minimal',
    },
    {
      name: 'Quantum Gold',
      primary: '#facc15', secondary: '#a3e635', tertiary: '#22d3ee', glow: 1.0,
      hue: 75, radius: '4px', panelRadius: '2px', geometry: 'sharp',
    },
    {
      name: 'Obsidian Mono',
      primary: '#e5e7eb', secondary: '#94a3b8', tertiary: '#ffffff', glow: 0.72,
      hue: 0, radius: '2px', panelRadius: '2px', geometry: 'minimal',
    },
  ];

  // Avoid showing exactly the same theme on consecutive page loads/reloads.
  const storageKey = 'portfolio:last-theme-index';
  const previous = Number.parseInt(sessionStorage.getItem(storageKey) || '-1', 10);
  let index = Math.floor(Math.random() * themes.length);
  if (themes.length > 1 && index === previous) index = (index + 1 + Math.floor(Math.random() * (themes.length - 1))) % themes.length;
  sessionStorage.setItem(storageKey, String(index));

  const theme = themes[index];
  const root = document.documentElement;
  root.dataset.theme = theme.name.toLowerCase().replace(/\s+/g, '-');
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-secondary', theme.secondary);
  root.style.setProperty('--theme-tertiary', theme.tertiary);
  root.style.setProperty('--theme-glow', String(theme.glow));
  root.style.setProperty('--theme-radius', theme.radius);
  root.style.setProperty('--theme-panel-radius', theme.panelRadius);
  root.style.setProperty('--theme-hue', `${theme.hue}deg`);
  root.style.setProperty('--cyan', theme.primary);
  root.style.setProperty('--violet', theme.secondary);
  root.style.setProperty('--pink', theme.tertiary);

  document.documentElement.style.setProperty('--theme-name', `"${theme.name}"`);

  const style = document.createElement('style');
  style.id = 'dynamic-theme-style';
  style.textContent = `
    :root {
      --theme-border: color-mix(in srgb, var(--theme-primary) 52%, transparent);
      --theme-border-soft: color-mix(in srgb, var(--theme-primary) 24%, transparent);
      --theme-surface: color-mix(in srgb, var(--theme-primary) 3%, #000);
      --theme-glow-color: color-mix(in srgb, var(--theme-primary) 68%, transparent);
    }

    body {
      --cyan: var(--theme-primary) !important;
      --violet: var(--theme-secondary) !important;
      --pink: var(--theme-tertiary) !important;
      background:
        radial-gradient(circle at 75% 15%, color-mix(in srgb, var(--theme-secondary) 5%, transparent), transparent 34%),
        radial-gradient(circle at 20% 85%, color-mix(in srgb, var(--theme-primary) 4%, transparent), transparent 32%),
        #000 !important;
    }

    #molecule-bg {
      filter: hue-rotate(var(--theme-hue)) saturate(calc(.8 + var(--theme-glow) * .35)) brightness(calc(.9 + var(--theme-glow) * .1));
    }

    .bg-vignette { opacity: calc(.78 + var(--theme-glow) * .12) !important; }

    .sidebar,
    .metrics,
    .overview,
    .about-profile-card,
    .experience-card,
    .education-card,
    .arsenal-rebuild-card,
    .publication-info-row > div,
    .publication-button,
    .contact-card,
    .beyond-card {
      border-color: var(--theme-border-soft) !important;
      box-shadow: inset 0 0 28px color-mix(in srgb, var(--theme-primary) 3%, transparent), 0 0 24px color-mix(in srgb, var(--theme-primary) calc(8% * var(--theme-glow)), transparent) !important;
      border-radius: var(--theme-panel-radius) !important;
    }

    nav a:hover,
    nav a.active {
      border-color: var(--theme-primary) !important;
      box-shadow: inset 3px 0 var(--theme-primary), 0 0 22px color-mix(in srgb, var(--theme-primary) 12%, transparent) !important;
      background: linear-gradient(90deg, color-mix(in srgb, var(--theme-primary) 12%, transparent), transparent) !important;
    }

    nav a:hover svg,
    nav a.active svg,
    .socials a:hover,
    .section-label,
    .about-profile-label,
    .arsenal-rebuild-number,
    .career-now .career-dot,
    .career-transition .career-dot,
    .career-start .career-dot {
      color: var(--theme-primary) !important;
    }

    .cv-button,
    .text-link,
    .publication-button.primary {
      border-color: var(--theme-primary) !important;
      color: var(--theme-primary) !important;
      box-shadow: 0 0 18px color-mix(in srgb, var(--theme-primary) 10%, transparent) !important;
      border-radius: var(--theme-radius) !important;
    }

    .cv-button:hover,
    .publication-button:hover,
    .text-link:hover {
      background: color-mix(in srgb, var(--theme-primary) 10%, transparent) !important;
      box-shadow: 0 0 30px color-mix(in srgb, var(--theme-primary) 18%, transparent) !important;
    }

    .brand-mark,
    h1 strong,
    .role,
    .typing-line.is-typing span,
    .intro-heading.is-typing strong,
    .about-heading,
    .experience-heading,
    .arsenal-rebuild-header h2,
    .education-header h2,
    .publication-heading {
      background-image: linear-gradient(90deg, #fff 0%, var(--theme-primary) 48%, var(--theme-secondary) 100%) !important;
    }

    .typing-caret,
    .instrument-base,
    .skill i,
    .career-track-progress,
    .kicker span {
      background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary), var(--theme-tertiary)) !important;
      box-shadow: 0 0 12px color-mix(in srgb, var(--theme-primary) 45%, transparent) !important;
    }

    .portrait-glow {
      background: radial-gradient(circle, color-mix(in srgb, var(--theme-primary) 18%, transparent), color-mix(in srgb, var(--theme-secondary) 13%, transparent) 35%, transparent 72%) !important;
    }

    .about-profile-card::before {
      border-color: color-mix(in srgb, var(--theme-secondary) 18%, transparent) !important;
    }

    .about-profile-title span,
    .publication-kicker,
    .publication-journal,
    .arsenal-rebuild-card p,
    .education-badge {
      color: var(--theme-primary) !important;
    }

    .instrument-visual {
      border-color: var(--theme-border-soft) !important;
      background:
        radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--theme-primary) 11%, transparent), transparent 38%),
        linear-gradient(145deg, color-mix(in srgb, var(--theme-primary) 6%, #07141b), #03070b 58%, color-mix(in srgb, var(--theme-secondary) 8%, #10081b)) !important;
    }

    .experience-card.current,
    .arsenal-rebuild-card:hover,
    .education-card:hover,
    .education-card:focus-visible,
    .education-card.is-active {
      border-color: var(--theme-primary) !important;
      box-shadow: 0 0 30px color-mix(in srgb, var(--theme-primary) calc(14% * var(--theme-glow)), transparent), inset 0 0 24px color-mix(in srgb, var(--theme-secondary) 5%, transparent) !important;
    }

    .publication-button.secondary { border-color: var(--theme-secondary) !important; }
    .publication-book-cover { border-color: var(--theme-border) !important; background: linear-gradient(160deg, color-mix(in srgb, var(--theme-primary) 10%, #0f2d47), #07111c 58%, color-mix(in srgb, var(--theme-secondary) 12%, #24113f)) !important; }
    .publication-platform { border-color: var(--theme-border-soft) !important; background: radial-gradient(ellipse at center, color-mix(in srgb, var(--theme-primary) 24%, transparent), color-mix(in srgb, var(--theme-secondary) 16%, transparent) 45%, transparent 72%) !important; }

    /* Style-family changes, not just color changes. */
    [data-theme$="sharp"] .about-profile-card,
    [data-theme="solaris"] .about-profile-card,
    [data-theme="crimson"] .about-profile-card,
    [data-theme="quantum-gold"] .about-profile-card { clip-path: polygon(0 0,98.8% 0,100% 18%,100% 82%,98.8% 100%,0 100%,1.2% 82%,1.2% 18%) !important; }

    [data-theme="emerald"] .about-profile-card,
    [data-theme="violet-pulse"] .about-profile-card,
    [data-theme="arctic"] .about-profile-card { clip-path: none !important; }

    [data-theme="obsidian-mono"] .sidebar,
    [data-theme="obsidian-mono"] .metrics,
    [data-theme="obsidian-mono"] .overview,
    [data-theme="obsidian-mono"] .experience-card,
    [data-theme="obsidian-mono"] .education-card,
    [data-theme="obsidian-mono"] .arsenal-rebuild-card {
      backdrop-filter: blur(8px) !important;
      -webkit-backdrop-filter: blur(8px) !important;
    }

    @media (prefers-reduced-motion: reduce) {
      #molecule-bg { filter: none !important; }
    }
  `;
  document.head.appendChild(style);

  // Expose current theme for future components and debugging.
  window.portfolioTheme = Object.freeze({ ...theme, index });
})();