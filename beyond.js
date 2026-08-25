(() => {
  const imageAssets = {
    chess: './assets/extracurricular/chess.webp?v=1',
    volleyball: './assets/extracurricular/volleyball.webp?v=1',
    badminton: './assets/extracurricular/badminton.webp?v=1',
    computer: './assets/extracurricular/computer-it.webp?v=1'
  };

  const activities = [
    { title:'Chess', kicker:'01 · STRATEGY', text:'A game of calculation, patience and long-form strategic thinking.', image:imageAssets.chess, accent:'#00e5ff' },
    { title:'Volleyball', kicker:'02 · TEAM SPORT', text:'Fast decisions, coordination and energy on the court.', image:imageAssets.volleyball, accent:'#8b5cf6' },
    { title:'Badminton', kicker:'03 · AGILITY', text:'Speed, reflexes and focused movement — built around precision.', image:imageAssets.badminton, accent:'#00e5ff' },
    { title:'Computer IT & Technology', kicker:'04 · DIGITAL EXPLORATION', text:'A continuing interest in computers, software, Linux, systems and emerging technology.', image:imageAssets.computer, accent:'#8b5cf6' }
  ];

  function renderBeyond(){
    const content=document.querySelector('.content'); if(!content)return;
    document.getElementById('beyond')?.remove(); document.getElementById('beyond-runtime-style')?.remove();
    const section=document.createElement('section'); section.id='beyond'; section.className='beyond-panel';
    section.innerHTML=`<header class="beyond-header"><h2>BEYOND THE LAB</h2><p class="beyond-intro">Passions that inspire balance, build discipline, and fuel creativity.</p></header><div class="beyond-list">${activities.map((item,index)=>`<article class="beyond-item" style="--delay:${index*320}ms;--accent:${item.accent}"><div class="beyond-copy"><span class="beyond-index">${item.kicker}</span><h3>${item.title}</h3><p>${item.text}</p></div><div class="beyond-image-wrap"><img src="${item.image}" alt="Illustrated reference for ${item.title}" loading="eager"></div></article>`).join('')}</div>`;
    content.appendChild(section);
    const style=document.createElement('style'); style.id='beyond-runtime-style'; style.textContent=`
      body.beyond-active .hero,body.beyond-active .about-panel,body.beyond-active .experience-panel,body.beyond-active .arsenal-panel,body.beyond-active .arsenal-rebuild,body.beyond-active #education,body.beyond-active #publications{display:none!important}
      body.home-active #beyond,body.about-active #beyond,body.experience-active #beyond,body.arsenal-active #beyond,body.education-active #beyond,body.publication-active #beyond{display:none!important}
      .beyond-panel{min-height:100vh;height:100vh;overflow:auto;padding:18px 0 40px;display:flex;flex-direction:column;gap:18px;scroll-snap-align:start}
      .beyond-header{max-width:1100px;margin:0}.beyond-header h2{margin:0;font-size:clamp(48px,5.6vw,78px);line-height:.92;font-weight:950;letter-spacing:-.055em;background:linear-gradient(90deg,#fff,#00e5ff 45%,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}.beyond-intro{margin:10px 0 0;max-width:820px;color:#cbd5e1;font-size:17px;font-weight:600;line-height:1.5}
      .beyond-list{display:flex;flex-direction:column;gap:18px;padding-bottom:10px}.beyond-item{display:grid;grid-template-columns:minmax(0,.62fr) minmax(420px,1.38fr);align-items:stretch;min-height:210px;border:1px solid color-mix(in srgb,var(--accent) 34%,transparent);border-radius:18px;background:linear-gradient(135deg,rgba(3,13,18,.84),rgba(3,5,11,.72));backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);overflow:hidden;opacity:0;transform:translateY(34px);animation:beyondIn .75s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--delay);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}.beyond-item:hover{transform:translateY(-5px);border-color:var(--accent);box-shadow:0 0 30px color-mix(in srgb,var(--accent) 12%,transparent),inset 0 0 26px rgba(0,229,255,.03)}
      .beyond-copy{padding:30px 26px 30px 28px;display:flex;flex-direction:column;justify-content:center}.beyond-index{display:inline-block;color:var(--accent);font:900 11px ui-monospace,monospace;letter-spacing:.16em;margin-bottom:10px}.beyond-copy h3{margin:0;color:#f7fbff;font-size:clamp(28px,3vw,44px);line-height:1.04;font-weight:950}.beyond-copy p{max-width:610px;margin:14px 0 0;color:#cbd6e2;font-size:16px;font-weight:600;line-height:1.55}
      .beyond-image-wrap{min-height:210px;display:flex;align-items:stretch;justify-content:flex-end;padding:0;background:linear-gradient(90deg,rgba(2,7,12,.98) 0%,rgba(2,7,12,.68) 13%,rgba(2,7,12,0) 34%),radial-gradient(circle at 75% 50%,color-mix(in srgb,var(--accent) 8%,transparent),transparent 65%)}.beyond-image-wrap img{display:block;width:100%;height:100%;min-height:210px;object-fit:cover;object-position:center;border-radius:0 16px 16px 0;filter:brightness(.9) saturate(1.02);transition:transform .45s ease,filter .45s ease}.beyond-item:hover .beyond-image-wrap img{transform:scale(1.025);filter:brightness(1) saturate(1.08)}
      @keyframes beyondIn{to{opacity:1;transform:translateY(0)}}
      @media(max-width:900px){.beyond-panel{height:auto;min-height:100vh}.beyond-item{grid-template-columns:1fr}.beyond-image-wrap{min-height:220px}.beyond-image-wrap img{border-radius:0 0 16px 16px}.beyond-copy{padding:26px 24px 18px}.beyond-copy h3{font-size:30px}}
    `;
    document.head.appendChild(style);
    window.activateSection('beyond-active');
    document.querySelectorAll('.sidebar nav a').forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#beyond'));
    const label=document.querySelector('.sidebar nav a[href="#beyond"] span'); if(label) label.textContent='EXTRACURRICULAR';
  }

  function showBeyond(){ renderBeyond(); history.replaceState(null,'','#beyond'); document.getElementById('beyond')?.scrollIntoView({behavior:'smooth',block:'start'}); }
  function hideBeyond(){ document.body.classList.remove('beyond-active'); document.getElementById('beyond')?.remove(); document.getElementById('beyond-runtime-style')?.remove(); }
  function bind(){
    const link=document.querySelector('.sidebar nav a[href="#beyond"]'); if(!link)return;
    link.addEventListener('click',e=>{e.preventDefault();showBeyond();});
    document.querySelector('.sidebar nav')?.addEventListener('click',e=>{const other=e.target.closest('a'); if(other && other.getAttribute('href') !== '#beyond') hideBeyond();},true);
    window.addEventListener('hashchange',()=>{if(location.hash==='#beyond')showBeyond();else hideBeyond();});
    if(location.hash==='#beyond')showBeyond();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();
