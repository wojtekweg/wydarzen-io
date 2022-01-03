import { Events } from "../support/pageObjects/events";
import { isAfter, parse } from "date-fns";

describe("The Home Page", () => {
  const events = new Events();
  it("successfully loads", () => {
    cy.visit(events.url);
  });

  it("shows events calendar view", () => {
    cy.contains("Saturday").should("not.exist"); // its flaky, because it fails if any event hs that in name

    events.getToggleListView().click();
    cy.contains("Saturday");

    events.getToggleListView().click();
    cy.contains("Grid view");
  });

  it("sorts events by date", () => {
    let dateOfFirst = "";
    let dateOfLast = "";

    events
      .getFirstEvent()
      .get("#dateAndPlace")
      .then(($h1) => {
        dateOfFirst = $h1.text().substring(0, 10);
      });

    events.getSortButton().click();

    events
      .getFirstEvent()
      .get("#dateAndPlace")
      .then(($h1) => {
        dateOfLast = $h1.text().substring(0, 10);
        assert.isTrue(
          isAfter(
            parse(dateOfLast, "yyyy-MM-dd", new Date()),
            parse(dateOfFirst, "yyyy-MM-dd", new Date())
          )
        );
      });
  });
});
