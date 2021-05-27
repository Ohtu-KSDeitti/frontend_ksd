describe('Rendering works ', () => {
  it('Main page renders correctly', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Kristittyjen sinkkujen deitti')
    cy.contains('Pääsivu')
  })
})
