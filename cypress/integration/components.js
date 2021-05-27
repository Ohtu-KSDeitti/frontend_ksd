beforeEach(() => {
  cy.visit('http://localhost:3000')
})

describe('Connection works ', () => {
  it('Main page renders correctly', () => {
    cy.contains('Kristittyjen sinkkujen deitti')
    cy.contains('Pääsivu')
  })
})

describe('Forms ', () => {
  it('Forms contains', () => {
    cy.get('#registerform').click()
    cy.contains('Luo uusi käyttäjä')
    cy.contains('Ikä')
    cy.contains('Sukupuoli')
    it('Login renders correctly', () => {
      cy.get('#loginform').click()
      cy.contains('Käyttäjätunnus')
      cy.contains('Salasana')
    })
  })
})
