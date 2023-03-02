const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1200,
  viewportWidth: 1600,
  e2e: {
    baseUrl: 'https://petstore.swagger.io/v2',
    retries: 2,
    setupNodeEvents(on, config) {
    
      // implement node event listeners here
    },
  },
});
