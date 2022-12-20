describe('product add test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button products option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'products').click();
  });
  it('clicks add icon', () => {
    cy.contains('control_point').click();
  });
  it('fills in fields', () => {
    cy.get('input[formcontrolname=id]').type('TEST1001');
    cy.get('mat-select[formcontrolname="vendorid"]').click(); // open the list
    cy.get('mat-option').should('have.length.gt', 0); // wait for options
    cy.contains('Vincents Shop').click();
    cy.get('input[formcontrolname=name]').type('test');
    cy.get('input[formcontrolname=msrp]').type('149.99');
    cy.get('input[formcontrolname=costprice]').type('129.99');
    cy.get('.mat-expansion-indicator').eq(0).click();
    cy.get('.mat-expansion-indicator').eq(1).click();
    cy.get('input[formcontrolname=rop]').type('50');
    cy.get('input[formcontrolname=eoq]').type('50');
    cy.get('input[formcontrolname=qoh]').type('50');
    cy.get('input[formcontrolname=qoo]').type('50');
    cy.get('.mat-expansion-indicator').eq(1).click();
    cy.get('.mat-expansion-indicator').eq(2).click();
    cy.get('input[formcontrolname=qrcodetxt]').type('test.com');
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
  });
  it('confirms add', () => {
    cy.contains('added!');
  });
});
