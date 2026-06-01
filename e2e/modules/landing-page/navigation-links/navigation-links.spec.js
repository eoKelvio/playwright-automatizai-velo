import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Navigation Links', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToHome()
  })

  test('Should be able to redirect for the configure page when the user clicks the "Velô Sprint" link in the footer models section.', async ({ page, actions }) => {
    await test.step('Click Velô Sprint in footer', async () => {
      await actions.interface.landing.clickFooterVeloSprint()
    })

    await test.step('Validate redirect to configure page', async () => {
      await expect(page).toHaveURL(urlsMapping.configure)
    })
  })

  test('Should be able to redirect for the terms page when the user clicks the "Termos de Uso" link in the footer.', async ({ page, actions }) => {
    await test.step('Click Termos de Uso in footer', async () => {
      await actions.interface.landing.clickFooterTermos()
    })

    await test.step('Validate redirect to terms page', async () => {
      await expect(page).toHaveURL(urlsMapping.terms)
    })
  })

  test('Should be able to redirect for the privacy page when the user clicks the "Política de Privacidade" link in the footer.', async ({ page, actions }) => {
    await test.step('Click Política de Privacidade in footer', async () => {
      await actions.interface.landing.clickFooterPrivacidade()
    })

    await test.step('Validate redirect to privacy page', async () => {
      await expect(page).toHaveURL(urlsMapping.privacy)
    })
  })
})
