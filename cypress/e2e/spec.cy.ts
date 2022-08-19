describe('Test demo form', () => {
  it('Start main flow', () => {
    cy.visit('/');
    cy.get('[id^=firstName]').type('Marius');
    cy.get('[id^=lastName]').type('Marius');
    cy.get('[id^=email]').type('mm@gg.com');
    cy.get('[id^=password]').type('12345678Ac');
    cy.contains('SUBMIT').click();
    cy.get('[id^=log_]').contains('Marius');
  })
})