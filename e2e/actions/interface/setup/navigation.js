import data from '@/fixtures/data'

class NavigationActions {
  /** @type {import('playwright').Page} */
  page

  /** @param {import('playwright').Page} page */
  constructor(page) {
    this.page = page
  }
  
}

/**
 * @param {import('playwright').Page} page
 * @returns {NavigationActions}
 */
const navigationFactory = page => new NavigationActions(page)

/** @typedef {InstanceType<typeof NavigationActions>} NavigationActionsType */

export default navigationFactory
