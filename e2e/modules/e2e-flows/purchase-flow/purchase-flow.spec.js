import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Purchase Flow', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
  })

  test('Should be able to complete a full purchase with full payment and receive an approved status.', async ({ page, actions }) => {
    await test.step('Configure vehicle', async () => {
      await actions.interface.configurator.buildVehicle({ checkout: true })
    })

    await test.step('Fill order form and submit', async () => {
      await actions.interface.order.fillOrderForm()
      await actions.interface.order.submit()
    })

    await test.step('Validate APROVADO on success page', async () => {
      await expect(page).toHaveURL(/\/success/)
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Pedido Aprovado!'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to complete a full purchase with financing and receive an approved status when the credit score is above 700.', async ({ page, actions }) => {
    await test.step('Configure vehicle', async () => {
      await actions.interface.configurator.buildVehicle({ checkout: true })
    })

    await test.step('Mock credit score above 700 and submit financing order', async () => {
      await actions.interface.order.mockCreditScore(800)
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
      await actions.interface.order.submit()
    })

    await test.step('Validate APROVADO on success page', async () => {
      await expect(page).toHaveURL(/\/success/)
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Pedido Aprovado!'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to complete a full purchase with financing and receive a rejected status when the credit score is below 500.', async ({ page, actions }) => {
    await test.step('Configure vehicle', async () => {
      await actions.interface.configurator.buildVehicle({ checkout: true })
    })

    await test.step('Mock credit score below 500 and submit financing order', async () => {
      await actions.interface.order.mockCreditScore(300)
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
      await actions.interface.order.submit()
    })

    await test.step('Validate REPROVADO on success page', async () => {
      await expect(page).toHaveURL(/\/success/)
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Crédito Reprovado'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to complete a full purchase with financing and receive an in-analysis status when the credit score is between 501 and 700.', async ({ page, actions }) => {
    await test.step('Configure vehicle', async () => {
      await actions.interface.configurator.buildVehicle({ checkout: true })
    })

    await test.step('Mock credit score between 501 and 700 and submit financing order', async () => {
      await actions.interface.order.mockCreditScore(600)
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento' })
      await actions.interface.order.submit()
    })

    await test.step('Validate redirect to success page', async () => {
      await expect(page).toHaveURL(/\/success/)
    })
  })

  test('Should be able to complete a full purchase with financing and receive an approved status when the down payment is at least 50% of the total price regardless of credit score.', async ({ page, actions }) => {
    await test.step('Configure vehicle', async () => {
      await actions.interface.configurator.buildVehicle({ checkout: true })
    })

    await test.step('Mock low credit score and submit with 50% down payment', async () => {
      await actions.interface.order.mockCreditScore(300)
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento', entryValue: 20000 })
      await actions.interface.order.submit()
    })

    await test.step('Validate APROVADO on success page', async () => {
      await expect(page).toHaveURL(/\/success/)
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Pedido Aprovado!'
      await expect(successStatus).toContainText(expectedText)
    })
  })

  test('Should be able to consult the order on the lookup page after completing a purchase and navigating from the success page.', async ({ page, actions }) => {
    let orderNumber

    await test.step('Complete full purchase', async () => {
      await actions.interface.configurator.buildVehicle({ checkout: true })
      await actions.interface.order.fillOrderForm()
      await actions.interface.order.submit()
      await expect(page).toHaveURL(/\/success/)
      orderNumber = (await page.getByTestId('order-id').textContent())?.trim()
    })

    await test.step('Navigate to lookup via Consultar Pedido button', async () => {
      await actions.interface.success.clickConsultarPedido()
      await expect(page).toHaveURL(urlsMapping.lookup)
    })

    await test.step('Search for the created order', async () => {
      await actions.interface.lookup.searchOrder(orderNumber)
    })

    await test.step('Validate order is found', async () => {
      const resultId = page.getByTestId('order-result-id')
      await expect(resultId).toContainText(orderNumber)
    })
  })

  test('Should be able to navigate back to the configure page by clicking "Configurar Outro" on the success page and complete a second purchase.', async ({ page, actions }) => {
    await test.step('Complete first purchase', async () => {
      await actions.interface.configurator.buildVehicle({ checkout: true })
      await actions.interface.order.fillOrderForm()
      await actions.interface.order.submit()
      await expect(page).toHaveURL(/\/success/)
    })

    await test.step('Click Configurar Outro and go back to configure', async () => {
      await actions.interface.success.clickConfigurarOutro()
      await expect(page).toHaveURL(urlsMapping.configure)
    })

    await test.step('Configure second vehicle and complete second purchase', async () => {
      await actions.interface.configurator.buildVehicle({ color: 'midnight-black', checkout: true })
      await actions.interface.order.fillOrderForm()
      await actions.interface.order.submit()
    })

    await test.step('Validate second purchase success', async () => {
      await expect(page).toHaveURL(/\/success/)
      const successStatus = page.getByTestId('success-status')
      const expectedText = 'Pedido Aprovado!'
      await expect(successStatus).toContainText(expectedText)
    })
  })
})
