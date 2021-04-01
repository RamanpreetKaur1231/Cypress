/// <reference types="cypress" /> 

describe('Verifying messages with valid and Invalid Dates ', function()  {

  beforeEach(function()  {
      
    cy.visit("https://salesdemo.medikeeper.com/accounts/v8/salesdemo/login")//visit AcmeCorp website
    cy. get("#ctl00_MainContent_loginForm_pnlForgotPassword > a").click() //click forget password
    cy.get("#ctl00_body > div.offcanvas-panel.close--enabled.offcanvas-panel--loaded").should('be.visible')//slideout panel should pop up/visible
  })
  
  var validDate = new Date("09/15/2003") //more than 16 year old
  var invalidDate = new Date("03/01/2018")//less than 16 year old
  var  months = ["January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December "];
  var DateRequired=invalidDate
  var DateSelected= DateRequired.getDate()
  var MonthSelected=months[DateRequired.getMonth()]; 
  var YearSelected= DateRequired.getFullYear()
 

  it('click submit after entering invalid DOB', function()  {
    cy.ProvideUsernameandClickNext("abc@gmail.com") //calling custom command for clicking forgot password and clicking next
    cy.get("#tbxDOB").click() //click on date picker to open it
    cy.Selecting_Month_from_DatePicker(MonthSelected)//calling custom command for selecting a month
    cy.Selecting_Year_from_DatePicker(YearSelected) //calling custom command for selecting a Year 
    cy.Selecting_Date_from_DatePicker(DateSelected) //calling custom command for selecting a date
    
    //after selecting date, pick that same date from date picker and comapre it with current date to know the difference
    cy.get('#tbxDOB').invoke('val').then(($selecteddate)=>{
    var dobSelected = $selecteddate
    var Dob = new Date(dobSelected) 
    var currentdate = new Date() //current date
    var diff_in_years= (currentdate-Dob)/ (365* 60 * 60 * 24 * 1000) //converting difference in years
    cy.log((diff_in_years))
    cy.get("#btnForgotPDob").click()//click submit button 
      if(diff_in_years<16){
        cy.get("#ctl00_MainContent_errorMessageAlert > div > span.alert__icon > i").should('be.visible').and('contain.text', "You must enter a valid DOB.")//error image and message should be visible
      }  
      else if(diff_in_years>=16){
       cy.get('#reqMessaging').should('be.visible').and('contain.text',"Success")// sucess message should be visible
      }
    })
       
  })
   //*************************************************************************************************************************************** 
  

  it('click submit after entering valid DOB', function()  {
    DateRequired=validDate
    DateSelected= DateRequired.getDate()
    MonthSelected=months[DateRequired.getMonth()]; 
    YearSelected= DateRequired.getFullYear()
    cy.ProvideUsernameandClickNext("abc@gmail.com") //calling custom command for clicking forgot password and clicking next
    cy.get("#tbxDOB").click() //click on date picker to open it
    cy.Selecting_Month_from_DatePicker(MonthSelected)//calling custom command for selecting a month
    cy.Selecting_Year_from_DatePicker(YearSelected) //calling custom command for selecting a Year 
    cy.Selecting_Date_from_DatePicker(DateSelected) //calling custom command for selecting a date
    
    //after selecting date, pick that same date from date picker and comapre it with current date to know the difference
    cy.get('#tbxDOB').invoke('val').then(($selecteddate)=>{
    var dobSelected = $selecteddate
    var Dob = new Date(dobSelected) 
    var currentdate = new Date() //current date
    var diff_in_years= (currentdate-Dob)/ (365* 60 * 60 * 24 * 1000) //converting difference in years
    cy.log((diff_in_years))
    cy.get("#btnForgotPDob").click()//click submit button 
      if(diff_in_years<16){
        cy.get("#ctl00_MainContent_errorMessageAlert > div > span.alert__icon > i").should('be.visible').and('contain.text', "You must enter a valid DOB.")//error image and message should be visible
      }  
      else if(diff_in_years>=16){
       cy.get('#reqMessaging').should('be.visible').and('contain.text',"Success")// success message should be visible
      }
    })
       
  })

})
