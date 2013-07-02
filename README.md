# answers.js

Easy to understand statistics in a javascript site.

## Statistics

TODO:
    Confidence Intervals.

## Development

Initially based on the Angular.js seed project.

## Implemented Ideas

 * Mean

## To Implement

Find the distribution.

### Running the app during development

You can pick one of these options:

* serve this repository with your webserver
* install node.js and run `scripts/web-server.js`

Then navigate your browser to `http://localhost:<port>/app/index.html` to see the app running in
your browser.

### Running unit tests


Requires: [node.js](http://nodejs.org/), Karma (`sudo npm install -g karma`) and Phantom ( `sudo npm install -g phantomjs`).

* start `scripts/test.sh` (on windows: `scripts\test.bat`)
* to run or re-run tests just change any of your source or test javascript files

### Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
      lib/              --> angular and 3rd party javascript libraries
      partials/             --> angular view partials (partial html templates)

    config/karma.conf.js        --> config file for running unit tests with Karma
    config/karma-e2e.conf.js    --> config file for running e2e tests with Karma

    scripts/            --> handy shell/js/ruby scripts
      e2e-test.sh       --> runs end-to-end tests with Karma (*nix)
      e2e-test.bat      --> runs end-to-end tests with Karma (windows)
      test.bat          --> autotests unit tests with Karma (windows)
      test.sh           --> autotests unit tests with Karma (*nix)
      web-server.js     --> simple development webserver based on node.js

    test/               --> test source files and libraries
      e2e/              -->
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
      unit/                     --> unit level specs/tests

