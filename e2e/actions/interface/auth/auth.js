import data from '@/fixtures/data'

class AuthActions {
  /** @type {import('playwright').Page} */
  page

  /** @param {import('playwright').Page} page */
  constructor(page) {
    this.page = page
  }

}

/**
 * @param {import('playwright').Page} page
 * @returns {AuthActions}
 */
const authFactory = page => new AuthActions(page)
export default authFactory

/** @typedef {InstanceType<typeof AuthActions>} AuthActionsType */
