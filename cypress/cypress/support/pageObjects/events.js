class Events {
  constructor() {
    this.url = "/";
  }

  getSearchBox() {
    return cy.get("#searchInput");
  }
  getToggleActiveEvents() {
    return cy.get("#toggleActive");
  }
  getToggleListView() {
    return cy.get("#toggleView");
  }

  getCalendarFrom() {
    return cy.get("#startDate");
  }
  getCalendarTo() {
    return cy.get("#endDate");
  }
  getSortButton() {
    return cy.get("#sortButton");
  }
  getRefreshButton() {
    return cy.get("#refreshButton");
  }

  getEvents() {
    return cy.get("div[id='eventCard']");
  }
  getFirstEvent() {
    return cy.get("#eventCard");
  }
}

class EventCard {
  constructor() {}

  getEventTitle() {
    return cy.get("#eventTitle");
  }
}

module.exports = { EventCard: EventCard, Events: Events };
