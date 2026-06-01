import { expect } from '@playwright/test'
import { test as aiContextTest } from './ai-context.fixture.js'
import actionsFactory from '@/actions/index.js'

/** Tipos inferidos a partir do seu factory */
/** @typedef {ReturnType<typeof actionsFactory>} Actions */

/**
 * Diga ao TS que este `test` tem as fixtures padrão + { actions }
 * Assim `page` continua existindo e `actions` fica tipado.
 *
 * The `page` fixture already has AI context instrumentation injected via
 * `aiContextTest` — no spec changes are needed to benefit from it.
 */
/** @type {import('@playwright/test').TestType<
 *   import('@playwright/test').PlaywrightTestArgs & import('@playwright/test').PlaywrightTestOptions & { actions: Actions },
 *   import('@playwright/test').PlaywrightWorkerArgs & import('@playwright/test').PlaywrightWorkerOptions
 * >} */
export const test = aiContextTest.extend({
  actions: async ({ page }, use) => {
    await use(actionsFactory(page))
  },
})

export { expect }
