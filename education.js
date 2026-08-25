(() => {
  const diagnostics = window.portfolioDiagnostics;

  const educationData = [
    {
      number: '01',
      degree: 'B.Pharma Pharmacy',
      short: 'B.Pharm',
      institution: 'Indira Gandhi National Tribal University (IGNTU), Amarkantak',
      years: '2017–2021',
      mode: 'FULL TIME',
      accent: '#00e5ff',
      detail: 'Four-year undergraduate foundation in pharmaceutical sciences.'
    },
    {
      number: '02',
      degree: 'M.Pharma Pharmacy',
      short: 'M.Pharm',
      institution: 'Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV), Bhopal',
      years: '2021–2023',
      mode: 'FULL TIME',
      accent: '#8b5cf6',
      detail: 'Postgraduate specialization building advanced pharmaceutical-science expertise.'
    }
  ];

  function renderEducation() {
    const section = Portfolio.renderPanel({
      id: 'education',
      scope: 'education section',
      className: 'education-panel',
      styleId: 'education-runtime-style',
      html: `
      <header class="education-header">
        <div class="education-kicker">ACADEMIC JOURNEY</div>
        <h2>EDUCATION</h2>
        <p>From pharmacy foundations to postgraduate specialization.</p>
      </header>

      <div class="education-stage">
        <div class="education-rail" aria-hidden="true">
          <span class="rail-line"></span>
          <span class="rail-progress"></span>
          <span class="rail-pulse pulse-one"></span>
          <span class="rail-pulse pulse-two"></span>
        </div>

        <div class="education-orbit orbit-one" aria-hidden="true"></div>
        <div class="education-orbit orbit-two" aria-hidden="true"></div>

        <div class="education-stack">
          ${educationData.map((item, index) => `
            <article class="education-card ${index === 0 ? 'is-active' : ''}" tabindex="0" data-index="${index}" style="--accent:${item.accent};--delay:${index * 420}ms">
              <div class="education-card-glow"></div>
              <div class="education-card-top">
                <span class="education-number">${item.number}</span>
                <span class="education-years">${item.years}</span>
              </div>
              <div class="education-card-main">
                <div class="education-badge">${item.short}</div>
                <div class="education-degree">${item.degree}</div>
                <div class="education-institution">${item.institution}</div>
              </div>
              <div class="education-card-bottom">
                <span>${item.mode}</span>
                <button class="education-action" type="button" aria-label="Toggle ${item.degree} details">+</button>
              </div>
              <div class="education-detail">${item.detail}</div>
            </article>
          `).join('')}
        </div>
      </div>

      <div class="education-footer">
        <span class="footer-line"></span>
        <span class="footer-dot"></span>
        <span>2017 → 2023</span>
        <span class="footer-separator">•</span>
        <span>2 academic milestones</span>
        <span class="footer-line"></span>
      </div>
    `,
      css: `

      .education-panel {
        min-height:100vh;
        height:100vh;
        overflow:hidden;
        padding:22px 0 18px;
        display:flex;
        flex-direction:column;
        gap:16px;
        scroll-snap-align:start;
        scroll-snap-stop:always;
      }
      .education-header{margin:0;}
      .education-kicker{
        color:#00e5ff;
        font:900 12px ui-monospace,monospace;
        letter-spacing:.24em;
        margin-bottom:7px;
      }
      .education-header h2{
        margin:0;
        font-size:clamp(42px,5.1vw,68px);
        line-height:.92;
        font-weight:950;
        letter-spacing:-.055em;
        ${Portfolio.gradientText('linear-gradient(90deg,#fff 0%,#00e5ff 48%,#8b5cf6 100%)')}
      }
      .education-header p{
        margin:8px 0 0;
        color:#9fb0c1;
        font-size:15px;
        font-weight:600;
      }

      .education-stage{
        position:relative;
        flex:1 1 auto;
        min-height:0;
        display:grid;
        place-items:center;
        perspective:1200px;
        overflow:visible;
      }
      .education-stack{
        position:relative;
        z-index:4;
        width:min(760px,94%);
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:26px;
        align-items:stretch;
      }
      .education-card{
        position:relative;
        min-height:330px;
        padding:24px 24px 20px;
        border:1px solid color-mix(in srgb,var(--accent) 42%,transparent);
        border-radius:22px;
        overflow:hidden;
        background:
          radial-gradient(circle at 20% 20%,color-mix(in srgb,var(--accent) 10%,transparent),transparent 36%),
          linear-gradient(145deg,rgba(6,20,28,.93),rgba(3,7,12,.9));
        backdrop-filter:blur(14px);
        -webkit-backdrop-filter:blur(14px);
        box-shadow:0 24px 50px rgba(0,0,0,.28), inset 0 0 30px rgba(255,255,255,.015);
        display:flex;
        flex-direction:column;
        opacity:0;
        transform:translateY(35px) rotateX(7deg) scale(.95);
        animation:educationEnter .9s cubic-bezier(.2,.85,.2,1) forwards;
        animation-delay:var(--delay);
        transition:transform .28s ease,box-shadow .28s ease,border-color .28s ease;
        cursor:pointer;
      }
      .education-card::before{
        content:"";
        position:absolute;
        inset:0;
        background:linear-gradient(120deg,transparent 18%,rgba(255,255,255,.04) 38%,transparent 55%);
        transform:translateX(-120%);
        transition:transform .75s ease;
      }
      .education-card:hover::before,.education-card.is-active::before{transform:translateX(120%)}
      .education-card:hover,.education-card:focus-visible,.education-card.is-active{
        transform:translateY(-10px) rotateX(0) scale(1.025);
        border-color:var(--accent);
        box-shadow:0 30px 70px rgba(0,0,0,.38),0 0 36px color-mix(in srgb,var(--accent) 14%,transparent),inset 0 0 30px color-mix(in srgb,var(--accent) 4%,transparent);
        outline:none;
      }
      .education-card-top{display:flex;justify-content:space-between;align-items:center;gap:12px;position:relative;z-index:2}
      .education-number{color:var(--accent);font:900 17px ui-monospace,monospace;letter-spacing:.1em}
      .education-years{color:#eaf2f8;font:800 11px ui-monospace,monospace;letter-spacing:.1em}
      .education-card-main{position:relative;z-index:2;flex:1;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;text-align:left;padding:22px 4px}
      .education-badge{
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-width:76px;
        padding:7px 12px;
        border:1px solid color-mix(in srgb,var(--accent) 48%,transparent);
        border-radius:999px;
        color:var(--accent);
        font:900 12px ui-monospace,monospace;
        letter-spacing:.09em;
        background:rgba(0,0,0,.24);
        box-shadow:0 0 18px color-mix(in srgb,var(--accent) 10%,transparent);
      }
      .education-degree{margin-top:15px;color:#fff;font-size:clamp(24px,2.15vw,33px);font-weight:950;line-height:1.03;letter-spacing:-.025em}
      .education-institution{margin-top:13px;color:#c9d7e4;font-size:15px;font-weight:650;line-height:1.48;max-width:320px}
      .education-card-bottom{position:relative;z-index:2;display:flex;justify-content:space-between;align-items:center;color:#8fdceb;font:800 10px ui-monospace,monospace;letter-spacing:.16em}
      .education-action{width:30px;height:30px;border-radius:50%;border:1px solid color-mix(in srgb,var(--accent) 55%,transparent);background:rgba(0,0,0,.18);color:var(--accent);font-size:20px;line-height:1;cursor:pointer;transition:transform .2s ease}
      .education-card.is-active .education-action{transform:rotate(45deg)}
      .education-detail{position:relative;z-index:2;max-height:0;opacity:0;overflow:hidden;color:#8fa2b5;font-size:13px;line-height:1.48;transition:max-height .3s ease,opacity .3s ease,margin-top .3s ease}
      .education-card.is-active .education-detail,.education-card:hover .education-detail,.education-card:focus-visible .education-detail{max-height:70px;opacity:1;margin-top:12px}

      .education-rail{position:absolute;inset:7% 8%;z-index:1;pointer-events:none}
      .rail-line{position:absolute;left:10%;right:10%;top:50%;height:2px;background:linear-gradient(90deg,rgba(0,229,255,.08),rgba(0,229,255,.52),rgba(139,92,246,.58),rgba(139,92,246,.08));box-shadow:0 0 18px rgba(0,229,255,.1)}
      .rail-progress{position:absolute;left:10%;top:50%;width:52%;height:2px;background:linear-gradient(90deg,#00e5ff,#8b5cf6);box-shadow:0 0 18px rgba(0,229,255,.5)}
      .rail-pulse{position:absolute;width:8px;height:8px;border-radius:50%;top:calc(50% - 3px);background:#fff;box-shadow:0 0 18px var(--pulse,#00e5ff);animation:educationPulse 2.4s ease-in-out infinite}
      .pulse-one{left:24%;--pulse:#00e5ff}.pulse-two{left:77%;--pulse:#8b5cf6;animation-delay:1.1s}
      .education-orbit{position:absolute;border:1px solid rgba(0,229,255,.08);border-radius:50%;z-index:0;pointer-events:none}
      .orbit-one{width:520px;height:520px;box-shadow:0 0 70px rgba(0,229,255,.045),inset 0 0 70px rgba(0,229,255,.025)}
      .orbit-two{width:760px;height:760px;border-color:rgba(139,92,246,.06);box-shadow:0 0 80px rgba(139,92,246,.035),inset 0 0 80px rgba(139,92,246,.02)}

      .education-footer{display:flex;align-items:center;gap:11px;color:#8194a8;font:800 10px ui-monospace,monospace;letter-spacing:.13em}
      .footer-line{height:1px;background:linear-gradient(90deg,transparent,rgba(0,229,255,.35));flex:1}.footer-line:last-child{transform:scaleX(-1)}
      .footer-dot{width:7px;height:7px;border-radius:50%;background:#00ffb3;box-shadow:0 0 12px rgba(0,255,179,.8)}
      .footer-separator{color:#00e5ff}

      @keyframes educationEnter{to{opacity:1;transform:translateY(0) rotateX(0) scale(1)}}
      @keyframes educationPulse{0%,100%{transform:scale(.8);opacity:.55}50%{transform:scale(1.7);opacity:1}}

      @media(max-width:900px){
        .education-stage{overflow:auto;padding:20px 0}
        .education-stack{width:min(700px,96%);grid-template-columns:1fr}
        .education-card{min-height:280px}
        .education-rail{inset:6% 3%}
        .orbit-two{width:620px;height:620px}.orbit-one{width:440px;height:440px}
      }
      @media(max-width:600px){
        .education-panel{height:auto;min-height:100vh;overflow:auto;padding-top:24px}
        .education-header h2{font-size:44px}
        .education-stack{gap:16px;width:100%}
        .education-card{min-height:260px;padding:20px}
        .education-degree{font-size:24px}
        .education-institution{font-size:14px}
        .education-rail,.education-orbit{display:none}
        .education-footer{padding-bottom:8px}
      }
    `,
    });
    if (!section) return;

    const cards = [...section.querySelectorAll('.education-card')];
    cards.forEach((card) => {
      const activate = () => cards.forEach((item) => item.classList.toggle('is-active', item === card));
      card.addEventListener('mouseenter', activate);
      card.addEventListener('focus', activate);
      card.addEventListener('click', (event) => {
        if (event.target.closest('.education-action')) {
          event.preventDefault();
          card.classList.toggle('is-active');
          cards.forEach((item) => { if (item !== card) item.classList.remove('is-active'); });
        } else {
          activate();
        }
      });
    });
  }

  function showEducation() {
    Portfolio.activateView('#education');
    if (diagnostics) diagnostics.run('education section render', renderEducation);
    else renderEducation();
    history.replaceState(null, '', '#education');
    document.getElementById('education')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function hideEducation() {
    Portfolio.removePanel('education', 'education-runtime-style');
  }

  Portfolio.bindPanelRoute({ hash:'#education', scope:'education navigation', show:showEducation, hide:hideEducation });
})();
