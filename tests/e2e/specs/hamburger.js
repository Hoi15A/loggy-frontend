// https://docs.cypress.io/api/introduction/api.html

describe("Test if drawer (hamburger menu) is working", () => {
  it("Test open / close drawer", () => {
    cy.visit("/");
    cy.get(".v-navigation-drawer__content").should("be.visible");
    cy.get(".v-app-bar__nav-icon").click();
    cy.get(".v-navigation-drawer__content").should("not.be.visible");
    cy.get(".v-app-bar__nav-icon").click();
    cy.get(".v-navigation-drawer__content").should("be.visible");
  });
});
