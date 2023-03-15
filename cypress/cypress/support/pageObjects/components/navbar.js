class Navbar {
  getLogo() {
    return cy.contains('#logo')
  }
  getAddEvent() {
    return cy.contains('Add event')
  }
  getImportEvent() {
    return cy.contains('Import event')
  }
  getAddPlace() {
    return cy.contains('Add place')
  }

  loginAsAdmin() {
    cy.get('.login').click()
    cy.get('#Login').type('admin')
    cy.get('#password').type('admin')
    cy.get('.modal-save').click()

    cy.contains('Hello, admin')
  }
}
export default Navbar
