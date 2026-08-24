(() => {
  const educationData = [
    {
      number: '01',
      degree: 'B.Pharma Pharmacy',
      institution: 'Indira Gandhi National Tribal University (IGNTU), Amarkantak',
      years: '2017–2021',
      mode: 'FULL TIME',
      accent: '#00e5ff'
    },
    {
      number: '02',
      degree: 'M.Pharma Pharmacy',
      institution: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal',
      years: '2021–2023',
      mode: 'FULL TIME',
      accent: '#8b5cf6'
    }
  ];

  function renderEducation() {
    const content = document.querySelector('.content');
    if (!content) return;

    const old = document.getElementById('education');
    if (old) old.remove();
    document.getElementById('education-runtime-style')?.remove();

    const section = document.createElement('section');
    section.id = 'education';
    section.className = 'education-panel';
    section.innerHTML = `
      <header class="education-header">
        <p class="education-kicker">ACADEMIC JOURNEY</p>
        <h2>EDUCATION</h2>
        <p class="education-intro">A focused academic path in pharmaceutical sciences, from foundational pharmacy training to postgraduate specialization.</p>
      </header>

      <div class="education-track" aria-label="Education timeline">
        <div class="education-line"></div>
        ${educationData.map((item, index) => `
          <article class="education-card ${index === 0 ? 'is-active' : ''}" tabindex="0" data-education-index="${index}" style="--accent:${item.accent}; --delay:${index * 220}ms">
            <div class="education-card-head">
              <span class="education-number">${item.number}</span>
              <span class="education-years">${item.years}</span>
            </div>
            <div class="education-node"></div>
            <div class="education-card-body">
              <p class="education-mode">${item.mode}</p>
              <h3>${item.degree}</h3>
              <p class="education-institution">${item.institution}</p>
              <div class="education-detail">${index === 0 ? 'Undergraduate foundation in pharmaceutical sciences.' : 'Postgraduate specialization in pharmaceutical sciences.'}</div>
            </div>
            <button class="education-expand" type="button" aria-label="Show details for ${item.degree}">+</button>
          </article>
        `).join('')}
      </div>

      <div class="education-summary">
        <span class="education-summary-dot"></span>
        <span>2017 → 2023 • Pharmacy education • Full-time study</span>
      </div>
    `;
    content.appendChild(section);

    const style = document.createElement('style');
    style.id = 'education-runtime-style';
    style.textContent = `
      body.education-active .hero,
      body.education-active .about-panel,
      body.education-active .experience-panel,
      body.education-active .arsenal-panel,
      body.education-active .arsenal-rebuild { display:none !important; }
      body.home-active #education,
      body.about-active #education,
      body.experience-active #education,
      body.arsenal-active #education { display:none !important; }

      .education-panel {
        min-height:100vh;
        height:100vh;
        overflow:auto;
        padding:34px 0 28px;
        display:flex;
        flex-direction:column;
        gap:28px;
        scroll-snap-align:start;
        scroll-snap-stop:always;
      }
      .education-header { max-width:980px; }
      .education-kicker {
        margin:0 0 8px;
        color:#00e5ff;
        font:800 12px ui-monospace,monospace;
        letter-spacing:.24em;
      }
      .education-header h2 {
        margin:0;
        font-size:clamp(46px,5.5vw,74px);
        line-height:.94;
        font-weight:950;
        letter-spacing:-.05em;
        background:linear-gradient(90deg,#fff 0%,#00e5ff 48%,#8b5cf6 100%);
        -webkit-background-clip:text;
        background-clip:text;
        color:transparent;
      }
      .education-intro {
        max-width:880px;
        margin:12px 0 0;
        color:#cbd5e1;
        font-size:17px;
        font-weight:600;
        line-height:1.5;
      }
      .education-track {
        position:relative;
        flex:1 1 auto;
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        align-items:stretch;
        gap:24px;
        padding:30px 4px 12px;
      }
      .education-line {
        position:absolute;
        left:25%;
        right:25%;
        top:42px;
        height:2px;
        background:linear-gradient(90deg,rgba(0,229,255,.72),rgba(139,92,246,.72));
        box-shadow:0 0 16px rgba(0,229,255,.2);
      }
      .education-card {
        position:relative;
        min-height:280px;
        padding:28px 30px 26px;
        border:1px solid color-mix(in srgb, var(--accent) 45%, transparent);
        border-radius:20px;
        background:linear-gradient(145deg,rgba(3,15,22,.88),rgba(2,6,11,.82));
        backdrop-filter:blur(11px);
        -webkit-backdrop-filter:blur(11px);
        box-shadow:inset 0 0 30px rgba(0,229,255,.025),0 0 22px rgba(0,0,0,.22);
        display:flex;
        flex-direction:column;
        justify-content:flex-start;
        opacity:0;
        transform:translateY(26px) scale(.96);
        animation:educationCardIn .7s cubic-bezier(.2,.8,.2,1) forwards;
        animation-delay:var(--delay);
        transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease,background .22s ease;
        cursor:pointer;
      }
      .education-card:hover,
      .education-card:focus-visible,
      .education-card.is-active {
        transform:translateY(-6px) scale(1.015);
        border-color:var(--accent);
        box-shadow:0 0 30px color-mix(in srgb, var(--accent) 18%, transparent), inset 0 0 25px rgba(139,92,246,.06);
        outline:none;
      }
      .education-card-head { display:flex; align-items:center; justify-content:space-between; gap:12px; }
      .education-number {
        color:var(--accent);
        font:900 18px ui-monospace,monospace;
        letter-spacing:.08em;
      }
      .education-years {
        color:#fff;
        font:800 12px ui-monospace,monospace;
        letter-spacing:.08em;
      }
      .education-node {
        width:18px;
        height:18px;
        border-radius:50%;
        margin:18px auto 18px;
        background:var(--accent);
        border:3px solid rgba(255,255,255,.72);
        box-shadow:0 0 0 5px color-mix(in srgb, var(--accent) 12%, transparent),0 0 24px color-mix(in srgb, var(--accent) 70%, transparent);
      }
      .education-card-body { text-align:center; }
      .education-mode {
        margin:0 0 8px;
        color:#8fdceb;
        font:800 11px ui-monospace,monospace;
        letter-spacing:.18em;
      }
      .education-card h3 {
        margin:0;
        color:#f5f8ff;
        font-size:clamp(24px,2.4vw,34px);
        line-height:1.1;
        font-weight:950;
      }
      .education-institution {
        margin:12px auto 0;
        max-width:560px;
        color:#d6e1eb;
        font-size:16px;
        font-weight:700;
        line-height:1.45;
      }
      .education-detail {
        max-height:0;
        overflow:hidden;
        opacity:0;
        margin:0 auto;
        max-width:560px;
        color:#91a4b7;
        font-size:14px;
        line-height:1.5;
        transition:max-height .25s ease,opacity .25s ease,margin-top .25s ease;
      }
      .education-card.is-active .education-detail,
      .education-card:hover .education-detail,
      .education-card:focus-visible .education-detail {
        max-height:80px;
        opacity:1;
        margin-top:12px;
      }
      .education-expand {
        position:absolute;
        right:16px;
        bottom:14px;
        width:28px;
        height:28px;
        border:1px solid color-mix(in srgb, var(--accent) 55%, transparent);
        border-radius:50%;
        background:rgba(0,0,0,.2);
        color:var(--accent);
        font-size:20px;
        line-height:1;
        cursor:pointer;
      }
      .education-summary {
        display:flex;
        align-items:center;
        justify-content:center;
        gap:10px;
        color:#91a4b7;
        font:800 11px ui-monospace,monospace;
        letter-spacing:.12em;
      }
      .education-summary-dot { width:8px; height:8px; border-radius:50%; background:#00ffb3; box-shadow:0 0 12px rgba(0,255,179,.8); }
      @keyframes educationCardIn { to { opacity:1; transform:translateY(0) scale(1); } }
      @media(max-width:760px){
        .education-panel{height:auto;min-height:100vh;padding-top:28px}
        .education-header h2{font-size:46px}
        .education-track{grid-template-columns:1fr;padding-top:10px}
        .education-line{left:24px;right:auto;top:20px;bottom:20px;width:2px;height:auto;background:linear-gradient(180deg,rgba(0,229,255,.72),rgba(139,92,246,.72))}
        .education-card{min-height:250px;padding:24px 22px 22px;margin-left:14px}
        .education-node{margin:10px 0 18px 0}
        .education-card-body{text-align:left;padding-left:26px}
        .education-institution{margin-left:0}
      }
    `;
    document.head.appendChild(style);

    const cards = [...section.querySelectorAll('.education-card')];
    cards.forEach((card) => {
      const activate = () => cards.forEach((c) => c.classList.toggle('is-active', c === card));
      card.addEventListener('mouseenter', activate);
      card.addEventListener('focus', activate);
      card.addEventListener('click', (event) => {
        if (event.target.closest('.education-expand')) activate();
        else activate();
      });
    });
  }

  function showEducation() {
    document.body.classList.remove('home-active','about-active','experience-active','arsenal-active');
    document.body.classList.add('education-active');
    document.querySelectorAll('.sidebar nav a').forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === '#education');
    });
    renderEducation();
    history.replaceState(null, '', '#education');
    document.getElementById('education')?.scrollIntoView({ behavior:'smooth', block:'start' });
  }

  function hideEducation() {
    document.body.classList.remove('education-active');
    document.getElementById('education')?.remove();
  }

  function bind() {
    const link = document.querySelector('.sidebar nav a[href="#education"]');
    if (!link) return;
    link.addEventListener('click', (event) => {
      event.preventDefault();
      showEducation();
    });

    window.addEventListener('hashchange', () => {
      if (window.location.hash === '#education') showEducation();
      else hideEducation();
    });

    if (window.location.hash === '#education') showEducation();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, { once:true });
  else bind();
})();
