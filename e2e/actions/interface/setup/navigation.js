import { urlsMapping } from '@/helpers/urlsMapping.js'

class NavigationActions {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
  }

  async goToHome() {
    await this.page.goto(urlsMapping.landing)
  }

  async goToConfigure() {
    await this.page.goto(urlsMapping.configure)
  }

  async goToLookup() {
    await this.page.goto(urlsMapping.lookup)
  }

  async goToSuccess() {
    await this.page.goto(urlsMapping.success)
  }

  async goToTerms() {
    await this.page.goto(urlsMapping.terms)
  }

  async goToPrivacy() {
    await this.page.goto(urlsMapping.privacy)
  }
}

const navigationFactory = (page) => new NavigationActions(page)

/** @typedef {InstanceType<typeof NavigationActions>} NavigationActionsType */

export default navigationFactory
