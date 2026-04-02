import { defineConfig, devices } from '@playwright/test';

// Sanitize Desktop Chrome device descriptor so it can be used with null viewport
const desktopChrome = { ...devices['Desktop Chrome'] } as any;
// Remove deviceScaleFactor — not allowed when viewport is null
delete desktopChrome.deviceScaleFactor;

export default defineConfig({
  timeout: 30 * 1000, // 30000 ms (30 secs)
  testDir: './tests',
  fullyParallel: false,

  // retries: process.env.CI ? 2 : 0,
  retries: 0,

  // workers: process.env.CI ? 1 : undefined,
  workers: 2,

  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
    ['dot'],
    ['list'],
  ],

  use: {
    // Base URL for tests — can be overridden with BASE_URL env var
    baseURL: process.env.BASE_URL ?? 'http://localhost/opencart/upload/',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // headless: false,
    // Use the system's full window size. Set to null so Playwright uses the
    // browser window's size (use --start-maximized below to open maximized).
    viewport: null,
    ignoreHTTPSErrors: true,                 // Ignore SSL errors if necessary
    permissions: ['geolocation'],            // Set necessary permissions for geolocation-based tests
  },

  // grep: /@master/,
  projects: [
    {
      name: 'chromium',
      use: {
        ...desktopChrome,
        // Ensure the browser window opens maximized when running headed
        viewport: null,
        launchOptions: { args: ['--start-maximized'] },
      },
    },
    /*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    */
  ],
});