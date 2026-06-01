Initial Page

Should be able to redirect for the initial page when the user clicks the "Velô" logo in the header.
Should be able to redirect for the configure page when the user clicks the "Configure o Seu" button in the header.
Should be able to redirect for the lookup page when the user clicks the "Consultar Pedido" link in the header.
Should be able to open and close the mobile navigation menu when the user clicks the hamburger menu button.
Should be able to redirect for the configure page when the user clicks "Configure o Seu" inside the mobile navigation menu.
Should be able to redirect for the lookup page when the user clicks "Consultar Pedido" inside the mobile navigation menu.
Should be able to redirect for the configure page when the user clicks the "Configure Agora" button.
Should be able to redirect for the configure page when the user clicks the "Monte o Seu Carro" button.
Should be able to expand dropdown text when user clicks the "Qual é a autonomia real do Velô Sprint?"
Should be able to expand dropdown text when user clicks the "Quanto tempo leva para carregar completamente?"
Should be able to expand dropdown text when user clicks the "O Velô sprint possui garantia?"
Should be able to expand dropdown text when user clicks the "Posso fazer test drive antes de comprar?"
Should be able to expand dropdown text when user clicks the "Quais são as opções de financiamento?"
Should be able to expand dropdown text when user clicks the "Como funciona a manutenção de um veículo elétrico?"
Should be able to collapse a previously expanded FAQ item when the user clicks its trigger a second time.
Should be able to redirect for the configure page when the user clicks the "Velô Sprint" link in the footer models section.
Should be able to redirect for the terms page when the user clicks the "Termos de Uso" link in the footer.
Should be able to redirect for the privacy page when the user clicks the "Política de Privacidade" link in the footer.


Configure Page

Should be able to redirect for the initial page when the user clicks the "Velô" logo.
Should be able to display the Glacier Blue color as selected by default when the configure page loads for the first time.
Should be able to display the Aero Wheels as selected by default when the configure page loads for the first time.
Should be able to display the base price of R$ 40.000,00 with no optional features selected and aero wheels.
Should be able to change vehicle color when the user clicks on any color option and change vehicle image for the same color.
Should be able to change vehicle wheels when the user clicks on any wheel option and change vehicle image for the same wheels.
Should be able to increase the total price by R$ 2.000,00 when the user selects Sport Wheels.
Should be able to change vehicle price when the user clicks on any accessory option for add/remove the accessory.
Should be able to increase the total price by R$ 5.500,00 when the user adds the Precision Park optional.
Should be able to increase the total price by R$ 5.000,00 when the user adds the Flux Capacitor optional.
Should be able to display the correct combined total price when the user selects Sport Wheels and both optional accessories simultaneously.
Should be able to deselect an accessory and decrease the total price accordingly when the user unchecks a previously selected optional.
Should be able to redirect for the order page when the user clicks the "Monte o Seu" button.


Order Page

Should be able to navigate to the initial page when the user clicks the "Velô" logo in the order page header.
Should be able to navigate back to the configure page when the user clicks the back arrow button in the header.
Should be able to display the vehicle image, color, wheel type and selected optionals in the order summary panel on the right side.
Should be able to display a validation error for the "Nome" field when the user submits the form with fewer than 2 characters.
Should be able to display a validation error for the "Sobrenome" field when the user submits the form with fewer than 2 characters.
Should be able to display a validation error for the "Email" field when the user submits the form with an invalid email format.
Should be able to display a validation error for the "Telefone" field when the user submits the form with an incomplete phone number.
Should be able to display a validation error for the "CPF" field when the user submits the form with an incomplete CPF number.
Should be able to select any of the four available stores from the "Loja para Retirada" dropdown ("Velô Paulista", "Velô Faria Lima", "Velô Morumbi", "Velô Ibirapuera").
Should be able to display a validation error for the "Loja para Retirada" field when the user submits the form without selecting a store.
Should be able to show the financing installment calculator section when the user selects the "Financiamento" payment method.
Should be able to hide the financing calculator section when the user switches back from "Financiamento" to "A Vista" payment method.
Should be able to dynamically recalculate the installment value when the user types a down payment amount in the "Valor da Entrada" field.
Should be able to display zero installment value when the user types a down payment equal to the total price.
Should be able to display a validation error for the terms checkbox when the user submits the form without accepting the terms.
Should be able to navigate to the terms page when the user clicks the "Termos de Uso" link inside the terms checkbox section.
Should be able to navigate to the privacy page when the user clicks the "Política de Privacidade" link inside the terms checkbox section.
Should be able to display all validation errors simultaneously when the user submits an empty form.
Should be able to clear a field validation error when the user starts correcting the invalid field.
Should be able to display a loading state on the submit button while the order is being processed.
Should be able to create order full payment.
Should be able to create order financing payment.
Should be able to display the order status as "REPROVADO" on the success page when the user submits a financing order with a CPF that returns a credit score below 500.
Should be able to display the order status as "EM_ANALISE" on the success page when the user submits a financing order with a CPF that returns a credit score between 501 and 700.
Should be able to display the order status as "APROVADO" on the success page when the user submits a financing order with a CPF that returns a credit score above 700.
Should be able to display the order status as "APROVADO" on the success page when the user submits a financing order with a down payment of at least 50% of the total price, even if the credit score is below 700.


