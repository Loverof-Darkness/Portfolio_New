import { describe, expect, it, vi } from 'vitest';
import { navigateTo, setHash } from './helpers.js';

const load = () => import('../connect.js');

describe('connect.js', () => {
  it('stays hidden while another route is active', async () => {
    await load();

    expect(document.getElementById('connect-panel')).toBeNull();
    expect(document.getElementById('connect-runtime-style')).toBeNull();
  });

  it('renders the email and LinkedIn icons on the connect hash', async () => {
    setHash('#connect');
    await load();

    const icons = [...document.querySelectorAll('#connect-panel .connect-icon')];
    expect(icons).toHaveLength(2);
    expect(icons[0].classList.contains('email-icon')).toBe(true);
    expect(icons[0].getAttribute('href')).toBe('mailto:rgpv.abhay@gmail.com');
    expect(icons[1].classList.contains('linkedin-icon')).toBe(true);
    expect(icons[1].getAttribute('target')).toBe('_blank');
    expect(document.querySelector('.connect-kicker').textContent).toBe('GET IN TOUCH');
    expect(document.getElementById('connect-runtime-style')).not.toBeNull();
  });

  it('renders as a fixed overlay on the body rather than inside the content column', async () => {
    setHash('#connect');
    await load();

    expect(document.getElementById('connect-panel').parentElement).toBe(document.body);
  });

  it('exposes render and hide helpers on window', async () => {
    await load();

    expect(typeof window.renderConnect).toBe('function');
    expect(typeof window.hideConnect).toBe('function');
  });

  it('ignores a direct render call while the hash points elsewhere', async () => {
    await load();
    window.renderConnect();

    expect(document.getElementById('connect-panel')).toBeNull();
  });

  it('removes the panel and its styles through hideConnect', async () => {
    setHash('#connect');
    await load();
    window.hideConnect();

    expect(document.getElementById('connect-panel')).toBeNull();
    expect(document.getElementById('connect-runtime-style')).toBeNull();
  });

  it('shows and hides the panel as the hash changes', async () => {
    await load();

    navigateTo('#connect');
    expect(document.getElementById('connect-panel')).not.toBeNull();

    navigateTo('#home');
    expect(document.getElementById('connect-panel')).toBeNull();
  });

  it('never duplicates the panel across repeated renders', async () => {
    setHash('#connect');
    await load();
    navigateTo('#connect');
    window.renderConnect();

    expect(document.querySelectorAll('#connect-panel')).toHaveLength(1);
    expect(document.querySelectorAll('#connect-runtime-style')).toHaveLength(1);
  });

  it('waits for DOMContentLoaded while the document is loading', async () => {
    const readyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    setHash('#connect');
    await load();
    expect(document.getElementById('connect-panel')).toBeNull();

    readyState.mockReturnValue('complete');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(document.getElementById('connect-panel')).not.toBeNull();
  });
});
