describe('Test App Flow', function () {

    // TEST 1 - Send a query (with server inactive)
    it('Ask a simple question', function () {
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

        // Enter a value and send it
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div/form/input').type('Tell me a joke')
        cy.xpath('//*[@id="root"]/div/div/div[2]/div[2]/div/form/button').click()

        cy.xpath('//*[@id="root"]/div/div/div[2]/div[1]/ul/li[4]/div[1]/div')
            .contains('There was an issue while trying to process your question')
    })

    // TEST 2 - Check to see that we can sign out of the current account
    it('Sign out of an account', function () {
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

        // Click the hamburger menu and click the sign out button
        cy.xpath('//*[@id="root"]/div/div/div[1]/header/div/div/div[1]/button').click()
        cy.xpath('/html/body/div[2]/div[3]/div/div/ul[2]/div[2]').click()
        cy.url().should('include', 'https://ask-finleigh.netlify.com/')
    })

    // TEST 3 - Sign in with the admin account and check to see that they can access the Admin page
    it('Go to the admin page', function () {
        // Navigate to the application
        cy.visit('https://ask-finleigh.netlify.com/')
        cy.contains('Ask Finleigh')

        // Enter the email in the email field and check to see that
        // it has been entered correctly
        cy.get('#email-input').type('admin@admin.com').should('have.value', 'admin@admin.com')

        // Enter the password in the password field
        cy.get('#pwd-input').type('123456')

        // Click the login button and check to see that we've logged in based on the URL
        cy.xpath('//*[@id="root"]/div/div[3]/div[2]/form/button').click()
        cy.url().should('include', 'https://ask-finleigh.netlify.com/main')

        // Click the hamburger menu and click the Admin button
        cy.xpath('//*[@id="root"]/div/div/div[1]/header/div/div/div[1]/button').click()
        cy.xpath('/html/body/div[2]/div[3]/div/div/ul[2]/div[1]').click()

        // Check to see that we've made it to the Admin page
        cy.xpath('//*[@id="root"]/div/div/div[2]/h2').should('have.text', 'Admin')
    })

    // TEST 4 - Check to see that a user can access their MyAccount page, Help page,
    // and return to the chat session at the end
    it('Visit all the pages', function () {
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

        // Click the hamburger menu and click the My Account button
        cy.xpath('//*[@id="root"]/div/div/div[1]/header/div/div/div[1]/button').click()
        cy.xpath('/html/body/div[2]/div[3]/div/div/ul[1]/div[1]/div[2]').click()
        cy.xpath('//*[@id="root"]/div/div/div[2]/h2').should('have.text', 'My Account Information')

        // Click the hamburger menu and then the Help button
        cy.xpath('//*[@id="root"]/div/div/div[1]/header/div/div/div[1]/button').click()
        cy.xpath('/html/body/div[2]/div[3]/div/div/ul[2]/div[1]').click()
        cy.xpath('//*[@id="root"]/div/div/div[2]/h2').should('have.text', 'More Frequently Asked Questions!')

        // Click the hamburger menu and return to the chat session
        cy.xpath('//*[@id="root"]/div/div/div[1]/header/div/div/div[1]/button').click()
        cy.xpath('/html/body/div[2]/div[3]/div/div/ul[1]/div[2]').click()
        cy.xpath('//*[@id="root"]/div/div/div[1]/header/div/div/div[2]/h6').should('have.text', 'My Current Session')
    })

    // TEST 5 - Validate the content on the help page
    it('Visit the help page', function () {
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

        // Click the hamburger menu and then the Help button
        cy.xpath('//*[@id="root"]/div/div/div[1]/header/div/div/div[1]/button').click()
        cy.xpath('/html/body/div[2]/div[3]/div/div/ul[2]/div[1]').click()
        cy.xpath('//*[@id="root"]/div/div/div[2]/h2').should('have.text', 'More Frequently Asked Questions!')

        // Validate the header content
        cy.xpath('//*[@id="root"]/div/div/div[2]/div/div/div[1]/h2').should('have.text', "What's the difference between Finleigh and Watson?")
        cy.xpath('//*[@id="root"]/div/div/div[2]/div/div/div[2]/h2').should('have.text', "Where exactly can I start conversing with either one?")
        cy.xpath('//*[@id="root"]/div/div/div[2]/div/div/div[3]/h2').should('have.text', "Is there real-time customer support with a live agent?")
        cy.xpath('//*[@id="root"]/div/div/div[2]/div/div/div[4]/h2').should('have.text', "Where should I ask my field-related questions?")
    })

})
