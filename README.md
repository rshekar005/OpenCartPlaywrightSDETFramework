Playwright SDET Framework (OpenCart)

This repository contains a Playwright-based test automation framework for the OpenCart demo site.

Quick overview
- Tests: tests/ — Playwright test files using page objects.
- Page objects: pages/ — classes for each UI page.
- Fixtures: fixtures/fixtures.ts — central Playwright fixtures exposing page objects and config.
- Config: playwright.config.ts — Playwright configuration (reporters, projects, baseURL).

Prerequisites
- Node.js (16+)
- Install dependencies: run `npm install`

Install Playwright browsers (if needed): run `npx playwright install`

Running tests
- Use npm scripts defined in package.json.

Common commands
- Run all tests matching @master: npm run test:master
- Run sanity tests: npm run test:sanity
- Run a specific test file (headed): npx playwright test tests/EndToEndTest.spec.ts --headed

Environment variables
- BASE_URL — override baseURL from playwright.config.ts
- TEST_USER / TEST_PASS — (optional) credentials used by custom fixtures if configured

Notes
- Fixtures are in fixtures/fixtures.ts; tests import test and expect from there, for example: import { test, expect } from '../fixtures/fixtures'
- If you want baseURL changed permanently, set BASE_URL or update playwright.config.ts


For setup opencart localhost: Pls do follow the OpenCartSetup.pdf