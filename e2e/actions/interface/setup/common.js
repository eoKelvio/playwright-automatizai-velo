import data from '@/fixtures/data'

class CommonActions {
  /** @type {import('playwright').Page} */
  page

  /** @param {import('playwright').Page} page */
  constructor(page) {
    this.page = page
  }

}

/**
 * @param {import('playwright').Page} page
 * @returns {CommonActions}
 */
const commonFactory = page => new CommonActions(page)
export default commonFactory

/** @typedef {InstanceType<typeof CommonActions>} CommonActionsType */
