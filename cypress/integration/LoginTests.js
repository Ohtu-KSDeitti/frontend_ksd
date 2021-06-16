describe('Post-tests', () => {
  it('Loggin in with good credentials give the correct view', async () => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginform').click()
    cy.get('#email').type('hehe@hehe.fi')
    cy.get('#password').type('bigsikret{enter}')
    cy.contains('Tervetuloa!')
  })
})
