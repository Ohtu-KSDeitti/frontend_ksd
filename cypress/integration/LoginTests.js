import { aliasMutation } from '../utils/graphql-test-utils'

describe('Post-tests', () => {
  beforeEach(() => {
    cy.intercept('POST', 'http://localhost:8082/graphql', (req) => {
      // Mutations
      aliasMutation(req, 'login')
    })
  })
  it('Loggin in with good credentials give the correct view', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept('POST', 'http://localhost:8082').as('post')
    cy.get('#loginform').click()
    cy.get('#username').type('test')
    cy.get('#password').type('testtest{enter}')
    cy.wait('@post')
    cy.contains('Tervetuloa!')
  })

  it('Login gives error if password is wrong', () => {
    cy.visit('http://localhost:3000/')
    cy.intercept('POST', 'http://localhost:8082').as('post')
    cy.get('#loginform').click()
    cy.get('#username').type('test')
    cy.get('#password').type('test{enter}')
    cy.wait('@post')
    cy.contains('Väärä käyttäjänimi tai salasana')
  })
})
