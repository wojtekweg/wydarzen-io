import { Event } from "../support/pageObjects/event";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

describe("Single Event Page", () => {
  let event;
  let eventTitle;
  let eventDate;
  let eventPlace;
  let isEventActive;

  before(() => {
    cy.visit("/");

    cy.get("#dateAndPlace").then((txt) => {
      eventDate = txt.text().substring(0, 10);
      eventPlace = txt.text().substring(14);
    });

    cy.get("#eventTitle")
      .then((txt) => {
        eventTitle = txt.text();
      })
      .parent()
      .should("have.attr", "href")
      .then((href) => {
        event = new Event(href.substring(8));
        cy.wrap(event).as("event");
      });
  });

  beforeEach(() => {
    cy.visit(event.url);
    cy.request("http://127.0.0.1:8000/api" + event.url).then((res) => {
      isEventActive = res.body.is_active;
    });
  });

  it("shows events basic info", () => {
    const eventDt = new Date(eventDate);
    cy.contains(eventTitle);
    cy.contains(eventPlace);

    cy.contains(months[eventDt.getMonth()]);
    cy.contains(eventDt.getDate());
  });

  it("navigates to place page", () => {
    cy.contains(eventPlace).click();
    cy.contains(eventTitle).should("not.exist");
    cy.contains(eventPlace);
  });

  it("shows if event is active", () => {
    if (isEventActive) {
      cy.contains("Cancel");
    } else {
      cy.contains("EVENT IS INACTIVE");
      cy.contains("Reactivate");
    }
  });

  it("changes active status of event", () => {
    if (isEventActive) {
      cy.contains("Cancel").click();
      cy.contains("Reactivate").click();
    } else {
      cy.contains("Reactivate").click();
      cy.contains("Cancel").click;
    }
  });
});
