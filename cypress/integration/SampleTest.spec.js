/// <reference types="cypress" />
//@ts-nocheck

const navbarText = Cypress.env('navbarText');

context('First Sample Test', () => {
  
  beforeEach(() => {

    cy.visit('/')

    cy.fixture('example').then(function (data) {
      this.data = data
      cy.log('THIS: ', this.data)
    })
  })

  // CHAPTER - 1 CHECKING HEADINGS ON THE PAGE OF THE KS APP

  it('has an h1 on the page', () => {
    cy.visit('/commands/actions')
    cy.get('h1').should('exist')

  })

  it('renders the correct h1 text', () => {
    cy.visit('/commands/actions')
    cy.get('h1').should('contain.text', 'Actions')

  })

  it('renders a section with the correct elements', () => {
    cy.visit('/commands/actions')
    cy.get('.container').eq(2).within(() => {

      cy.get('h4').should('exist')
      cy.get('p').should('exist')

    })


  })

  // CHAPTER -2

  it('correctly renders the cypress website link' ,()=>
  {

    cy.visit('/commands/actions')
    cy.contains(navbarText).should('exist')

  })

  // CHAPTER -3

  //ASYNC NATURE OF CYPRESS-- WHEN USING A NON CYPRESS COMMAND
  it('types into an email field',()=>
  {

    cy.visit('/commands/actions')
    cy.get('[placeholder="Email"]').type('test@email.com')
    cy.wait(5000)
    console.log("Test is finished")

  })

  //SYNC NATURE OF CYPRESS-- WHEN CYPRESS COMMANDS ARE USED
  it('types into an email field',()=>
  {

    cy.visit('/commands/actions')
    cy.get('[placeholder="Email"]').type('test@email.com')
    cy.wait(5000)
    cy.log("Cypress log is used")

  })


  //TURINING AYSNC TO SYNC (JAVASCRIPT COMMANDS TO CYPRESS COMMANDS)
  it('types into an email field', ()=>
  {

    cy.visit('/commands/actions')
    cy.get('[placeholder="Email"]').type('test@email.com')
    cy.wait(5000).then(() =>
    {
    //eslint-disable-next-line no-console
      console.log('test is finished')
    })
 
  })


  // CHAPTER -4 ASSERIONS
  it('shows an active class for the current page',()=>
  {
    cy.visit('/commands/actions')
    cy.get('.dropdown-menu').find('li').eq(2).should('have.class','active')

  })

  it('should not have an active class on inactive pages',()=>
  {
    cy.visit('/commands/actions')
    cy.get('.dropdown-menu').find('li').eq(3).
    should('not.have.class','active')

  })

  // CHAPTER-5 UI ACIONS WITH CYPRESS COMMANDS

  it('links to the action page correctly',()=>
  {   
    cy.contains('Actions').first().click({force:true})
    cy.url().should('include','commands/actions')
  })

  it('lets you clear an input field',()=>
  {
    cy.visit('/commands/actions')
    cy.get('#description').type('Test Description').should('have.value','Test Description')
    .clear().should('have.value','')
 

  })
  it('lets you check the checkboxes ',()=>
  {
    cy.visit('/commands/actions')
    cy.get('.action-checkboxes [type="checkbox"]').eq(1).check({force:true}).should('be.checked')
 

  })

  // CHAPTER-6 FIXTURES

  it('pulls data from a fixture', () => {
    cy.fixture('example').then((data) => {
      cy.log('DATA:', data)
    })

  })

  // Updating the fixture data inline

  it('Update the fixture data inline', () => {
    cy.fixture('example').then((data) => {
      data.email = 'updatedmail@email.com',
      cy.log('UPDATED:', data)
    })
  })

 
  it('uses fixture data in a netework request', function () {

    cy.visit('/commands/network-requests')
    cy.intercept('GET', '**/comments/*', this.data).as('getComment')
    cy.get('.network-btn').click()
    cy.wait('@getComment').then((res) => {
      cy.log('Response:', res)

    })
  })
  
})
    

