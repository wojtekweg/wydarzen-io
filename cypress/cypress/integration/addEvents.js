import Navbar from "../support/pageObjects/components/navbar";
import { Events } from "../support/pageObjects/events";
import "cypress-file-upload";

describe("Add event", () => {
  const events = new Events();
  const navbar = new Navbar();
  const now = new Date();
  const day = 864e5;
  const filepath = "cypress-pic.jpeg";

  it("adds event from modal", () => {
    cy.visit(events.url);

    navbar.getAddEvent().click();

    cy.get("#title").type("From cypress");
    cy.get("#description").type("From cypress is description written :)");
    cy.get("#date").type(
      new Date(+now + day * 7).toISOString().substring(0, 10)
    );
    cy.get("#picture").attachFile(filepath);
    cy.get("#save").click();
  });

  it("adds event from json", () => {
    cy.writeFile("cypress/fixtures/exampleEvent.json", {
      title: "Imported by Cypress",
      date: new Date(+now + day * 8).toISOString().substring(0, 10),
      description: "Cypresso importedo evento!",
      is_active: true,
      picture:
        "http://127.0.0.1:8000/media/event/posters/Screenshot_2021-10-24_at_22.50.11.png",
      place: 1,
    });
    cy.visit(events.url);

    navbar.getImportEvent().click();

    cy.get("#file").attachFile("exampleEvent.json");
    cy.get("#save").click();
  });
});
