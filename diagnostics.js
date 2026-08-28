(() => {
  const PREFIX = '[portfolio]';
  const warnedOnce = new Set();

  function toError(value, fallbackMessage) {
    if (value instanceof Error) return value;
    if (typeof value === 'string') return new Error(value);
    return new Error(`${fallbackMessage}: ${String(value)}`);
  }

  function reportError(scope, value) {
    const error = toError(value, 'Unknown failure');
    console.error(`${PREFIX} ${scope} failed:`, error);
    return error;
  }

  function reportMissing(scope, description) {
    const key = `${scope}::${description}`;
    if (warnedOnce.has(key)) return;
    warnedOnce.add(key);
    console.warn(`${PREFIX} ${scope} skipped: ${description} is missing from the page.`);
  }

  function guard(scope, fn) {
    return function guarded(...args) {
      try {
        return fn.apply(this, args);
      } catch (error) {
        reportError(scope, error);
        return undefined;
      }
    };
  }

  function run(scope, fn) {
    return guard(scope, fn)();
  }

  window.addEventListener('error', (event) => {
    const target = event.target;
    if (target && target !== window && target.tagName) {
      const url = target.currentSrc || target.src || target.href || '(unknown url)';
      console.error(
        `${PREFIX} resource <${target.tagName.toLowerCase()}> failed to load: ${url}`,
      );
      return;
    }
    reportError('uncaught error', event.error || event.message);
  }, true);

  window.addEventListener('unhandledrejection', (event) => {
    reportError('unhandled promise rejection', event.reason);
  });

  window.portfolioDiagnostics = {
    reportError,
    reportMissing,
    guard,
    run,
  };
})();
