describe('My First Test', () => {
  it('Visits the Kitchen Sink', () => {
    cy.visit('/');
    cy.get('[id^=firstName]').type('Marius');
    cy.get('[id^=lastName]').type('Marius');
    cy.get('[id^=email]').type('mm@gg.com');
    cy.get('[id^=password]').type('12345678Ac');
    cy.contains('SUBMIT').click();
    cy.get('[id^=log_]').contains('Marius');
    
  })
})