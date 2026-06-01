/**
 * @typedef {Object} PayloadConfig
 * @property {number} [timeout=5000] - Timeout in milliseconds to wait for element
 * @property {boolean} [force=false] - Force action bypassing actionability checks
 */

/**
 * @typedef {'fill'|'input'|'textarea'|'dropdown'|'select'|'checkbox'|'radio'} PayloadType
 */

/**
 * @typedef {Object} Payload
 * @property {PayloadType} type - Type of action to be executed
 * @property {import('playwright').Locator} locator - Locator of the target element
 * @property {string} [value] - Value to fill or action (e.g., 'check', 'uncheck', 'click')
 * @property {string} [option] - Option to be selected in dropdowns
 * @property {PayloadConfig} [config] - Additional configuration for the action
 */

/**
 * GlobalFill - Generic and robust form filling class
 *
 * Supports filling individual or multiple fields at once,
 * with automatic handling of different element types (inputs, selects, checkboxes, etc).
 *
 * @class
 * @example
 * // Instantiate the class
 * const globalFill = new GlobalFill(page)
 *
 * // Fill a single field
 * await globalFill.globalFill({
 *   payload: {
 *     type: 'fill',
 *     locator: page.getByLabel('Name'),
 *     value: 'John Doe'
 *   }
 * })
 *
 * // Fill with custom timeout
 * await globalFill.globalFill({
 *   payload: {
 *     type: 'fill',
 *     locator: page.getByLabel('Name'),
 *     value: 'John Doe',
 *     config: { timeout: 10000 }
 *   }
 * })
 *
 * // Fill with force (bypass actionability checks)
 * await globalFill.globalFill({
 *   payload: {
 *     type: 'fill',
 *     locator: page.getByLabel('Covered field'),
 *     value: 'Value',
 *     config: { force: true }
 *   }
 * })
 *
 * // Fill multiple fields
 * await globalFill.globalFill({
 *   payload: [
 *     { type: 'fill', locator: page.getByLabel('Name'), value: 'John' },
 *     { type: 'checkbox', locator: page.getByLabel('Accept'), value: 'check' },
 *     { type: 'dropdown', locator: page.getByPlaceholder('State'), option: 'California' }
 *   ]
 * })
 */
class GlobalFill {
  /** @type {import('playwright').Page} */
  page

  /** @type {number} */
  defaultTimeout

  /**
   * @constructor
   * @param {import('playwright').Page} page - Playwright page instance
   * @param {Object} [config] - Configuration options
   * @param {number} [config.defaultTimeout=5000] - Default timeout in milliseconds
   */
  constructor(page, config = {}) {
    this.page = page
    this.defaultTimeout = config.defaultTimeout || 5000
  }

  /**
   * Fills an input/textarea field
   *
   * @async
   * @param {Object} params
   * @param {import('playwright').Locator} params.locator - Input locator
   * @param {string} params.value - Value to fill
   * @param {PayloadConfig} [params.config] - Additional configuration
   * @returns {Promise<void>}
   * @example
   * await globalFill.fill({
   *   locator: page.getByLabel('Name'),
   *   value: 'John Doe'
   * })
   *
   * // With custom timeout
   * await globalFill.fill({
   *   locator: page.getByLabel('Name'),
   *   value: 'John Doe',
   *   config: { timeout: 10000 }
   * })
   *
   * // With force (for covered elements)
   * await globalFill.fill({
   *   locator: page.getByLabel('Covered field'),
   *   value: 'Value',
   *   config: { force: true }
   * })
   */
  async fill({ locator, value, config = {} }) {
    const timeout = config.timeout || this.defaultTimeout
    const force = config.force || false

    await locator.waitFor({ state: 'visible', timeout })

    await locator.click({ force })
    await locator.clear()
    await locator.fill(value, { force })
    await locator.blur()
  }

  /**
   * Selects an option in dropdown/select (native or custom)
   *
   * Automatically detects if it's a native HTML <select> or custom dropdown.
   * For custom dropdowns, tries 7 different location strategies.
   *
   * @async
   * @param {Object} params
   * @param {import('playwright').Locator} params.locator - Dropdown locator
   * @param {string} params.option - Text of the option to be selected
   * @param {string} [params.value] - Value for search (fills before selecting)
   * @param {PayloadConfig} [params.config] - Additional configuration
   * @returns {Promise<void>}
   * @throws {Error} If no strategy can select the option
   * @example
   * // Simple dropdown
   * await globalFill.select({
   *   locator: page.getByPlaceholder('Select'),
   *   option: 'California'
   * })
   *
   * // Dropdown with search
   * await globalFill.select({
   *   locator: page.getByPlaceholder('State'),
   *   value: 'CA',
   *   option: 'California'
   * })
   *
   * // With custom timeout
   * await globalFill.select({
   *   locator: page.getByPlaceholder('State'),
   *   option: 'California',
   *   config: { timeout: 8000 }
   * })
   *
   * // With force (for covered dropdowns)
   * await globalFill.select({
   *   locator: page.getByPlaceholder('State'),
   *   option: 'California',
   *   config: { force: true }
   * })
   */
  async select({ locator, option, value, config = {} }) {
    const timeout = config.timeout || this.defaultTimeout
    const force = config.force || false

    await locator.waitFor({ state: 'visible', timeout })

    try {
      await locator.selectOption({ label: option }, { force })
      return
    } catch {}

    await locator.click({ force })

    if (value) {
      await locator.fill(value)
      await this.page.keyboard.press('Enter')
    }

    await this.page.waitForTimeout(300)

    const strategies = [
      () => this.page.getByRole('option', { name: option }).click({ force }),
      () => this.page.getByRole('listitem').filter({ hasText: option }).first().click({ force }),
      () => this.page.getByText(option, { exact: true }).first().click({ force }),
      () => this.page.getByText(option).first().click({ force }),
      () => this.page.locator(`li:has-text("${option}")`).first().click({ force }),
      () =>
        this.page
          .locator(`.el-select-dropdown__item:has-text("${option}")`)
          .first()
          .click({ force }),
      () => this.page.locator(`[role="option"]:has-text("${option}")`).first().click({ force })
    ]

    for (const strategy of strategies) {
      try {
        await strategy()
        return
      } catch {
        continue
      }
    }

    throw new Error(`Unable to select option: "${option}"`)
  }

