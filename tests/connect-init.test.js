import { describe, expect, it, vi } from 'vitest';
import { setHash } from './helpers.js';

const load = () => import('../connect-init.js');

const loaderScripts = () => [...document.querySelectorAll('script[src^="./connect.js"]')];

describe('connect-init.js', () => {
  it('does not load the connect module for other routes', async () => {
    await load();

    expect(loaderScripts()).toHaveLength(0);
  });

  it('appends a deferred connect script on the connect hash', async () => {
    setHash('#connect');
    await load();

    expect(loaderScripts()).toHaveLength(1);
    expect(loaderScripts()[0].getAttribute('src')).toBe('./connect.js?v=3');
    expect(loaderScripts()[0].defer).toBe(true);
    expect(loaderScripts()[0].parentElement).toBe(document.body);
  });

  it('waits for DOMContentLoaded while the document is loading', async () => {
    const readyState = vi.spyOn(document, 'readyState', 'get').mockReturnValue('loading');
    setHash('#connect');
    await load();
    expect(loaderScripts()).toHaveLength(0);

    readyState.mockReturnValue('complete');
    document.dispatchEvent(new Event('DOMContentLoaded'));
    expect(loaderScripts()).toHaveLength(1);
  });

  it('only reacts to the load, not to later hash changes', async () => {
    await load();
    setHash('#connect');
    window.dispatchEvent(new Event('hashchange'));

    expect(loaderScripts()).toHaveLength(0);
  });
});
