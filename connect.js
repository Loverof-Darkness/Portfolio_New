(() => {
  function hideConnect() {
    document.getElementById('connect-panel')?.remove();
    document.getElementById('connect-runtime-style')?.remove();
  }

  function renderConnect() {
    if (location.hash !== '#connect') {
      hideConnect();
      return;
    }

    const content = document.querySelector('.content');
    if (!content) return;

    hideConnect();

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
        <a class="connect-icon email-icon" href="mailto:rgpv.abhay@gmail.com" aria-label="Email me" title="Email me">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18v14H3z"/><path d="m3 6 9 7 9-7"/></svg>
        </a>
        <a class="connect-icon linkedin-icon" href="https://www.linkedin.com/in/rgpvabhay1" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 3.5a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4ZM3.4 9h3.6v11H3.4zM9.2 9h3.4v1.5h.05c.48-.9 1.67-1.85 3.45-1.85 3.69 0 4.37 2.43 4.37 5.59V20h-3.6v-5.1c0-1.22-.02-2.79-1.8-2.79-1.8 0-2.08 1.33-2.08 2.7V20H9.2z"/></svg>
        </a>
      </div>`;
    content.appendChild(section);

    const style = document.createElement('style');
    style.id = 'connect-runtime-style';
    style.textContent = `
      .connect-panel{
        position:relative!important;
        min-height:100vh!important;
        height:100vh!important;
        box-sizing:border-box!important;
        margin:0!important;
        padding:12px 0 40px!important;
        display:flex!important;
        flex-direction:column!important;
        justify-content:flex-start!important;
        align-items:flex-start!important;
        align-content:flex-start!important;
        gap:34px!important;
        overflow:auto!important;
        transform:none!important;
      }
      .connect-header{
        width:100%!important;
        max-width:1000px!important;
        margin:0!important;
        padding:0!important;
        text-align:left!important;
        align-self:flex-start!important;
      }
      .connect-kicker{margin:0 0 8px;color:#00e5ff;font:800 13px ui-monospace,monospace;letter-spacing:.28em}
      .connect-header h2{margin:0;font-size:clamp(52px,7vw,92px);line-height:.92;font-weight:900;letter-spacing:-.055em;background:linear-gradient(90deg,#fff,#00e5ff 48%,#8b5cf6);-webkit-background-clip:text;background-clip:text;color:transparent}
      .connect-header p:last-child{max-width:720px;margin:14px 0 0;color:#dce8f2;font-size:clamp(16px,1.35vw,20px);line-height:1.5;font-weight:600}
      .connect-icons{display:flex!important;align-items:center!important;justify-content:flex-start!important;gap:28px!important;margin:0!important;padding:0!important;align-self:flex-start!important}
      .connect-icon{width:104px;height:104px;display:grid;place-items:center;border-radius:50%;text-decoration:none;border:1px solid rgba(0,229,255,.48);background:rgba(3,12,18,.78);box-shadow:0 0 25px rgba(0,229,255,.08),inset 0 0 28px rgba(0,229,255,.035);transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .28s ease,border-color .28s ease}
      .connect-icon svg{width:46px;height:46px;fill:none;stroke:#00e5ff;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;transition:transform .28s ease,filter .28s ease}
      .linkedin-icon{border-color:rgba(139,92,246,.58)}.linkedin-icon svg{fill:#b99cff;stroke:none}
      .connect-icon:hover{transform:translateY(-7px) scale(1.12);border-color:#00e5ff;box-shadow:0 0 38px rgba(0,229,255,.25),inset 0 0 32px rgba(0,229,255,.08)}
      .linkedin-icon:hover{border-color:#8b5cf6;box-shadow:0 0 38px rgba(139,92,246,.28),inset 0 0 32px rgba(139,92,246,.08)}
      .connect-icon:hover svg{transform:scale(1.08);filter:drop-shadow(0 0 8px currentColor)}
      @media(max-width:600px){.connect-panel{padding-top:8px!important}.connect-icons{gap:20px!important}.connect-icon{width:86px;height:86px}.connect-icon svg{width:38px;height:38px}}
    `;
    document.head.appendChild(style);
  }

  window.renderConnect = renderConnect;
  window.hideConnect = hideConnect;

  const sync = () => {
    if (location.hash === '#connect') renderConnect();
    else hideConnect();
  };

  window.addEventListener('hashchange', sync);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', sync, { once:true });
  else sync();
})();
