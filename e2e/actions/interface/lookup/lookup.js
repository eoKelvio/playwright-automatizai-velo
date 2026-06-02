import { locatorsMapping } from '@/helpers/locatorsMapping.js'

const MOCK_ORDER_APPROVED = {
  id: 'a1b2c3d4-0000-0000-0000-000000000001',
  order_number: 'VLO-TEST01',
  color: 'glacier-blue',
  wheel_type: 'aero',
  optionals: [],
  customer_name: 'João Silva',
  customer_email: 'joao.silva@test.com',
  customer_phone: '(11) 99999-9999',
  customer_cpf: '123.456.789-09',
  payment_method: 'avista',
  total_price: 40000,
  status: 'APROVADO',
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z',
}

const MOCK_ORDER_REPROVADO = {
  ...MOCK_ORDER_APPROVED,
  id: 'a1b2c3d4-0000-0000-0000-000000000002',
  order_number: 'VLO-TEST02',
  status: 'REPROVADO',
}

const MOCK_ORDER_FINANCING = {
  ...MOCK_ORDER_APPROVED,
  id: 'a1b2c3d4-0000-0000-0000-000000000003',
  order_number: 'VLO-TEST03',
  payment_method: 'financiamento',
  total_price: 44897.6,
}

class OrderLookupActions {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
    this.l = locatorsMapping(page)
  }

  async mockOrderFound(order = MOCK_ORDER_APPROVED) {
    await this.page.route('**/rest/v1/orders*', async route => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([order]),
        })
      } else {
        await route.continue()
      }
    })
  }

  async mockOrderNotFound() {
    await this.page.route('**/rest/v1/orders*', async route => {
      if (route.request().method() === 'GET') {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify([]),
        })
      } else {
        await route.continue()
      }
    })
  }

  async searchOrder(orderNumber) {
    await this.l.lookup.searchInput.fill(orderNumber)
    await this.l.lookup.searchButton.click()
  }

  get mockData() {
    return {
      approved: MOCK_ORDER_APPROVED,
      reprovado: MOCK_ORDER_REPROVADO,
      financing: MOCK_ORDER_FINANCING,
    }
  }
}

const lookupFactory = (page) => new OrderLookupActions(page)
export default lookupFactory

/** @typedef {InstanceType<typeof OrderLookupActions>} OrderLookupActionsType */
