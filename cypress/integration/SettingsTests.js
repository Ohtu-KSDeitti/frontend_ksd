describe('Settings ', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.get('#loginform').click()
    cy.get('#email').type('hehe@hehe.fi')
    cy.get('#password').type('bigsikret{enter}')
    cy.get('#settings').click()
  })
  it('User can modify account settings successfully', () => {
    cy.get('#username').clear()
    cy.get('#username').type('testailija')
    cy.get('#firstname').clear()
    cy.get('#firstname').type('testailija')
    cy.get('#lastname').clear()
    cy.get('#lastname').type('koira')
    cy.get('#email').clear()
    cy.get('#email').type('test@gmail.com')
    cy.get('#update-button').click()
    cy.contains('Tervetuloa')
  })

  it('User cannot create date profile with invalid birth day, case 1', () => {
    cy.get('#gender').select('FEMALE')
    cy.contains('Nainen')
    cy.get('#gender').select('MALE')
    cy.contains('Mies')
    cy.get('#dateOfBirth').type('1899-12-31')
    cy.get('#location').select('UUSIMAA')
    cy.get('#regions').type('SATAKUNTA{enter}{enter}')
    cy.get('#status').select('DIVORCED')
    cy.contains('Eronnut')
    cy.get('#status').select('SINGLE')
    cy.contains('Sinkku')
    cy.get('#bio').type('Jee jee jee')
    cy.get('#christianAndSingle').check()
    cy.get('#dateprofile-button').click()
    cy.contains('Muokkaa perusasetuksia')
  })

  it('User cannot create date profile with invalid birth day, case 2', () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 18)
    date.setDate(date.getDate() + 1)
    let month = (date.getMonth() + 1).toString()
    let day = date.getDate().toString()
    if (month.length < 2) {
      month = `0${month}`
    }
    if (day.length < 2) {
      day = `0${day}`
    }
    const input = `${date.getFullYear().toString()}-${month}-${day}`

    cy.get('#gender').select('FEMALE')
    cy.contains('Nainen')
    cy.get('#gender').select('MALE')
    cy.contains('Mies')
    cy.get('#dateOfBirth').type(input)
    cy.get('#location').select('UUSIMAA')
    cy.get('#regions').type('SATAKUNTA{enter}{enter}')
    cy.get('#status').select('DIVORCED')
    cy.contains('Eronnut')
    cy.get('#status').select('SINGLE')
    cy.contains('Sinkku')
    cy.get('#bio').type('Jee jee jee')
    cy.get('#christianAndSingle').check()
    cy.get('#dateprofile-button').click()
    cy.contains('Muokkaa perusasetuksia')
  })
  it('User can see other users date profile', () => {
    cy.visit('http://localhost:3000/b8342c78-7313-4c5e-a45f-3f931c1366b0')
    cy.contains('deittiprofiili')
    cy.contains('Sukupuoli')
    cy.contains('Sijainti')
    cy.contains('Siviilisääty')
    cy.contains('Kuvaus')
  })

  it('User can see own settings but not others', () => {
    cy.visit('http://localhost:3000/7561c5a6-7566-4097-8453-c9254414e397')
    cy.contains('Etunimi')
    cy.contains('Sukunimi')

    cy.visit('http://localhost:3000/b8342c78-7313-4c5e-a45f-3f931c1366b0')
    cy.contains('Sukupuoli')
    cy.contains('Sijainti')
    cy.contains('Etunimi').should('not.exist')
    cy.contains('Sukunimi').should('not.exist')
    cy.contains('Nimimerkki').should('not.exist')
    cy.contains('Sähköposti').should('not.exist')
  })
})
