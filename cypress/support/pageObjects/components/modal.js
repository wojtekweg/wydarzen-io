import { Navbar } from "navbar.js";

class AddEventModal {
  getOpenModal() {
    return Navbar.getAddEvent;
  }

  getTitleInput() {
    return cy.get("#title");
  }
  getDescriptionInput() {
    return cy.get("#description");
  }
  getPicture() {
    return cy.get("#picture");
  }
  getDate() {
    return cy.get("#date");
  }

  getSaveButton() {
    return cy.contains("Save");
  }
  getCancelButton() {
    return cy.contains("Cancel");
  }
}
export default AddEventModal;
