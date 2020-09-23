import {host} from '../../../src/setupTests'
describe("Widget Home", function () {
  it("Load home page", function () {
    cy.visit(host);
    cy.contains("Widgets").should("be.visible");
    cy.contains("Add Widget").should("be.visible");
  });

  it("Open add widget modal", function () {
    cy.visit(host);
    cy.get('#btn-add-widget').click()
    cy.contains("Create widget").should("be.visible");
  });

  it("Add widget", function () {
    cy.visit(host);
    cy.get('#btn-add-widget').click()
    cy.contains("Create widget").should("be.visible");
    cy.get('#dp-language-list').click()
    cy.contains("German").click()
    cy.get("#btn-modal-next").click()
    cy.get('input').type('Hello, This is my 1st Widget') 
    cy.get("#btn-modal-add").click()

    cy.contains("Hello, This is my 1st Widget").should("be.visible");
    cy.contains("German").should("be.visible");

  });
});
