import data from '@/fixtures/data.js'

class AuthActions {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
  }
}

const authFactory = page => new AuthActions(page)
export default authFactory

/** @typedef {InstanceType<typeof AuthActions>} AuthActionsType */
