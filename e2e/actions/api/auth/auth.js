import { lazylog } from '@/shared/log'
import data from '@/fixtures/data'

class AuthApiActions {
  /**
   *
   * @param {import('playwright').APIRequestContext} request
   */
  constructor(request) {
    this.request = request
  }

}

/**
 * @param {import('playwright').APIRequestContext} request
 */
const authApiFactory = request => new AuthApiActions(request)

export default authApiFactory
