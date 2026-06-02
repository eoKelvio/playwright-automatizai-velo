import { test, expect } from '@/fixtures/actions.js'

test.describe('Credit Analysis API', () => {
  let response

  test('Should be able to receive a 400 response when submitting the credit analysis request without a CPF.', async ({ actions }) => {
    await test.step('Submit credit analysis without CPF', async () => {
      response = await actions.api.credit.analyzeWithoutCpf()
    })

    await test.step('Validate 400 response', async () => {
      expect(response.status()).toBe(400)

      const body = await response.json()
      const expectedError = 'CPF é obrigatório'
      expect(body.error).toBe(expectedError)
    })
  })
})
