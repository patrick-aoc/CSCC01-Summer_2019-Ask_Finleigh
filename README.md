# CSCC01 - Ask Finleigh! - Front end

---

### Description

This is the code for the front-end of our chatbot application. React was our library of choice for designing this application as it allowed for the convenient creation of pages and components. In addition to React, we used several other 3rd party libraries to enhance our design. Here are some of the noteworthy ones:

* Material UI - a UI library that provides minimalistic page components that are visually appealing
* Firebase - an easy-to-use API that handles user authentication and account management
* Apex Charts - a charting library that allows us to easily create visual representations of our analytical data
* Axios - a promise based HTTP client for the browser and Node.js; it allows for us to easily send the necessary requests to our REST endpoints

---

### Required Tools

* Node.js

---

### Installation

* Clone our project repository from the root
* ```cd ./front-end/ask-finleigh```
* ```npm install```
* ```npm start``` (defaults to port 3000, so open up your browser to localhost:3000)
 
---

### Project/Folder Structure 

* ./ask-finleigh/cypress 
    * Contains the cypress test cases for our front end. You can find the test files under the integration folder
* ./ask-finleigh/public
    * Contains the index.html
* ./ask-finleigh/src
    * Contains the main React components of the front-end in their respective subfolders
* ./ask-finleigh/src/containers
    * Contains the main App.js file
* ./ask-finleigh/src/firebase
    *  Contains the components necessary for running the Firebase API methods on the front-end
* ./ask-finleigh/src/pages
    * Contains the main front-end UI components for the chatbot application
* ./ask-finleigh/src/resources
    * Contains our main chat logo 
* ./ask-finleigh/src/styles
    * Contains the .css files that styles the front-end UI components

---

### Testing

Our front-end tests were created with the Cypress testing framework.
To run the test cases we have set, run the command ```npx cypress run```
If you'd like to go through test suites individually, run the command ```npx cypress open``` to open the Cypress test runner and click through any of the test files to run the test cases within them.

