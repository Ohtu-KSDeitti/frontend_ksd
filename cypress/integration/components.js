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
  it('Registration form is shown', () => {
    cy.get('#registerform').click()
    cy.contains('Luo uusi käyttäjä')
    cy.contains('Ikä')
    cy.contains('Sukupuoli')
  })
  it('Login form is shown', () => {
    cy.get('#loginform').click()
    cy.contains('Käyttäjätunnus')
    cy.contains('Salasana')
  })
})

describe('Logging in ', () => {
  it('Logged user is identified', () => {
    cy.get('#loginform').click()
    cy.get('#username').type('laila76')
    cy.get('#password').type('kala1234')
    cy.get('#login-button').click()
    cy.contains('Tervetuloa, laila76!')
  })
})

describe('Registration ', () => {
  it('User can log in after registration', () => {
    cy.get('#registerform').click()
    cy.get('#username').type('testailija')
    cy.get('#name').type('T. Testailija')
    cy.get('#password').type('koira123')
    cy.get('#passwordConf').type('koira123')
    cy.get('#email').type('test@gmail.com')
    cy.get('#age').type('18')
    cy.get('#accept').check()
    cy.get('#register-button').click()

    cy.get('#username').type('testailija')
    cy.get('#password').type('koira123')
    cy.get('#login-button').click()
    cy.contains('Tervetuloa, testailija!')
  })
})
