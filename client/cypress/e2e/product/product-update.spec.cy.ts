describe('product delete test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button products option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'products').click();
  });
  it('selects test product', () => {
    cy.contains('test').click();
  });
  it('updates tests cost field', () => {
    cy.get("[type='costprice']").clear();
    cy.get("[type='costprice']").type('132.99');
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
  });
  it('confirms update', () => {
    cy.contains('updated!');
  });
});
