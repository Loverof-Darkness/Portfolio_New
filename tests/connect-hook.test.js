import { beforeEach, describe, expect, it, vi } from 'vitest';
import { navigateTo, setHash } from './helpers.js';

const load = () => import('../connect-hook.js');

let frames;

function captureFrames() {
  frames = [];
  vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) => {
    frames.push(callback);
    return frames.length;
  });
}

/** The hook waits two animation frames before it enforces the layout. */
function runFrames() {
  for (let i = 0; i < 4 && frames.length; i += 1) {
    frames.splice(0).forEach((callback) => callback(i));
  }
}

function addConnectPanel() {
  const panel = document.createElement('section');
  panel.id = 'connect-panel';
  panel.innerHTML = '<header class="connect-header"></header><div class="connect-icons"></div>';
  document.querySelector('.content').appendChild(panel);
  return panel;
}

describe('connect-hook.js', () => {
  beforeEach(() => {
    captureFrames();
    window.renderConnect = vi.fn(addConnectPanel);
  });

  it('does nothing while another route is active', async () => {
    await load();

    expect(window.renderConnect).not.toHaveBeenCalled();
    expect(frames).toHaveLength(0);
  });

  it('renders the connect panel on load when the connect hash is active', async () => {
    setHash('#connect');
    await load();

    expect(window.renderConnect).toHaveBeenCalledTimes(1);
  });

  it('pins the panel to the top-left after two animation frames', async () => {
    setHash('#connect');
    await load();
    runFrames();

    const panel = document.getElementById('connect-panel');
    expect(panel.style.getPropertyValue('display')).toBe('flex');
    expect(panel.style.getPropertyPriority('display')).toBe('important');
    expect(panel.style.getPropertyValue('justify-content')).toBe('flex-start');
    expect(panel.style.getPropertyValue('align-items')).toBe('flex-start');
    expect(panel.style.getPropertyValue('height')).toBe('100vh');
    expect(panel.style.getPropertyValue('padding-top')).toBe('24px');
    expect(panel.style.getPropertyValue('overflow')).toBe('auto');
  });

  it('left-aligns the header and lifts the icon row', async () => {
    setHash('#connect');
    await load();
    runFrames();

    const header = document.querySelector('#connect-panel .connect-header');
    expect(header.style.getPropertyValue('text-align')).toBe('left');
    expect(header.style.getPropertyValue('max-width')).toBe('950px');
    expect(header.style.getPropertyValue('align-self')).toBe('flex-start');

    const icons = document.querySelector('#connect-panel .connect-icons');
    expect(icons.style.getPropertyValue('margin-top')).toBe('4px');
  });

  it('tolerates a missing panel and missing inner nodes', async () => {
    window.renderConnect = vi.fn();
    setHash('#connect');
    await load();

    expect(() => runFrames()).not.toThrow();

    const panel = document.createElement('section');
    panel.id = 'connect-panel';
    document.body.appendChild(panel);
    window.dispatchEvent(new Event('hashchange'));
    expect(() => runFrames()).not.toThrow();
    expect(panel.style.getPropertyValue('display')).toBe('flex');
  });

  it('renders when the hash changes to connect', async () => {
    await load();
    navigateTo('#connect');

    expect(window.renderConnect).toHaveBeenCalledTimes(1);
    runFrames();
    expect(document.getElementById('connect-panel').style.getPropertyValue('display')).toBe('flex');
  });

  it('re-enforces the layout when the panel is mutated', async () => {
    setHash('#connect');
    await load();
    runFrames();

    const panel = document.getElementById('connect-panel');
    panel.style.setProperty('display', 'block');
    panel.appendChild(document.createElement('span'));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(panel.style.getPropertyValue('display')).toBe('flex');
  });

  it('does not enforce the layout for other routes when the DOM mutates', async () => {
    await load();
    const panel = addConnectPanel();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(panel.style.getPropertyValue('display')).toBe('');
  });

  it('skips rendering when no connect renderer is available', async () => {
    delete window.renderConnect;
    setHash('#connect');

    await expect(load()).resolves.toBeDefined();
    expect(frames.length).toBeGreaterThan(0);
  });
});
