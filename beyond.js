(() => {
  const imageAssets = {
    chess: 'data:image/jpeg;base64,CHESS_B64',
    volleyball: 'data:image/jpeg;base64,VOLLEYBALL_B64',
    badminton: 'data:image/jpeg;base64,BADMINTON_B64',
    computer: 'data:image/jpeg;base64,COMPUTER_B64'
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
      .beyond-panel{min-height:100vh;height:100vh;overflow:auto;padding:18px 0 40px;display:flex;flex-direction:column;gap:18px}
      .beyond-header{max-width:1100px;margin:0}.beyond-header h2{margin:0;font-size:clamp(48px,5.6vw,78px);line-height:.92;font-weight:950;letter-spacing:-.055em;background:linear-gradient(90deg,#fff,#00e5ff 45%,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}.beyond-intro{margin:10px 0 0;color:#dbe7f2;font-size:17px;font-weight:600;line-height:1.5}
      .beyond-list{display:flex;flex-direction:column;gap:14px;padding-bottom:10px}.beyond-item{display:grid;grid-template-columns:minmax(0,.9fr) minmax(420px,1.1fr);align-items:stretch;min-height:205px;border:1px solid color-mix(in srgb,var(--accent) 40%,transparent);border-radius:18px;background:linear-gradient(135deg,rgba(3,13,18,.9),rgba(3,5,11,.78));backdrop-filter:blur(10px);overflow:hidden;opacity:0;transform:translateY(34px);animation:beyondIn .75s cubic-bezier(.2,.8,.2,1) forwards;animation-delay:var(--delay);transition:transform .25s ease,border-color .25s ease,box-shadow .25s ease}.beyond-item:hover{transform:translateY(-5px);border-color:var(--accent);box-shadow:0 0 30px color-mix(in srgb,var(--accent) 16%,transparent)}
      .beyond-copy{padding:30px 30px 30px 28px;display:flex;flex-direction:column;justify-content:center}.beyond-index{color:var(--accent);font:900 12px ui-monospace,monospace;letter-spacing:.16em;margin-bottom:9px}.beyond-copy h3{margin:0;color:#f7fbff;font-size:clamp(28px,3vw,44px);line-height:1.04;font-weight:950}.beyond-copy p{max-width:610px;margin:13px 0 0;color:#d5dfeb;font-size:16px;font-weight:600;line-height:1.55}.beyond-image-wrap{min-height:205px;display:flex;align-items:stretch;justify-content:center;padding:0;background:#02060b}.beyond-image-wrap img{width:100%;height:100%;min-height:205px;object-fit:cover;display:block;transition:transform .45s ease,filter .45s ease;filter:brightness(.9) saturate(.98)}.beyond-item:hover .beyond-image-wrap img{transform:scale(1.025);filter:brightness(1) saturate(1.05)}@keyframes beyondIn{to{opacity:1;transform:translateY(0)}}
      @media(max-width:800px){.beyond-panel{height:auto;min-height:100vh;padding-top:20px}.beyond-item{grid-template-columns:1fr}.beyond-image-wrap{min-height:220px}.beyond-image-wrap img{min-height:220px}.beyond-copy{padding:24px}.beyond-copy h3{font-size:30px}}
    `; document.head.appendChild(style);
    document.body.classList.remove('home-active','about-active','experience-active','arsenal-active','education-active','publication-active'); document.body.classList.add('beyond-active');
    document.querySelectorAll('.sidebar nav a').forEach(link=>link.classList.toggle('active',link.getAttribute('href')==='#beyond'));
    const label=document.querySelector('.sidebar nav a[href="#beyond"] span'); if(label)label.textContent='EXTRACURRICULAR';
  }
  function showBeyond(){renderBeyond();history.replaceState(null,'','#beyond');document.getElementById('beyond')?.scrollIntoView({behavior:'smooth',block:'start'});}
  function hideBeyond(){document.body.classList.remove('beyond-active');document.getElementById('beyond')?.remove();document.getElementById('beyond-runtime-style')?.remove();}
  function bind(){const link=document.querySelector('.sidebar nav a[href="#beyond"]');if(!link)return;link.addEventListener('click',e=>{e.preventDefault();showBeyond()});document.querySelector('.sidebar nav')?.addEventListener('click',e=>{const other=e.target.closest('a');if(other&&other.getAttribute('href')!=='#beyond')hideBeyond()},true);window.addEventListener('hashchange',()=>location.hash==='#beyond'?showBeyond():hideBeyond());if(location.hash==='#beyond')showBeyond()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();