import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { vi } from 'vitest';

export const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const indexHtml = readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const htmlInner = indexHtml.match(/<html[^>]*>([\s\S]*)<\/html>/i)[1];

/**
 * Renders the real index.html markup into the jsdom document. Scripts inserted
 * through innerHTML are never executed, so modules stay under test control.
 */
export function loadIndexFixture(bodyClass = 'home-active') {
  document.documentElement.innerHTML = htmlInner;
  document.body.className = bodyClass;
}

export function createCanvasContextStub() {
  return {
    calls: [],
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    beginPath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    arc: vi.fn(),
    createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
  };
}

/** Sets the hash without letting jsdom queue an async hashchange event. */
export function setHash(hash) {
  history.replaceState(null, '', hash);
}

/** Deterministically drives the hash-routing listeners the modules register. */
export function navigateTo(hash) {
  setHash(hash);
  window.dispatchEvent(new Event('hashchange'));
}

/** Re-evaluates a source module so its load-time side effects run again. */
export async function importModule(specifier) {
  vi.resetModules();
  return import(/* @vite-ignore */ specifier);
}

export function sidebarLink(hash) {
  const link = document.querySelector(`.sidebar nav a[href="${hash}"]`);
  if (!link) throw new Error(`missing sidebar link for ${hash}`);
  return link;
}

export function click(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}

export function activeLinkHashes() {
  return [...document.querySelectorAll('.sidebar nav a.active')].map((link) => link.getAttribute('href'));
}
