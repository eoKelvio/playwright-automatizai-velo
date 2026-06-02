import data from '@/fixtures/data.js'

const BASE_URL = data.URL

export const urlsMapping = {
  base: BASE_URL,
  landing: `${BASE_URL}/`,
  configure: `${BASE_URL}/configure`,
  order: `${BASE_URL}/order`,
  success: `${BASE_URL}/success`,
  lookup: `${BASE_URL}/lookup`,
  terms: `${BASE_URL}/termos`,
  privacy: `${BASE_URL}/privacidade`,
}
