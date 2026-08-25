import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { activeLinkHashes, click, setHash, sidebarLink } from './helpers.js';

const load = () => import('../script.js');

function setViewport(width, height, devicePixelRatio = 1) {
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true });
  Object.defineProperty(window, 'innerHeight', { value: height, configurable: true, writable: true });
  Object.defineProperty(window, 'devicePixelRatio', {
    value: devicePixelRatio,
    configurable: true,
    writable: true,
  });
}

/** Keeps the animation loop from running for tests that only exercise routing. */
function stopAnimationLoop() {
  return vi.spyOn(window, 'requestAnimationFrame').mockReturnValue(1);
}

describe('script.js', () => {
  beforeEach(() => {
    setViewport(1200, 900, 1);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('default view routing', () => {
    it('falls back to the home view and normalizes the hash', async () => {
      stopAnimationLoop();
      await load();

      expect(window.location.hash).toBe('#home');
      expect(document.body.classList.contains('home-active')).toBe(true);
      expect(activeLinkHashes()).toEqual(['#home']);
    });

    it('falls back to home for an unknown hash', async () => {
      stopAnimationLoop();
      setHash('#nope');
      await load();

      expect(window.location.hash).toBe('#home');
      expect(document.body.classList.contains('home-active')).toBe(true);
    });

    it('restores the about view from the hash', async () => {
      stopAnimationLoop();
      setHash('#about');
      await load();

      expect(document.body.classList.contains('about-active')).toBe(true);
      expect(document.body.classList.contains('home-active')).toBe(false);
      expect(activeLinkHashes()).toEqual(['#about']);
    });

    it('injects the experience section when loaded on its hash', async () => {
      stopAnimationLoop();
      setHash('#experience');
      await load();

      expect(document.getElementById('experience')).not.toBeNull();
      expect(document.body.classList.contains('experience-active')).toBe(true);
    });

    it('injects the arsenal section when loaded on its hash', async () => {
      stopAnimationLoop();
      setHash('#arsenal');
      await load();

      expect(document.getElementById('arsenal')).not.toBeNull();
      expect(document.body.classList.contains('arsenal-active')).toBe(true);
    });
  });

  describe('sidebar navigation', () => {
    it('switches to the about view without leaving the home class set', async () => {
      stopAnimationLoop();
      await load();
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      sidebarLink('#about').dispatchEvent(event);

      expect(event.defaultPrevented).toBe(true);
      expect(document.body.classList.contains('about-active')).toBe(true);
      expect(document.body.classList.contains('home-active')).toBe(false);
      expect(window.location.hash).toBe('#about');
    });

    it('ignores clicks whose link no longer points at the bound view', async () => {
      stopAnimationLoop();
      await load();
      const link = sidebarLink('#about');
      link.setAttribute('href', '#somewhere-else');

      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      link.dispatchEvent(event);

      expect(event.defaultPrevented).toBe(false);
      expect(document.body.classList.contains('about-active')).toBe(false);
    });

    it('renders the two experience roles and the career timeline', async () => {
      stopAnimationLoop();
      await load();
      click(sidebarLink('#experience'));

      const cards = [...document.querySelectorAll('#experience .experience-card')];
      expect(cards).toHaveLength(2);
      expect(cards[0].querySelector('.experience-company').textContent).toBe('VIATRIS');
      expect(cards[1].querySelector('.experience-company').textContent).toBe('ENDO PAR FORMULATIONS');
      expect(cards[0].classList.contains('current')).toBe(true);
      expect(document.getElementById('experience-runtime-styles')).not.toBeNull();
      expect(document.querySelector('.career-track')).not.toBeNull();
    });

    it('injects the experience section only once', async () => {
      stopAnimationLoop();
      await load();
      click(sidebarLink('#experience'));
      click(sidebarLink('#home'));
      click(sidebarLink('#experience'));

      expect(document.querySelectorAll('#experience')).toHaveLength(1);
      expect(document.querySelectorAll('#experience .experience-card')).toHaveLength(2);
    });

    it('renders the twelve arsenal instruments in order', async () => {
      stopAnimationLoop();
      await load();
      click(sidebarLink('#arsenal'));

      const items = [...document.querySelectorAll('#arsenal .arsenal-item')];
      expect(items).toHaveLength(12);
      expect(items[0].querySelector('.arsenal-name').textContent).toBe('HPLC');
      expect(items[0].querySelector('.arsenal-number').textContent).toBe('1.');
      expect(items[11].querySelector('.arsenal-name').textContent).toBe('Other Wet Chemical Techniques');
      expect(items[11].getAttribute('data-index')).toBe('11');
      expect(document.getElementById('arsenal-runtime-styles')).not.toBeNull();
    });

    it('keeps a single selected arsenal instrument across hover, focus and click', async () => {
      stopAnimationLoop();
      await load();
      click(sidebarLink('#arsenal'));
      const items = [...document.querySelectorAll('#arsenal .arsenal-item')];

      items[2].dispatchEvent(new Event('mouseenter'));
      expect(items[2].classList.contains('is-selected')).toBe(true);

      items[5].dispatchEvent(new Event('focus'));
      expect(items[2].classList.contains('is-selected')).toBe(false);
      expect(items[5].classList.contains('is-selected')).toBe(true);

      click(items[0]);
      expect(document.querySelectorAll('#arsenal .arsenal-item.is-selected')).toHaveLength(1);
      expect(items[0].classList.contains('is-selected')).toBe(true);
    });
  });

  describe('experience progress', () => {
    it('reports the elapsed career duration in years and months', async () => {
      stopAnimationLoop();
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2025-09-15T00:00:00Z'));
      await load();
      click(sidebarLink('#experience'));

      expect(document.querySelector('.experience-duration').textContent).toBe(
        '2y 0m total • Started Sep 2023 • Current role since Aug 2025',
      );
      expect(document.documentElement.style.getPropertyValue('--career-progress')).toBe('100%');
      expect(document.querySelector('.career-transition').style.transform).toMatch(/^translateX\(-?\d/);
    });

    it('recomputes progress on resize while the experience view is active', async () => {
      stopAnimationLoop();
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-03-15T00:00:00Z'));
      await load();
      click(sidebarLink('#experience'));
      document.querySelector('.experience-duration').textContent = 'stale';

      window.dispatchEvent(new Event('resize'));

      expect(document.querySelector('.experience-duration').textContent).toContain('2y 6m total');
    });
  });

  describe('canvas background', () => {
    it('sizes the canvas to the viewport and clamps the pixel ratio', async () => {
      stopAnimationLoop();
      setViewport(800, 600, 3);
      await load();

      const canvas = document.getElementById('molecule-bg');
      expect(canvas.width).toBe(1600);
      expect(canvas.height).toBe(1200);
      expect(canvas.style.width).toBe('800px');
      expect(canvas.style.height).toBe('600px');
      expect(canvas.getContext('2d').setTransform).toBeDefined();
    });

    it('resizes the canvas when the window resizes', async () => {
      stopAnimationLoop();
      await load();
      setViewport(500, 400, 1);
      window.dispatchEvent(new Event('resize'));

      const canvas = document.getElementById('molecule-bg');
      expect(canvas.width).toBe(500);
      expect(canvas.height).toBe(400);
    });

    it('paints atoms and bonds on each animation frame', async () => {
      const frames = [];
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        frames.push(callback);
        return frames.length;
      });
      await load();
      const ctx = HTMLCanvasElement.prototype.getContext.mock.results[0].value;

      expect(frames).toHaveLength(1);
      frames.pop()(1000);

      expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 1200, 900);
      expect(ctx.fillRect).toHaveBeenCalledWith(0, 0, 1200, 900);
      expect(ctx.arc).toHaveBeenCalled();
      expect(ctx.createRadialGradient).toHaveBeenCalled();
      expect(frames).toHaveLength(1); // the loop rescheduled itself
    });

    it('moves atoms toward the pointer while it is over the page', async () => {
      const frames = [];
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
        frames.push(callback);
        return frames.length;
      });
      await load();
      const ctx = HTMLCanvasElement.prototype.getContext.mock.results[0].value;

      window.dispatchEvent(new MouseEvent('pointermove', { clientX: 600, clientY: 450 }));
      frames.pop()(1000);
      const withPointer = ctx.arc.mock.calls.length;
      expect(withPointer).toBeGreaterThan(0);

      window.dispatchEvent(new Event('pointerleave'));
      ctx.arc.mockClear();
      frames.pop()(1032);
      expect(ctx.arc.mock.calls.length).toBe(withPointer);
    });

    it('stops the loop while the page is hidden and restarts it when visible', async () => {
      const raf = stopAnimationLoop();
      const cancel = vi.spyOn(window, 'cancelAnimationFrame');
      await load();

      const readyState = vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
      document.dispatchEvent(new Event('visibilitychange'));
      expect(cancel).toHaveBeenCalledWith(1);

      raf.mockClear();
      readyState.mockReturnValue(false);
      document.dispatchEvent(new Event('visibilitychange'));
      expect(raf).toHaveBeenCalled();
    });
  });

  describe('hero layout', () => {
    it('pins the hero to the viewport height on wide screens', async () => {
      stopAnimationLoop();
      setViewport(1200, 1000, 1);
      await load();

      expect(document.querySelector('.hero').style.minHeight).toBe('1000px');
    });

    it('never shrinks the hero below its minimum height', async () => {
      stopAnimationLoop();
      setViewport(1200, 300, 1);
      await load();

      expect(document.querySelector('.hero').style.minHeight).toBe('520px');
    });

    it('lets the hero size itself on narrow screens', async () => {
      stopAnimationLoop();
      setViewport(600, 900, 1);
      await load();

      expect(document.querySelector('.hero').style.minHeight).toBe('');
    });
  });

  describe('hero typing', () => {
    it('types the intro and all four summary lines', async () => {
      stopAnimationLoop();
      vi.useFakeTimers();
      await load();

      await vi.advanceTimersByTimeAsync(60 * 1000);

      const intro = document.querySelector('.intro-heading');
      expect(intro.querySelector('strong').textContent).toBe("I'm Abhay Gupta.");
      expect(intro.classList.contains('is-done')).toBe(true);

      const lines = [...document.querySelectorAll('.summary .typing-line')];
      expect(lines.map((line) => line.querySelector('span').textContent)).toEqual([
        'I am an Analytical Research Scientist specializing in method development',
        'and complex formulation analysis. From peptides to small molecules, I leverage HPLC/UPLC,',
        'DSC, and ion chromatography and other analytical instruments to generate precise, GMP-compliant data.',
        'My goal? To bridge the gap between lab innovation and regulatory approval.',
      ]);
      expect(lines.every((line) => line.classList.contains('is-done'))).toBe(true);
      expect(lines[0].querySelector('.typing-caret').style.opacity).toBe('0');
    });

    it('restarts the intro typing when the home link is clicked', async () => {
      stopAnimationLoop();
      vi.useFakeTimers();
      await load();
      await vi.advanceTimersByTimeAsync(60 * 1000);

      click(sidebarLink('#about'));
      click(sidebarLink('#home'));

      const intro = document.querySelector('.intro-heading');
      expect(intro.classList.contains('is-typing')).toBe(true);
      expect(intro.querySelector('strong').textContent).not.toBe("I'm Abhay Gupta.");
      expect(document.querySelector('.summary .typing-line span').textContent).toBe('');

      await vi.advanceTimersByTimeAsync(60 * 1000);
      expect(intro.querySelector('strong').textContent).toBe("I'm Abhay Gupta.");
    });

    it('skips typing when the hero markup is incomplete', async () => {
      stopAnimationLoop();
      vi.useFakeTimers();
      document.querySelector('.summary .typing-line').remove();
      await load();

      await vi.advanceTimersByTimeAsync(60 * 1000);
      expect(document.querySelector('.intro-heading strong').textContent).toBe('');
    });
  });

  it('tolerates a document without the canvas or hero markup', async () => {
    stopAnimationLoop();
    document.getElementById('molecule-bg').remove();
    document.querySelector('.content').remove();
    await expect(load()).resolves.toBeDefined();
  });
});
