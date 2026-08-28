(() => {
  'use strict';

  const modes = [
    { name:'Universe Drift', draw:'universe' },
    { name:'Nebula Bloom', draw:'nebula' },
    { name:'Aurora Flow', draw:'aurora' },
    { name:'Solar System', draw:'solar' },
    { name:'Warp Starfield', draw:'warp' },
    { name:'Quantum Grid', draw:'grid' },
    { name:'Constellation', draw:'constellation' },
    { name:'Matrix Rain', draw:'matrix' },
    { name:'Plasma Flow', draw:'plasma' },
    { name:'DNA Helix', draw:'dna' },
    { name:'Meteor Shower', draw:'meteor' },
    { name:'Deep Space Dust', draw:'dust' },
  ];

  const storageKey = 'portfolio:last-background-index';
  const previous = Number.parseInt(localStorage.getItem(storageKey) || '-1', 10);
  let modeIndex = Math.floor(Math.random() * modes.length);
  if (modes.length > 1 && modeIndex === previous) {
    modeIndex = (modeIndex + 1 + Math.floor(Math.random() * (modes.length - 1))) % modes.length;
  }
  localStorage.setItem(storageKey, String(modeIndex));

  function boot() {
    const old = document.getElementById('dynamic-bg');
    old?.remove();

    const canvas = document.createElement('canvas');
    canvas.id = 'dynamic-bg';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const style = document.createElement('style');
    style.id = 'dynamic-background-style';
    style.textContent = `
      #dynamic-bg{position:fixed;inset:0;width:100vw;height:100vh;display:block;z-index:0;pointer-events:none;opacity:.98;background:var(--theme-bg,#000)}
      #molecule-bg{opacity:0!important;visibility:hidden!important}
      .bg-vignette{z-index:1!important}
      .sidebar,.content{position:relative;z-index:2}
      @media(prefers-reduced-motion:reduce){#dynamic-bg{opacity:.55}}
    `;
    document.head.appendChild(style);

    const ctx = canvas.getContext('2d', { alpha:false });
    if (!ctx) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReduced = () => reducedMotion.matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let raf = 0;
    let last = performance.now();
    let t = 0;
    let stars = [];
    let dust = [];
    let rain = [];
    let meteors = [];
    let gridOffset = 0;
    let dnaPhase = Math.random() * Math.PI * 2;

    const getColor = (name, fallback) => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return value || fallback;
    };

    function palette() {
      return {
        bg: getColor('--theme-bg','#05070A'),
        surface: getColor('--theme-surface','#081019'),
        p: getColor('--theme-primary','#67E8F9'),
        s: getColor('--theme-secondary','#A78BFA'),
        a: getColor('--theme-tertiary','#F9A8D4'),
        text: getColor('--theme-text','#F5F8FF'),
      };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr,0,0,dpr,0,0);
      createParticles();
    }

    function createParticles() {
      const base = Math.min(260, Math.max(90, Math.floor((width * height) / 10000)));
      stars = Array.from({length:base}, () => ({
        x:Math.random()*width,
        y:Math.random()*height,
        z:.2+Math.random()*.8,
        r:.5+Math.random()*1.7,
        tw:Math.random()*Math.PI*2,
        speed:.15+Math.random()*.65,
      }));
      dust = Array.from({length:Math.min(160, Math.max(60, Math.floor(base*.5)))}, () => ({
        x:Math.random()*width,
        y:Math.random()*height,
        vx:(Math.random()-.5)*.12,
        vy:(Math.random()-.5)*.12,
        r:.4+Math.random()*1.8,
        a:.15+Math.random()*.45,
      }));
      rain = Array.from({length:Math.min(100, Math.max(42, Math.floor(width/16)))}, () => ({
        x:Math.random()*width,
        y:Math.random()*height,
        len:8+Math.random()*28,
        speed:180+Math.random()*300,
        alpha:.1+Math.random()*.36,
      }));
      meteors = Array.from({length:18}, () => spawnMeteor(true));
    }

    function spawnMeteor(initial=false) {
      return {
        x: initial ? Math.random()*width : -80-Math.random()*180,
        y: initial ? Math.random()*height*.7 : Math.random()*height*.55,
        vx: 350+Math.random()*300,
        vy: 170+Math.random()*240,
        len: 35+Math.random()*85,
        life: initial ? Math.random()*2.5 : 0,
      };
    }

    function hexToRgb(hex) {
      const m = hex.replace('#','').match(/.{1,2}/g);
      if (!m || m.length < 3) return [255,255,255];
      return m.slice(0,3).map((v) => Number.parseInt(v,16));
    }

    function rgba(color, alpha) {
      const rgb = hexToRgb(color);
      return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.max(0,Math.min(1,alpha))})`;
    }

    function clear() {
      const c = palette();
      ctx.fillStyle = c.bg;
      ctx.fillRect(0,0,width,height);
    }

    function starField(now, warp=false) {
      const c = palette();
      const cx = width*.5;
      const cy = height*.5;
      for (const s of stars) {
        let x=s.x, y=s.y;
        if (warp) {
          const dx=x-cx, dy=y-cy;
          const dist=Math.max(1,Math.hypot(dx,dy));
          const factor=1 + Math.sin(now*.0003)*.003 + s.z*.0022;
          x=cx + dx*factor;
          y=cy + dy*factor;
          s.x += dx/dist*(4+s.z*7);
          s.y += dy/dist*(4+s.z*7);
          if (s.x < -80 || s.x > width+80 || s.y < -80 || s.y > height+80) {
            s.x=cx+(Math.random()-.5)*20;
            s.y=cy+(Math.random()-.5)*20;
          }
        }
        const pulse=.5+.5*Math.sin(now*.001*s.speed+s.tw);
        ctx.beginPath();
        ctx.fillStyle=rgba([c.p,c.s,c.a][Math.floor(s.z*3)%3], .2 + pulse*.55);
        ctx.arc(x,y,s.r*(.65+pulse*.65),0,Math.PI*2);
        ctx.fill();
      }
    }

    function universe(now) {
      const c=palette();
      const g=ctx.createRadialGradient(width*.52,height*.47,0,width*.52,height*.47,Math.max(width,height)*.72);
      g.addColorStop(0,rgba(c.s,.09)); g.addColorStop(.35,rgba(c.p,.035)); g.addColorStop(1,rgba(c.bg,0));
      ctx.fillStyle=g; ctx.fillRect(0,0,width,height);
      starField(now,false);
      for (let i=0;i<stars.length;i++) {
        const a=stars[i], max=95;
        for (let j=i+1;j<Math.min(i+5,stars.length);j++) {
          const b=stars[j], dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
          if (d>max) continue;
          ctx.beginPath(); ctx.strokeStyle=rgba(i%2?c.s:c.p,(1-d/max)*.08); ctx.lineWidth=.45; ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke();
        }
      }
    }

    function nebula(now) {
      const c=palette();
      const blobs=[
        [width*.22+Math.sin(now*.00015)*50,height*.28,c.s,Math.max(width,height)*.32],
        [width*.72+Math.cos(now*.00012)*45,height*.36,c.p,Math.max(width,height)*.35],
        [width*.52,height*.74+Math.sin(now*.00018)*35,c.a,Math.max(width,height)*.3],
      ];
      for (const [x,y,color,r] of blobs) {
        const g=ctx.createRadialGradient(x,y,0,x,y,r);
        g.addColorStop(0,rgba(color,.15)); g.addColorStop(.35,rgba(color,.08)); g.addColorStop(1,rgba(color,0));
        ctx.fillStyle=g; ctx.fillRect(x-r,y-r,r*2,r*2);
      }
      starField(now,false);
    }

    function aurora(now) {
      const c=palette();
      ctx.lineWidth=1.2;
      for(let band=0;band<7;band++){
        ctx.beginPath();
        for(let x=-40;x<=width+40;x+=14){
          const y=height*.28+band*55 + Math.sin(x*.006+now*.0007+band)*34 + Math.sin(x*.0017-now*.00035)*22;
          if(x===-40)ctx.moveTo(x,y); else ctx.lineTo(x,y);
        }
        ctx.strokeStyle=rgba([c.p,c.s,c.a][band%3],.16);
        ctx.shadowColor=rgba([c.p,c.s,c.a][band%3],.15); ctx.shadowBlur=16; ctx.stroke(); ctx.shadowBlur=0;
      }
      starField(now,false);
    }

    function solar(now) {
      const c=palette();
      const cx=width*.64, cy=height*.46;
      const sunR=Math.min(width,height)*.09;
      const sg=ctx.createRadialGradient(cx,cy,0,cx,cy,sunR*2.3);
      sg.addColorStop(0,rgba(c.a,.28)); sg.addColorStop(.35,rgba(c.p,.1)); sg.addColorStop(1,rgba(c.a,0));
      ctx.fillStyle=sg; ctx.fillRect(cx-sunR*2.3,cy-sunR*2.3,sunR*4.6,sunR*4.6);
      const sun=ctx.createRadialGradient(cx-sunR*.25,cy-sunR*.25,3,cx,cy,sunR);
      sun.addColorStop(0,c.text); sun.addColorStop(.35,c.p); sun.addColorStop(1,c.s);
      ctx.fillStyle=sun; ctx.beginPath(); ctx.arc(cx,cy,sunR,0,Math.PI*2); ctx.fill();
      for(let ring=1;ring<=3;ring++){
        const rr=sunR*(1.9+ring*.72);
        ctx.beginPath(); ctx.strokeStyle=rgba(c.p,.12); ctx.lineWidth=1; ctx.arc(cx,cy,rr,0,Math.PI*2); ctx.stroke();
        const a=now*.00018*(1+.4*ring)+ring*1.5;
        const px=cx+Math.cos(a)*rr, py=cy+Math.sin(a)*rr*.62;
        ctx.fillStyle=ring===2?c.a:c.s; ctx.beginPath(); ctx.arc(px,py,4+ring,0,Math.PI*2); ctx.fill();
      }
      starField(now,false);
    }

    function warp(now) {
      starField(now,true);
      const c=palette();
      const cx=width*.5,cy=height*.5;
      for(let i=0;i<28;i++){
        const a=i/28*Math.PI*2+now*.00012;
        const r0=40+(i%7)*25;
        const r1=Math.min(width,height)*.72;
        ctx.beginPath();
        ctx.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);
        ctx.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);
        ctx.strokeStyle=rgba(i%2?c.p:c.s,.025);ctx.lineWidth=1;ctx.stroke();
      }
    }

    function grid(now) {
      const c=palette();
      gridOffset=(gridOffset + .35 + (prefersReduced()?0:.8))%80;
      const horizon=height*.53;
      ctx.lineWidth=1;
      for(let y=horizon;y<height+80;y+=Math.pow((y-horizon)/110+1,1.18)*18){
        ctx.beginPath(); ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.strokeStyle=rgba(c.p,.09);ctx.stroke();
      }
      for(let x=-width;x<width*2;x+=80){
        ctx.beginPath();ctx.moveTo(width*.5+(x-width*.5)*.12,horizon);ctx.lineTo(x+gridOffset,height);ctx.strokeStyle=rgba(c.s,.075);ctx.stroke();
      }
      for(let i=0;i<12;i++){
        const x=width*(i+1)/13 + Math.sin(now*.0005+i)*10;
        ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.strokeStyle=rgba(c.a,.018);ctx.stroke();
      }
      starField(now,false);
    }

    function constellation(now) {
      const c=palette();
      starField(now,false);
      for(let i=0;i<stars.length;i++){
        let connected=0;
        for(let j=i+1;j<stars.length&&connected<2;j++){
          const a=stars[i],b=stars[j],d=Math.hypot(a.x-b.x,a.y-b.y);
          if(d<135){
            ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=rgba(c.s,(1-d/135)*.12);ctx.lineWidth=.6;ctx.stroke();connected++;
          }
        }
      }
    }

    function matrix(now,dt) {
      const c=palette();
      ctx.font='12px ui-monospace,monospace';
      for(const r of rain){
        r.y += r.speed*dt/1000;
        if(r.y>height+r.len) { r.y=-r.len-Math.random()*height*.3; r.x=Math.random()*width; }
        const chars='01ABCDEF∑∂λΩ';
        const count=Math.max(1,Math.floor(r.len/12));
        for(let k=0;k<count;k++){
          const y=r.y-k*13;
          if(y<0||y>height)continue;
          const alpha=r.alpha*(1-k/count);
          ctx.fillStyle=rgba(k===0?c.p:c.s,alpha);
          ctx.fillText(chars[(Math.random()*chars.length)|0],r.x,y);
        }
      }
    }

    function plasma(now) {
      const c=palette();
      const lines=10;
      for(let l=0;l<lines;l++){
        ctx.beginPath();
        const yy=height*(.22+.06*l);
        for(let x=0;x<=width;x+=12){
          const y=yy + Math.sin(x*.008+now*.0011+l)*24 + Math.sin(x*.0024-now*.0007+l*1.3)*18;
          if(x===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
        }
        ctx.strokeStyle=rgba([c.p,c.s,c.a][l%3],.1);
        ctx.lineWidth=1.3;ctx.shadowColor=rgba([c.p,c.s,c.a][l%3],.12);ctx.shadowBlur=12;ctx.stroke();ctx.shadowBlur=0;
      }
      for(const d of dust){
        d.x+=d.vx*(prefersReduced()?0:.75); d.y+=d.vy*(prefersReduced()?0:.75);
        if(d.x<0)d.x=width;if(d.x>width)d.x=0;if(d.y<0)d.y=height;if(d.y>height)d.y=0;
        ctx.fillStyle=rgba(dust.indexOf(d)%2?c.s:c.p,d.a*.45);ctx.beginPath();ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();
      }
    }

    function dna(now) {
      const c=palette();
      const cx=width*.7;
      const amp=Math.min(width*.11,150);
      const top=-30, bottom=height+30;
      const turns=height/150;
      for(let strand=0;strand<2;strand++){
        ctx.beginPath();
        for(let y=top;y<=bottom;y+=8){
          const phase=y*.045+now*.0014;
          const x=cx+(strand?Math.sin(phase+Math.PI):Math.sin(phase))*amp;
          if(y===top)ctx.moveTo(x,y);else ctx.lineTo(x,y);
        }
        ctx.strokeStyle=rgba(strand?c.s:c.p,.34);ctx.lineWidth=1.4;ctx.stroke();
      }
      for(let y=top+10;y<bottom;y+=22){
        const phase=y*.045+now*.0014;
        const x1=cx+Math.sin(phase)*amp,x2=cx+Math.sin(phase+Math.PI)*amp;
        ctx.beginPath();ctx.moveTo(x1,y);ctx.lineTo(x2,y);ctx.strokeStyle=rgba(c.a,.14);ctx.lineWidth=1;ctx.stroke();
      }
      starField(now,false);
    }

    function meteor(now,dt) {
      const c=palette();
      for(let i=0;i<meteors.length;i++){
        const m=meteors[i];
        m.x+=m.vx*dt/1000; m.y+=m.vy*dt/1000; m.life+=dt/1000;
        if(m.x>width+120||m.y>height+120||m.life>4.5) meteors[i]=spawnMeteor(false);
        const len=m.len;
        const mag=Math.hypot(m.vx,m.vy); const nx=m.vx/mag,ny=m.vy/mag;
        const tx=m.x-nx*len,ty=m.y-ny*len;
        const grad=ctx.createLinearGradient(tx,ty,m.x,m.y);
        grad.addColorStop(0,rgba(c.s,0));grad.addColorStop(.55,rgba(c.p,.16));grad.addColorStop(1,rgba(c.text,.85));
        ctx.strokeStyle=grad;ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(tx,ty);ctx.lineTo(m.x,m.y);ctx.stroke();
      }
      starField(now,false);
    }

    function dustMode(now) {
      const c=palette();
      for(const d of dust){
        d.x += d.vx + Math.sin(now*.0002+d.y*.003)*.08;
        d.y += d.vy + Math.cos(now*.00018+d.x*.002)*.06;
        if(d.x<0)d.x=width;if(d.x>width)d.x=0;if(d.y<0)d.y=height;if(d.y>height)d.y=0;
        const glow=.35+.35*Math.sin(now*.001+d.x*.01+d.y*.01);
        ctx.fillStyle=rgba(dust.indexOf(d)%3===0?c.a:(dust.indexOf(d)%2?c.s:c.p),d.a*glow*.8);
        ctx.beginPath();ctx.arc(d.x,d.y,d.r*(.7+glow),0,Math.PI*2);ctx.fill();
      }
      starField(now,false);
    }

    function frame(now) {
      const dt=Math.min(now-last,32); last=now;
      t+=dt;
      clear();
      const mode=modes[modeIndex].draw;
      if(mode==='universe') universe(now);
      else if(mode==='nebula') nebula(now);
      else if(mode==='aurora') aurora(now);
      else if(mode==='solar') solar(now);
      else if(mode==='warp') warp(now);
      else if(mode==='grid') grid(now);
      else if(mode==='constellation') constellation(now);
      else if(mode==='matrix') matrix(now,dt);
      else if(mode==='plasma') plasma(now);
      else if(mode==='dna') dna(now);
      else if(mode==='meteor') meteor(now,dt);
      else dustMode(now);
      if(prefersReduced()) {
        if(raf) cancelAnimationFrame(raf);
        raf=0;
        return;
      }
      raf=requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize',resize,{passive:true});
    reducedMotion.addEventListener?.('change', () => { if(reducedMotion.matches && raf){cancelAnimationFrame(raf);raf=0;} else if(!reducedMotion.matches && !raf){last=performance.now();raf=requestAnimationFrame(frame);} });

    window.portfolioBackground = Object.freeze({ index:modeIndex, name:modes[modeIndex].name, type:modes[modeIndex].draw });
    if(prefersReduced()) frame(performance.now()); else raf=requestAnimationFrame(frame);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, {once:true});
  } else {
    boot();
  }
})();
