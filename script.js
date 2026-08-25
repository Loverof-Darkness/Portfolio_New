const diagnostics = window.portfolioDiagnostics;

function reportError(scope, error) {
  if (diagnostics) diagnostics.reportError(scope, error);
  else console.error(`[portfolio] ${scope} failed:`, error);
}

function reportMissing(scope, description) {
  if (diagnostics) diagnostics.reportMissing(scope, description);
  else console.warn(`[portfolio] ${scope} skipped: ${description} is missing from the page.`);
}

function runGuarded(scope, fn) {
  if (diagnostics) return diagnostics.run(scope, fn);
  try {
    return fn();
  } catch (error) {
    reportError(scope, error);
    return undefined;
  }
}

const canvas = document.getElementById('molecule-bg');
if (!canvas) reportMissing('background canvas', '#molecule-bg');
const ctx = canvas ? canvas.getContext('2d') : null;
if (canvas && !ctx) reportMissing('background canvas', 'a usable 2d rendering context');

const palette = [
  [0, 229, 255],
  [139, 92, 246],
  [255, 43, 214],
  [0, 255, 179],
  [59, 130, 246],
];

let width = 0;
let height = 0;
let dpr = 1;
let nodes = [];
let raf = 0;
let last = performance.now();

const pointer = { x: 0, y: 0, active: false };

function resize() {
  if (!canvas || !ctx) return;
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const target = Math.min(520, Math.max(220, Math.floor((width * height) / 4000)));
  nodes = Array.from({ length: target }, createNode);
}

function createNode() {
  const color = palette[Math.floor(Math.random() * palette.length)];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    radius: 1 + Math.random() * 2,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.0011 + Math.random() * 0.002,
    color,
  };
}

function rgba(rgb, alpha) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

function wrap(node) {
  const pad = 60;
  if (node.x < -pad) node.x = width + pad;
  if (node.x > width + pad) node.x = -pad;
  if (node.y < -pad) node.y = height + pad;
  if (node.y > height + pad) node.y = -pad;
}

function drawBackground() {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
}

function drawBonds() {
  if (!ctx) return;
  const maxDistance = Math.min(118, Math.max(70, Math.min(width, height) * 0.1));

  for (let i = 0; i < nodes.length; i += 1) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j += 1) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.hypot(dx, dy);
      if (distance > maxDistance) continue;

      const proximity = 1 - distance / maxDistance;
      const mix = palette[(i * 7 + j * 3) % palette.length];
      const alpha = (0.38 + proximity * 0.34) * (0.75 + proximity * 0.25);

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineWidth = 0.65 + proximity * 0.95;
      ctx.strokeStyle = rgba(mix, alpha);
      ctx.shadowColor = rgba(mix, 0.3 + proximity * 0.25);
      ctx.shadowBlur = 4 + proximity * 5;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }
}

