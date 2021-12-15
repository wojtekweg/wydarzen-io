class Index {
  url = "/";

  // TODO fix the getters and add functional classnames to css tags
  getSearchBox() {
    return cy.get("#reg_username");
  }
  getSortButton() {
    return cy.get("#reg_email");
  }
  getToggleActiveEvents() {
    return cy.get("#reg_password");
  }
  getToggleListView() {
    return cy.get("#username");
  }
  getRefresh() {
    return cy.get(".woocommerce-Button");
  }
  getAddEvent() {
    return cy.get(".woocommerce-Button");
  }
  getImportEvent() {
    return cy.get(".woocommerce-Button");
  }
  getAddPlace() {
    return cy.get(".woocommerce-Button");
  }
}
export default Index;
