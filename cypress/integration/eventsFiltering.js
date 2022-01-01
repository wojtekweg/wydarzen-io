import { Events } from "../support/pageObjects/events";

describe("Filtering of events", () => {
  const events = new Events();

  before(() => {
    cy.visit(events.url);
  });

  it("toggles all events to active, inactive and back to all shows same sum of events", () => {
    let activeEvents = 0;
    let cancelledEvents = 0;

    events.getToggleActiveEvents().click();
    events.getEvents().then((elm) => {
      activeEvents = elm.length;
    });
    cy.contains("Active events");

    events.getToggleActiveEvents().click();
    events.getEvents().then((elm) => {
      cancelledEvents = elm.length;
    });
    cy.contains("Inactive events");

    events.getToggleActiveEvents().click();
    events
      .getEvents()
      .then((elm) => assert.equal(elm.length, activeEvents + cancelledEvents));
  });

  it("finds the event by name", () => {
    let titleOfFirst = "";
    events
      .getFirstEvent()
      .get("#eventTitle")
      .then(($card) => {
        titleOfFirst = $card.text();
        events.getSearchBox().type(titleOfFirst);
      });

    events.getEvents().then((elm) => {
      assert.equal(elm.length, 1);
    });

    events.getSearchBox().type("cokkolwiek wiecej");
    cy.contains("No events found :(");
  });
});
