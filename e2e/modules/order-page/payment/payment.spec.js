import { test, expect } from '@/fixtures/actions.js'

test.describe('Payment', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
    await actions.interface.configurator.buildVehicle({ checkout: true })
  })

  test('Should be able to show the financing installment calculator section when the user selects the "Financiamento" payment method.', async ({ page, actions }) => {
    await test.step('Select financing payment method', async () => {
      await actions.interface.order.selectPaymentMethod('financiamento')
    })

    await test.step('Validate financing calculator is visible', async () => {
      const entryValueInput = page.getByTestId('input-entry-value')
      await expect(entryValueInput).toBeVisible()
    })
  })

  test('Should be able to hide the financing calculator section when the user switches back from "Financiamento" to "A Vista" payment method.', async ({ page, actions }) => {
    await test.step('Select financing then switch to full payment', async () => {
      await actions.interface.order.selectPaymentMethod('financiamento')
      await actions.interface.order.selectPaymentMethod('avista')
    })

    await test.step('Validate financing calculator is hidden', async () => {
      const entryValueInput = page.getByTestId('input-entry-value')
      await expect(entryValueInput).not.toBeVisible()
    })
  })

  test('Should be able to dynamically recalculate the installment value when the user types a down payment amount in the "Valor da Entrada" field.', async ({ page, actions }) => {
    await test.step('Select financing and fill entry value', async () => {
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento', entryValue: 10000 })
    })

    await test.step('Validate installment value changed from default', async () => {
      const summaryTotal = page.getByTestId('summary-total-price')
      const defaultTotal = 'R$ 44.897,60'
      await expect(summaryTotal).not.toContainText(defaultTotal)
    })
  })

  test('Should be able to display zero installment value when the user types a down payment equal to the total price.', async ({ page, actions }) => {
    await test.step('Select financing and fill entry equal to total', async () => {
      await actions.interface.order.fillOrderForm({ paymentMethod: 'financiamento', entryValue: 40000 })
    })

    await test.step('Validate installment breakdown shows zero financing', async () => {
      const financedText = page.getByText('Valor a financiar:').locator('..')
      const expectedText = 'R$ 0,00'
      await expect(financedText).toContainText(expectedText)
    })
  })
})
