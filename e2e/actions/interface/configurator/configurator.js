import { locatorsMapping } from '@/helpers/locatorsMapping.js'

class ConfiguratorActions {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
    this.l = locatorsMapping(page)
  }

  async clickHeaderLogo() {
    await this.page.getByAltText('Velô', { exact: true }).click()
  }

  async selectColor(color) {
    await this.l.configure.colorOption(color).click()
  }

  async selectWheels(type) {
    await this.l.configure.wheelOption(type).click()
  }

  async toggleOptional(id) {
    await this.l.configure.optionalItem(id).click()
  }

  async clickCheckout() {
    await this.l.configure.checkoutButton.click()
  }
}

const configuratorFactory = (page) => new ConfiguratorActions(page)
export default configuratorFactory

/** @typedef {InstanceType<typeof ConfiguratorActions>} ConfiguratorActionsType */
