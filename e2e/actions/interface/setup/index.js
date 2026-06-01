import commonFactory from './common'
import navigationFactory from './navigation'

/**
 * @param {import('playwright').Page} page
 * @returns {{ common: ReturnType<typeof commonFactory>, navigation: ReturnType<typeof navigationFactory> }}
 */
const setupFactory = page => {
  return {
    common: commonFactory(page),
    navigation: navigationFactory(page)
  }
}

export default setupFactory
