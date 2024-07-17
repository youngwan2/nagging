import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/utils/setupTests.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['text'],
      reportsDirectory: './tests/unit/coverage',
    },
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@api': path.resolve(__dirname, './src/app/api'),
      '@commponents': path.resolve(__dirname, '.src/commponents'),
    },
  },
});
