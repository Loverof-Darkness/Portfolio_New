import { describe, expect, it, vi } from 'vitest';
import { activeLinkHashes, click, navigateTo, setHash, sidebarLink } from './helpers.js';

const load = () => import('../beyond.js');

const ACTIVITIES = [
  ['01 · STRATEGY', 'Chess', './assets/extracurricular/chess.webp?v=1', '#00e5ff'],
  ['02 · TEAM SPORT', 'Volleyball', './assets/extracurricular/volleyball.webp?v=1', '#8b5cf6'],
  ['03 · AGILITY', 'Badminton', './assets/extracurricular/badminton.webp?v=1', '#00e5ff'],
  [
    '04 · DIGITAL EXPLORATION',
    'Computer IT & Technology',
    './assets/extracurricular/computer-it.webp?v=1',
    '#8b5cf6',
  ],
];

function renderedItems() {
  return [...document.querySelectorAll('#beyond .beyond-item')].map((item) => [
    item.querySelector('.beyond-index').textContent,
    item.querySelector('h3').textContent,
    item.querySelector('img').getAttribute('src'),
    item.style.getPropertyValue('--accent'),
  ]);
}

describe('beyond.js', () => {
  it('does not render the panel until the extracurricular route is entered', async () => {
    await load();

    expect(document.getElementById('beyond')).toBeNull();
    expect(document.body.classList.contains('beyond-active')).toBe(false);
  });

  it('renders every activity with its kicker, image and accent', async () => {
    await load();
    click(sidebarLink('#beyond'));

    expect(renderedItems()).toEqual(ACTIVITIES);
    expect(document.querySelector('#beyond .beyond-header h2').textContent).toBe('BEYOND THE LAB');
    expect(document.getElementById('beyond-runtime-style')).not.toBeNull();
  });

  it('labels each image for accessibility', async () => {
    await load();
    click(sidebarLink('#beyond'));

    expect([...document.querySelectorAll('#beyond img')].map((img) => img.alt)).toEqual([
      'Illustrated reference for Chess',
      'Illustrated reference for Volleyball',
      'Illustrated reference for Badminton',
      'Illustrated reference for Computer IT & Technology',
    ]);
  });

  it('activates the view, relabels its sidebar entry and updates the hash', async () => {
    await load();
    document.body.classList.add('home-active');
    click(sidebarLink('#beyond'));

    expect(document.body.classList.contains('beyond-active')).toBe(true);
    expect(document.body.classList.contains('home-active')).toBe(false);
    expect(activeLinkHashes()).toEqual(['#beyond']);
    expect(sidebarLink('#beyond').querySelector('span').textContent).toBe('EXTRACURRICULAR');
    expect(window.location.hash).toBe('#beyond');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('prevents default navigation on the sidebar link', async () => {
    await load();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    sidebarLink('#beyond').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('tears the panel down when another sidebar entry is clicked', async () => {
    await load();
    click(sidebarLink('#beyond'));
    click(sidebarLink('#about'));

    expect(document.getElementById('beyond')).toBeNull();
    expect(document.getElementById('beyond-runtime-style')).toBeNull();
    expect(document.body.classList.contains('beyond-active')).toBe(false);
  });

  it('renders on load and stays single after a repeat hashchange', async () => {
    setHash('#beyond');
    await load();
    expect(document.getElementById('beyond')).not.toBeNull();

    navigateTo('#beyond');
    expect(document.querySelectorAll('#beyond')).toHaveLength(1);
    expect(document.querySelectorAll('#beyond-runtime-style')).toHaveLength(1);
    expect(renderedItems()).toHaveLength(4);
  });

  it('tears the panel down on a hashchange to another route', async () => {
    setHash('#beyond');
    await load();
    navigateTo('#home');

    expect(document.getElementById('beyond')).toBeNull();
    expect(document.body.classList.contains('beyond-active')).toBe(false);
  });

  it('lazily loads the contact module exactly once', async () => {
    await load();

    const loaders = [...document.querySelectorAll('script[data-contact-loader]')];
    expect(loaders).toHaveLength(1);
    expect(loaders[0].getAttribute('src')).toBe('./contact.js?v=2');
    expect(loaders[0].defer).toBe(true);
  });

  it('does not add a second contact loader when one already exists', async () => {
    const existing = document.createElement('script');
    existing.dataset.contactLoader = 'true';
    document.body.appendChild(existing);

    await load();

    expect(document.querySelectorAll('script[data-contact-loader]')).toHaveLength(1);
  });

  it('skips rendering when the content container is missing', async () => {
    document.querySelector('.content').remove();
    setHash('#beyond');
    await load();

    expect(document.getElementById('beyond')).toBeNull();
  });

  it('binds nothing when the sidebar link is absent', async () => {
    document.querySelector('.sidebar').remove();
    setHash('#beyond');
    await load();

    expect(document.getElementById('beyond')).toBeNull();
  });

  it('defers binding until DOMContentLoaded while the document is loading', async () => {
    const readyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    setHash('#beyond');
    await load();
    expect(document.getElementById('beyond')).toBeNull();

    readyState.mockReturnValue('complete');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(document.getElementById('beyond')).not.toBeNull();
  });
});
