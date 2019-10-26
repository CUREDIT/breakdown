import { getGreeting } from '../support/app.po';

describe('curemedya', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to curemedya!');
  });
});
