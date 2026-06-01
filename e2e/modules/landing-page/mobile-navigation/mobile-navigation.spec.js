import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } })

  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToHome()
  })

  test('Should be able to open and close the mobile navigation menu when the user clicks the hamburger menu button.', async ({ page, actions }) => {
    await test.step('Open mobile menu', async () => {
      await actions.interface.landing.openMobileMenu()
    })

    await test.step('Validate mobile menu is visible', async () => {
      const mobileNavContainer = page.getByTestId('header-mobile-nav').locator('..')
      const expectedClass = /opacity-100/
      await expect(mobileNavContainer).toHaveClass(expectedClass)
    })

    await test.step('Close mobile menu', async () => {
      await actions.interface.landing.closeMobileMenu()
    })

    await test.step('Validate mobile menu is hidden', async () => {
      const mobileNavContainer = page.getByTestId('header-mobile-nav').locator('..')
      const expectedClass = /opacity-0/
      await expect(mobileNavContainer).toHaveClass(expectedClass)
    })
  })

  test('Should be able to redirect for the configure page when the user clicks "Configure o Seu" inside the mobile navigation menu.', async ({ page, actions }) => {
    await test.step('Open mobile menu', async () => {
      await actions.interface.landing.openMobileMenu()
    })

    await test.step('Click Configure o Seu in mobile menu', async () => {
      await actions.interface.landing.clickMobileConfigureCTA()
    })

    await test.step('Validate redirect to configure page', async () => {
      await expect(page).toHaveURL(urlsMapping.configure)
    })
  })

  test('Should be able to redirect for the lookup page when the user clicks "Consultar Pedido" inside the mobile navigation menu.', async ({ page, actions }) => {
    await test.step('Open mobile menu', async () => {
      await actions.interface.landing.openMobileMenu()
    })

    await test.step('Click Consultar Pedido in mobile menu', async () => {
      await actions.interface.landing.clickMobileConsultarPedido()
    })

    await test.step('Validate redirect to lookup page', async () => {
      await expect(page).toHaveURL(urlsMapping.lookup)
    })
  })
})
