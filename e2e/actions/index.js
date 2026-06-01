import interfaceFactory from './interface'
import apiFactory from './api'

const actionsFactory = page => {
  const request = page.request

  return {
    interface: interfaceFactory(page),
    api: apiFactory(request)
  }
}

export default actionsFactory
