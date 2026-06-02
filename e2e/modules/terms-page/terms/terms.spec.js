import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Terms', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToTerms()
  })

  test('Should be able to navigate to the terms page via the "/termos" route and display the "Termos de Uso" heading.', async ({ page }) => {
    await test.step('Validate terms page heading is displayed', async () => {
      const heading = page.getByRole('heading', { name: 'Termos de Uso' })
      await expect(heading).toBeVisible()
    })
  })

  test('Should be able to redirect to the initial page when the user clicks the "Voltar para a página inicial" link on the terms page.', async ({ page }) => {
    await test.step('Click back to home link', async () => {
      await page.getByRole('link', { name: 'Voltar para a página inicial' }).click()
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })
})
