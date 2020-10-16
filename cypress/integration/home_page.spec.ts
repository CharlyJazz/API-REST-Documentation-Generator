describe("The Home Page", () => {
  it("shows the initial content", () => {
    cy.visit("/")

    cy.get(".Text__Title-Endpoint > span")
      .should("contain", "Welcome!")

    cy.get('.Text__Description-Endpoint')
      .should("contain", "You can navigate and search endpoints.")
  })
})
