import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Privacy', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToPrivacy()
  })

  test('Should be able to navigate to the privacy page via the "/privacidade" route and display the "Política de Privacidade" heading.', async ({ page }) => {
    await test.step('Validate privacy page heading is displayed', async () => {
      const heading = page.getByRole('heading', { name: 'Política de Privacidade' })
      await expect(heading).toBeVisible()
    })
  })

  test('Should be able to redirect to the initial page when the user clicks the "Voltar para a página inicial" link on the privacy page.', async ({ page }) => {
    await test.step('Click back to home link', async () => {
      await page.getByRole('link', { name: 'Voltar para a página inicial' }).click()
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })
})
