const { Builder, By, until } = require('selenium-webdriver');

(async function checkHomepage() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Navigate to the home page
        await driver.get('http://localhost:4200');
        console.log('Navigated to the homepage.');

        // Wait for and verify the title
        let heading = await driver.wait(until.elementLocated(By.xpath('//h1[text()="PHANS BANK"]')), 10000);

        await driver.wait(until.elementIsVisible(heading), 10000);
        let headingText = await heading.getText();
        if (headingText !== 'PHANS BANK') {
            throw new Error(`Heading text mismatch: expected 'ABC BANK', got '${headingText}'`);
        }
        console.log(`Heading text verified: ${headingText}`);
        await driver.sleep(500)

        let subheading = await driver.wait(until.elementLocated(By.xpath('//h3[text()="Loan Processing Application"]')), 10000);
        await driver.wait(until.elementIsVisible(subheading), 10000);
        let subheadingText = await subheading.getText();
        if (subheadingText !== 'Loan Processing Application') {
            throw new Error(`Subheading text mismatch: expected 'Loan Processing Application', got '${subheadingText}'`);
        }
        console.log(`Subheading text verified: ${subheadingText}`);
        await driver.sleep(500)

        


        // Wait for and verify the welcome message and instructions
        let welcomeHeading = await driver.wait(until.elementLocated(By.id('welcomeHeading')), 10000);
        await driver.wait(until.elementIsVisible(welcomeHeading), 10000);
        let welcomeHeadingText = await welcomeHeading.getText();
        if (welcomeHeadingText !== 'Welcome to ABC Bank Loan processing system.') {
            throw new Error(`Welcome message text mismatch: expected 'Welcome to ABC Bank Loan processing system.', got '${welcomeHeadingText}'`);
        }
        console.log(`Welcome heading text verified: ${welcomeHeadingText}`);
        await driver.sleep(500)

        let p1 = await driver.wait(until.elementLocated(By.id('p1')), 10000);
        await driver.wait(until.elementIsVisible(p1), 10000);
        let p1Text = await p1.getText();
        if (p1Text !== 'Now Get your Loan Approved instantly!!!') {
            throw new Error(`p1 text mismatch: expected 'Now Get your Loan Approved instantly!!!', got '${p1Text}'`);
        }
        console.log(`p1 text verified: ${p1Text}`);
        await driver.sleep(500)

        let p2 = await driver.wait(until.elementLocated(By.id('p2')), 10000);
        await driver.wait(until.elementIsVisible(p2), 10000);
        let p2Text = await p2.getText();
        if (p2Text !== 'Your loan approved immediately using this cool and fully automated application. In order to Submit a new loan request, click on "Submit an application" on the right. For viewing existing loan applications, click on "View applications".') {
            throw new Error(`p2 text mismatch: expected 'YYour loan approved immediately using this cool and fully automated application. In order to Submit a new loan request, click on "Submit an application" on the right. For viewing existing loan applications, click on "View applications".', got '${p2Text}'`);
        }
        console.log(`p2 text verified: ${p2Text}`);
        await driver.sleep(500)


        // Wait for and verify the buttons
        let submitLoanButton = await driver.wait(until.elementLocated(By.id('submitloan')), 10000);
        await driver.wait(until.elementIsVisible(submitLoanButton), 10000);
        let submitLoanButtonText = await submitLoanButton.getText();
        if (submitLoanButtonText !== 'Submit an Application') {
            throw new Error(`Submit button text mismatch: expected 'Submit an Application', got '${submitLoanButtonText}'`);
        }
        console.log(`Submit button text verified: ${submitLoanButtonText}`);
        await driver.sleep(500)

        let viewAppsButton = await driver.wait(until.elementLocated(By.id('viewapps')), 10000);
        await driver.wait(until.elementIsVisible(viewAppsButton), 10000);
        let viewAppsButtonText = await viewAppsButton.getText();
        if (viewAppsButtonText !== 'View Applications') {
            throw new Error(`View button text mismatch: expected 'View Applications', got '${viewAppsButtonText}'`);
        }
        console.log(`View button text verified: ${viewAppsButtonText}`);
        await driver.sleep(500)

        // Click the buttons to ensure they work
        await submitLoanButton.click();
        await driver.wait(until.urlContains('/submitloan'), 10000);
        console.log('Navigated to Submit Loan page.');
        
        await driver.navigate().back();
        console.log('Returned to the homepage.');

        // Re-locate elements to avoid stale element reference error
        viewAppsButton = await driver.wait(until.elementLocated(By.id('viewapps')), 10000);
        await driver.wait(until.elementIsVisible(viewAppsButton), 10000);
        await viewAppsButton.click();
        await driver.wait(until.urlContains('/viewapps'), 10000);
        console.log('Navigated to View Applications page.');

    } finally {
        //await driver.sleep(100000)
        await driver.quit();
        console.log('WebDriver quit.');
    }
})();
