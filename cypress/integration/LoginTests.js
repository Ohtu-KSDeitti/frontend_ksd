describe('Post-tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginform').click()
  })
  it('Loggin in with good credentials give the correct view', () => {
    cy.get('#email').type('hehe@hehe.fi')
    cy.get('#password').type('bigsikret{enter}')
    cy.contains('Tervetuloa!')
  })

  it('Loggin fails with wrong email', () => {
    cy.get('#email').type('hehe@heh.fi')
    cy.get('#password').type('bigsikret{enter}')
    cy.contains('Väärä käyttäjänimi tai salasana')
  })

  it('Loggin in with good credentials give the correct view', () => {
    cy.get('#email').type('hehe@hehe.fi')
    cy.get('#password').type('bigsikret{enter}')
    cy.contains('Tervetuloa!')
    cy.get('#settings').click()
    cy.get('#username').should('have.value', 'testiteppo')
    cy.get('#firstname').should('have.value', 'Teppo')
    cy.get('#lastname').should('have.value', 'Taalasmaa')
    cy.get('#email').should('have.value', 'hehe@hehe.fi')

    cy.get('#location').should('have.value', 'AHVENANMAA')
    cy.get('#status').should('have.value', 'SINGLE')
  })
})
