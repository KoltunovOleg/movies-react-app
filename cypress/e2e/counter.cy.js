describe('Counter Component E2E Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001');
    });
  
    it('renders the initial value passed in props', () => {
      cy.get('.counter__value').should('contain', 'Count: 0');
    });
  
    it('increments the count when the "Increment" button is clicked', () => {
      cy.get('.counter__button').contains('Increment').click();
      cy.get('.counter__value').should('contain', 'Count: 1');
    });
  
    it('decrements the count when the "Decrement" button is clicked', () => {
      cy.get('.counter__button').contains('Increment').click();
      cy.get('.counter__button').contains('Decrement').click();
      cy.get('.counter__value').should('contain', 'Count: 0');
    });
  
    it('handles multiple increments and decrements correctly', () => {
      cy.get('.counter__button').contains('Increment').click();
      cy.get('.counter__button').contains('Increment').click();
      cy.get('.counter__value').should('contain', 'Count: 2');
      cy.get('.counter__button').contains('Decrement').click();
      cy.get('.counter__value').should('contain', 'Count: 1');
    });
  });