(() => {
  function renderConnect() {
    const content = document.querySelector('.content');
    if (!content) return;

    document.getElementById('connect-panel')?.remove();
    document.getElementById('connect-runtime-style')?.remove();

    const section = document.createElement('section');
    section.id = 'connect-panel';
    section.className = 'connect-panel';
    section.innerHTML = `
      <header class="connect-header">
        <p class="connect-kicker">GET IN TOUCH</p>
        <h2>CONTACT ME</h2>
        <p>Let's connect for professional opportunities, collaboration, and scientific discussions.</p>
      </header>
      <div class="connect-cards">
        <a class="connect-card email-card" href="mailto:rgpv.abhay@gmail.com">
          <span class="connect-label">EMAIL</span>
          <strong>rgpv.abhay@gmail.com</strong>
          <small>Send me an email</small>
        </a>
        <a class="connect-card linkedin-card" href="https://www.linkedin.com/in/rgpvabhay1" target="_blank" rel="noopener noreferrer">
          <span class="connect-label">LINKEDIN</span>
          <strong>linkedin.com/in/rgpvabhay1</strong>
          <small>View my professional profile</small>
        </a>
      </div>`;

    content.appendChild(section);

    const style = document.createElement('style');
    style.id = 'connect-runtime-style';
    style.textContent = `
      body.connect-active .hero,
      body.connect-active .about-panel,
      body.connect-active .experience-panel,
      body.connect-active .arsenal-panel,
      body.connect-active .arsenal-rebuild,
      body.connect-active #education,
      body.connect-active #publications,
      body.connect-active #beyond { display:none!important; }
      body.home-active #connect-panel,
      body.about-active #connect-panel,
      body.experience-active #connect-panel,
      body.arsenal-active #connect-panel,
      body.education-active #connect-panel,
      body.publication-active #connect-panel,
      body.beyond-active #connect-panel { display:none!important; }
      .connect-panel {
        min-height:100vh;
        height:100vh;
        box-sizing:border-box;
        padding:clamp(28px,6vh,72px) 0 50px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        gap:clamp(35px,6vh,70px);
        overflow:auto;
      }
      .connect-header { max-width:950px; }
      .connect-kicker {
        margin:0 0 10px;
        color:#00e5ff;
        font:800 13px ui-monospace,monospace;
        letter-spacing:.28em;
      }
      .connect-header h2 {
        margin:0;
        font-size:clamp(58px,8vw,110px);
        line-height:.9;
        font-weight:900;
        letter-spacing:-.055em;
        background:linear-gradient(90deg,#fff,#00e5ff 48%,#8b5cf6);
        -webkit-background-clip:text;
        background-clip:text;
        color:transparent;
      }
      .connect-header p:last-child {
        max-width:720px;
        margin:20px 0 0;
        color:#dce8f2;
        font-size:clamp(17px,1.5vw,22px);
        line-height:1.5;
        font-weight:600;
      }
      .connect-cards {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:28px;
        max-width:1100px;
        width:100%;
      }
      .connect-card {
        min-height:210px;
        padding:34px;
        box-sizing:border-box;
        display:flex;
        flex-direction:column;
        justify-content:center;
        text-decoration:none;
        border:1px solid rgba(0,229,255,.45);
        background:linear-gradient(135deg,rgba(3,20,27,.86),rgba(5,5,15,.78));
        box-shadow:inset 0 0 35px rgba(0,229,255,.035),0 0 25px rgba(0,0,0,.3);
        backdrop-filter:blur(12px);
        -webkit-backdrop-filter:blur(12px);
        transition:transform .32s cubic-bezier(.2,.8,.2,1),box-shadow .32s ease,border-color .32s ease;
        transform-origin:center;
      }
      .connect-card:hover {
        transform:scale(1.055);
        border-color:#00e5ff;
        box-shadow:0 0 35px rgba(0,229,255,.22),inset 0 0 45px rgba(0,229,255,.07);
        position:relative;
        z-index:2;
      }
      .linkedin-card { border-color:rgba(139,92,246,.5); }
      .linkedin-card:hover {
        border-color:#8b5cf6;
        box-shadow:0 0 35px rgba(139,92,246,.25),inset 0 0 45px rgba(139,92,246,.07);
      }
      .connect-label {
        color:#00e5ff;
        font:800 13px ui-monospace,monospace;
        letter-spacing:.25em;
        margin-bottom:18px;
      }
      .linkedin-card .connect-label { color:#b99cff; }
      .connect-card strong {
        color:#f8fbff;
        font-size:clamp(21px,2vw,30px);
        line-height:1.2;
        font-weight:800;
        word-break:break-word;
      }
      .connect-card small {
        margin-top:14px;
        color:#9eb1c0;
        font-size:15px;
        font-weight:600;
      }
      @media(max-width:760px){
        .connect-panel{height:auto;min-height:100vh;padding:35px 0;}
        .connect-cards{grid-template-columns:1fr;}
        .connect-card:hover{transform:scale(1.025);}
      }
    `;
    document.head.appendChild(style);
  }

  window.renderConnect = renderConnect;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', renderConnect);
  else renderConnect();
})();
