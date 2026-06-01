import authFactory from './auth/auth.js'
import setupFactory from './setup/index.js'

/**
 * @param {import('playwright').Page} page
 * @returns {{ auth: ReturnType<typeof authFactory>, setup: ReturnType<typeof setupFactory> }}
 */
const interfaceFactory = page => {
  return {
    auth: authFactory(page),
    setup: setupFactory(page)
  }
}

export default interfaceFactory
