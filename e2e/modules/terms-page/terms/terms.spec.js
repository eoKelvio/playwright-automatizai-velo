import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Terms', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToTerms()
  })

  test.skip('Should be able to navigate to the terms page via the "/termos" route and display the "Termos de Uso" heading.', async () => {})
  test.skip('Should be able to redirect to the initial page when the user clicks the "Voltar para a página inicial" link on the terms page.', async () => {})
})