function drawAtoms(now) {
  if (!ctx) return;

  for (const node of nodes) {
    const wave = (Math.sin(now * node.pulseSpeed + node.pulse) + 1) / 2;
    const glow = 0.55 + wave * 0.45;
    const radius = node.radius + wave * 0.65;

    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 8);
    gradient.addColorStop(0, rgba(node.color, 0.24 * glow));
    gradient.addColorStop(0.28, rgba(node.color, 0.075 * glow));
    gradient.addColorStop(1, rgba(node.color, 0));

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(node.x, node.y, radius * 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = rgba(node.color, 0.68 + wave * 0.32);
    ctx.shadowColor = rgba(node.color, 0.9);
    ctx.shadowBlur = 8 + wave * 12;
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function updateBackground(dt) {
  const pointerStrength = pointer.active ? 0.0035 : 0;

  for (const node of nodes) {
    node.x += node.vx * dt;
    node.y += node.vy * dt;

    if (pointer.active) {
      const dx = pointer.x - node.x;
      const dy = pointer.y - node.y;
      const distance = Math.hypot(dx, dy);
      if (distance > 8 && distance < 210) {
        const force = (1 - distance / 210) * pointerStrength * dt;
        node.vx += (dx / distance) * force;
        node.vy += (dy / distance) * force;
      }
    }

    node.vx *= 0.9993;
    node.vy *= 0.9993;
    wrap(node);
  }
}

function frame(now) {
  const dt = Math.min(now - last, 32);
  last = now;
  drawBackground();
  updateBackground(dt);
  drawBonds();
  drawAtoms(now);
  raf = requestAnimationFrame(frame);
}

function typeText(element, text, speed = 34) {
  if (!element) return Promise.reject(new Error('typeText called without a target element'));
  const output = element.querySelector('strong, span:not(.typing-caret)') || element;
  const caret = element.querySelector('.typing-caret');
  output.textContent = '';
  element.classList.remove('is-done');
  element.classList.add('is-typing');

  let index = 0;
  return new Promise((resolve, reject) => {
    const tick = () => {
      try {
        if (index < text.length) {
          output.textContent += text[index];
          index += 1;
          window.setTimeout(tick, speed);
          return;
        }
        element.classList.remove('is-typing');
        element.classList.add('is-done');
        if (caret) caret.style.opacity = '0';
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    tick();
  });
}

function resetHeroTyping() {
  const intro = document.querySelector('.intro-heading');
  const lines = [...document.querySelectorAll('.summary .typing-line')];
  if (!intro) {
    reportMissing('hero typing', '.intro-heading');
    return;
  }
  if (lines.length !== 4) {
    reportMissing('hero typing', `four .summary .typing-line elements (found ${lines.length})`);
    return;
  }

  const texts = [
    'I am an Analytical Research Scientist specializing in method development',
    'and complex formulation analysis. From peptides to small molecules, I leverage HPLC/UPLC,',
    'DSC, and ion chromatography and other analytical instruments to generate precise, GMP-compliant data.',
    'My goal? To bridge the gap between lab innovation and regulatory approval.',
  ];

  const introOutput = intro.querySelector('strong');
  if (introOutput) introOutput.textContent = '';
  intro.classList.remove('is-typing', 'is-done');

  lines.forEach((line) => {
    const span = line.querySelector('span');
    const caret = line.querySelector('.typing-caret');
    if (span) span.textContent = '';
    line.classList.remove('is-typing', 'is-done');
    if (caret) caret.style.opacity = '1';
  });

  const runLine = (index) => {
    if (index >= lines.length) return;
    typeText(lines[index], texts[index], 21)
      .then(() => {
        window.setTimeout(() => runLine(index + 1), 180);
      })
      .catch((error) => reportError(`hero typing (line ${index + 1})`, error));
  };

  typeText(intro, "I'm Abhay Gupta.", 55)
    .then(() => {
      window.setTimeout(() => runLine(0), 260);
    })
    .catch((error) => reportError('hero typing (intro)', error));
}

function injectExperienceSection() {
  if (document.getElementById('experience')) return;
  const experience = Portfolio.renderPanel({
    id: 'experience',
    scope: 'experience section',
    className: 'experience-panel',
    styleId: 'experience-runtime-styles',
    html: `
    <div class="experience-header-wrap">
      <h2 class="experience-heading">PROFESSIONAL EXPERIENCE</h2>
      <p class="experience-subtitle">From the beginning of my analytical career to my current role in pharmaceutical research &amp; development.</p>
    </div>
    <div class="career-track" aria-label="Career timeline from September 2023 to present">
      <div class="career-track-line"></div>
      <div class="career-track-progress"></div>
      <div class="career-start"><span class="career-dot"></span><strong>SEP 2023</strong><small>START</small></div>
      <div class="career-transition"><span class="career-dot"></span><strong>AUG 2025</strong><small>ENDO PAR FORMULATION</small></div>
      <div class="career-now"><span class="career-dot pulse"></span><strong>NOW</strong><small>VIATRIS</small></div>
    </div>
    <div class="experience-grid">
      <article class="experience-card current">
        <div class="experience-card-top"><span class="experience-status">CURRENT ROLE</span><time>Aug 2025 – Present</time></div>
        <h3>Research Scientist</h3>
        <p class="experience-company">VIATRIS</p>
        <ul>
          <li>Responsible for analytical method development for complex pharmaceutical formulations, including peptide-based formulations.</li>
          <li>Conduct pre-validation studies to assess analytical method performance and readiness for validation.</li>
          <li>Work within pharmaceutical quality and compliance expectations, with emphasis on scientific documentation and reproducible analytical results.</li>
        </ul>
      </article>
      <article class="experience-card previous">
        <div class="experience-card-top"><span class="experience-status">PREVIOUS ROLE</span><time>Sep 2023 – Jul 2025</time></div>
        <h3>Trainee – Analytical Research &amp; Development</h3>
        <p class="experience-company">ENDO PAR FORMULATIONS</p>
        <ul>
          <li>Performed characterization and routine analysis of APIs, finished products and injectable samples using HPLC and IR.</li>
          <li>Supported analytical method development activities for pharmaceutical samples and products.</li>
          <li>Performed routine laboratory analysis, handled analytical standards and columns, and maintained laboratory documentation.</li>
          <li>Worked in accordance with GLP, compliance requirements and laboratory procedures.</li>
        </ul>
      </article>
    </div>
    <div class="experience-footer"><span class="live-pulse"></span><span>CAREER IN MOTION</span><strong class="experience-duration">Calculating current trajectory…</strong></div>
  `,
    css: `
    .experience-panel{min-height:100vh;height:100vh;overflow:auto;padding:50px 0 42px;scroll-snap-align:start;scroll-snap-stop:always;display:flex;flex-direction:column;gap:26px}
    .experience-header-wrap{max-width:980px}
    .experience-heading{margin:0;font-size:clamp(48px,5.5vw,76px);line-height:.92;font-weight:900;letter-spacing:-.05em;${Portfolio.gradientText('linear-gradient(90deg,#fff,#00e5ff 48%,#8b5cf6)')}text-shadow:0 0 24px rgba(0,229,255,.14)}
    .experience-subtitle{margin:14px 0 0;max-width:820px;color:#cbd5e1;font-size:18px;font-weight:600;line-height:1.55}
    .career-track{position:relative;height:92px;margin:4px 8px 0;display:grid;grid-template-columns:1fr 1fr 1fr;align-items:start}
    .career-track-line,.career-track-progress{position:absolute;left:1%;right:1%;top:27px;height:4px;border-radius:5px}
    .career-track-line{background:rgba(113,130,150,.22);box-shadow:0 0 10px rgba(0,0,0,.35)}
    .career-track-progress{right:auto;width:calc(var(--career-progress,100%) - 1%);background:linear-gradient(90deg,#00e5ff,#8b5cf6,#ff2bd6);box-shadow:0 0 18px rgba(0,229,255,.32),0 0 24px rgba(139,92,246,.2)}
    .career-start,.career-transition,.career-now{position:relative;z-index:2;display:flex;flex-direction:column;align-items:center;gap:6px}
    .career-dot{width:18px;height:18px;border-radius:50%;margin-top:18px;border:3px solid #05070b;background:#00e5ff;box-shadow:0 0 0 4px rgba(0,229,255,.08),0 0 18px rgba(0,229,255,.75)}
    .career-transition .career-dot{background:#8b5cf6;border-color:#b8a0ff}
    .career-now .career-dot{background:#ff2bd6;border-color:#ffc2f5}
    .career-dot.pulse{animation:careerPulse 1.8s ease-in-out infinite}
    .career-start strong,.career-transition strong,.career-now strong{font:900 13px ui-monospace,monospace;color:#fff;letter-spacing:.08em}.career-start small,.career-transition small,.career-now small{color:#9fb0c1;font:700 10px ui-monospace,monospace;letter-spacing:.12em}
    .experience-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.experience-card{padding:28px 30px;background:rgba(3,9,14,.74);border:1px solid rgba(0,229,255,.34);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);clip-path:polygon(0 0,98.8% 0,100% 10%,100% 90%,98.8% 100%,0 100%,1.2% 90%,1.2% 10%)}
    .experience-card.current{border-color:rgba(0,229,255,.58)}.experience-card-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:14px}.experience-status{color:#00e5ff;font:800 11px ui-monospace,monospace;letter-spacing:.17em}.experience-card time{color:#cbd5e1;font:700 12px ui-monospace,monospace}.experience-card h3{margin:0;color:#fff;font-size:clamp(28px,3vw,40px);font-weight:900;line-height:1.08}.experience-company{margin:7px 0 18px;color:#9bdfff;font:900 16px ui-monospace,monospace;letter-spacing:.14em}.experience-card ul{margin:0;padding-left:21px;color:#d7e0eb;display:grid;gap:12px}.experience-card li{font-size:15px;font-weight:600;line-height:1.48}.experience-footer{display:flex;align-items:center;gap:10px;margin-top:auto;color:#9fb0c1;font:800 11px ui-monospace,monospace;letter-spacing:.16em}.experience-footer strong{margin-left:auto;color:#dce7f3;font-size:12px}.live-pulse{width:8px;height:8px;border-radius:50%;background:#00ffb3;box-shadow:0 0 12px rgba(0,255,179,.8);animation:careerPulse 1.4s ease-in-out infinite}
    @keyframes careerPulse{0%,100%{transform:scale(.9);opacity:.72;box-shadow:0 0 10px rgba(0,229,255,.4)}50%{transform:scale(1.18);opacity:1;box-shadow:0 0 24px rgba(0,229,255,.95)}}
    @media(max-width:760px){.experience-panel{height:auto;min-height:100vh}.experience-grid{grid-template-columns:1fr}.experience-heading{font-size:46px}.experience-card li{font-size:14px}}
  `,
  });
}

function updateExperienceProgress() {
  const start = new Date('2023-09-01T00:00:00+05:30').getTime();
  const transition = new Date('2025-08-01T00:00:00+05:30').getTime();
  const now = Date.now();
  const total = Math.max(1, now - start);
  document.documentElement.style.setProperty('--career-progress', '100%');
  const durationEl = document.querySelector('.experience-duration');
  if (durationEl) {
    const months = Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24 * 30.4375)));
    durationEl.textContent = `${Math.floor(months / 12)}y ${months % 12}m total • Started Sep 2023 • Current role since Aug 2025`;
  }
  const transitionNode = document.querySelector('.career-transition');
  if (transitionNode) {
    const phase = Math.min(100, Math.max(0, ((transition - start) / total) * 100));
    transitionNode.style.transform = `translateX(${Math.max(-8, Math.min(8, phase - 50))}px)`;
  }
}

function setView(view) {
  const allowed = ['home','about','experience','arsenal'];
  const activeView = allowed.includes(view) ? view : 'home';
  const isExperience = activeView === 'experience';
  const isArsenal = activeView === 'arsenal';

  Portfolio.activateView(`#${activeView}`);

  if (isExperience) {
    runGuarded('experience section render', () => {
      injectExperienceSection();
      updateExperienceProgress();
    });
  }
  if (isArsenal) runGuarded('arsenal section render', () => {
    window.injectScientificArsenalSection?.();
  });
}

function navigateToView(event, view) {
  const link = event.currentTarget;
  if (link.getAttribute('href') !== `#${view}`) return;
  event.preventDefault();
  history.replaceState(null, '', `#${view}`);
  setView(view);
  document.getElementById(view)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function onHomeClick(event) {
  navigateToView(event, 'home');
  if (event.defaultPrevented) resetHeroTyping();
}
function onAboutClick(event) { navigateToView(event, 'about'); }
function onExperienceClick(event) { navigateToView(event, 'experience'); }
function onArsenalClick(event) { navigateToView(event, 'arsenal'); }

window.addEventListener('hashchange', () => {
  runGuarded('view hashchange', () => {
    const view = window.location.hash.replace('#', '');
    if (['home', 'about', 'experience', 'arsenal'].includes(view)) setView(view);
  });
});

function setDefaultView() {
  const hash = window.location.hash.replace('#', '');
  const ownViews = ['about','experience','arsenal','home'];
  const isRegisteredView = Portfolio.VIEWS.some((entry) => entry.view === hash);
  const view = isRegisteredView ? hash : 'home';
  if (!isRegisteredView && window.location.hash !== '#home') {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${view}`);
  }
  if (ownViews.includes(view)) setView(view);
  else Portfolio.activateView(`#${view}`);
  if (view === 'experience') runGuarded('experience section render', () => {
    injectExperienceSection();
  });
  if (view === 'arsenal') runGuarded('arsenal section render', () => {
    window.injectScientificArsenalSection?.();
  });
  document.getElementById(view)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function setHeroViewport() {
  const hero = document.querySelector('.hero');
  const content = document.querySelector('.content');
  if (!hero || !content) {
    reportMissing('hero viewport sizing', !hero ? '.hero' : '.content');
    return;
  }
  if (window.innerWidth > 760) {
    const styles = getComputedStyle(content);
    const topPad = parseFloat(styles.paddingTop) || 0;
    const bottomPad = parseFloat(styles.paddingBottom) || 0;
    hero.style.minHeight = `${Math.max(520, window.innerHeight - topPad - bottomPad)}px`;
  } else {
    hero.style.minHeight = '';
  }
}

window.addEventListener('resize', () => {
  resize();
  setHeroViewport();
  if (document.body.classList.contains('experience-active')) updateExperienceProgress();
});
window.addEventListener('pointermove', (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
}, { passive: true });
window.addEventListener('pointerleave', () => { pointer.active = false; });
window.addEventListener('blur', () => { pointer.active = false; });

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    cancelAnimationFrame(raf);
  } else {
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
});

document.querySelector('.sidebar nav a[href="#home"]')?.addEventListener('click', onHomeClick);
document.querySelector('.sidebar nav a[href="#about"]')?.addEventListener('click', onAboutClick);
document.querySelector('.sidebar nav a[href="#experience"]')?.addEventListener('click', onExperienceClick);
document.querySelector('.sidebar nav a[href="#arsenal"]')?.addEventListener('click', onArsenalClick);

resize();
setHeroViewport();
raf = requestAnimationFrame(frame);
setDefaultView();
resetHeroTyping();
