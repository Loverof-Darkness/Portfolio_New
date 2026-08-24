const canvas = document.getElementById('molecule-bg');
const ctx = canvas?.getContext('2d');

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
  if (!element) return Promise.resolve();
  const output = element.querySelector('strong, span:not(.typing-caret)') || element;
  const caret = element.querySelector('.typing-caret');
  output.textContent = '';
  element.classList.remove('is-done');
  element.classList.add('is-typing');

  let index = 0;
  return new Promise((resolve) => {
    const tick = () => {
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
    };
    tick();
  });
}

function resetHeroTyping() {
  const intro = document.querySelector('.intro-heading');
  const lines = [...document.querySelectorAll('.summary .typing-line')];
  if (!intro || lines.length !== 4) return;

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

  typeText(intro, "I'm Abhay Gupta.", 55).then(() => {
    const runLine = (index) => {
      if (index >= lines.length) return;
      typeText(lines[index], texts[index], 21).then(() => {
        window.setTimeout(() => runLine(index + 1), 180);
      });
    };
    window.setTimeout(() => runLine(0), 260);
  });
}

function injectExperienceSection() {
  if (document.getElementById('experience')) return;
  const content = document.querySelector('.content');
  if (!content) return;

  const experience = document.createElement('section');
  experience.id = 'experience';
  experience.className = 'experience-panel';
  experience.innerHTML = `
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
  `;
  content.appendChild(experience);

  const style = document.createElement('style');
  style.id = 'experience-runtime-styles';
  style.textContent = `
    .experience-panel{min-height:100vh;height:100vh;overflow:auto;padding:50px 0 42px;scroll-snap-align:start;scroll-snap-stop:always;display:flex;flex-direction:column;gap:26px}
    body.home-active .experience-panel,body.about-active .experience-panel,body.arsenal-active .experience-panel{display:none!important}
    body.experience-active .hero,body.experience-active .about-panel,body.arsenal-active .hero,body.arsenal-active .about-panel{display:none!important}
    .experience-header-wrap{max-width:980px}
    .experience-heading{margin:0;font-size:clamp(48px,5.5vw,76px);line-height:.92;font-weight:900;letter-spacing:-.05em;background:linear-gradient(90deg,#fff,#00e5ff 48%,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 24px rgba(0,229,255,.14)}
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
  `;
  document.head.appendChild(style);
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

function injectScientificArsenalSection() {
  if (document.getElementById('arsenal')) return;
  const content = document.querySelector('.content');
  if (!content) return;

  const instruments = [
    'HPLC','UPLC','Ion Chromatography','IR','UV-Visible Spectrophotometer','Zeta Sizer',
    'DSC','TGA','Viscometer','pH meter','Osmometer','Other Wet Chemical Techniques',
  ];
  const symbols = ['⌁','◈','⊕','IR','UV','ζ','Δ','TGA','η','pH','Ω','∿'];

  const arsenal = document.createElement('section');
  arsenal.id = 'arsenal';
  arsenal.className = 'arsenal-panel';
  arsenal.innerHTML = `
    <div class="arsenal-header-wrap">
      <h2 class="arsenal-heading">INSTRUMENTS HANDLED</h2>
    </div>
    <div class="arsenal-orbit" role="list" aria-label="Analytical instruments handled">
      <div class="arsenal-core">
        <div class="arsenal-core-ring"></div>
        <span class="arsenal-core-kicker">SCIENTIFIC ARSENAL</span>
        <strong class="arsenal-core-title">12+ TOOLS</strong>
        <span class="arsenal-core-hint">HOVER / CLICK</span>
        <p class="arsenal-core-selected">Select an instrument</p>
      </div>
      ${instruments.map((name, index) => `
        <button class="arsenal-item" style="--i:${index}" type="button" role="listitem" aria-label="${name}">
          <span class="arsenal-number">${String(index + 1).padStart(2,'0')}</span>
          <span class="arsenal-icon">${symbols[index]}</span>
          <span class="arsenal-name">${name}</span>
        </button>
      `).join('')}
    </div>
  `;
  content.appendChild(arsenal);

  const items = [...arsenal.querySelectorAll('.arsenal-item')];
  const selected = arsenal.querySelector('.arsenal-core-selected');
  items.forEach((item, index) => {
    const activate = () => {
      items.forEach((node) => node.classList.remove('is-selected'));
      item.classList.add('is-selected');
      if (selected) selected.textContent = `${String(index + 1).padStart(2,'0')} • ${instruments[index]}`;
    };
    item.addEventListener('mouseenter', activate);
    item.addEventListener('focus', activate);
    item.addEventListener('click', activate);
  });

  const style = document.createElement('style');
  style.id = 'arsenal-runtime-styles';
  style.textContent = `
    body.home-active .arsenal-panel,body.about-active .arsenal-panel,body.experience-active .arsenal-panel{display:none!important}
    body.arsenal-active .hero,body.arsenal-active .about-panel,body.arsenal-active .experience-panel{display:none!important}
    .arsenal-panel{min-height:100vh;height:100vh;overflow:auto;scroll-snap-align:start;scroll-snap-stop:always;padding:48px 0 34px;display:flex;flex-direction:column;gap:14px}
    .arsenal-header-wrap{text-align:center;margin:0 auto}.arsenal-heading{margin:0;font-size:clamp(48px,5.8vw,78px);line-height:.92;letter-spacing:-.05em;font-weight:900;background:linear-gradient(90deg,#fff 0%,#00e5ff 45%,#8b5cf6 100%);-webkit-background-clip:text;background-clip:text;color:transparent;text-shadow:0 0 26px rgba(0,229,255,.14)}
    .arsenal-orbit{position:relative;width:min(78vw,760px);aspect-ratio:1;margin:4px auto 0;flex:1 1 auto;min-height:560px;max-height:700px;border:1px solid rgba(0,229,255,.12);border-radius:50%;background:radial-gradient(circle at center,rgba(0,229,255,.04),transparent 43%);box-shadow:inset 0 0 80px rgba(0,229,255,.035),0 0 55px rgba(0,0,0,.28)}
    .arsenal-orbit::before,.arsenal-orbit::after{content:"";position:absolute;inset:13%;border:1px solid rgba(0,229,255,.16);border-radius:50%;pointer-events:none}.arsenal-orbit::after{inset:31%;border-color:rgba(139,92,246,.16)}
    .arsenal-core{position:absolute;left:50%;top:50%;width:220px;height:220px;transform:translate(-50%,-50%);border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;text-align:center;background:radial-gradient(circle at 50% 44%,rgba(0,229,255,.11),rgba(6,7,14,.92) 68%);border:1px solid rgba(0,229,255,.48);box-shadow:0 0 45px rgba(0,229,255,.12),inset 0 0 38px rgba(139,92,246,.08);z-index:2}.arsenal-core-ring{position:absolute;inset:-13px;border:1px dashed rgba(0,229,255,.26);border-radius:50%;animation:arsenalSpin 20s linear infinite}.arsenal-core-kicker{color:#00e5ff;font:800 10px ui-monospace,monospace;letter-spacing:.18em}.arsenal-core-title{color:#fff;font-size:28px;font-weight:900}.arsenal-core-hint{color:#7890a5;font:700 9px ui-monospace,monospace;letter-spacing:.16em}.arsenal-core-selected{min-height:20px;margin:5px 18px 0;color:#b9c7d7;font-size:13px;font-weight:700}
    .arsenal-item{--angle:calc((var(--i)*30deg) - 90deg);position:absolute;left:50%;top:50%;width:126px;min-height:92px;padding:10px 8px;transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(34vw,285px)*-1)) rotate(calc(var(--angle)*-1));border:1px solid rgba(0,229,255,.28);border-radius:18px;background:rgba(2,9,14,.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#ecf8ff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;cursor:pointer;opacity:0;animation:arsenalIn .7s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:calc(var(--i)*90ms);transition:.25s ease;box-shadow:0 0 18px rgba(0,229,255,.04);z-index:3}.arsenal-item:hover,.arsenal-item:focus-visible,.arsenal-item.is-selected{transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(34vw,285px)*-1)) rotate(calc(var(--angle)*-1)) scale(1.07);border-color:rgba(0,229,255,.85);box-shadow:0 0 25px rgba(0,229,255,.15),inset 0 0 20px rgba(139,92,246,.08);outline:none}.arsenal-number{color:#00e5ff;font:900 11px ui-monospace,monospace}.arsenal-icon{font:900 21px Georgia,serif;color:#dffaff}.arsenal-name{max-width:108px;color:#d7e4ef;font-size:11px;font-weight:800;line-height:1.12;text-align:center}
    @keyframes arsenalIn{from{opacity:0;transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(34vw,285px)*-.82)) rotate(calc(var(--angle)*-1)) scale(.75)}to{opacity:1;transform:translate(-50%,-50%) rotate(var(--angle)) translateY(calc(min(34vw,285px)*-1)) rotate(calc(var(--angle)*-1))}}@keyframes arsenalSpin{to{transform:rotate(360deg)}}
    @media(max-width:900px){.arsenal-orbit{width:min(92vw,620px);min-height:520px}.arsenal-core{width:180px;height:180px}.arsenal-core-title{font-size:24px}.arsenal-item{width:112px;min-height:80px}.arsenal-name{font-size:10px}}
    @media(max-width:760px){.arsenal-panel{height:auto;min-height:100vh;padding:32px 0 28px}.arsenal-heading{font-size:44px}.arsenal-orbit{width:100%;min-height:670px;border-radius:30px;aspect-ratio:auto}.arsenal-orbit::before,.arsenal-orbit::after{display:none}.arsenal-core{width:170px;height:170px}.arsenal-item{width:128px;min-height:74px;transform:translate(-50%,-50%) rotate(var(--angle)) translateY(-275px) rotate(calc(var(--angle)*-1))}.arsenal-item:hover,.arsenal-item:focus-visible,.arsenal-item.is-selected{transform:translate(-50%,-50%) rotate(var(--angle)) translateY(-275px) rotate(calc(var(--angle)*-1)) scale(1.05)}}
  `;
  document.head.appendChild(style);
}

function setView(view) {
  const allowed = ['home','about','experience','arsenal'];
  const activeView = allowed.includes(view) ? view : 'home';
  const isAbout = activeView === 'about';
  const isExperience = activeView === 'experience';
  const isArsenal = activeView === 'arsenal';

  document.body.classList.toggle('home-active', activeView === 'home');
  document.body.classList.toggle('about-active', isAbout);
  document.body.classList.toggle('experience-active', isExperience);
  document.body.classList.toggle('arsenal-active', isArsenal);

  document.querySelectorAll('.sidebar nav a').forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${activeView}`);
  });

  if (isExperience) {
    injectExperienceSection();
    updateExperienceProgress();
  }
  if (isArsenal) injectScientificArsenalSection();
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

function setDefaultView() {
  const hash = window.location.hash.replace('#', '');
  const view = ['about','experience','arsenal','home'].includes(hash) ? hash : 'home';
  if (window.location.hash !== `#${view}`) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#${view}`);
  }
  setView(view);
  if (view === 'experience') injectExperienceSection();
  if (view === 'arsenal') injectScientificArsenalSection();
  document.getElementById(view)?.scrollIntoView({ behavior: 'auto', block: 'start' });
}

function setHeroViewport() {
  const hero = document.querySelector('.hero');
  const content = document.querySelector('.content');
  if (!hero || !content) return;
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
