import { afterEach, beforeEach, vi } from 'vitest';
import { createCanvasContextStub, loadIndexFixture, setHash } from './helpers.js';

// The modules under test are plain browser scripts that register global
// listeners on load. jsdom keeps one window per test file, so listeners from a
// previous evaluation are tracked here and torn down between tests.
let trackedListeners = [];
const trackedObservers = [];

const NativeMutationObserver = globalThis.MutationObserver;
globalThis.MutationObserver = class extends NativeMutationObserver {
  constructor(callback) {
    super(callback);
    trackedObservers.push(this);
  }
};

beforeEach(async () => {
  // Anchor clicks in a previous test may have queued a jsdom navigation; let it
  // settle before the hash and the fixture are reset.
  vi.useRealTimers();
  await new Promise((resolve) => setTimeout(resolve, 0));

  vi.resetModules();
  setHash('/');
  loadIndexFixture();

  // jsdom implements neither of these, and every routing module calls them.
  Element.prototype.scrollIntoView = vi.fn();
  HTMLCanvasElement.prototype.getContext = vi.fn(() => createCanvasContextStub());

  trackedListeners = [];
  for (const target of [window, document]) {
    const add = target.addEventListener.bind(target);
    vi.spyOn(target, 'addEventListener').mockImplementation((type, listener, options) => {
      trackedListeners.push({ target, type, listener, options });
      add(type, listener, options);
    });
  }
});

afterEach(() => {
  for (const { target, type, listener, options } of trackedListeners) {
    target.removeEventListener(type, listener, options);
  }
  trackedListeners = [];

  for (const observer of trackedObservers.splice(0)) {
    observer.disconnect();
  }
});
