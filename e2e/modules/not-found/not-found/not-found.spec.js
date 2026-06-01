import { test, expect } from '@/fixtures/actions.js'
import { urlsMapping } from '@/helpers/urlsMapping.js'

test.describe('Not Found', () => {
  test.beforeEach(async ({ actions }) => {
    await actions.interface.setup.navigation.goToHome()
  })

  test.skip('Should be able to display the 404 error page when the user navigates to a non-existent route.', async () => {})
  test.skip('Should be able to redirect to the initial page when the user clicks the "Return to Home" link on the 404 page.', async () => {})
})
