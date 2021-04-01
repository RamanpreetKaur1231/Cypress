/// <reference types="cypress" /> 

describe('Verify forget password functionality', function()  {
  
    beforeEach(function()  {

      cy.visit("https://salesdemo.medikeeper.com/accounts/v8/salesdemo/login")//visit AcmeCorp website
      cy. get("#ctl00_MainContent_loginForm_pnlForgotPassword > a").click() //click forget password
      cy.get("#ctl00_body > div.offcanvas-panel.close--enabled.offcanvas-panel--loaded").should('be.visible')//slideout panel should pop up/visible
    })

    it('click next without entering user name', function()  {
        cy.get("#btnForgotPStep1").click() //click next button on slideout panel
        cy.get("#ctl00_MainContent_errorMessageAlert > div > span.alert__icon > i").should('be.visible').should('contain.text', "You must enter a user name.")//error message/img should be visible
    })
    
    it('click next after entering user name', function()  {
        cy.ProvideUsernameandClickNext("abc@gmail.com") //custom command for entering username, clicking next and verifying DOb field is present
        cy.get("#btnForgotPDob").should('be.visible')// to verify slideout panel present user with a submit button.
       
      })

    it('click submit without entering DOB', function()  {
        cy.ProvideUsernameandClickNext("abc@gmail.com") //custom command for entering username and clicking next
        cy.get("#btnForgotPDob").click()//click submit button without entering DOB
        cy.get("#ctl00_MainContent_errorMessageAlert > div > span.alert__icon > i").should('be.visible').and('contain.text', "You must enter a valid DOB.")//error image and message should be visible
    })
    
})