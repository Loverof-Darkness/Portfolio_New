(() => {
  const data = {
    title: 'Berberine Nanoparticles as a Promising Intervention for Diabetic-Wound Healing: A Comprehensive Review',
    journal: 'African Journal of Biomedical Research',
    type: 'REVIEW ARTICLE',
    published: 'APR 2025',
    volume: 'VOL. 28 · NO. 3S',
    pages: '55–67',
    doi: '10.53555/AJBR.v28i3S.7370',
    url: 'https://doi.org/10.53555/AJBR.v28i3S.7370'
  };

  function renderPublication() {
    const content = document.querySelector('.content');
    if (!content) return;
    document.getElementById('publications')?.remove();
    document.getElementById('publication-runtime-style')?.remove();

    const section = document.createElement('section');
    section.id = 'publications';
    section.className = 'publication-panel';
    section.innerHTML = `
      <div class="publication-copy">
        <div class="publication-kicker"><span>✦</span> PEER-REVIEWED PUBLICATION</div>
        <h2 class="publication-heading">PUBLICATION</h2>
        <p class="publication-tagline">Contributing to science. Creating impact.</p>
        <div class="publication-meta-pill">${data.type}</div>
        <h3 class="publication-title">${data.title}</h3>
        <p class="publication-journal">${data.journal}</p>
        <div class="publication-info-row">
          <div><span>PUBLISHED</span><strong>${data.published}</strong></div>
          <div><span>DOI</span><strong>${data.doi}</strong></div>
        </div>
        <p class="publication-summary">A comprehensive review of berberine nanoparticle approaches for diabetic-wound healing, covering formulation strategies, characterization, therapeutic potential and emerging preclinical evidence.</p>
        <div class="publication-actions">
          <a class="publication-button primary" href="${data.url}" target="_blank" rel="noopener noreferrer">READ PUBLICATION ↗</a>
          <a class="publication-button secondary" href="https://africanjournalofbiomedicalresearch.com/index.php/AJBR/article/view/7370" target="_blank" rel="noopener noreferrer">VIEW JOURNAL ↗</a>
        </div>
      </div>
      <div class="publication-visual" aria-label="Journal cover visual">
        <div class="publication-halo"></div>
        <div class="publication-book">
          <div class="publication-book-cover">
            <div class="book-issn">ISSN 1119-5096</div>
            <div class="book-title">AFRICAN JOURNAL OF<br>BIOMEDICAL RESEARCH</div>
            <div class="book-subtitle">A Peer-Reviewed Journal</div>
            <div class="book-art"><span></span><span></span><span></span></div>
            <div class="book-issue">VOLUME 28 &nbsp;|&nbsp; ISSUE 3(S)<br>APRIL 2025</div>
          </div>
          <div class="publication-book-pages"></div>
        </div>
        <div class="publication-platform"></div>
        <div class="publication-caption">${data.volume} · ${data.pages} · ${data.journal}</div>
      </div>
    `;
    content.appendChild(section);

    const style = document.createElement('style');
    style.id = 'publication-runtime-style';
    style.textContent = `
      body.publication-active .hero,body.publication-active .about-panel,body.publication-active .experience-panel,body.publication-active .arsenal-panel,body.publication-active .arsenal-rebuild,body.publication-active #education{display:none!important}
      body.home-active #publications,body.about-active #publications,body.experience-active #publications,body.arsenal-active #publications,body.education-active #publications{display:none!important}
      .publication-panel{min-height:100vh;height:100vh;overflow:hidden;padding:28px 0 26px;display:grid;grid-template-columns:minmax(0,1.04fr) minmax(420px,.96fr);gap:34px;align-items:center;scroll-snap-align:start;position:relative}
      .publication-copy{position:relative;z-index:3;max-width:800px}
      .publication-kicker{margin:0 0 14px;color:#9e63ff;font:800 13px ui-monospace,monospace;letter-spacing:.14em}.publication-kicker span{color:#00e5ff;margin-right:8px}
      .publication-heading{margin:0;font-size:clamp(50px,6vw,86px);line-height:.92;font-weight:950;letter-spacing:-.055em;background:linear-gradient(90deg,#fff 0%,#00e5ff 46%,#8b5cf6 100%);-webkit-background-clip:text;background-clip:text;color:transparent}
      .publication-tagline{margin:12px 0 28px;color:#b9c6d5;font-size:18px;font-style:italic;font-weight:600}
      .publication-meta-pill{display:inline-block;padding:8px 14px;border:1px solid rgba(0,229,255,.62);border-radius:999px;color:#00e5ff;font:800 11px ui-monospace,monospace;letter-spacing:.14em;background:rgba(0,229,255,.05)}
      .publication-title{margin:18px 0 12px;padding-left:18px;border-left:3px solid #00e5ff;color:#f5f8ff;font-size:clamp(28px,3.2vw,44px);line-height:1.08;font-weight:900;text-shadow:0 0 22px rgba(0,229,255,.06)}
      .publication-journal{margin:0 0 22px;color:#9bdfff;font:900 15px ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}
      .publication-info-row{display:grid;grid-template-columns:180px 1fr;gap:18px;margin:0 0 20px}.publication-info-row>div{padding:12px 14px;border:1px solid rgba(0,229,255,.25);background:rgba(2,10,16,.58);border-radius:10px}.publication-info-row span{display:block;color:#7f92a5;font:800 10px ui-monospace,monospace;letter-spacing:.15em;margin-bottom:5px}.publication-info-row strong{display:block;color:#eef7ff;font:800 14px ui-monospace,monospace;line-height:1.35;word-break:break-word}
      .publication-summary{margin:0 0 24px;max-width:760px;color:#d0dae5;font-size:16px;line-height:1.6;font-weight:600}
      .publication-actions{display:flex;gap:14px;flex-wrap:wrap}.publication-button{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:0 18px;border:1px solid rgba(0,229,255,.66);border-radius:10px;color:#fff;font:800 11px ui-monospace,monospace;letter-spacing:.1em;text-decoration:none;transition:.2s ease;background:rgba(0,229,255,.04)}.publication-button.primary{background:linear-gradient(100deg,rgba(0,229,255,.16),rgba(139,92,246,.14));border-color:#00e5ff}.publication-button.secondary{border-color:#8b5cf6}.publication-button:hover{transform:translateY(-3px);box-shadow:0 0 24px rgba(0,229,255,.14)}
      .publication-visual{position:relative;height:100%;min-height:620px;display:grid;place-items:center;overflow:hidden}.publication-halo{position:absolute;width:520px;height:520px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,.12),rgba(139,92,246,.08) 40%,transparent 68%);filter:blur(8px)}
      .publication-book{position:relative;width:min(360px,70%);aspect-ratio:1/1.33;transform:perspective(1100px) rotateY(-13deg) rotateX(2deg) rotateZ(-1deg);filter:drop-shadow(0 28px 34px rgba(0,0,0,.55));animation:publicationFloat 4.8s ease-in-out infinite}.publication-book-cover{position:absolute;inset:0 18px 0 0;border:1px solid rgba(119,179,255,.56);border-radius:8px 3px 3px 8px;background:linear-gradient(160deg,#0f2d47,#07111c 58%,#24113f);box-shadow:inset 0 0 30px rgba(0,229,255,.05),0 0 24px rgba(0,229,255,.08);overflow:hidden;padding:22px 20px;display:flex;flex-direction:column}.book-issn{color:#b5c7da;text-align:right;font:800 9px ui-monospace,monospace}.book-title{margin-top:62px;color:#eef8ff;font-family:Georgia,serif;font-size:clamp(18px,2vw,28px);line-height:1.15;text-align:center}.book-subtitle{margin-top:15px;color:#b8c9d8;text-align:center;font:700 9px ui-monospace,monospace;letter-spacing:.08em}.book-art{margin-top:auto;height:34%;position:relative;overflow:hidden;background:linear-gradient(150deg,rgba(0,229,255,.13),rgba(139,92,246,.18));border-top:1px solid rgba(255,255,255,.12)}.book-art span{position:absolute;border:1px solid rgba(153,212,255,.38);border-radius:50%;filter:drop-shadow(0 0 8px rgba(0,229,255,.3))}.book-art span:nth-child(1){width:160px;height:80px;left:-20px;top:18px;transform:rotate(20deg)}.book-art span:nth-child(2){width:180px;height:100px;right:-45px;bottom:-6px;transform:rotate(-18deg)}.book-art span:nth-child(3){width:110px;height:110px;left:72px;top:16px;border-radius:42%;transform:rotate(35deg)}.book-issue{margin-top:16px;color:#b7c9da;font:800 9px ui-monospace,monospace;line-height:1.45}
      .publication-book-pages{position:absolute;top:7px;right:0;width:24px;height:calc(100% - 14px);background:repeating-linear-gradient(90deg,#d9e2e8 0,#d9e2e8 2px,#b8c2c9 3px,#eef3f5 5px);border-radius:0 5px 5px 0;transform:translateX(8px)}
      .publication-platform{position:absolute;bottom:70px;width:430px;height:64px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(0,229,255,.28),rgba(139,92,246,.18) 45%,transparent 72%);border:1px solid rgba(0,229,255,.32);box-shadow:0 0 20px rgba(0,229,255,.15),inset 0 0 18px rgba(139,92,246,.12)}.publication-caption{position:absolute;bottom:40px;color:#8395a8;font:800 10px ui-monospace,monospace;letter-spacing:.12em;text-align:center}
      @keyframes publicationFloat{0%,100%{transform:perspective(1100px) rotateY(-13deg) rotateX(2deg) translateY(0)}50%{transform:perspective(1100px) rotateY(-10deg) rotateX(0deg) translateY(-10px)}}
      @media(max-width:900px){.publication-panel{grid-template-columns:1fr;gap:10px;overflow:auto;padding-top:20px}.publication-visual{min-height:480px}.publication-book{width:300px}.publication-platform{bottom:55px}.publication-caption{bottom:22px}.publication-heading{font-size:52px}}
      @media(max-width:600px){.publication-info-row{grid-template-columns:1fr}.publication-title{font-size:28px}.publication-summary{font-size:15px}.publication-visual{min-height:420px}.publication-book{width:260px}}
    `;
    content.appendChild(section);
    document.head.appendChild(style);

    window.activateSection('publication-active');
    document.querySelectorAll('.sidebar nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#publications'));
  }

  function showPublication(){
    renderPublication();
    history.replaceState(null,'','#publications');
    document.getElementById('publications')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  const bind = () => {
    const link = document.querySelector('.sidebar nav a[href="#publications"]');
    if (!link) return;
    link.addEventListener('click', e => { e.preventDefault(); showPublication(); });
    window.addEventListener('hashchange', () => { if (location.hash === '#publications') showPublication(); });
    if (location.hash === '#publications') showPublication();
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind, {once:true}); else bind();
})();
