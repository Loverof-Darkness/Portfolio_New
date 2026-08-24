(() => {
  const activities = [
    { title:'Chess', kicker:'01 · STRATEGY', text:'A game of calculation, patience and long-form strategic thinking.', image:'./assets/chess-reference.svg', accent:'#00e5ff' },
    { title:'Volleyball', kicker:'02 · TEAM SPORT', text:'Fast decisions, coordination and energy on the court.', image:'./assets/volleyball-reference.svg', accent:'#00ffb3' },
    { title:'Badminton', kicker:'03 · AGILITY', text:'Speed, reflexes and focused movement — built around precision.', image:'./assets/badminton-reference.svg', accent:'#ff2bd6' },
    { title:'Computer IT & Technology', kicker:'04 · DIGITAL EXPLORATION', text:'A continuing interest in computers, software, Linux, systems and emerging technology.', image:'./assets/technology-reference.svg', accent:'#8b5cf6' }
  ];

  function renderBeyond() {
    const content = document.querySelector('.content');
    if (!content) return;
    document.getElementById('beyond')?.remove();
    document.getElementById('beyond-runtime-style')?.remove();

    const section = document.createElement('section');
    section.id = 'beyond';
    section.className = 'beyond-panel';
    section.innerHTML = `
      <header class="beyond-header">
        <p class="beyond-kicker">EXTRACURRICULAR</p>
        <h2>BEYOND THE LAB</h2>
        <p class="beyond-intro">Interests that keep the mind sharp, active and curious outside the laboratory.</p>
      </header>
      <div class="beyond-list">
        ${activities.map((item, index) => `
          <article class="beyond-item" style="--delay:${index * 320}ms;--accent:${item.accent}">
            <div class="beyond-copy">
              <span class="beyond-index">${item.kicker}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </div>
            <div class="beyond-image-wrap">
              <img src="${item.image}" alt="Stylized reference illustration of ${item.title}" loading="eager" />
            </div>
          </article>
        `).join('')}
      </div>
    `;
    content.appendChild(section);

    const style = document.createElement('style');
    style.id = 'beyond-runtime-style';
    style.textContent = `
      body.beyond-active .hero,body.beyond-active .about-panel,body.beyond-active .experience-panel,body.beyond-active .arsenal-panel,body.beyond-active .arsenal-rebuild,body.beyond-active #education,body.beyond-active #publications{display:none!important}
      body.home-active #beyond,body.about-active #beyond,body.experience-active #beyond,body.arsenal-active #beyond,body.education-active #beyond,body.publication-active #beyond{display:none!important}
      .beyond-panel{min-height:100vh;height:100vh;overflow:auto;padding:24px 0 40px;display:flex;flex-direction:column;gap:24px;scroll-snap-align:start;scroll-snap-stop:always}
      .beyond-header{max-width:980px}.beyond-kicker{margin:0 0 8px;color:#00e5ff;font:800 12px ui-monospace,monospace;letter-spacing:.24em}
      .beyond-header h2{margin:0;font-size:clamp(48px,5.6vw,78px);line-height:.92;font-weight:950;letter-spacing:-.055em;background:linear-gradient(90deg,#fff,#00e5ff 45%,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}
      .beyond-intro{margin:12px 0 0;max-width:820px;color:#cbd5e1;font-size:17px;font-weight:600;line-height:1.5}
      .beyond-list{display:flex;flex-direction:column;gap:18px;padding-bottom:10px}
      .beyond-item{display:grid;grid-template-columns:minmax(0,.9fr) minmax(360px,1.1fr);align-items:center;min-height:210px;border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);border-radius:18px;background:linear-gradient(135deg,rgba(3,13,18,.84),rgba(3,5,11,.72));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);overflow:hidden;opacity:0;transform:translateY(34px);animation:beyondIn .75s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--delay);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
      .beyond-item:hover{transform:translateY(-5px);border-color:var(--accent);box-shadow:0 0 30px color-mix(in srgb,var(--accent) 12%,transparent),inset 0 0 26px rgba(0,229,255,.03)}
      .beyond-copy{padding:34px 34px 34px 30px}.beyond-index{display:inline-block;color:var(--accent);font:900 11px ui-monospace,monospace;letter-spacing:.16em;margin-bottom:10px}
      .beyond-copy h3{margin:0;color:#f7fbff;font-size:clamp(28px,3vw,44px);line-height:1.04;font-weight:950}.beyond-copy p{max-width:610px;margin:14px 0 0;color:#cbd6e2;font-size:16px;font-weight:600;line-height:1.55}
      .beyond-image-wrap{height:100%;min-height:210px;display:flex;align-items:center;justify-content:center;padding:16px 22px 16px 4px;background:radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--accent) 9%,transparent),transparent 62%)}
      .beyond-image-wrap img{width:100%;height:100%;max-height:250px;object-fit:contain;border-radius:12px;filter:drop-shadow(0 18px 28px rgba(0,0,0,.42));transition:transform .45s ease,filter .45s ease}.beyond-item:hover .beyond-image-wrap img{transform:scale(1.04) translateY(-2px);filter:drop-shadow(0 20px 32px rgba(0,0,0,.5))}
      @keyframes beyondIn{to{opacity:1;transform:translateY(0)}}
      @media(max-width:800px){.beyond-panel{height:auto;min-height:100vh;padding-top:24px}.beyond-item{grid-template-columns:1fr}.beyond-image-wrap{min-height:220px;padding:0 18px 18px}.beyond-copy{padding:26px 24px 14px}.beyond-copy h3{font-size:30px}}
    `;
    document.head.appendChild(style);

    document.body.classList.remove('home-active','about-active','experience-active','arsenal-active','education-active','publication-active');
    document.body.classList.add('beyond-active');
    document.querySelectorAll('.sidebar nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#beyond'));

    const label = document.querySelector('.sidebar nav a[href="#beyond"] span');
    if (label) label.textContent = 'EXTRACURRICULAR';
  }

  function showBeyond(){ renderBeyond(); history.replaceState(null,'','#beyond'); document.getElementById('beyond')?.scrollIntoView({behavior:'smooth',block:'start'}); }
  function hideBeyond(){ document.body.classList.remove('beyond-active'); document.getElementById('beyond')?.remove(); document.getElementById('beyond-runtime-style')?.remove(); }
  function bind(){
    const link=document.querySelector('.sidebar nav a[href="#beyond"]'); if(!link) return;
    link.addEventListener('click',e=>{e.preventDefault();showBeyond();});
    document.querySelector('.sidebar nav')?.addEventListener('click',e=>{ const other=e.target.closest('a'); if(other && other.getAttribute('href') !== '#beyond') hideBeyond(); },true);
    window.addEventListener('hashchange',()=>{ if(location.hash==='#beyond') showBeyond(); else hideBeyond(); });
    if(location.hash==='#beyond') showBeyond();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true}); else bind();
})();