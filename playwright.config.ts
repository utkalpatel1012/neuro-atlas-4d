import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './e2e',
  webServer: { command: 'npm run preview -- --port 4173', url: 'http://localhost:4173', reuseExistingServer: true },
  // Use system Chrome (channel) — bundled Chromium download timed out locally; Chrome.exe verified present.
  use: { baseURL: 'http://localhost:4173', channel: 'chrome' },
  retries: 1,
});
