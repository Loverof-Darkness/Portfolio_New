(() => {
  function renderConnect(){
    const section=Portfolio.renderPanel({
      id:'connect-panel',
      className:'connect-panel',
      styleId:'connect-runtime-style',
      html:`
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
      </div>`,
      css:`
      .connect-panel{min-height:100vh;height:100vh;box-sizing:border-box;padding:clamp(28px,6vh,72px) 0 50px;display:flex;flex-direction:column;justify-content:center;gap:clamp(40px,7vh,80px);overflow:auto}
      .connect-header{max-width:950px}.connect-kicker{margin:0 0 10px;color:#00e5ff;font:800 13px ui-monospace,monospace;letter-spacing:.28em}.connect-header h2{margin:0;font-size:clamp(58px,8vw,110px);line-height:.9;font-weight:900;letter-spacing:-.055em;${Portfolio.gradientText('linear-gradient(90deg,#fff,#00e5ff 48%,#8b5cf6)')}}.connect-header p:last-child{max-width:720px;margin:20px 0 0;color:#dce8f2;font-size:clamp(17px,1.5vw,22px);line-height:1.5;font-weight:600}
      .connect-icons{display:flex;align-items:center;gap:30px}.connect-icon{width:104px;height:104px;display:grid;place-items:center;border-radius:50%;text-decoration:none;border:1px solid rgba(0,229,255,.48);background:rgba(3,12,18,.78);box-shadow:0 0 25px rgba(0,229,255,.08),inset 0 0 28px rgba(0,229,255,.035);transition:transform .28s cubic-bezier(.2,.8,.2,1),box-shadow .28s ease,border-color .28s ease}.connect-icon svg{width:46px;height:46px;fill:none;stroke:#00e5ff;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round;transition:transform .28s ease,filter .28s ease}.linkedin-icon{border-color:rgba(139,92,246,.58)}.linkedin-icon svg{fill:#b99cff;stroke:none}.connect-icon:hover{transform:translateY(-7px) scale(1.12);border-color:#00e5ff;box-shadow:0 0 38px rgba(0,229,255,.25),inset 0 0 32px rgba(0,229,255,.08)}.linkedin-icon:hover{border-color:#8b5cf6;box-shadow:0 0 38px rgba(139,92,246,.28),inset 0 0 32px rgba(139,92,246,.08)}.connect-icon:hover svg{transform:scale(1.08);filter:drop-shadow(0 0 8px currentColor)}
      @media(max-width:600px){.connect-icons{gap:22px}.connect-icon{width:84px;height:84px}.connect-icon svg{width:38px;height:38px}}

      /* CONNECT: hard override with a small, deliberate gap after the sidebar. */
      body #connect-panel{
        position:fixed!important;
        top:0!important;
        right:0!important;
        bottom:0!important;
        left:250px!important;
        width:auto!important;
        margin:0!important;
        padding:26px 0 40px 22px!important;
        box-sizing:border-box!important;
        display:flex!important;
        flex-direction:column!important;
        justify-content:flex-start!important;
        align-items:flex-start!important;
        transform:none!important;
        text-align:left!important;
        z-index:100!important;
      }
      body #connect-panel .connect-header{
        position:relative!important;
        left:0!important;
        right:auto!important;
        width:100%!important;
        max-width:none!important;
        margin:0!important;
        padding:0!important;
        transform:none!important;
        text-align:left!important;
        align-self:flex-start!important;
      }
      body #connect-panel .connect-kicker,
      body #connect-panel .connect-header h2,
      body #connect-panel .connect-header p{margin-left:0!important}
      body #connect-panel .connect-icons{margin-left:0!important;padding-left:0!important;align-self:flex-start!important;justify-content:flex-start!important}
      @media(max-width:1000px){body #connect-panel{left:210px!important;padding-left:18px!important}}
      @media(max-width:760px){body #connect-panel{left:0!important;padding:24px 20px 40px!important}}
    `,
    });
  }
  window.renderConnect=renderConnect;
  const showConnect=()=>{Portfolio.activateView('#connect');renderConnect();document.getElementById('connect-panel')?.scrollIntoView({behavior:'smooth',block:'start'});};
  const hideConnect=()=>Portfolio.removePanel('connect-panel', 'connect-runtime-style');
  Portfolio.bindPanelRoute({ hash:'#connect', show:showConnect, hide:hideConnect });
})();
