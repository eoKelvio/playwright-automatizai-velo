import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Not Found', () => {
  test('Should be able to display the 404 error page when the user navigates to a non-existent route.', async ({ page }) => {
    await test.step('Navigate to non-existent route', async () => {
      await page.goto(`${urlsMapping.base}/pagina-que-nao-existe`)
    })

    await test.step('Validate 404 page is displayed', async () => {
      const heading = page.getByRole('heading', { name: '404' })
      await expect(heading).toBeVisible()
    })
  })

  test('Should be able to redirect to the initial page when the user clicks the "Return to Home" link on the 404 page.', async ({ page }) => {
    await test.step('Navigate to non-existent route', async () => {
      await page.goto(`${urlsMapping.base}/pagina-que-nao-existe`)
    })

    await test.step('Click Return to Home link', async () => {
      await page.getByRole('link', { name: 'Return to Home' }).click()
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })
})
