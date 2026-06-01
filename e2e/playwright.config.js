import { defineConfig } from '@playwright/test'

export default defineConfig({
  testMatch: ['**/*.spec.js'],
  forbidOnly: false,
  retries: 1,
  timeout: 60000,
  expect: { timeout: 30000 },
  workers: 1,
  reporter: [
    ['dot'],
    ['blob', { outputDir: 'reporter/blob' }],
    ['json', { outputFile: 'reporter/json/test-results.json' }],
    ['html', { outputFolder: 'reporter/html/', open: 'never' }],
  ],
  use: {
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 40000,
    navigationTimeout: 40000,
  }
})
