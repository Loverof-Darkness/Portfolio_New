function injectScientificArsenalSection() {
  const instruments = [
    ['01', 'HPLC', 'Chromatographic Analysis'],
    ['02', 'UPLC', 'Ultra-High-Performance LC'],
    ['03', 'Ion Chromatography', 'Inorganic Ion Analysis'],
    ['04', 'IR', 'Infrared Spectroscopy'],
    ['05', 'UV-Visible Spectrophotometer', 'UV-Vis Spectroscopy'],
    ['06', 'Zeta Sizer', 'Particle / Zeta Potential'],
    ['07', 'DSC', 'Thermal Analysis'],
    ['08', 'TGA', 'Thermogravimetric Analysis'],
    ['09', 'Viscometer', 'Rheological Measurement'],
    ['10', 'pH meter', 'Electrochemical Measurement'],
    ['11', 'Osmometer', 'Osmolality Measurement'],
    ['12', 'Other Wet Chemical Techniques', 'Classical Analytical Techniques'],
  ];

  const section = Portfolio.renderPanel({
    id: 'arsenal',
    className: 'arsenal-rebuild',
    styleId: 'arsenal-rebuild-style',
    html: `
    <header class="arsenal-rebuild-header">
      <h2>INSTRUMENTS HANDLED</h2>
      <p class="arsenal-rebuild-intro">Hands-on analytical experience across chromatography, spectroscopy, thermal analysis, particle characterization and core wet-chemistry techniques used in pharmaceutical research &amp; development.</p>
    </header>
    <div class="arsenal-rebuild-grid" aria-label="Analytical instruments handled">
      ${instruments.map(([num, name, category], index) => `
        <article class="arsenal-rebuild-card" style="--delay:${index * 180}ms">
          <div class="arsenal-rebuild-number">${num}</div>
          <h3>${name}</h3>
          <p>${category}</p>
        </article>
      `).join('')}
    </div>
  `,
    css: `

    .arsenal-rebuild {
      min-height:100vh;
      height:100vh;
      overflow:auto;
      padding:4px 0 10px;
      scroll-snap-align:start;
      scroll-snap-stop:always;
      display:flex;
      flex-direction:column;
      gap:12px;
    }
    .arsenal-rebuild-header {
      max-width:960px;
      margin:0;
      padding:0;
    }
    .arsenal-rebuild-header h2 {
      margin:0;
      font-size:clamp(44px,5.2vw,70px);
      line-height:.92;
      font-weight:950;
      letter-spacing:-.05em;
      ${Portfolio.gradientText('linear-gradient(90deg,#fff 0%,#00e5ff 48%,#8b5cf6 100%)')}
    }
    .arsenal-rebuild-intro {
      max-width:900px;
      margin:6px 0 0;
      color:#cbd5e1;
      font-size:15px;
      font-weight:600;
      line-height:1.35;
    }
    .arsenal-rebuild-grid {
      display:grid;
      grid-template-columns:repeat(4,minmax(0,1fr));
      grid-template-rows:repeat(3,minmax(125px,1fr));
      gap:16px 20px;
      flex:1 1 auto;
      min-height:0;
    }
    .arsenal-rebuild-card {
      min-height:125px;
      padding:18px 18px;
      border:1px solid rgba(0,229,255,.26);
      border-radius:16px;
      background:linear-gradient(145deg,rgba(3,15,22,.88),rgba(2,6,11,.82));
      backdrop-filter:blur(11px);
      -webkit-backdrop-filter:blur(11px);
      box-shadow:inset 0 0 28px rgba(0,229,255,.025),0 0 18px rgba(0,0,0,.2);
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:flex-start;
      opacity:0;
      animation:arsenalRebuildIn .65s cubic-bezier(.2,.8,.2,1) forwards;
      animation-delay:var(--delay);
      transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease,background .2s ease;
    }
    .arsenal-rebuild-card:nth-child(1){grid-column:1;grid-row:1}
    .arsenal-rebuild-card:nth-child(2){grid-column:2;grid-row:1}
    .arsenal-rebuild-card:nth-child(3){grid-column:3;grid-row:1}
    .arsenal-rebuild-card:nth-child(4){grid-column:4;grid-row:1}
    .arsenal-rebuild-card:nth-child(5){grid-column:4;grid-row:2}
    .arsenal-rebuild-card:nth-child(6){grid-column:3;grid-row:2}
    .arsenal-rebuild-card:nth-child(7){grid-column:2;grid-row:2}
    .arsenal-rebuild-card:nth-child(8){grid-column:1;grid-row:2}
    .arsenal-rebuild-card:nth-child(9){grid-column:1;grid-row:3}
    .arsenal-rebuild-card:nth-child(10){grid-column:2;grid-row:3}
    .arsenal-rebuild-card:nth-child(11){grid-column:3;grid-row:3}
    .arsenal-rebuild-card:nth-child(12){grid-column:4;grid-row:3}
    .arsenal-rebuild-card:hover {
      transform:translateY(-4px);
      border-color:rgba(0,229,255,.82);
      background:linear-gradient(145deg,rgba(3,19,28,.94),rgba(6,6,16,.92));
      box-shadow:0 0 26px rgba(0,229,255,.14),inset 0 0 25px rgba(139,92,246,.07);
    }
    .arsenal-rebuild-number {
      color:#00e5ff;
      font:900 16px ui-monospace,monospace;
      letter-spacing:.08em;
      margin-bottom:7px;
    }
    .arsenal-rebuild-card h3 {
      margin:0;
      color:#f5f8ff;
      font-size:clamp(18px,1.7vw,25px);
      line-height:1.12;
      font-weight:950;
    }
    .arsenal-rebuild-card p {
      margin:7px 0 0;
      color:#8fdceb;
      font:700 11px ui-monospace,monospace;
      letter-spacing:.08em;
      text-transform:uppercase;
    }
    @keyframes arsenalRebuildIn {
      from { opacity:0; transform:translateY(24px) scale(.95); }
      to { opacity:1; transform:translateY(0) scale(1); }
    }
    @media(max-width:900px){
      .arsenal-rebuild-grid{grid-template-columns:repeat(3,minmax(0,1fr));grid-template-rows:repeat(4,minmax(112px,1fr));gap:14px}
      .arsenal-rebuild-card:nth-child(1){grid-column:1;grid-row:1}.arsenal-rebuild-card:nth-child(2){grid-column:2;grid-row:1}.arsenal-rebuild-card:nth-child(3){grid-column:3;grid-row:1}
      .arsenal-rebuild-card:nth-child(4){grid-column:3;grid-row:2}.arsenal-rebuild-card:nth-child(5){grid-column:2;grid-row:2}.arsenal-rebuild-card:nth-child(6){grid-column:1;grid-row:2}
      .arsenal-rebuild-card:nth-child(7){grid-column:1;grid-row:3}.arsenal-rebuild-card:nth-child(8){grid-column:2;grid-row:3}.arsenal-rebuild-card:nth-child(9){grid-column:3;grid-row:3}
      .arsenal-rebuild-card:nth-child(10){grid-column:3;grid-row:4}.arsenal-rebuild-card:nth-child(11){grid-column:2;grid-row:4}.arsenal-rebuild-card:nth-child(12){grid-column:1;grid-row:4}
    }
    @media(max-width:600px){
      .arsenal-rebuild{height:auto;min-height:100vh;padding-top:6px}
      .arsenal-rebuild-header h2{font-size:42px}
      .arsenal-rebuild-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-template-rows:repeat(6,minmax(100px,1fr));gap:10px}
      .arsenal-rebuild-card:nth-child(1){grid-column:1;grid-row:1}.arsenal-rebuild-card:nth-child(2){grid-column:2;grid-row:1}
      .arsenal-rebuild-card:nth-child(3){grid-column:2;grid-row:2}.arsenal-rebuild-card:nth-child(4){grid-column:1;grid-row:2}
      .arsenal-rebuild-card:nth-child(5){grid-column:1;grid-row:3}.arsenal-rebuild-card:nth-child(6){grid-column:2;grid-row:3}
      .arsenal-rebuild-card:nth-child(7){grid-column:2;grid-row:4}.arsenal-rebuild-card:nth-child(8){grid-column:1;grid-row:4}
      .arsenal-rebuild-card:nth-child(9){grid-column:1;grid-row:5}.arsenal-rebuild-card:nth-child(10){grid-column:2;grid-row:5}
      .arsenal-rebuild-card:nth-child(11){grid-column:2;grid-row:6}.arsenal-rebuild-card:nth-child(12){grid-column:1;grid-row:6}
      .arsenal-rebuild-card h3{font-size:16px}.arsenal-rebuild-intro{font-size:14px}
    }
  `,
  });
  if (!section) return;
}

window.injectScientificArsenalSection = injectScientificArsenalSection;

function renderArsenalIfActive() {
  if (document.body?.classList.contains('arsenal-active')) {
    injectScientificArsenalSection();
  }
}

renderArsenalIfActive();
window.addEventListener('hashchange', renderArsenalIfActive);
setTimeout(renderArsenalIfActive, 100);
setTimeout(renderArsenalIfActive, 400);
