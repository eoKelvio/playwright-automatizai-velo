import { lazylog } from '@/shared/log.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'
import data from '@/fixtures/data.js'

class CreditApiActions {
  /** @param {import('@playwright/test').APIRequestContext} request */
  constructor(request) {
    this.request = request
    this.headers = {
      'Authorization': `Bearer ${data.SUPABASE_ANON_KEY.trim()}`,
      'Content-Type': 'application/json',
    }
  }

  async analyze({ cpf }) {
    const payload = { cpf }

    const response = await this.request.post(urlsMapping.api.creditAnalysis, {
      headers: this.headers,
      data: payload,
    })

    await lazylog({ method: 'POST', payload, response })
    return response
  }

  async analyzeWithoutCpf() {
    const response = await this.request.post(urlsMapping.api.creditAnalysis, {
      headers: this.headers,
      data: {},
    })

    await lazylog({ method: 'POST', response })
    return response
  }
}

const creditApiFactory = request => new CreditApiActions(request)
export default creditApiFactory

/** @typedef {InstanceType<typeof CreditApiActions>} CreditApiActionsType */
