const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function viewApplicationsTest() {

  let driver = await new Builder().forBrowser('chrome').build();

  try {
    console.log('Navigating to the View Applications page.');
    await driver.get('http://localhost:4200/viewapps'); // URL for the View Applications page

    // Wait for the table to be present and visible
    let table = await driver.findElement(By.css('table'));
    await driver.wait(until.elementIsVisible(table), 15000); // Wait up to 15 seconds for the table to be visible
    console.log('Table is visible.');



    // Verify the table header
    let headers = await driver.findElements(By.css('table thead th'));
    console.log('Verifying table headers...');
    await driver.wait(async () => {
      let headerTexts = await Promise.all(headers.map(header => header.getText()));
      return headerTexts.join() === 'Application ID,Applicant Name,Submitted Date,Status';
    }, 15000); // Wait up to 15 seconds for header texts to be correct
    console.log('Table headers are correct.');



    // Sleep to observe the table
    await driver.sleep(5000);
    console.log('Sleeping for 5 seconds.');



    // Verify the table rows are populated
    let rows = await driver.findElements(By.css('table tbody tr'));
    console.log(`Number of table rows found: ${rows.length}`);

    if (rows.length > 0) {
      console.log('Table rows are present.');

      // Check the content of the first row (example)

      for (let row of rows) {
        let rowCells = await row.findElements(By.css('td'));
        let rowDatas = await Promise.all(rowCells.map(cell => cell.getText()));
        if (rowDatas.length === 4) {
          console.log('row has the correct number of columns.');
        } else {
          console.error('row does not have the correct number of columns.');
        }
        for (let rowData of rowDatas) {
          if (rowData == '') {
            throw new Error("null values is found in a row")
          }
        }


        let rowLink = await row.findElement(By.css('a')).getAttribute('href');
        console.log('row link:', rowLink);
        

        //URL check
        let id = rowDatas[0]
        if (rowLink.includes(`/viewapplication/${id}`)) {
          console.log('row link is correct.');
        } else {
          console.error('row link is incorrect.');
        }
      }
    } else {
      console.error('No table rows found.');
    }

    // Verify "Back" button navigates to the correct route
    let backButton = await driver.findElement(By.xpath('//button[text()="Back"]'));
    console.log('Verifying Back button...');
    await driver.wait(until.elementIsVisible(backButton), 15000); // Wait up to 15 seconds for the back button to be visible
    console.log('Back button is visible.');
    await backButton.click();

    // Wait for navigation to occur (adjust the URL or path accordingly)
    await driver.wait(until.urlIs('http://localhost:4200/'), 15000); // Wait up to 15 seconds for navigation
    console.log('Navigation after clicking Back button is correct.');

    await driver.navigate().back();
    console.log('Returned to the viewapps page.');

  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Adding a delay to observe results before quitting
    console.log('Waiting before quitting the driver...');
    await driver.sleep(3000);

    // Quit the driver
    await driver.quit();
    console.log('WebDriver quit.');
  }


})();
