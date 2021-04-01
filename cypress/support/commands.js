// *********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('ProvideUsernameandClickNext', (username) => {     //Creating custom command for entring username, clicking next and verifying DOB field
    
    cy.get("#tbxUsername").type(username)//enter user name 
    cy.get("#btnForgotPStep1").click() //click next button on slideout panel
    cy.get("#tbxDOB").should('be.visible')// to verify slideout panel present user with a date input field.
 })
// ***********************************************************************************************************************************
 Cypress.Commands.add('Selecting_Month_from_DatePicker', (MonthSelected) => {   //Creating custom command for selecting month
    month_recursion()
 function month_recursion(){
    cy.get("#ctl00_body > div.flatpickr-calendar.animate.open.arrowTop > div.flatpickr-months > div > div > span")  //current month
    .invoke('text').then(($month)=>{
     var currentmonth = $month
      if(currentmonth != MonthSelected){
        cy.get("#ctl00_body > div.flatpickr-calendar.animate.open.arrowTop > div.flatpickr-months > span.flatpickr-prev-month >svg").click() //click previous button
        return month_recursion()
      }
  }
    )
  }
 })

 // ***********************************************************************************************************************************
    Cypress.Commands.add('Selecting_Year_from_DatePicker',(YearSelected) =>{   //Creating custom command for selecting year
        year_recursion()
   var currentYear
   function year_recursion(){
    cy.get("#ctl00_body > div.flatpickr-calendar.animate.open.arrowTop > div.flatpickr-months > div > div > div > input").should('be.visible')
   .invoke('val').then(($year)=>{
   currentYear = $year
    //cy.log("currentYear:" +currentYear)
   // cy.log("required " + YearSelected)
      if(currentYear > YearSelected){
        cy.get("#ctl00_body > div.flatpickr-calendar.animate.open.arrowTop > div.flatpickr-months > div > div > div > span.arrowDown").invoke('show').trigger('mouseover').click({ force: true }) //click previous button
        return year_recursion()
      }
      else if (currentYear < YearSelected) {
        cy.get("#ctl00_body > div.flatpickr-calendar.animate.open.arrowTop > div.flatpickr-months > div > div > div > span.arrowUp").invoke('show').trigger('mouseover').click({ force: true }) //click previous button
        return year_recursion()
      }
       
      }
   )
  } 
}) 
// ***********************************************************************************************************************************
    Cypress.Commands.add('Selecting_Date_from_DatePicker',(DateSelected) =>{   //Creating custom command for selecting date
        cy.xpath("//*[@id='ctl00_body']/div[4]/div[2]/div/div[2]/div/span[@class='flatpickr-day ']")
        .each(($el, index, $list) => {
         if ($el.text() == DateSelected) {  
           cy.wrap($el).click()
         } 
       })
   
   
    })
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
