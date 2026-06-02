import authApiFactory from './auth/auth.js'
import ordersApiFactory from './orders/orders.js'
import creditApiFactory from './credit/credit.js'

/**
 * @param {import('@playwright/test').APIRequestContext} request
 */
const apiFactory = request => {
  return {
    auth: authApiFactory(request),
    orders: ordersApiFactory(request),
    credit: creditApiFactory(request),
  }
}

export default apiFactory
