class Place {
  constructor(placeId) {
    this.url = "/places/" + placeId;
  }

  getTitle() {
    return cy.get("h1");
  }
}
export default Place;
