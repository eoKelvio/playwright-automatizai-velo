import authApiFactory from './auth/auth'

/**
 * @param {import('playwright').APIRequestContext} request
 */
const apiFactory = request => {
  return {
    auth: authApiFactory(request)
  }
}

export default apiFactory
