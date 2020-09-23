import {host} from '../../../src/setupTests'
describe("Widget Home", function () {
  it("Load home page", function () {
    cy.visit(host);
    cy.contains("Widgets").should("be.visible");
    cy.contains("Add Widget").should("be.visible");
  });
});
