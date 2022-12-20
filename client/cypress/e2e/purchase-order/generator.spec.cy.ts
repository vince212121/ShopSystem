describe('expense generator test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button generator option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'generator').click();
  });
  it('selects a Vendor', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="vendorid"]').click();
    cy.contains('Shady Sams').click();
  });
  it('selects a Product', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="productid"]').click();
    cy.contains('YAMAHA FG800M').click();
  });
  it('selects a Qty of EOQ', () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="qty"]').click();
    cy.contains('EOQ').click();
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Add PO').click();
  });
  it('confirms report added', () => {
    cy.contains('added!');
  });
});
