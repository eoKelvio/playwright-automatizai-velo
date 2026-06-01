import authFactory from './auth/auth.js'
import setupFactory from './setup/index.js'
import landingFactory from './landing/landing.js'
import configuratorFactory from './configurator/configurator.js'

/**
 * @param {import('playwright').Page} page
 * @returns {{ auth: ReturnType<typeof authFactory>, setup: ReturnType<typeof setupFactory>, landing: ReturnType<typeof landingFactory>, configurator: ReturnType<typeof configuratorFactory> }}
 */
const interfaceFactory = page => {
  return {
    auth: authFactory(page),
    setup: setupFactory(page),
    landing: landingFactory(page),
    configurator: configuratorFactory(page),
  }
}

export default interfaceFactory
