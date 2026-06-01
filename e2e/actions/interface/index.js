import authFactory from './auth/auth.js'
import setupFactory from './setup/index.js'
import landingFactory from './landing/landing.js'

/**
 * @param {import('playwright').Page} page
 * @returns {{ auth: ReturnType<typeof authFactory>, setup: ReturnType<typeof setupFactory>, landing: ReturnType<typeof landingFactory> }}
 */
const interfaceFactory = page => {
  return {
    auth: authFactory(page),
    setup: setupFactory(page),
    landing: landingFactory(page),
  }
}

export default interfaceFactory
