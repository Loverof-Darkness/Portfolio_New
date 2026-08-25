import { describe, expect, it, vi } from 'vitest';
import { activeLinkHashes, click, navigateTo, setHash, sidebarLink } from './helpers.js';

const load = () => import('../contact.js');

describe('contact.js', () => {
  it('renders the icon-only connect panel as soon as it loads', async () => {
    await load();

    const icons = [...document.querySelectorAll('#connect-panel .connect-icon')];
    expect(icons).toHaveLength(2);
    expect(icons[0].getAttribute('href')).toBe('mailto:rgpv.abhay@gmail.com');
    expect(icons[0].getAttribute('aria-label')).toBe('Email me');
    expect(icons[1].getAttribute('href')).toBe('https://www.linkedin.com/in/rgpvabhay1');
    expect(icons[1].getAttribute('rel')).toBe('noopener noreferrer');
    expect(document.querySelector('#connect-panel .connect-header h2').textContent).toBe('CONTACT ME');
    expect(document.getElementById('connect-runtime-style')).not.toBeNull();
  });

  it('renders inside the main content column', async () => {
    await load();

    expect(document.getElementById('connect-panel').parentElement).toBe(document.querySelector('.content'));
  });

  it('overrides any panel left behind by an earlier connect implementation', async () => {
    const legacy = document.createElement('section');
    legacy.id = 'connect-panel';
    legacy.innerHTML = '<div class="connect-card">legacy</div>';
    document.querySelector('.content').appendChild(legacy);
    const legacyStyle = document.createElement('style');
    legacyStyle.id = 'connect-runtime-style';
    document.head.appendChild(legacyStyle);

    await load();

    expect(document.querySelectorAll('#connect-panel')).toHaveLength(1);
    expect(document.querySelectorAll('#connect-panel .connect-card')).toHaveLength(0);
    expect(document.querySelectorAll('#connect-runtime-style')).toHaveLength(1);
  });

  it('exposes the renderer on window for later loaders', async () => {
    await load();
    document.getElementById('connect-panel').remove();

    window.renderConnect();

    expect(document.querySelectorAll('#connect-panel .connect-icon')).toHaveLength(2);
  });

  it('activates only the connect view when its sidebar link is clicked', async () => {
    await load();
    document.body.className = 'education-active';

    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    sidebarLink('#connect').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
    expect(document.body.classList.contains('connect-active')).toBe(true);
    expect(document.body.classList.contains('education-active')).toBe(false);
    expect(activeLinkHashes()).toEqual(['#connect']);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('activates the view on load when the page opens on the connect hash', async () => {
    setHash('#connect');
    await load();

    expect(document.body.classList.contains('connect-active')).toBe(true);
  });

  it('activates and deactivates the view as the hash changes', async () => {
    await load();

    navigateTo('#connect');
    expect(document.body.classList.contains('connect-active')).toBe(true);

    navigateTo('#home');
    expect(document.body.classList.contains('connect-active')).toBe(false);
  });

  it('skips rendering when the content container is missing', async () => {
    document.querySelector('.content').remove();
    await load();

    expect(document.getElementById('connect-panel')).toBeNull();
  });

  it('renders but binds nothing when the sidebar link is absent', async () => {
    document.querySelector('.sidebar').remove();
    await load();

    expect(document.getElementById('connect-panel')).not.toBeNull();
    expect(document.body.classList.contains('connect-active')).toBe(false);
  });

  it('defers binding until DOMContentLoaded while the document is loading', async () => {
    const readyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    await load();
    expect(document.getElementById('connect-panel')).toBeNull();

    readyState.mockReturnValue('complete');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(document.getElementById('connect-panel')).not.toBeNull();
  });
});
