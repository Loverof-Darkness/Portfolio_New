const canvas = document.getElementById('molecule-bg');
const ctx = canvas.getContext('2d');

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
  const c = palette[Math.floor(Math.random() * palette.length)];
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.28,
    vy: (Math.random() - 0.5) * 0.28,
    radius: 1.0 + Math.random() * 2.0,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.0011 + Math.random() * 0.002,
    color: c,
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
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

function drawBonds() {
  const maxDistance = Math.min(118, Math.max(70, Math.min(width, height) * 0.1));

  for (let i = 0; i < nodes.length; i += 1) {
    const a = nodes[i];
    for (let j = i + 1; j < nodes.length; j += 1) {
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.hypot(dx, dy);
      if (dist > maxDistance) continue;

      const proximity = 1 - dist / maxDistance;
      const alpha = 0.38 + proximity * 0.34;
      const mix = palette[(i * 7 + j * 3) % palette.length];
      const brightness = 0.75 + proximity * 0.25;

      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.lineWidth = 0.65 + proximity * 0.95;
      ctx.strokeStyle = rgba(mix, alpha * brightness);
      ctx.shadowColor = rgba(mix, 0.3 + proximity * 0.25);
      ctx.shadowBlur = 4 + proximity * 5;
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
  }
}

function drawAtoms(now) {
  for (const node of nodes) {
    const wave = (Math.sin(now * node.pulseSpeed + node.pulse) + 1) / 2;
    const glow = 0.55 + wave * 0.45;
    const r = node.radius + wave * 0.65;

    const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 8);
    gradient.addColorStop(0, rgba(node.color, 0.24 * glow));
    gradient.addColorStop(0.28, rgba(node.color, 0.075 * glow));
    gradient.addColorStop(1, rgba(node.color, 0));

    ctx.beginPath();
    ctx.fillStyle = gradient;
    ctx.arc(node.x, node.y, r * 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = rgba(node.color, 0.68 + wave * 0.32);
    ctx.shadowColor = rgba(node.color, 0.9);
    ctx.shadowBlur = 8 + wave * 12;
    ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

function update(dt) {
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
  update(dt);
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
      } else {
        element.classList.remove('is-typing');
        element.classList.add('is-done');
        if (caret) caret.style.opacity = '0';
        resolve();
      }
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
  introOutput.textContent = '';
  intro.classList.remove('is-typing', 'is-done');
  lines.forEach((line) => {
    const span = line.querySelector('span');
    const caret = line.querySelector('.typing-caret');
    span.textContent = '';
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

function onHomeClick(event) {
  const home = event.currentTarget;
  if (home.getAttribute('href') === '#home') {
    event.preventDefault();
    history.replaceState(null, '', '#home');
    document.getElementById('home')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    resetHeroTyping();
  }
}

function setDefaultHome() {
  if (window.location.hash !== '#home') {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}#home`);
  }
  document.getElementById('home')?.scrollIntoView({ behavior: 'auto', block: 'start' });
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
}, { passive: true });
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

resize();
setHeroViewport();
raf = requestAnimationFrame(frame);
setDefaultHome();
resetHeroTyping();
