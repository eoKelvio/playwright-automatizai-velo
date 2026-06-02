/** @param {import('@playwright/test').Page} page */
export const locatorsMapping = (page) => {
  return {
    header: {
      logo: page.getByTestId('header-logo'),
      cta: page.getByTestId('header-cta'),
      nav: page.getByTestId('header-nav'),
      menuToggle: page.getByTestId('header-menu-toggle'),
      mobileNav: page.getByTestId('header-mobile-nav'),
    },

    landing: {
      heroCta: page.getByTestId('hero-cta-primary'),
      ctaButton: page.getByTestId('cta-button'),
      faqSection: page.getByTestId('faq-section'),
      faqItem: (index) => page.getByTestId(`faq-item-${index}`),
      footer: page.getByTestId('footer'),
    },

    configure: {
      totalPrice: page.getByTestId('total-price'),
      colorSection: page.getByTestId('section-cores'),
      colorOption: (color) => page.getByTestId(`color-option-${color}`),
      wheelsSection: page.getByTestId('section-rodas'),
      wheelOption: (type) => page.getByTestId(`wheel-option-${type}`),
      optionalsSection: page.getByTestId('section-opcionais'),
      optionalItem: (id) => page.getByTestId(`opt-${id}`),
      carExterior: page.getByTestId('car-exterior-image'),
      carInterior: page.getByTestId('car-interior-image'),
      checkoutButton: page.getByTestId('checkout-button'),
    },

    order: {
      backButton: page.locator('header button').first(),
      name: page.getByTestId('checkout-name'),
      surname: page.getByTestId('checkout-surname'),
      email: page.getByTestId('checkout-email'),
      phone: page.getByTestId('checkout-phone'),
      cpf: page.getByTestId('checkout-cpf'),
      store: page.getByTestId('checkout-store'),
      terms: page.getByTestId('checkout-terms'),
      submit: page.getByTestId('checkout-submit'),
      paymentAvista: page.getByTestId('payment-avista'),
      paymentFinanciamento: page.getByTestId('payment-financiamento'),
      entryValue: page.getByTestId('input-entry-value'),
      summaryTotal: page.getByTestId('summary-total-price'),
      orderId: page.getByTestId('order-id'),
    },

    success: {
      status: page.getByTestId('success-status'),
      gotoConsultar: page.getByTestId('goto-consultar'),
      configureAnother: page.getByTestId('configure-another'),
    },

    lookup: {
      searchInput: page.getByTestId('search-order-id'),
      searchButton: page.getByTestId('search-order-button'),
      resultId: page.getByTestId('order-result-id'),
      resultStatus: page.getByTestId('order-result-status'),
    },
  }
}
