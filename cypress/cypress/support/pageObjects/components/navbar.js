class Navbar {
  getLogo() {
    return cy.contains("#logo");
  }
  getAddEvent() {
    return cy.contains("Add event");
  }
  getImportEvent() {
    return cy.contains("Import event");
  }
  getAddPlace() {
    return cy.contains("Add place");
  }
}
export default Navbar;
