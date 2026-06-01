import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Configurator', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
  })

  test('Should be able to redirect for the initial page when the user clicks the "Velô" logo.', async ({ page, actions }) => {
    await test.step('Click the Velô logo', async () => {
      await actions.interface.configurator.clickHeaderLogo()
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to display the Glacier Blue color as selected by default when the configure page loads for the first time.', async ({ page }) => {
    await test.step('Validate Glacier Blue is selected by default', async () => {
      const glacierBlue = page.getByTestId('color-option-glacier-blue').locator('div').first()
      const expectedClass = /ring-primary/
      await expect(glacierBlue).toHaveClass(expectedClass)
    })
  })

  test('Should be able to display the Aero Wheels as selected by default when the configure page loads for the first time.', async ({ page }) => {
    await test.step('Validate Aero Wheels is selected by default', async () => {
      const aeroWheels = page.getByTestId('wheel-option-aero')
      const expectedClass = /border-primary/
      await expect(aeroWheels).toHaveClass(expectedClass)
    })
  })

  test('Should be able to display the base price of R$ 40.000,00 with no optional features selected and aero wheels.', async ({ page }) => {
    await test.step('Validate base price is R$ 40.000,00', async () => {
      const totalPrice = page.getByTestId('total-price')
      const expectedPrice = 'R$ 40.000,00'
      await expect(totalPrice).toContainText(expectedPrice)
    })
  })

  test('Should be able to change vehicle color when the user clicks on any color option and change vehicle image for the same color.', async ({ page, actions }) => {
    await test.step('Select Midnight Black color', async () => {
      await actions.interface.configurator.selectColor('midnight-black')
    })

    await test.step('Validate car image updated to Midnight Black', async () => {
      const carImage = page.getByTestId('car-exterior-image')
      const expectedAlt = /midnight-black/
      await expect(carImage).toHaveAttribute('alt', expectedAlt)
    })
  })

  test('Should be able to change vehicle wheels when the user clicks on any wheel option and change vehicle image for the same wheels.', async ({ page, actions }) => {
    await test.step('Select Sport Wheels', async () => {
      await actions.interface.configurator.selectWheels('sport')
    })

    await test.step('Validate car image updated to sport wheels', async () => {
      const carImage = page.getByTestId('car-exterior-image')
      const expectedAlt = /sport/
      await expect(carImage).toHaveAttribute('alt', expectedAlt)
    })
  })

  test('Should be able to increase the total price by R$ 2.000,00 when the user selects Sport Wheels.', async ({ page, actions }) => {
    await test.step('Select Sport Wheels', async () => {
      await actions.interface.configurator.selectWheels('sport')
    })

    await test.step('Validate total price is R$ 42.000,00', async () => {
      const totalPrice = page.getByTestId('total-price')
      const expectedPrice = 'R$ 42.000,00'
      await expect(totalPrice).toContainText(expectedPrice)
    })
  })

  test('Should be able to increase the total price by R$ 5.500,00 when the user adds the Precision Park optional.', async ({ page, actions }) => {
    await test.step('Toggle Precision Park optional', async () => {
      await actions.interface.configurator.toggleOptional('precision-park')
    })

    await test.step('Validate total price is R$ 45.500,00', async () => {
      const totalPrice = page.getByTestId('total-price')
      const expectedPrice = 'R$ 45.500,00'
      await expect(totalPrice).toContainText(expectedPrice)
    })
  })

  test('Should be able to increase the total price by R$ 5.000,00 when the user adds the Flux Capacitor optional.', async ({ page, actions }) => {
    await test.step('Toggle Flux Capacitor optional', async () => {
      await actions.interface.configurator.toggleOptional('flux-capacitor')
    })

    await test.step('Validate total price is R$ 45.000,00', async () => {
      const totalPrice = page.getByTestId('total-price')
      const expectedPrice = 'R$ 45.000,00'
      await expect(totalPrice).toContainText(expectedPrice)
    })
  })

  test('Should be able to display the correct combined total price when the user selects Sport Wheels and both optional accessories simultaneously.', async ({ page, actions }) => {
    await test.step('Select Sport Wheels and both optionals', async () => {
      await actions.interface.configurator.selectWheels('sport')
      await actions.interface.configurator.toggleOptional('precision-park')
      await actions.interface.configurator.toggleOptional('flux-capacitor')
    })

    await test.step('Validate combined total price is R$ 52.500,00', async () => {
      const totalPrice = page.getByTestId('total-price')
      const expectedPrice = 'R$ 52.500,00'
      await expect(totalPrice).toContainText(expectedPrice)
    })
  })

  test('Should be able to deselect an accessory and decrease the total price accordingly when the user unchecks a previously selected optional.', async ({ page, actions }) => {
    await test.step('Toggle Precision Park to add', async () => {
      await actions.interface.configurator.toggleOptional('precision-park')
    })

    await test.step('Validate price increased to R$ 45.500,00', async () => {
      const totalPrice = page.getByTestId('total-price')
      const expectedPrice = 'R$ 45.500,00'
      await expect(totalPrice).toContainText(expectedPrice)
    })

    await test.step('Toggle Precision Park to remove', async () => {
      await actions.interface.configurator.toggleOptional('precision-park')
    })

    await test.step('Validate price returned to R$ 40.000,00', async () => {
      const totalPrice = page.getByTestId('total-price')
      const expectedPrice = 'R$ 40.000,00'
      await expect(totalPrice).toContainText(expectedPrice)
    })
  })

  test('Should be able to redirect for the order page when the user clicks the "Monte o Seu" button.', async ({ page, actions }) => {
    await test.step('Click Monte o Seu button', async () => {
      await actions.interface.configurator.clickCheckout()
    })

    await test.step('Validate redirect to order page', async () => {
      const expectedUrl = urlsMapping.order
      await expect(page).toHaveURL(expectedUrl)
    })
  })
})
