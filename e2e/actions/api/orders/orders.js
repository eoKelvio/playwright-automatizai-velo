import { lazylog } from '@/shared/log.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'
import data from '@/fixtures/data.js'

class OrdersApiActions {
  /** @param {import('@playwright/test').APIRequestContext} request */
  constructor(request) {
    this.request = request
    const key = data.SUPABASE_ANON_KEY.trim()
    this.headers = {
      'apikey': key,
      'Authorization': `Bearer ${key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    }
  }

  async createOrder(orderData) {
    const payload = {
      order_number: orderData.orderNumber,
      color: orderData.color || 'glacier-blue',
      wheel_type: orderData.wheelType || 'aero',
      optionals: orderData.optionals || [],
      customer_name: orderData.customerName || 'João Silva',
      customer_email: orderData.customerEmail || 'joao.silva@test.com',
      customer_phone: orderData.customerPhone || '(11) 99999-9999',
      customer_cpf: orderData.customerCpf || '123.456.789-09',
      payment_method: orderData.paymentMethod || 'avista',
      total_price: orderData.totalPrice || 40000,
      status: orderData.status || 'APROVADO',
    }

    const response = await this.request.post(urlsMapping.api.orders, {
      headers: this.headers,
      data: payload,
    })

    await lazylog({ method: 'POST', payload, response })
    return response
  }

  async getOrderByNumber(orderNumber) {
    const response = await this.request.get(urlsMapping.api.orders, {
      headers: this.headers,
      params: {
        order_number: `eq.${orderNumber}`,
        select: '*',
      },
    })

    await lazylog({ method: 'GET', response })
    return response
  }
}

const ordersApiFactory = request => new OrdersApiActions(request)
export default ordersApiFactory

/** @typedef {InstanceType<typeof OrdersApiActions>} OrdersApiActionsType */
