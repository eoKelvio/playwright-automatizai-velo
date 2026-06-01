import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Success', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
  })

  test.skip('Should be able to redirect to the initial page when the user clicks the "Velô" logo on the success page.', async () => {})
  test.skip('Should be able to display the "Pedido Aprovado!" message with a green check icon when the order status is APROVADO.', async () => {})
  test.skip('Should be able to display the "Crédito Reprovado" message with a red X icon when the order status is REPROVADO.', async () => {})
  test.skip('Should be able to display the order number, customer full name, email and selected store on the success page.', async () => {})
  test.skip('Should be able to display the vehicle image, color, wheel type and total price in the order summary on the success page.', async () => {})
  test.skip('Should be able to display the installment breakdown (12x of value) alongside the total price when the payment method is financing.', async () => {})
  test.skip('Should be able to redirect to the lookup page when the user clicks the "Consultar Pedido" button on the success page.', async () => {})
  test.skip('Should be able to redirect to the configure page when the user clicks the "Configurar Outro" button on the success page.', async () => {})
  test.skip('Should be able to redirect to the initial page when the user accesses the "/success" route directly without order state.', async () => {})
})
