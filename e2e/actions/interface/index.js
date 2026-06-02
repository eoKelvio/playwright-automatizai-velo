import authFactory from './auth/auth.js'
import setupFactory from './setup/index.js'
import landingFactory from './landing/landing.js'
import configuratorFactory from './configurator/configurator.js'
import orderFactory from './order/order.js'
import successFactory from './success/success.js'
import lookupFactory from './lookup/lookup.js'

/**
 * @param {import('playwright').Page} page
 * @returns {{ auth: ReturnType<typeof authFactory>, setup: ReturnType<typeof setupFactory>, landing: ReturnType<typeof landingFactory>, configurator: ReturnType<typeof configuratorFactory>, order: ReturnType<typeof orderFactory> }}
 */
const interfaceFactory = page => {
  return {
    auth: authFactory(page),
    setup: setupFactory(page),
    landing: landingFactory(page),
    configurator: configuratorFactory(page),
    order: orderFactory(page),
    success: successFactory(page),
    lookup: lookupFactory(page),
  }
}

export default interfaceFactory
