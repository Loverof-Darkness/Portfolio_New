import { describe, expect, it, vi } from 'vitest';
import { activeLinkHashes, click, navigateTo, setHash, sidebarLink } from './helpers.js';

const load = () => import('../publication.js');

const DOI = '10.53555/AJBR.v28i3S.7370';

describe('publication.js', () => {
  it('does not render the publication until its route is entered', async () => {
    await load();

    expect(document.getElementById('publications')).toBeNull();
    expect(document.body.classList.contains('publication-active')).toBe(false);
  });

  it('renders the publication metadata and outbound links', async () => {
    await load();
    click(sidebarLink('#publications'));

    const section = document.getElementById('publications');
    expect(section.querySelector('.publication-title').textContent).toBe(
      'Berberine Nanoparticles as a Promising Intervention for Diabetic-Wound Healing: A Comprehensive Review',
    );
    expect(section.querySelector('.publication-journal').textContent).toBe(
      'African Journal of Biomedical Research',
    );
    expect(section.querySelector('.publication-meta-pill').textContent).toBe('REVIEW ARTICLE');
    expect([...section.querySelectorAll('.publication-info-row strong')].map((el) => el.textContent)).toEqual([
      'APR 2025',
      DOI,
    ]);
    expect(section.querySelector('.publication-button.primary').href).toBe(`https://doi.org/${DOI}`);
    expect(section.querySelector('.publication-caption').textContent).toBe(
      'VOL. 28 · NO. 3S · 55–67 · African Journal of Biomedical Research',
    );
    expect(document.getElementById('publication-runtime-style')).not.toBeNull();
  });

  it('activates the publication view and marks only its sidebar link active', async () => {
    await load();
    document.body.classList.add('education-active');
    click(sidebarLink('#publications'));

    expect(document.body.classList.contains('publication-active')).toBe(true);
    expect(document.body.classList.contains('education-active')).toBe(false);
    expect(activeLinkHashes()).toEqual(['#publications']);
    expect(window.location.hash).toBe('#publications');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('prevents default navigation on the sidebar link', async () => {
    await load();
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    sidebarLink('#publications').dispatchEvent(event);

    expect(event.defaultPrevented).toBe(true);
  });

  it('renders on load and on hashchange for the publications hash', async () => {
    setHash('#publications');
    await load();
    expect(document.getElementById('publications')).not.toBeNull();

    navigateTo('#publications');
    expect(document.querySelectorAll('#publications')).toHaveLength(1);
    expect(document.querySelectorAll('#publication-runtime-style')).toHaveLength(1);
  });

  it('lazily loads the extracurricular module exactly once', async () => {
    await load();

    const loaders = [...document.querySelectorAll('script[data-beyond-loader]')];
    expect(loaders).toHaveLength(1);
    expect(loaders[0].getAttribute('src')).toBe('./beyond.js?v=1');
    expect(loaders[0].defer).toBe(true);
  });

  it('does not add a second extracurricular loader when one already exists', async () => {
    const existing = document.createElement('script');
    existing.dataset.beyondLoader = 'true';
    document.body.appendChild(existing);

    await load();

    expect(document.querySelectorAll('script[data-beyond-loader]')).toHaveLength(1);
  });

  it('exposes the legacy connect renderer and renders its contact cards on load', async () => {
    await load();

    expect(typeof window.renderConnect).toBe('function');
    const cards = [...document.querySelectorAll('#connect-panel .connect-card')];
    expect(cards.map((card) => card.querySelector('strong').textContent)).toEqual([
      'rgpv.abhay@gmail.com',
      'linkedin.com/in/rgpvabhay1',
    ]);
    expect(cards[0].getAttribute('href')).toBe('mailto:rgpv.abhay@gmail.com');
    expect(cards[1].getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('switches to the connect view when its sidebar link is clicked', async () => {
    await load();
    click(sidebarLink('#publications'));
    click(sidebarLink('#connect'));

    expect(document.body.classList.contains('connect-active')).toBe(true);
    expect(document.body.classList.contains('publication-active')).toBe(false);
    expect(activeLinkHashes()).toEqual(['#connect']);
    expect(document.querySelectorAll('#connect-panel')).toHaveLength(1);
  });

  it('drops the connect view when navigating away by hash', async () => {
    await load();
    click(sidebarLink('#connect'));
    navigateTo('#home');

    expect(document.body.classList.contains('connect-active')).toBe(false);
  });

  it('restores the connect view on a hashchange back to it', async () => {
    await load();
    navigateTo('#connect');

    expect(document.body.classList.contains('connect-active')).toBe(true);
    expect(document.getElementById('connect-panel')).not.toBeNull();
  });

  it('renders nothing when the content container is missing', async () => {
    document.querySelector('.content').remove();
    setHash('#publications');
    await load();

    expect(document.getElementById('publications')).toBeNull();
    expect(document.getElementById('connect-panel')).toBeNull();
  });

  it('defers binding until DOMContentLoaded while the document is loading', async () => {
    const readyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    setHash('#publications');
    await load();
    expect(document.getElementById('publications')).toBeNull();

    readyState.mockReturnValue('complete');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(document.getElementById('publications')).not.toBeNull();
  });

  it('binds nothing when the sidebar links are absent', async () => {
    document.querySelector('.sidebar').remove();
    setHash('#publications');
    await load();

    expect(document.getElementById('publications')).toBeNull();
  });
});
