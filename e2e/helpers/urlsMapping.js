import data from '@/fixtures/data.js'

const BASE_URL = data.URL
const SUPABASE_URL = data.SUPABASE_URL

export const urlsMapping = {
  api: {
    orders: `${SUPABASE_URL}/rest/v1/orders`,
    creditAnalysis: `${SUPABASE_URL}/functions/v1/credit-analysis`,
  },
  base: BASE_URL,
  landing: `${BASE_URL}/`,
  configure: `${BASE_URL}/configure`,
  order: `${BASE_URL}/order`,
  success: `${BASE_URL}/success`,
  lookup: `${BASE_URL}/lookup`,
  terms: `${BASE_URL}/termos`,
  privacy: `${BASE_URL}/privacidade`,
}
