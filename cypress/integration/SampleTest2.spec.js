/// <reference types="cypress" />
//@ts-nocheck

const navbarText = Cypress.env('navbarText');
const token= 'abcd123'

context('Second Sample Test', () => {
  
  beforeEach(() => {

    cy.visit('/')
  })

  // CHAPTER-7 CYPRESS CUSTOM COMMANDS

  it('sets and gets a token in Local Storage',()=>
  {
    cy.setLocalStorage('token',token)
    cy.getLocalStorage('token').should('eq',token)
  })


  it('overwrite the type command by using sensitive characters',()=>
  { 
    cy.visit('/commands/actions')
    cy.get('#email1').type('@test@email.com')
    cy.get('#email1').clear()
    cy.get('#email1').type('@test@email.com',{ sensitive:true })

  })

  // CHAPTER-7 CYPRESS MOUSE COMMANDS

  it('triggers a popover on click',()=>
  {
    cy.visit('/commands/actions')
    cy.get('.action-btn').click()
    cy.contains('This popover shows up on click').should('be.visible')

  })


  it('can click on different sections of the canvas available',()=>
  {
    cy.visit('/commands/actions')
    cy.get('#action-canvas').click('top')
    cy.get('#action-canvas').click('bottomRight')
    cy.get('#action-canvas').click(80,100)

  })

  it('can double click to edit',()=>
  {
    cy.visit('/commands/actions')
    cy.get('.action-div').dblclick().should('not.be.visible')
    cy.get('.action-input-hidden').should('be.visible')

  })

  it('can right click to edit',()=>
  {
    cy.visit('/commands/actions')
    cy.get('.rightclick-action-div').rightclick().should('not.be.visible')
    cy.get('.rightclick-action-input-hidden').should('be.visible')

  })
})