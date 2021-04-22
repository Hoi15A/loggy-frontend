describe("Test the server stepper", () => {
  it("Check that create service opens a dialog", () => {
    cy.visit("/");
    cy.contains("Create Service").click();
  });

  it("Input user form data", () => {
    const serviceName = "Test Service";
    cy.get("#serviceName")
      .type(serviceName)
      .should("contain.value", serviceName);

    const description = "Test description";
    cy.get("#serviceDescription")
      .type(description)
      .should("contain.value", description);

    cy.get("#userFormContinue").click();
  });

  it("Select a config", () => {
    cy.get("#selectConfig")
      .parent()
      .click();

    cy.get(".v-menu__content")
      .contains("Nginx")
      .click();

    cy.get("#configSelectContinue").click();
  });

  it("Select a directory", () => {
    //todo
  });
});
