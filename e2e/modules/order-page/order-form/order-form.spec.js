import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Order Form', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
  })

  test.skip('Should be able to navigate to the initial page when the user clicks the "Velô" logo in the order page header.', async () => {})
  test.skip('Should be able to navigate back to the configure page when the user clicks the back arrow button in the header.', async () => {})
  test.skip('Should be able to display the vehicle image, color, wheel type and selected optionals in the order summary panel on the right side.', async () => {})
  test.skip('Should be able to display a validation error for the "Nome" field when the user submits the form with fewer than 2 characters.', async () => {})
  test.skip('Should be able to display a validation error for the "Sobrenome" field when the user submits the form with fewer than 2 characters.', async () => {})
  test.skip('Should be able to display a validation error for the "Email" field when the user submits the form with an invalid email format.', async () => {})
  test.skip('Should be able to display a validation error for the "Telefone" field when the user submits the form with an incomplete phone number.', async () => {})
  test.skip('Should be able to display a validation error for the "CPF" field when the user submits the form with an incomplete CPF number.', async () => {})
  test.skip('Should be able to select any of the four available stores from the "Loja para Retirada" dropdown ("Velô Paulista", "Velô Faria Lima", "Velô Morumbi", "Velô Ibirapuera").', async () => {})
  test.skip('Should be able to display a validation error for the "Loja para Retirada" field when the user submits the form without selecting a store.', async () => {})
  test.skip('Should be able to display a validation error for the terms checkbox when the user submits the form without accepting the terms.', async () => {})
  test.skip('Should be able to navigate to the terms page when the user clicks the "Termos de Uso" link inside the terms checkbox section.', async () => {})
  test.skip('Should be able to navigate to the privacy page when the user clicks the "Política de Privacidade" link inside the terms checkbox section.', async () => {})
  test.skip('Should be able to display all validation errors simultaneously when the user submits an empty form.', async () => {})
  test.skip('Should be able to clear a field validation error when the user starts correcting the invalid field.', async () => {})
  test.skip('Should be able to display a loading state on the submit button while the order is being processed.', async () => {})
  test.skip('Should be able to create order full payment.', async () => {})
  test.skip('Should be able to create order financing payment.', async () => {})
  test.skip('Should be able to display the order status as "REPROVADO" on the success page when the user submits a financing order with a CPF that returns a credit score below 500.', async () => {})
  test.skip('Should be able to display the order status as "EM_ANALISE" on the success page when the user submits a financing order with a CPF that returns a credit score between 501 and 700.', async () => {})
  test.skip('Should be able to display the order status as "APROVADO" on the success page when the user submits a financing order with a CPF that returns a credit score above 700.', async () => {})
  test.skip('Should be able to display the order status as "APROVADO" on the success page when the user submits a financing order with a down payment of at least 50% of the total price, even if the credit score is below 700.', async () => {})
})
