import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Privacy', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToPrivacy()
  })

  test.skip('Should be able to navigate to the privacy page via the "/privacidade" route and display the "Política de Privacidade" heading.', async () => {})
  test.skip('Should be able to redirect to the initial page when the user clicks the "Voltar para a página inicial" link on the privacy page.', async () => {})
})
