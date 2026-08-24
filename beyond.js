(() => {
  const activities = [
    {
      title: 'Chess',
      kicker: '01 · STRATEGY',
      text: 'A game of calculation, patience and long-form strategic thinking.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Chess_board_with_pieces.jpg',
      accent: '#00e5ff'
    },
    {
      title: 'Volleyball',
      kicker: '02 · TEAM SPORT',
      text: 'Fast decisions, coordination and energy on the court.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Volleyball%20Team%20Playing%20on%20Court.jpg',
      accent: '#00ffb3'
    },
    {
      title: 'Badminton',
      kicker: '03 · AGILITY',
      text: 'Speed, reflexes and focused movement — built around precision.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Shuttlecock_on_a_badminton_court.jpg',
      accent: '#ff2bd6'
    },
    {
      title: 'Computer IT & Technology',
      kicker: '04 · DIGITAL EXPLORATION',
      text: 'A continuing interest in computers, software, Linux, systems and emerging technology.',
      image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Computer%20workstation%20while%20out%20of%20use.jpg',
      accent: '#8b5cf6'
    }
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
              <img src="${item.image}" alt="Representative photograph of ${item.title}" loading="eager" />
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
      .beyond-header{max-width:980px}
      .beyond-header h2{margin:0;font-size:clamp(48px,5.6vw,78px);line-height:.92;font-weight:950;letter-spacing:-.055em;background:linear-gradient(90deg,#fff,#00e5ff 45%,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}
      .beyond-intro{margin:12px 0 0;max-width:820px;color:#cbd5e1;font-size:17px;font-weight:600;line-height:1.5}
      .beyond-list{display:flex;flex-direction:column;gap:18px;padding-bottom:10px}
      .beyond-item{display:grid;grid-template-columns:minmax(0,.9fr) minmax(360px,1.1fr);align-items:stretch;min-height:230px;border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);border-radius:18px;background:linear-gradient(135deg,rgba(3,13,18,.88),rgba(3,5,11,.78));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);overflow:hidden;opacity:0;transform:translateY(34px);animation:beyondIn .75s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--delay);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}
      .beyond-item:hover{transform:translateY(-5px);border-color:var(--accent);box-shadow:0 0 30px color-mix(in srgb,var(--accent) 12%,transparent),inset 0 0 26px rgba(0,229,255,.03)}
      .beyond-copy{padding:36px 34px 36px 30px;display:flex;flex-direction:column;justify-content:center}
      .beyond-index{display:inline-block;color:var(--accent);font:900 11px ui-monospace,monospace;letter-spacing:.16em;margin-bottom:10px}
      .beyond-copy h3{margin:0;color:#f7fbff;font-size:clamp(28px,3vw,44px);line-height:1.04;font-weight:950}
      .beyond-copy p{max-width:610px;margin:14px 0 0;color:#cbd6e2;font-size:16px;font-weight:600;line-height:1.55}
      .beyond-image-wrap{position:relative;min-height:230px;display:flex;align-items:center;justify-content:center;padding:10px;background:#02070c;overflow:hidden}
      .beyond-image-wrap::after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(3,13,18,.18),rgba(3,13,18,0) 34%,rgba(2,4,10,.12)),radial-gradient(circle at 50% 50%,color-mix(in srgb,var(--accent) 10%,transparent),transparent 68%);pointer-events:none}
      .beyond-image-wrap img{position:relative;z-index:1;width:100%;height:100%;max-height:270px;object-fit:cover;border-radius:12px;filter:saturate(.84) contrast(1.08) brightness(.76);box-shadow:0 0 30px rgba(0,0,0,.32);transition:transform .45s ease,filter .45s ease}.beyond-item:hover .beyond-image-wrap img{transform:scale(1.035);filter:saturate(1) contrast(1.08) brightness(.9)}
      @keyframes beyondIn{to{opacity:1;transform:translateY(0)}}
      @media(max-width:800px){.beyond-panel{height:auto;min-height:100vh;padding-top:24px}.beyond-item{grid-template-columns:1fr}.beyond-image-wrap{min-height:240px}.beyond-copy{padding:26px 24px 18px}.beyond-copy h3{font-size:30px}}
    `;
    document.head.appendChild(style);

    document.body.classList.remove('home-active','about-active','experience-active','arsenal-active','education-active','publication-active');
    document.body.classList.add('beyond-active');
    document.querySelectorAll('.sidebar nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#beyond'));

    const label = document.querySelector('.sidebar nav a[href="#beyond"] span');
    if (label) label.textContent = 'EXTRACURRICULAR';
  }

  function showBeyond(){
    renderBeyond();
    history.replaceState(null,'','#beyond');
    document.getElementById('beyond')?.scrollIntoView({behavior:'smooth',block:'start'});
  }

  function hideBeyond(){
    document.body.classList.remove('beyond-active');
    document.getElementById('beyond')?.remove();
    document.getElementById('beyond-runtime-style')?.remove();
  }

  function bind(){
    const link=document.querySelector('.sidebar nav a[href="#beyond"]');
    if(!link) return;
    link.addEventListener('click',e=>{e.preventDefault();showBeyond();});
    document.querySelector('.sidebar nav')?.addEventListener('click',e=>{
      const other=e.target.closest('a');
      if(other && other.getAttribute('href') !== '#beyond') hideBeyond();
    },true);
    window.addEventListener('hashchange',()=>{
      if(location.hash==='#beyond') showBeyond();
      else hideBeyond();
    });
    if(location.hash==='#beyond') showBeyond();
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind,{once:true}); else bind();
})();
