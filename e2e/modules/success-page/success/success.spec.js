import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Success', () => {
  test.beforeEach(async ({ page, actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
    await actions.interface.configurator.buildVehicle({ checkout: true })
    await actions.interface.order.fillOrderForm()
    await actions.interface.order.submit()
    await expect(page).toHaveURL(/\/success/)
  })

  test('Should be able to redirect to the initial page when the user clicks the "Velô" logo on the success page.', async ({ page, actions }) => {
    await test.step('Click the Velô logo', async () => {
      await actions.interface.success.clickHeaderLogo()
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to display the "Pedido Aprovado!" message with a green check icon when the order status is APROVADO.', async ({ page }) => {
    await test.step('Validate APROVADO status is displayed', async () => {
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Pedido Aprovado!'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to display the "Crédito Reprovado" message with a red X icon when the order status is REPROVADO.', async ({ page, actions }) => {
    await test.step('Navigate to configure and setup REPROVADO flow', async () => {
      await actions.interface.setup.navigation.goToConfigure()
      await actions.interface.configurator.buildVehicle({ checkout: true })
      await actions.interface.order.mockCreditScore(300)
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
      await actions.interface.order.submit()
    })

    await test.step('Validate REPROVADO status is displayed', async () => {
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Crédito Reprovado'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to display the order number, customer full name, email and selected store on the success page.', async ({ page }) => {
    await test.step('Validate order number is displayed', async () => {
      const orderId = page.getByTestId('order-id')
      await expect(orderId).toBeVisible()
    })

    await test.step('Validate customer full name is displayed', async () => {
      const customerName = page.getByText('João Silva', { exact: true })
      await expect(customerName).toBeVisible()
    })

    await test.step('Validate customer email is displayed', async () => {
      const customerEmail = page.getByText('joao.silva@test.com', { exact: true })
      await expect(customerEmail).toBeVisible()
    })

    await test.step('Validate store is displayed', async () => {
      const store = page.getByText('Velô Paulista - Av. Paulista, 1000', { exact: true })
      await expect(store).toBeVisible()
    })
  })

  test('Should be able to display the vehicle image, color, wheel type and total price in the order summary on the success page.', async ({ page }) => {
    await test.step('Validate vehicle image is displayed', async () => {
      const vehicleImage = page.getByRole('img', { name: 'Velô Sprint' })
      await expect(vehicleImage).toBeVisible()
    })

    await test.step('Validate color and wheel type are displayed', async () => {
      const vehicleSummary = page.getByText(/Glacier Blue/)
      await expect(vehicleSummary).toBeVisible()
    })

    await test.step('Validate total price is displayed', async () => {
      const totalPrice = page.getByText('R$ 40.000,00').first()
      await expect(totalPrice).toBeVisible()
    })
  })

  test('Should be able to display the installment breakdown (12x of value) alongside the total price when the payment method is financing.', async ({ page, actions }) => {
    await test.step('Navigate to configure and setup financing flow', async () => {
      await actions.interface.setup.navigation.goToConfigure()
      await actions.interface.configurator.buildVehicle({ checkout: true })
      await actions.interface.order.mockCreditScore(800)
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
      await actions.interface.order.submit()
    })

    await test.step('Validate installment breakdown is displayed', async () => {
      const installmentText = page.getByText(/12x de/)
      await expect(installmentText).toBeVisible()
    })
  })

  test('Should be able to redirect to the lookup page when the user clicks the "Consultar Pedido" button on the success page.', async ({ page, actions }) => {
    await test.step('Click Consultar Pedido button', async () => {
      await actions.interface.success.clickConsultarPedido()
    })

    await test.step('Validate redirect to lookup page', async () => {
      const expectedUrl = urlsMapping.lookup
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to redirect to the configure page when the user clicks the "Configurar Outro" button on the success page.', async ({ page, actions }) => {
    await test.step('Click Configurar Outro button', async () => {
      await actions.interface.success.clickConfigurarOutro()
    })

    await test.step('Validate redirect to configure page', async () => {
      const expectedUrl = urlsMapping.configure
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to redirect to the initial page when the user accesses the "/success" route directly without order state.', async ({ page }) => {
    await test.step('Navigate directly to /success without state', async () => {
      await page.goto(urlsMapping.success)
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })
})
