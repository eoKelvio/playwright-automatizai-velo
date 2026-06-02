import { locatorsMapping } from '@/helpers/locatorsMapping.js'

class SuccessActions {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
    this.l = locatorsMapping(page)
  }

  async clickHeaderLogo() {
    await this.page.getByAltText('Velô', { exact: true }).click()
  }

  async clickConsultarPedido() {
    await this.l.success.gotoConsultar.click()
  }

  async clickConfigurarOutro() {
    await this.l.success.configureAnother.click()
  }
}

const successFactory = (page) => new SuccessActions(page)
export default successFactory

/** @typedef {InstanceType<typeof SuccessActions>} SuccessActionsType */
