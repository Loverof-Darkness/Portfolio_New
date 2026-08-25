import { beforeEach, describe, expect, it, vi } from 'vitest';
import { activeLinkHashes, click, navigateTo, setHash, sidebarLink } from './helpers.js';

const load = () => import('../education.js');

describe('education.js', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('does not render the panel until the education route is entered', async () => {
    await load();
    expect(document.getElementById('education')).toBeNull();
    expect(document.body.classList.contains('education-active')).toBe(false);
  });

  it('renders both degrees with their metadata when the sidebar link is clicked', async () => {
    await load();
    click(sidebarLink('#education'));

    const cards = [...document.querySelectorAll('#education .education-card')];
    expect(cards).toHaveLength(2);
    expect(cards.map((card) => card.querySelector('.education-badge').textContent)).toEqual([
      'B.Pharm',
      'M.Pharm',
    ]);
    expect(cards[0].querySelector('.education-degree').textContent).toBe('B.Pharma Pharmacy');
    expect(cards[1].querySelector('.education-years').textContent).toBe('2021–2023');
    expect(cards[0].style.getPropertyValue('--accent')).toBe('#00e5ff');
    expect(cards[1].style.getPropertyValue('--delay')).toBe('420ms');
    expect(document.getElementById('education-runtime-style')).not.toBeNull();
  });

  it('activates the education view and marks only its sidebar link active', async () => {
    await load();
    document.body.classList.add('home-active');
    click(sidebarLink('#education'));

    expect(document.body.classList.contains('education-active')).toBe(true);
    expect(document.body.classList.contains('home-active')).toBe(false);
    expect(activeLinkHashes()).toEqual(['#education']);
    expect(window.location.hash).toBe('#education');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('prevents default navigation on the sidebar link', async () => {
    await load();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    sidebarLink('#education').dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
  });

  it('marks the first card active initially and moves activation on hover', async () => {
    await load();
    click(sidebarLink('#education'));
    const cards = [...document.querySelectorAll('#education .education-card')];

    expect(cards[0].classList.contains('is-active')).toBe(true);

    cards[1].dispatchEvent(new Event('mouseenter'));
    expect(cards[0].classList.contains('is-active')).toBe(false);
    expect(cards[1].classList.contains('is-active')).toBe(true);

    cards[0].dispatchEvent(new Event('focus'));
    expect(cards[0].classList.contains('is-active')).toBe(true);
    expect(cards[1].classList.contains('is-active')).toBe(false);
  });

  it('toggles a card through its action button without activating the other card', async () => {
    await load();
    click(sidebarLink('#education'));
    const cards = [...document.querySelectorAll('#education .education-card')];

    click(cards[1].querySelector('.education-action'));
    expect(cards[1].classList.contains('is-active')).toBe(true);
    expect(cards[0].classList.contains('is-active')).toBe(false);

    click(cards[1].querySelector('.education-action'));
    expect(cards[1].classList.contains('is-active')).toBe(false);
  });

  it('activates a card when its body is clicked', async () => {
    await load();
    click(sidebarLink('#education'));
    const cards = [...document.querySelectorAll('#education .education-card')];

    click(cards[1].querySelector('.education-degree'));
    expect(cards[1].classList.contains('is-active')).toBe(true);
    expect(cards[0].classList.contains('is-active')).toBe(false);
  });

  it('replaces the panel instead of duplicating it on repeated navigation', async () => {
    await load();
    click(sidebarLink('#education'));
    click(sidebarLink('#education'));

    expect(document.querySelectorAll('#education')).toHaveLength(1);
    expect(document.querySelectorAll('#education-runtime-style')).toHaveLength(1);
    expect(document.querySelectorAll('#education .education-card')).toHaveLength(2);
  });

  it('renders on load when the page is opened directly on the education hash', async () => {
    setHash('#education');
    await load();

    expect(document.getElementById('education')).not.toBeNull();
    expect(document.body.classList.contains('education-active')).toBe(true);
  });

  it('tears down the panel when navigating to another hash', async () => {
    setHash('#education');
    await load();
    navigateTo('#home');

    expect(document.getElementById('education')).toBeNull();
    expect(document.getElementById('education-runtime-style')).toBeNull();
    expect(document.body.classList.contains('education-active')).toBe(false);
  });

  it('re-renders when the education hash is entered through a hashchange', async () => {
    await load();
    navigateTo('#education');

    expect(document.getElementById('education')).not.toBeNull();
    expect(document.body.classList.contains('education-active')).toBe(true);
  });

  it('binds nothing when the sidebar link is absent', async () => {
    document.querySelector('.sidebar')?.remove();
    setHash('#education');
    await load();

    expect(document.getElementById('education')).toBeNull();
  });

  it('waits for DOMContentLoaded while the document is still loading', async () => {
    const readyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    setHash('#education');
    await load();
    expect(document.getElementById('education')).toBeNull();

    readyState.mockReturnValue('complete');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(document.getElementById('education')).not.toBeNull();
  });

  it('skips rendering when the content container is missing', async () => {
    document.querySelector('.content').remove();
    setHash('#education');
    await load();

    expect(document.getElementById('education')).toBeNull();
    expect(document.body.classList.contains('education-active')).toBe(true);
  });
});
