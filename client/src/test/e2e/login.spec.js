import config from './config';

module.exports = {
  'Login Users': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=email]', 'yetundeowonikoko@gmail.com')
      .setValue('Input[name=password]', 'owonikoko')
      .click('button')
      .pause(1000)
      .assert.urlEquals('http://localhost:8080/app/document')
      .end();
  },
  'Invalid user': (browser) => {
    browser
      .url(config.url)
      .waitForElementVisible('body')
      .click('#login')
      .setValue('Input[name=email]', 'demo@gmail.com')
      .setValue('Input[name=password]', 'mypassword')
      .click('button')
      .pause(1000)
      .assert.urlContains('login')
      .end();
  }
};
