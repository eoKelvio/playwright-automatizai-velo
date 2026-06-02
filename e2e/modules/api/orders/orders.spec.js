import { test, expect } from '@/fixtures/actions.js'
import testId from '@/shared/testId.js'

test.describe('Orders API', () => {
  let response
  let currentTestId

  test.beforeEach(async () => {
    currentTestId = testId(6)
  })

  test('Should be able to create an order with full payment and receive a 201 response with the generated order number.', async ({ actions }) => {
    await test.step('Create order via API', async () => {
      response = await actions.api.orders.createOrder({
        orderNumber: `VLO-${currentTestId}`,
        paymentMethod: 'avista',
        status: 'APROVADO',
      })
    })

    await test.step('Validate 201 response and order number', async () => {
      expect(response.status()).toBe(201)

      const body = await response.json()
      const order = Array.isArray(body) ? body[0] : body
      expect(order.order_number).toBe(`VLO-${currentTestId}`)
      expect(order.status).toBe('APROVADO')
      expect(order.payment_method).toBe('avista')
    })
  })

  test('Should be able to create an order with financing and receive a 201 response with the correct status.', async ({ actions }) => {
    await test.step('Create financing order via API', async () => {
      response = await actions.api.orders.createOrder({
        orderNumber: `VLO-${currentTestId}`,
        paymentMethod: 'financiamento',
        status: 'EM_ANALISE',
        totalPrice: 44897.6,
      })
    })

    await test.step('Validate 201 response with financing status', async () => {
      expect(response.status()).toBe(201)

      const body = await response.json()
      const order = Array.isArray(body) ? body[0] : body
      expect(order.payment_method).toBe('financiamento')
      expect(order.status).toBe('EM_ANALISE')
    })
  })

  test('Should be able to fetch an existing order by its order number and receive the full order data.', async ({ actions }) => {
    await test.step('Create order to fetch', async () => {
      await actions.api.orders.createOrder({
        orderNumber: `VLO-${currentTestId}`,
        status: 'APROVADO',
      })
    })

    await test.step('Fetch order by number', async () => {
      response = await actions.api.orders.getOrderByNumber(`VLO-${currentTestId}`)
    })

    await test.step('Validate order data is returned', async () => {
      expect(response.status()).toBe(200)

      const body = await response.json()
      expect(body).toHaveLength(1)
      expect(body[0].order_number).toBe(`VLO-${currentTestId}`)
      expect(body[0].color).toBeDefined()
      expect(body[0].customer_name).toBeDefined()
      expect(body[0].total_price).toBeDefined()
    })
  })

  test('Should be able to receive an empty response when fetching a non-existent order number.', async ({ actions }) => {
    await test.step('Fetch non-existent order', async () => {
      response = await actions.api.orders.getOrderByNumber('VLO-NOTEXIST')
    })

    await test.step('Validate empty response', async () => {
      expect(response.status()).toBe(200)

      const body = await response.json()
      expect(body).toHaveLength(0)
    })
  })

  test('Should be able to create an order without authentication and receive a 201 response (public RLS policy).', async ({ actions }) => {
    await test.step('Create order with anon key (no auth)', async () => {
      response = await actions.api.orders.createOrder({
        orderNumber: `VLO-${currentTestId}`,
        status: 'APROVADO',
      })
    })

    await test.step('Validate public RLS allows insert', async () => {
      expect(response.status()).toBe(201)
    })
  })

  test('Should be able to verify that the created_at and updated_at fields are automatically populated on order creation.', async ({ actions }) => {
    await test.step('Create order', async () => {
      response = await actions.api.orders.createOrder({
        orderNumber: `VLO-${currentTestId}`,
        status: 'APROVADO',
      })
    })

    await test.step('Validate timestamps are auto-populated', async () => {
      expect(response.status()).toBe(201)

      const body = await response.json()
      const order = Array.isArray(body) ? body[0] : body
      expect(order.created_at).toBeDefined()
      expect(order.updated_at).toBeDefined()
      expect(new Date(order.created_at).getTime()).toBeGreaterThan(0)
    })
  })

  test('Should be able to create an order with optional features and verify they are persisted correctly as an array.', async ({ actions }) => {
    const optionals = ['precision-park', 'flux-capacitor']

    await test.step('Create order with optionals', async () => {
      response = await actions.api.orders.createOrder({
        orderNumber: `VLO-${currentTestId}`,
        optionals,
        totalPrice: 50500,
        status: 'APROVADO',
      })
    })

    await test.step('Validate optionals are persisted as array', async () => {
      expect(response.status()).toBe(201)

      const body = await response.json()
      const order = Array.isArray(body) ? body[0] : body
      expect(order.optionals).toEqual(expect.arrayContaining(optionals))
    })
  })
})
