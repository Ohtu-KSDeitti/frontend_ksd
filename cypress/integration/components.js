beforeEach(() => {
  cy.visit('http://localhost:3000/')
})

describe('Connection works ', () => {
  it('Main page renders correctly', () => {
    cy.contains('Kristittyjen sinkkujen deitti')
    cy.contains('Pääsivu')
  })
})

describe('Forms ', () => {
  it('Registration form is shown', () => {
    cy.get('#registerform').click()
    cy.contains('Luo uusi käyttäjä')
    cy.contains('Käyttäjätunnus:')
    cy.contains('Sähköposti')
  })
  it('Login form is shown', () => {
    cy.get('#loginform').click()
    cy.contains('Sähköposti')
    cy.contains('Salasana')
  })
})