Success Page

Should be able to redirect to the initial page when the user clicks the "Velô" logo on the success page.
Should be able to display the "Pedido Aprovado!" message with a green check icon when the order status is APROVADO.
Should be able to display the "Crédito Reprovado" message with a red X icon when the order status is REPROVADO.
Should be able to display the order number, customer full name, email and selected store on the success page.
Should be able to display the vehicle image, color, wheel type and total price in the order summary on the success page.
Should be able to display the installment breakdown (12x of value) alongside the total price when the payment method is financing.
Should be able to redirect to the lookup page when the user clicks the "Consultar Pedido" button on the success page.
Should be able to redirect to the configure page when the user clicks the "Configurar Outro" button on the success page.
Should be able to redirect to the initial page when the user accesses the "/success" route directly without order state.


Order Lookup Page

Should be able to redirect to the initial page when the user clicks the "Velô" logo in the header on the lookup page.
Should be able to redirect to the configure page when the user clicks the "Configure o Seu" button in the header.
Should be able to display the search button as disabled when the order number input field is empty.
Should be able to search for an existing order by its order number and display the order details.
Should be able to display the "Pedido não encontrado" message when the user searches for a non-existent order number.
Should be able to search for an order using lowercase letters and still find the order (case-insensitive search).
Should be able to display the order status badge as green (APROVADO) for an approved order.
Should be able to display the order status badge as red (REPROVADO) for a rejected order.
Should be able to display the vehicle image, color, wheel type, customer name, email, store and payment method for a found order.
Should be able to display the installment value when the found order uses the financing payment method.
Should be able to clear the previous search result and show a new result when the user performs a second search with a different order number.


Terms Page

Should be able to navigate to the terms page via the "/termos" route and display the "Termos de Uso" heading.
Should be able to redirect to the initial page when the user clicks the "Voltar para a página inicial" link on the terms page.


Privacy Page

Should be able to navigate to the privacy page via the "/privacidade" route and display the "Política de Privacidade" heading.
Should be able to redirect to the initial page when the user clicks the "Voltar para a página inicial" link on the privacy page.


Not Found Page

Should be able to display the 404 error page when the user navigates to a non-existent route.
Should be able to redirect to the initial page when the user clicks the "Return to Home" link on the 404 page.


E2E

Should be able to complete a full purchase with full payment and receive an approved status.
Should be able to complete a full purchase with financing and receive an approved status when the credit score is above 700.
Should be able to complete a full purchase with financing and receive a rejected status when the credit score is below 500.
Should be able to complete a full purchase with financing and receive an in-analysis status when the credit score is between 501 and 700.
Should be able to complete a full purchase with financing and receive an approved status when the down payment is at least 50% of the total price regardless of credit score.
Should be able to consult the order on the lookup page after completing a purchase and navigating from the success page.
Should be able to navigate back to the configure page by clicking "Configurar Outro" on the success page and complete a second purchase.
