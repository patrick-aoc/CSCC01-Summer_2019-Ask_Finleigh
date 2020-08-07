describe('Landing Page Tests', function () {

    // TEST 1 - Check to see that we can login with a valid registered email
    it('Login with test email', function () {

        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Enter the email in the email field and check to see that
        // it has been entered correctly
        cy.get('#email-input').type('testemail@testing.ca').should('have.value', 'testemail@testing.ca')

        // Enter the password in the password field
        cy.get('#pwd-input').type('123456')

        // Click the login button and check to see that we've logged in based on the URL
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').click()
        cy.url().should('include', 'https://ask-finleigh.netlify.com/main')
    });

    // TEST 2 - Check to see that we cannot login with a valid unregistered email
    it('Login with valid unregistered email', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Enter the email in the email field and check to see that
        // it has been entered correctly
        cy.get('#email-input')
            .type('testemail@testing.com')
            .should('have.value', 'testemail@testing.com')

        // Enter the password in the password field
        cy.get('#pwd-input')
            .type('123456')

        // Click the login button and check to make sure that we get the appropriate snackbar message
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').click()
        cy.get('#message-id').contains("Invalid username or password")
    });

    // TEST 3 - Check to see if the email input validator is working as it should
    it('Enter invalid email', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Enter the email in the email field and check to see that
        // it has been entered correctly
        cy.get('#email-input')
            .type('invalid@email')
            .should('have.value', 'invalid@email')

        // Check to make sure that the message helper text appears as it should
        cy.get('#email-input-helper-text').contains("Invalid email format")
    })

    // TEST 4 - Check to see if the login button is disabled with bad input
    it('Check for a disabled login button', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // FIRST CHECK - button should be disabled by default
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').should('be.disabled')

        // Enter the email in the email field and check to see that
        // it has been entered correctly
        cy.get('#email-input')
            .type('invalid@email')
            .should('have.value', 'invalid@email')

        // SECOND CHECK - button should be disabled with bad input
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').should('be.disabled')
    })

    // TEST 5 - Check to see that we can log into the page as expected
    it('Sign in anonymously', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Click the anonymous sign in button and check to make sure that we make it to the 
        // main page
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/button[2]').click()
        cy.url().should('include', 'https://ask-finleigh.netlify.com/main')
    })
})

describe('Account Creation Page Tests', function () {

    // TEST 1 - Check to see that the register button is disabled by default
    it('Check for a disabled register button', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Click the Create an Account button
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/button[1]').click()
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').should('be.disabled')
    })

    // TEST 2 - Check to see that the register button is disabled with bad input
    it('Try to create an account with invalid fields', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Click the Create an Account button
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/button[1]').click()

        // Enter the appropriate fields for the form
        cy.get('#firstName').type('First')
        cy.get('#lastName').type('First')
        cy.get('#email').type('invalid@email')
        cy.get('#password').type('123')
        cy.get('#confPassword').type('123')

        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').should('be.disabled')
    })

    // TEST 3 - Check to see that the appropriate messages appear for bad input in the password 
    // and the confirm password fields
    it('Try to create an account with invalid fields', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Click the Create an Account button
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/button[1]').click()

        // Enter the appropriate fields for the form
        cy.get('#firstName').type('First')
        cy.get('#lastName').type('Last')

        // Enter an invalid email and expect the correct error message
        cy.get('#email').type('invalid@email')
        cy.get('#email-helper-text').should('have.text', 'Invalid email format')

        // Enter an invalid password and expect the correct error message
        cy.get('#password').type('123')
        cy.get('#password-helper-text').should('have.text', 'Password must be at least 6 characters long')
        cy.get('#password').type('123123')

        // Enter a password that doesn't match with the above password and expect the correct error message
        cy.get('#confPassword').type('123')
        cy.get('#confPassword-helper-text').should('have.text', 'Passwords do not match')

        // The register button should still be disabled
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').should('be.disabled')
    })
})