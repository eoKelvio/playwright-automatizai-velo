// import myDomainFactory from '@/actions/interface/<domain>/<name>'

/**
 * Orchestrates conditional form filling across multiple sections.
 * Import domain-specific action factories and register them in the constructor.
 * Each section is only executed when its corresponding payload is provided.
 */
class FillForms {
  /** @param {import('playwright').Page} page */
  constructor(page) {
    this.page = page
    // this.myDomain = myDomainFactory(page)
  }

  async fillFormsIndex(payload) {
    const sections = [
      // { flag: payload.mySection, method: () => this.myDomain.fillMySection(payload.mySection) },
    ]

    for (const section of sections) {
      if (section.flag !== undefined) {
        await section.method()
      }
    }
  }
}

/**
 * @param {import('playwright').Page} page
 * @returns {FillForms}
 */
const fillFormsIndexFactory = page => new FillForms(page)

export default fillFormsIndexFactory
