import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Order Lookup', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToLookup()
  })

  test.skip('Should be able to redirect to the initial page when the user clicks the "Velô" logo in the header on the lookup page.', async () => {})
  test.skip('Should be able to redirect to the configure page when the user clicks the "Configure o Seu" button in the header.', async () => {})
  test.skip('Should be able to display the search button as disabled when the order number input field is empty.', async () => {})
  test.skip('Should be able to search for an existing order by its order number and display the order details.', async () => {})
  test.skip('Should be able to display the "Pedido não encontrado" message when the user searches for a non-existent order number.', async () => {})
  test.skip('Should be able to search for an order using lowercase letters and still find the order (case-insensitive search).', async () => {})
  test.skip('Should be able to display the order status badge as green (APROVADO) for an approved order.', async () => {})
  test.skip('Should be able to display the order status badge as red (REPROVADO) for a rejected order.', async () => {})
  test.skip('Should be able to display the vehicle image, color, wheel type, customer name, email, store and payment method for a found order.', async () => {})
  test.skip('Should be able to display the installment value when the found order uses the financing payment method.', async () => {})
  test.skip('Should be able to clear the previous search result and show a new result when the user performs a second search with a different order number.', async () => {})
})
