# Playwright Base

E2E test framework built on top of [Playwright](https://playwright.dev/).

## Setup

```bash
npm install
npm run install:browsers
```

Create a `.env` file at the root (see `.env.example`):

```env
BASE_URL=https://your-app.com
USER_EMAIL=user@example.com
USER_PASSWORD=yourpassword
```

## Running tests

```bash
npm test                          # all tests
npm run test:headed               # visible browser
npm run test:debug                # debug mode
npm run test:ui                   # interactive UI
npm run test:module MODULE=auth   # specific module
npm run test:critical             # @critical tests only
npm run test:regression           # @regression tests only
```

## Reports

```bash
npm run report   # open HTML report
```

## Project structure

```
actions/
  interface/   # UI actions (receive page)
  api/         # API actions (receive request)
fixtures/
  actions.js   # extended test fixture
  data.js      # environment variables
helpers/
  urlsMapping.js
  locatorsMapping.js
modules/       # test specs (.spec.js)
shared/        # generic utilities
```

## Writing tests

Always import `test` and `expect` from `@/fixtures/actions.js`:

```javascript
import { test, expect } from '@/fixtures/actions.js'
import data from '@/fixtures/data.js'

test.describe('Auth — Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(data.URL)
  })

  test('should login with valid credentials @critical', async ({ page, actions }) => {
    await actions.interface.auth.login({ email: data.USER_EMAIL, password: data.USER_PASSWORD })
    await expect(page).toHaveURL('/dashboard')
  })
})
```
