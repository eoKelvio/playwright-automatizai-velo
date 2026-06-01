import { lazylog } from '@/shared/log'
import data from '@/fixtures/data'

class CommonApiActions {
  /** @type {import('playwright').APIRequestContext} */
  request

  /** @param {import('playwright').APIRequestContext} request */
  constructor(request) {
    this.request = request
  }

}

/**
 * @param {import('playwright').APIRequestContext} request
 */
const commonApiFactory = request => new CommonApiActions(request)

export default commonApiFactory
