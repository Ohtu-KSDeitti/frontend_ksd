describe('Registration ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
  })
  /*
  it('User can log in after registration', () => {
    cy.get('#registerform').click()
    cy.get('#email').type('testailija')
    cy.get('#firstname').type('testailija')
    cy.get('#lastname').type('koira')
    cy.get('#password').type('bigsikret')
    cy.get('#passwordConf').type('bigsikret')
    cy.get('#accept').check()
    cy.get('#register-button').click()
    cy.contains('Kirjaudu sisään')

    cy.get('#loginform').click()
    cy.get('#username').type('testailija')
    cy.get('#password').type('123456789{enter}')
    cy.wait('@login')
    cy.contains('Tervetuloa!')
  }) */

  it('User can not register a user with empty field', () => {
    cy.get('#registerform').click()
    cy.get('#username').type(' ')
    cy.get('#firstname').type(' ')
    cy.get('#lastname').type(' ')
    cy.get('#password').type(' ')
    cy.get('#passwordConf').type(' ')
    cy.get('#email').type(' ')
    cy.get('#accept').check()
    cy.get('#register-button').click()
    cy.contains('Luo uusi käyttäjä')
  })
  /*
  it('User can not register a user with too short password', () => {
    cy.get('#registerform').click()
    cy.get('#username').type('testailija')
    cy.get('#firstname').type('testailija')
    cy.get('#lastname').type('koira')
    cy.get('#password').type('1234567')
    cy.get('#passwordConf').type('1234567')
    cy.get('#email').type('test@gmail.com')
    cy.get('#accept').check()
    cy.get('#register-button').click()
    cy.wait('@register')
    cy.contains('Rekisteröityminen ei onnistunut')
  }) */
})
