describe('Check Command Delay', ()=> {
  it('should apply a 1-second delay to commands', ()=> {
    cy.visit('http://localhost:4200/');
    
    // Add additional commands to check the delay effect
    cy.get('#submitloan').click().wait(1000);
    
    cy.get('#firstName').type('Nirupma').wait(1000);
    cy.get('#lastName').type('Agrahri').wait(1000);
    
    cy.get('#dateOfBirth').type('1990-01-01').wait(1000);
    
    cy.get('#maritalStatus').select('Single').wait(1000);
    cy.get('#ssnNumber').type('1024').wait(1000);

    cy.get('#loanAmount').type('1000').wait(1000);
    cy.get('#loanPurpose').select('Debt').wait(1000);
    cy.get('#addressLine1').type('123 Main St').wait(1000);
    cy.get('#addressLine2').type('Apt 4B').wait(1000);
    cy.get('#city').type('Anytown').wait(1000);
    cy.get('#state').type('NY').wait(1000);
    cy.get('#postalCode').type('12345').wait(1000);
    cy.get('#phoneHome').type('7845678980').wait(1000);
    cy.get('#phoneOffice').type('7845678980').wait(1000);
    cy.get('#phoneMobile').type('7845678980').wait(1000);
    cy.get('#emailAddress').type('qfGKl@example.com').wait(1000);

    cy.get('#employerName').type('Shubh').wait(1000);
    cy.get('#annualSalary').type('10001').wait(1000);

    cy.get('#workExperienceYears').type('0').wait(1000);
    cy.get('#workExperienceMonths').type('4').wait(1000);

    cy.get('#employerAddressLine1').type('D 227').wait(1000);
    cy.get('#employerCity').type('Bangalore').wait(1000);
    cy.get('#employerState').type('Karnataka').wait(1000);
    cy.get('#employerPostalCode').type('56005').wait(1000);

    cy.get('#submit').click()
  });
});
