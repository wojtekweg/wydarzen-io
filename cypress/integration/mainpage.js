import { Events } from "../support/pageObjects/events";

describe("The Home Page", () => {
  const index = new Events();
  it("successfully loads", () => {
    cy.visit(index.url);
  });
});
