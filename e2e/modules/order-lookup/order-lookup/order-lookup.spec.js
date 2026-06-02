import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Order Lookup', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToLookup()
  })

  test('Should be able to redirect to the initial page when the user clicks the "Velô" logo in the header on the lookup page.', async ({ page, actions }) => {
    await test.step('Click the Velô logo', async () => {
      await actions.interface.landing.clickHeaderLogo()
    })

    await test.step('Validate redirect to initial page', async () => {
      const expectedUrl = urlsMapping.landing
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to redirect to the configure page when the user clicks the "Configure o Seu" button in the header.', async ({ page, actions }) => {
    await test.step('Click Configure o Seu in header', async () => {
      await actions.interface.landing.clickHeaderConfigure()
    })

    await test.step('Validate redirect to configure page', async () => {
      const expectedUrl = urlsMapping.configure
      await expect(page).toHaveURL(expectedUrl)
    })
  })

  test('Should be able to display the search button as disabled when the order number input field is empty.', async ({ page }) => {
    await test.step('Validate search button is disabled when input is empty', async () => {
      const searchButton = page.getByTestId('search-order-button')
      await expect(searchButton).toBeDisabled()
    })
  })

  test('Should be able to search for an existing order by its order number and display the order details.', async ({ page, actions }) => {
    await test.step('Mock order found', async () => {
      await actions.interface.lookup.mockOrderFound()
    })

    await test.step('Search for order', async () => {
      await actions.interface.lookup.searchOrder('VLO-TEST01')
    })

    await test.step('Validate order result is displayed', async () => {
      const resultId = page.getByTestId('order-result-id')
      const expectedOrderNumber = 'VLO-TEST01'
      await expect(resultId).toContainText(expectedOrderNumber)
    })
  })

  test('Should be able to display the "Pedido não encontrado" message when the user searches for a non-existent order number.', async ({ page, actions }) => {
    await test.step('Mock order not found', async () => {
      await actions.interface.lookup.mockOrderNotFound()
    })

    await test.step('Search for non-existent order', async () => {
      await actions.interface.lookup.searchOrder('VLO-NOTFOUND')
    })

    await test.step('Validate not found message is displayed', async () => {
      const notFoundMessage = page.getByText('Pedido não encontrado', { exact: true })
      await expect(notFoundMessage).toBeVisible()
    })
  })

  test('Should be able to search for an order using lowercase letters and still find the order (case-insensitive search).', async ({ page, actions }) => {
    await test.step('Mock order found', async () => {
      await actions.interface.lookup.mockOrderFound()
    })

    await test.step('Search using lowercase letters', async () => {
      await actions.interface.lookup.searchOrder('vlo-test01')
    })

    await test.step('Validate order result is displayed', async () => {
      const resultId = page.getByTestId('order-result-id')
      const expectedOrderNumber = 'VLO-TEST01'
      await expect(resultId).toContainText(expectedOrderNumber)
    })
  })

  test('Should be able to display the order status badge as green (APROVADO) for an approved order.', async ({ page, actions }) => {
    await test.step('Mock APROVADO order', async () => {
      await actions.interface.lookup.mockOrderFound(actions.interface.lookup.mockData.approved)
    })

    await test.step('Search for order', async () => {
      await actions.interface.lookup.searchOrder('VLO-TEST01')
    })

    await test.step('Validate APROVADO status badge is displayed', async () => {
      const statusBadge = page.getByTestId('order-result-status')
      const expectedStatus = 'APROVADO'
      await expect(statusBadge).toContainText(expectedStatus)
    })
  })

  test('Should be able to display the order status badge as red (REPROVADO) for a rejected order.', async ({ page, actions }) => {
    await test.step('Mock REPROVADO order', async () => {
      await actions.interface.lookup.mockOrderFound(actions.interface.lookup.mockData.reprovado)
    })

    await test.step('Search for order', async () => {
      await actions.interface.lookup.searchOrder('VLO-TEST02')
    })

    await test.step('Validate REPROVADO status badge is displayed', async () => {
      const statusBadge = page.getByTestId('order-result-status')
      const expectedStatus = 'REPROVADO'
      await expect(statusBadge).toContainText(expectedStatus)
    })
  })

  test('Should be able to display the vehicle image, color, wheel type, customer name, email, store and payment method for a found order.', async ({ page, actions }) => {
    await test.step('Mock order found', async () => {
      await actions.interface.lookup.mockOrderFound()
    })

    await test.step('Search for order', async () => {
      await actions.interface.lookup.searchOrder('VLO-TEST01')
    })

    await test.step('Validate vehicle image is displayed', async () => {
      const vehicleImage = page.getByRole('img', { name: 'Velô Sprint' })
      await expect(vehicleImage).toBeVisible()
    })

    await test.step('Validate color is displayed', async () => {
      const colorText = page.getByText('Glacier Blue', { exact: true })
      await expect(colorText).toBeVisible()
    })

    await test.step('Validate customer name is displayed', async () => {
      const customerName = page.getByText('João Silva', { exact: true })
      await expect(customerName).toBeVisible()
    })

    await test.step('Validate customer email is displayed', async () => {
      const customerEmail = page.getByText('joao.silva@test.com', { exact: true })
      await expect(customerEmail).toBeVisible()
    })
  })

  test('Should be able to display the installment value when the found order uses the financing payment method.', async ({ page, actions }) => {
    await test.step('Mock financing order', async () => {
      await actions.interface.lookup.mockOrderFound(actions.interface.lookup.mockData.financing)
    })

    await test.step('Search for financing order', async () => {
      await actions.interface.lookup.searchOrder('VLO-TEST03')
    })

    await test.step('Validate installment value is displayed', async () => {
      const installmentText = page.getByText(/Financiamento 12x/)
      await expect(installmentText).toBeVisible()
    })
  })

  test('Should be able to clear the previous search result and show a new result when the user performs a second search with a different order number.', async ({ page, actions }) => {
    await test.step('Mock first order and search', async () => {
      await actions.interface.lookup.mockOrderFound(actions.interface.lookup.mockData.approved)
      await actions.interface.lookup.searchOrder('VLO-TEST01')
    })

    await test.step('Validate first result is displayed', async () => {
      const resultId = page.getByTestId('order-result-id')
      await expect(resultId).toContainText('VLO-TEST01')
    })

    await test.step('Mock second order and search', async () => {
      await page.unroute('**/rest/v1/orders*')
      await actions.interface.lookup.mockOrderFound(actions.interface.lookup.mockData.reprovado)
      await actions.interface.lookup.searchOrder('VLO-TEST02')
    })

    await test.step('Validate second result replaces first', async () => {
      const resultId = page.getByTestId('order-result-id')
      const expectedOrderNumber = 'VLO-TEST02'
      await expect(resultId).toContainText(expectedOrderNumber)
    })
  })
})
