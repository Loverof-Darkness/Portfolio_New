from pathlib import Path
import re
import sys

path = Path(sys.argv[1] if len(sys.argv) > 1 else 'docs/index.html')
html = path.read_text(encoding='utf-8')

# Replace the existing sidebar-specific CSS while preserving the rest of the page.
css = r'''
/* REFERENCE SIDEBAR v2 — matches the supplied portfolio reference */
:root{--side:225px}
.side{position:fixed;z-index:30;left:0;top:0;width:var(--side);height:100vh;background:#000;border-right:1px solid rgba(0,243,255,.16);padding:27px 13px 18px;display:flex;flex-direction:column}
.logo{padding:0 8px 30px;text-align:center}
.logo strong{display:block;font-size:48px;line-height:.78;letter-spacing:-5px;background:linear-gradient(135deg,#00f3ff 18%,#fff 58%);-webkit-background-clip:text;color:transparent;text-shadow:0 0 18px rgba(0,243,255,.08)}
.logo small{display:block;margin-top:10px;font-size:8px;font-weight:700;letter-spacing:.7px;color:#f2f5f6}
.nav{display:grid;gap:3px}
.nav a{min-height:53px;display:flex;align-items:center;gap:12px;padding:8px 11px;border:1px solid transparent;position:relative;transition:background .22s,border-color .22s,box-shadow .22s,transform .22s;overflow:hidden}
.nav a .glyph{width:29px;height:29px;flex:0 0 29px;border:0;border-radius:0;display:grid;place-items:center;font-size:18px;line-height:1;color:#e7eef0;background:transparent;opacity:.95}
.nav a span{display:flex;flex-direction:column;min-width:0}
.nav .n{font:8px 'JetBrains Mono';color:#56a9d4;letter-spacing:.2px;margin-bottom:2px}
.nav .t{font-size:10.5px;line-height:1.12;font-weight:500;color:#f1f4f5;letter-spacing:.05px}
.nav a.active,.nav a:hover{border-color:var(--cyan);background:linear-gradient(90deg,rgba(0,243,255,.13),rgba(0,243,255,.025));box-shadow:inset 0 0 18px rgba(0,243,255,.035),0 0 18px rgba(0,243,255,.04);transform:translateX(1px)}
.nav a.active:before{content:"";position:absolute;left:-1px;top:-1px;width:11px;height:11px;border-left:1px solid var(--cyan);border-top:1px solid var(--cyan)}
.nav a.active:after{content:"";position:absolute;right:-1px;bottom:-1px;width:11px;height:11px;border-right:1px solid var(--cyan);border-bottom:1px solid var(--cyan);top:auto}
.sideBottom{margin-top:auto;padding:0 7px}
.download{height:45px;display:flex;justify-content:center;align-items:center;border:1px solid var(--cyan);padding:10px 7px;color:var(--cyan);font-size:10px;font-weight:700;letter-spacing:.6px;clip-path:polygon(0 0,94% 0,100% 22%,100% 78%,94% 100%,0 100%);transition:.2s}
.download:hover{background:rgba(0,243,255,.12);box-shadow:0 0 22px rgba(0,243,255,.12)}
.social{display:flex;justify-content:center;gap:12px;margin:17px 0 25px}
.social a{width:34px;height:34px;border:1px solid #4d5a61;border-radius:50%;display:grid;place-items:center;font-size:12px;color:#f0f4f5;transition:.2s}
.social a:hover{border-color:var(--cyan);color:var(--cyan);box-shadow:0 0 14px rgba(0,243,255,.14)}
.copy{font-size:8px;color:#78838a;line-height:1.7;padding:0 7px 0;text-align:left}
@media(max-width:1050px) and (min-width:761px){:root{--side:205px}.nav a{min-height:50px}.nav .t{font-size:10px}}
'''

# Keep the original CSS intact and add one controlled override block before </style>.
marker = '/* REFERENCE SIDEBAR v2 — matches the supplied portfolio reference */'
html = re.sub(r'\n?\/\* REFERENCE SIDEBAR v2.*?\/\* SIDEBAR END \/\*/\n?', '\n', html, flags=re.S)
html = html.replace('</style>', '\n' + css + '\n/* SIDEBAR END */\n</style>', 1)
path.write_text(html, encoding='utf-8')
print(f'Updated {path}')
