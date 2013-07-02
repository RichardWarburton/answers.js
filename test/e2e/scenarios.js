'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('answers.js', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });

  it('should automatically redirect to /home', function() {
    expect(browser().location().url()).toBe("/home");
  });

  describe('home', function() {

    beforeEach(function() {
      browser().navigateTo('#/home');
    });

  });
});
