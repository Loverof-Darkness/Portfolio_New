(() => {
  const EMAIL = 'mailto:rgpv.abhay@gmail.com';
  const LINKEDIN = 'https://www.linkedin.com/in/rgpvabhay1';

  function removeConnect() {
    document.getElementById('connect-panel')?.remove();
    document.getElementById('connect-runtime-style')?.remove();
    document.body.classList.remove('connect-active');
  }

  function renderConnect() {
    if (window.location.hash !== '#connect') {
      removeConnect();
      return;
    }

    const content = document.querySelector('.content');
    if (!content) return;

    removeConnect();

    const section = document.createElement('section');
    section.id = 'connect-panel';
    section.className = 'connect-panel';
    section.innerHTML = `
      <header class="connect-header">
        <p class="connect-kicker">GET IN TOUCH</p>
        <h2>CONTACT ME</h2>
        <p>Let's connect for professional opportunities, collaboration, and scientific discussions.</p>
      </header>
      <div class="connect-icons">
        <a class="connect-icon email-icon" href="${EMAIL}" aria-label="Email me" title="Email me">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/></svg>
        </a>
        <a class="connect-icon linkedin-icon" href="${LINKEDIN}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9h3.6v11H3.4zM9.2 9h3.4v1.5h.05c.48-.9 1.67-1.85 3.45-1.85 3.69 0 4.37 2.43 4.37 5.59V20h-3.6v-5.1c0-1.22-.02-2.79-1.8-2.79-1.8 0-2.08 1.33-2.08 2.7V20H9.2z"/></svg>
        </a>
      </div>`;

    content.appendChild(section);

    const style = document.createElement('style');
    style.id = 'connect-runtime-style';
    style.textContent = `
      .connect-panel{
        min-height:100vh!important;
        height:100vh!important;
        box-sizing:border-box!important;
        padding:24px 0 40px!important;
        margin:0!important;
        display:flex!important;
        flex-direction:column!important;
        justify-content:flex-start!important;
        align-items:flex-start!important;
        gap:34px!important;
        overflow:auto!important;
        scroll-snap-align:start!important;
        scroll-snap-stop:always!important;
      }
      .connect-header{
        width:100%!important;
        max-width:950px!important;
        margin:0!important;
        padding:0!important;
        text-align:left!important;
        align-self:flex-start!important;
      }
      .connect-kicker{margin:0 0 8px!important;color:#00e5ff;font:800 13px ui-monospace,monospace;letter-spacing:.28em}
      .connect-header h2{margin:0!important;font-size:clamp(52px,7vw,92px)!important;line-height:.92!important;font-weight:900!important;letter-spacing:-.055em!important;background:linear-gradient(90deg,#fff,#00e5ff 48%,#8b5cf6)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}
      .connect-header p:last-child{max-width:720px!important;margin:16px 0 0!important;color:#dce8f2!important;font-size:clamp(16px,1.35vw,20px)!important;line-height:1.5!important;font-weight:600!important}
      .connect-icons{display:flex!important;align-items:center!important;gap:28px!important;margin:0!important;padding:0!important;align-self:flex-start!important}
      .connect-icon{width:104px!important;height:104px!important;display:grid!important;place-items:center!important;border-radius:50%!important;text-decoration:none!important;border:1px solid rgba(0,229,255,.48)!important;background:rgba(3,12,18,.78)!important;box-shadow:0 0 25px rgba(0,229,255,.08),inset 0 0 28px rgba(0,229,255,.035)!important;transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .28s ease,border-color .28s ease!important}
      .connect-icon svg{width:46px!important;height:46px!important;fill:none!important;stroke:#00e5ff!important;stroke-width:1.7!important;stroke-linecap:round!important;stroke-linejoin:round!important;transition:transform .28s ease,filter .28s ease!important}
      .linkedin-icon{border-color:rgba(139,92,246,.58)!important}.linkedin-icon svg{fill:#b99cff!important;stroke:none!important}
      .connect-icon:hover{transform:translateY(-7px) scale(1.12)!important;border-color:#00e5ff!important;box-shadow:0 0 38px rgba(0,229,255,.25),inset 0 0 32px rgba(0,229,255,.08)!important}
      .linkedin-icon:hover{border-color:#8b5cf6!important;box-shadow:0 0 38px rgba(139,92,246,.28),inset 0 0 32px rgba(139,92,246,.08)!important}
      .connect-icon:hover svg{transform:scale(1.08)!important;filter:drop-shadow(0 0 8px currentColor)!important}
      @media(max-width:600px){.connect-panel{padding-top:20px!important}.connect-icons{gap:20px!important}.connect-icon{width:86px!important;height:86px!important}.connect-icon svg{width:38px!important;height:38px!important}}
    `;
    document.head.appendChild(style);
    document.body.classList.add('connect-active');
  }

  window.renderConnect = renderConnect;
  window.hideConnect = removeConnect;

  function sync() {
    if (window.location.hash === '#connect') renderConnect();
    else removeConnect();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', sync, { once:true });
  } else {
    sync();
  }
  window.addEventListener('hashchange', sync);
})();
