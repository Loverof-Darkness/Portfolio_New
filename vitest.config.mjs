import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
    setupFiles: ['tests/setup.js'],
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      reportsDirectory: 'coverage',
      include: ['*.js'],
      // arsenal-rewrite.js is a superseded draft that index.html no longer loads.
      exclude: ['vitest.config.mjs', 'arsenal-rewrite.js'],
    },
  },
});
