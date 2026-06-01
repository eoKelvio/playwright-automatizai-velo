import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Payment', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
  })

  test.skip('Should be able to show the financing installment calculator section when the user selects the "Financiamento" payment method.', async () => {})
  test.skip('Should be able to hide the financing calculator section when the user switches back from "Financiamento" to "A Vista" payment method.', async () => {})
  test.skip('Should be able to dynamically recalculate the installment value when the user types a down payment amount in the "Valor da Entrada" field.', async () => {})
  test.skip('Should be able to display zero installment value when the user types a down payment equal to the total price.', async () => {})
})