  /**
   * Checks a checkbox
   *
   * @async
   * @param {Object} params
   * @param {import('playwright').Locator} params.locator - Checkbox locator
   * @param {PayloadConfig} [params.config] - Additional configuration
   * @returns {Promise<void>}
   * @example
   * await globalFill.check({ locator: page.getByLabel('I accept the terms') })
   *
   * // With custom config
   * await globalFill.check({
   *   locator: page.getByLabel('Accept'),
   *   config: { timeout: 8000, force: true }
   * })
   */
  async check({ locator, config = {} }) {
    const timeout = config.timeout || this.defaultTimeout
    const force = config.force || false

    await locator.waitFor({ state: 'visible', timeout })
    await locator.check({ force })
  }

  /**
   * Unchecks a checkbox
   *
   * @async
   * @param {Object} params
   * @param {import('playwright').Locator} params.locator - Checkbox locator
   * @param {PayloadConfig} [params.config] - Additional configuration
   * @returns {Promise<void>}
   * @example
   * await globalFill.uncheck({ locator: page.getByLabel('Receive newsletter') })
   *
   * // With custom config
   * await globalFill.uncheck({
   *   locator: page.getByLabel('Newsletter'),
   *   config: { timeout: 3000 }
   * })
   */
  async uncheck({ locator, config = {} }) {
    const timeout = config.timeout || this.defaultTimeout
    const force = config.force || false

    await locator.waitFor({ state: 'visible', timeout })
    await locator.uncheck({ force })
  }

  /**
   * Main method for global form filling
   *
   * Accepts a single payload or array of payloads. Processes each payload
   * according to its type, applying the corresponding action.
   *
   * Supported types: 'fill', 'input', 'textarea', 'dropdown', 'select', 'checkbox', 'radio'
   *
   * @async
   * @param {Object} params
   * @param {any} params.payload - Single payload or array of payloads
   * @returns {Promise<void>}
   * @example
   * // Single payload
   * await fillGeneric.globalFill({
   *   payload: {
   *     type: 'fill',
   *     locator: page.getByLabel('Name'),
   *     value: 'John Doe'
   *   }
   * })
   *
   * // Multiple payloads with custom config
   * await globalFill.globalFill({
   *   payload: [
   *     { type: 'fill', locator: page.getByLabel('Name'), value: 'John' },
   *     { type: 'fill', locator: page.getByLabel('Email'), value: 'john@email.com', config: { timeout: 8000 } },
   *     { type: 'checkbox', locator: page.getByLabel('Accept'), value: 'check', config: { force: true } },
   *     { type: 'dropdown', locator: page.getByPlaceholder('State'), option: 'CA', config: { timeout: 10000 } },
   *     { type: 'radio', locator: page.getByLabel('Male'), value: 'check', config: { force: true } }
   *   ]
   * })
   */
  async globalFill({ payload }) {
    if (Array.isArray(payload)) {
      for (const item of payload) {
        await this._processPayload(item)
      }
      return
    }

    await this._processPayload(payload)
  }

  /**
   * Processes an individual payload and executes the corresponding action
   *
   * @private
   * @async
   * @param {Payload} payload - Payload to be processed
   * @returns {Promise<void>}
   * @throws {Error} If the type is not supported
   *
   * Supported types:
   * - fill, input, textarea: Fills text fields
   * - dropdown, select: Selects option in dropdown
   * - checkbox: Checks/unchecks checkbox (value: 'check', 'uncheck', 'click')
   * - radio: Selects radio button (value: 'check', 'uncheck', 'click')
   */
  async _processPayload(payload) {
    const { type, locator, value, option, config = {} } = payload
    const timeout = config.timeout || this.defaultTimeout
    const force = config.force || false

    switch (type) {
      case 'fill':
      case 'input':
      case 'textarea':
        await this.fill({ locator, value, config })
        break

      case 'dropdown':
      case 'select':
        await this.select({ locator, option, value, config })
        break

      case 'checkbox':
        switch (value?.toLowerCase()) {
          case 'check':
            await this.check({ locator, config })
            break
          case 'uncheck':
            await this.uncheck({ locator, config })
            break
          case 'click':
            await locator.waitFor({ state: 'visible', timeout })
            await locator.click({ force })
            break
          default:
            await this.check({ locator, config })
        }
        break

      case 'radio':
        switch (value?.toLowerCase()) {
          case 'check':
            await this.check({ locator, config })
            break
          case 'uncheck':
            await this.uncheck({ locator, config })
            break
          case 'click':
            await locator.waitFor({ state: 'visible', timeout })
            await locator.click({ force })
            break
          default:
            await this.check({ locator, config })
        }
        break

      default:
        throw new Error(`Type "${type}" is not supported`)
    }
  }
}

const globalFillFactory = page => new GlobalFill(page)
export default globalFillFactory
