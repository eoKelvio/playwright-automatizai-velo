import { locatorsMapping } from '@/helpers/locatorsMapping.js'

class LandingActions {
  /** @param {import('@playwright/test').Page} page */
  constructor(page) {
    this.page = page
    this.l = locatorsMapping(page)
  }

  async clickHeaderLogo() {
    await this.l.header.logo.click()
  }

  async clickHeaderConfigure() {
    await this.l.header.cta.click()
  }

  async clickHeaderConsultarPedido() {
    await this.l.header.nav.getByRole('link', { name: 'Consultar Pedido' }).click()
  }

  async openMobileMenu() {
    await this.l.header.menuToggle.click()
  }

  async closeMobileMenu() {
    await this.l.header.menuToggle.click()
  }

  async clickMobileConfigureCTA() {
    await this.l.header.mobileNav.getByRole('link', { name: 'Configure o Seu' }).click()
  }

  async clickMobileConsultarPedido() {
    await this.l.header.mobileNav.getByRole('link', { name: 'Consultar Pedido' }).click()
  }

  async clickConfigureAgora() {
    await this.l.landing.heroCta.click()
  }

  async clickCTAButton() {
    await this.l.landing.ctaButton.click()
  }

  async expandFaqItem(index) {
    await this.l.landing.faqItem(index).getByRole('button').click()
  }

  async clickFooterVeloSprint() {
    await this.l.landing.footer.getByRole('link', { name: 'Velô Sprint' }).click()
  }

  async clickFooterTermos() {
    await this.l.landing.footer.getByRole('link', { name: 'Termos de Uso' }).click()
  }

  async clickFooterPrivacidade() {
    await this.l.landing.footer.getByRole('link', { name: 'Política de Privacidade' }).click()
  }
}

const landingFactory = (page) => new LandingActions(page)
export default landingFactory

/** @typedef {InstanceType<typeof LandingActions>} LandingActionsType */
