import globalFillFactory from '@/shared/globalFill.js'
import { locatorsMapping } from '@/helpers/locatorsMapping.js'

class OrderActions {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
    this.l = locatorsMapping(page)
    this.gf = globalFillFactory(page)
  }

  async clickHeaderLogo() {
    await this.page.getByAltText('Velô', { exact: true }).click()
  }

  async clickBackButton() {
    await this.l.order.backButton.click()
  }

  async selectPaymentMethod(method) {
    if (method === 'financiamento') {
      await this.l.order.paymentFinanciamento.click()
    } else {
      await this.l.order.paymentAvista.click()
    }
  }

  async submit() {
    await this.l.order.submit.click()
  }

  async mockCreditScore(score) {
    await this.page.route('**/functions/v1/credit-analysis', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ score, status: 'Done' }),
      })
    })
  }

  async fillOrderForm({
    name = 'João',
    surname = 'Silva',
    email = 'joao.silva@test.com',
    phone = '(11) 99999-9999',
    cpf = '123.456.789-09',
    store = 'Velô Paulista - Av. Paulista, 1000',
    terms = true,
    paymentMethod = 'avista',
    entryValue = null,
  } = {}) {
    const payload = [
      name !== null ? { type: 'fill', locator: this.l.order.name, value: name } : null,
      surname !== null ? { type: 'fill', locator: this.l.order.surname, value: surname } : null,
      email !== null ? { type: 'fill', locator: this.l.order.email, value: email } : null,
      phone !== null ? { type: 'fill', locator: this.l.order.phone, value: phone } : null,
      cpf !== null ? { type: 'fill', locator: this.l.order.cpf, value: cpf } : null,
      store ? { type: 'dropdown', locator: this.l.order.store, option: store } : null,
      terms ? { type: 'checkbox', locator: this.l.order.terms, value: 'check' } : null,
    ].filter(Boolean)

    await this.gf.globalFill({ payload })

    if (paymentMethod === 'financiamento') {
      await this.selectPaymentMethod('financiamento')
      if (entryValue !== null) {
        await this.gf.globalFill({
          payload: { type: 'fill', locator: this.l.order.entryValue, value: String(entryValue) },
        })
      }
    }
  }
}

const orderFactory = (page) => new OrderActions(page)
export default orderFactory

/** @typedef {InstanceType<typeof OrderActions>} OrderActionsType */
