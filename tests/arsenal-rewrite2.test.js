import { describe, expect, it, vi } from 'vitest';
import { navigateTo } from './helpers.js';

const load = () => import('../arsenal-rewrite2.js');

const INSTRUMENTS = [
  ['01', 'HPLC', 'Chromatographic Analysis'],
  ['02', 'UPLC', 'Ultra-High-Performance LC'],
  ['03', 'Ion Chromatography', 'Inorganic Ion Analysis'],
  ['04', 'IR', 'Infrared Spectroscopy'],
  ['05', 'UV-Visible Spectrophotometer', 'UV-Vis Spectroscopy'],
  ['06', 'Zeta Sizer', 'Particle / Zeta Potential'],
  ['07', 'DSC', 'Thermal Analysis'],
  ['08', 'TGA', 'Thermogravimetric Analysis'],
  ['09', 'Viscometer', 'Rheological Measurement'],
  ['10', 'pH meter', 'Electrochemical Measurement'],
  ['11', 'Osmometer', 'Osmolality Measurement'],
  ['12', 'Other Wet Chemical Techniques', 'Classical Analytical Techniques'],
];

function renderedCards() {
  return [...document.querySelectorAll('#arsenal .arsenal-rebuild-card')].map((card) => [
    card.querySelector('.arsenal-rebuild-number').textContent,
    card.querySelector('h3').textContent,
    card.querySelector('p').textContent,
  ]);
}

describe('arsenal-rewrite2.js', () => {
  it('exposes the injector on window without rendering on a non-arsenal view', async () => {
    await load();

    expect(typeof window.injectScientificArsenalSection).toBe('function');
    expect(document.getElementById('arsenal')).toBeNull();
  });

  it('renders every instrument with its number and category when the arsenal view is active', async () => {
    document.body.className = 'arsenal-active';
    await load();

    expect(renderedCards()).toEqual(INSTRUMENTS);
    expect(document.getElementById('arsenal').className).toBe('arsenal-rebuild');
    expect(document.getElementById('arsenal-rebuild-style')).not.toBeNull();
  });

  it('staggers the card animations by index', async () => {
    document.body.className = 'arsenal-active';
    await load();

    const delays = [...document.querySelectorAll('.arsenal-rebuild-card')].map((card) =>
      card.style.getPropertyValue('--delay'),
    );
    expect(delays[0]).toBe('0ms');
    expect(delays[1]).toBe('180ms');
    expect(delays[11]).toBe('1980ms');
  });

  it('replaces an existing arsenal section rather than appending a second one', async () => {
    document.body.className = 'arsenal-active';
    const stale = document.createElement('section');
    stale.id = 'arsenal';
    stale.textContent = 'stale';
    document.querySelector('.content').appendChild(stale);

    await load();

    expect(document.querySelectorAll('#arsenal')).toHaveLength(1);
    expect(document.getElementById('arsenal').textContent).not.toContain('stale');
    expect(renderedCards()).toHaveLength(12);
  });

  it('renders on hashchange once the arsenal view becomes active', async () => {
    await load();
    expect(document.getElementById('arsenal')).toBeNull();

    document.body.className = 'arsenal-active';
    navigateTo('#arsenal');

    expect(renderedCards()).toHaveLength(12);
  });

  it('retries shortly after load so a late view switch still renders', async () => {
    vi.useFakeTimers();
    try {
      await load();
      document.body.className = 'arsenal-active';
      expect(document.getElementById('arsenal')).toBeNull();

      await vi.advanceTimersByTimeAsync(100);
      expect(renderedCards()).toHaveLength(12);
    } finally {
      vi.useRealTimers();
    }
  });

  it('does nothing when the content container is missing', async () => {
    document.body.className = 'arsenal-active';
    document.querySelector('.content').remove();
    await load();

    expect(document.getElementById('arsenal')).toBeNull();
    expect(document.getElementById('arsenal-rebuild-style')).toBeNull();
  });
});
