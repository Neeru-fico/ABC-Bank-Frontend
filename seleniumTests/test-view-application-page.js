const { Builder, By, until } = require('selenium-webdriver');

async function viewApplicationTest(id) {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 1: Navigate to the view application page
    await driver.get(`http://localhost:4200/viewapplication/${id}`); // URL
    console.log('Navigated to the view application page.');

    // Fields to be checked with mock data values
    const fields = [
      { label: 'Application ID:', value: '210' },
      { label: 'Application Status:', value: 'Approved' },
      { label: 'Score:', value: '732' },
      { label: 'Decline Reason:', value: 'None' },
      { label: 'First Name:', value: 'Johnn' },
      { label: 'Middle Name:', value: 'A' },
      { label: 'Last Name:', value: 'Doee' },
      { label: 'Date of Birth:', value: '1990-01-01' },
      { label: 'Marital Status:', value: 'Single' },
      { label: 'SSN Number:', value: '6789' },
      { label: 'Loan Amount:', value: '10000' },
      { label: 'Loan Purpose:', value: 'Personal Loan' },
      { label: 'Description:', value: 'This is a test description.' },
      { label: 'Address Line 1:', value: '123 Main St' },
      { label: 'Address Line 2:', value: 'Apt 4B' },
      { label: 'City:', value: 'Metropolis' },
      { label: 'State:', value: 'NY' },
      { label: 'Postal Code:', value: '56017' },
      { label: 'Home Phone:', value: '1234567890' },
      { label: 'Office Phone:', value: '1234567890' },
      { label: 'Mobile:', value: '1234567890' },
      { label: 'Email Address:', value: 'johnnn.doe@example.com' },
      { label: 'Employer Name:', value: 'Tech Corp' },
      { label: 'Annual Salary:', value: '80000' },
      { label: 'Work Experience:', value: '5 years 6 months' },
      { label: 'Designation:', value: 'Software Engineer' },
      { label: 'Employer Address Line 1:', value: '456 Elm St' },
      { label: 'Employer Address Line 2:', value: 'Suite 300' },
      { label: 'Employer City:', value: 'Metropolis' },
      { label: 'Employer State:', value: 'NY' },
      { label: 'Employer Postal Code:', value: '56017' }
    ];

    for (let field of fields) {
      // Wait for the element to be present
      await driver.wait(until.elementLocated(By.xpath(`//span[contains(text(), "${field.value}")]`)), 10000);

      // Find the element
      let element = await driver.findElement(By.xpath(`//span[contains(text(), "${field.value}")]`));

      // Get and print the text
      let fieldValue = await element.getText();
      console.log(`${field.label}`, fieldValue);
      await driver.sleep(700)
    }

    console.log('All data checks passed.');

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await driver.quit();
  }
};

viewApplicationTest(210)


