describe('Calculator', () => {
    beforeEach(() => {
      cy.visit('index.html');
    });
  
    it('displays the correct title', () => {
      cy.title().should('include', 'Calculator');
    });
  
    it('performs addition correctly', () => {
      cy.get('[data-cy="1"]').click();
      cy.get('[data-cy="add"]').click();
      cy.get('[data-cy="2"]').click();
      cy.get('[data-cy="equal"]').click();
      cy.get('[data-cy="display"]').should('have.value', '3');
    });
  
    it('performs subtraction correctly', () => {
      cy.get('[data-cy="9"]').click();
      cy.get('[data-cy="subtract"]').click();
      cy.get('[data-cy="4"]').click();
      cy.get('[data-cy="equal"]').click();
      cy.get('[data-cy="display"]').should('have.value', '5');
    });
  
    it('performs multiplication correctly', () => {
      cy.get('[data-cy="3"]').click();
      cy.get('[data-cy="multiply"]').click();
      cy.get('[data-cy="5"]').click();
      cy.get('[data-cy="equal"]').click();
      cy.get('[data-cy="display"]').should('have.value', '15');
    });
  
    it('performs division correctly', () => {
      cy.get('[data-cy="8"]').click();
      cy.get('[data-cy="divide"]').click();
      cy.get('[data-cy="2"]').click();
      cy.get('[data-cy="equal"]').click();
      cy.get('[data-cy="display"]').should('have.value', '4');
    });
  
    it('clears the display when AC is clicked', () => {
      cy.get('[data-cy="8"]').click();
      cy.get('[data-cy="clear"]').click();
      cy.get('[data-cy="display"]').should('have.value', '0');
    });
  });
  