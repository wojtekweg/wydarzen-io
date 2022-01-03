class Event {
  constructor(eventId) {
    this.url = "/events/" + eventId;
  }

  getTitle() {
    return cy.get("h1");
  }
  getCalendarIcon() {
    return cy.get("#calendarBox");
  }
  getPlaceDiv() {
    return cy.get("#place");
  }
  getEditButton() {
    return cy.contains("Edit");
  }
  getCancelButton() {
    return cy.contains("#activeButton");
  }
  getDeleteButton() {
    return cy.contains("Delete");
  }
}
module.exports = { Event: Event };
