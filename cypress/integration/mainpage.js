import Index from "../support/pageObjects/index";

describe("The Home Page", () => {
  const index = new Index();
  it("successfully loads", () => {
    cy.visit(index.url);
  });
});
