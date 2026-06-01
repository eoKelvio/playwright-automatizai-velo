import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Purchase Flow', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToConfigure()
  })

  test.skip('Should be able to complete a full purchase with full payment and receive an approved status.', async () => {})
  test.skip('Should be able to complete a full purchase with financing and receive an approved status when the credit score is above 700.', async () => {})
  test.skip('Should be able to complete a full purchase with financing and receive a rejected status when the credit score is below 500.', async () => {})
  test.skip('Should be able to complete a full purchase with financing and receive an in-analysis status when the credit score is between 501 and 700.', async () => {})
  test.skip('Should be able to complete a full purchase with financing and receive an approved status when the down payment is at least 50% of the total price regardless of credit score.', async () => {})
  test.skip('Should be able to consult the order on the lookup page after completing a purchase and navigating from the success page.', async () => {})
  test.skip('Should be able to navigate back to the configure page by clicking "Configurar Outro" on the success page and complete a second purchase.', async () => {})
})
