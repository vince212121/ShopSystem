describe('vendor update test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button vendors option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'vendors').click();
  });
  it('selects Widget Shack', () => {
    cy.contains('Widget Shack').click();
  });
  it('updates Widget Shacks email', () => {
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type('someemail@test.com');
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
  });
  it('confirms update', () => {
    cy.contains('updated!');
  });
});
