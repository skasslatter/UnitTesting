# An introduction to testing

## What is karma?

Karma is essentially a tool which spawns a web server that executes source code against test code for each of the browsers connected. The results of each test against each browser are examined and displayed via the command line to the developer such that they can see which browsers and tests passed or failed.

A browser can be captured either

- manually, by visiting the URL where the Karma server is listening (typically `http://localhost:9876/`),
- or automatically by letting Karma know which browsers to start when Karma is run (see [browsers](http://karma-runner.github.io/5.0/config/browsers.html)).

Karma also watches all the files, specified within the configuration file, and whenever any file changes, it triggers the test run by sending a signal to the testing server to inform all of the captured browsers to run the test code again. Each browser then loads the source files inside an IFrame, executes the tests and reports the results back to the server. The server collects the results from all of the captured browsers and presents them to the developer.

Karma works by setting up a web server that will run your test automatically if a file changes.

## What is Jasmine?

Jasmine is a Behavior Driven Development testing framework for JavaScript. It does not rely on browsers, DOM, or any JavaScript framework. Thus it's suited for websites, Node projects, or anywhere that JavaScript can run.

So in a nutshell, We write our test code in the Jasmine framework and Karma is the task runner for those test

## What is a unit test and why should you write them?

Unit test are automated test to ensure that a section of an application (unit) meets its design and behaves as intented.
This way you can catch bugs before you would push the code to your end users and become more confident in the product you are building.

#### Benefits of unit testing

- **Improve the design of implementations.**

  Start coding a feature without giving it a lot of thought to the design is a very common mistake. Using unit testing is going to enforce you to think and re-think the design, and if you are using [Test Driven Development (TDD)](https://www.guru99.com/test-driven-development.html) the impact is even bigger.

- **Allow refactoring.**

  Since you already have tests that ensures that everything is working as expected, you can easily add changes to that code with the certainty that you are not adding any bugs or breaking changes.

- **Add new features without breaking anything.**

  When you are adding a new feature you can run the tests to ensure that you aren't breaking any other part of the application.

- **It will save you alot of time.**

  You can say that all their benefits come at a great cost: TIME, but this is completely false. All the time that using unit testing may cost you is going to be small compared to the time they are going to save you later when you are introducing new features or making any refactors. The time spent resolving bugs is going to be drastically smaller than if you are not using unit testing.

- **Tests are good documentation.**

  Test are written in a human readable format wich also makes them a great source of documentation. Ofcourse it can't replace the 'classic' form of documentation.

## Structure

Test files should be named after the `.ts` file you’re testing, but with `.spec` added to the file name (e.g. when testing `login.component.ts`, the test file should be named `login.component.spec.ts`). It’s best practice to keep the spec file in the same folder as the ts file. So mostly, for a component, you’ll end up with a HTML, scss, spec.ts and ts file in one folder. Like the example below.

###### ![Screenshot 2020-07-17 at 13.26.01](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggu6zam5tyj305m0420sq.jpg)

## Setup

Let’s take a look at how it’s done in an Angular app using Karma. If you’re using the Angular CLI it will set up karma automaticlly  All you need to do is run `ng test` or `npm test` in your console

 It will transpile your tests and run them using Karma. If you’re not using the Angular CLI yet, I recommend creating a new project with the CLI and copying your existing project to it. It will make your life a lot easier.

Running `ng test` will run the tests in watch mode, meaning that every time you save a change to a file, it will automatically rerun your tests. 

#### Flags

[*Command-line flags*](http://en.wikipedia.org/wiki/Command-line_interface#Command-line_option) are a common way to specify options for command-line programs.You can regiconize flag by the `-` or `--` in front of them. You can find all the flags for karma [here](http://karma-runner.github.io/5.0/config/configuration-file.html) but i will briefly mention some most commonly used flags.

- `--single-run `

  The single run flag will make the test only run once.

- `--auto-watch` / `--no-auto-watch`

  Enable or disable watching files and executing the tests whenever one of these files changes.

- `--code-coverage`

  The code coverage flag will create a report in html. It will display the report either on your browser or save it to a folder in your project called `coverage/index.html`. This report will cover the percentage of code you have covered with your test. Ofcourse 100% code coverage seems appeling but might not always be ideal. 
  The pit of overtesting is a easy one to fall into and can end up taking up alot of time. Ofcourse overtesting your code is better than undertesting it. So it important to know what to test but we will cover this in a later paragraph.

  

#### Boilerplate Karma files

Angular generates all the boilerplate code automatically when you generate your project.
Here are some files that karma generates automatically:

###### <img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1ggu29kl46aj306e01g748.jpg" alt="karma-conf" style="zoom:50%;" />

This file contains the configuration for Karma. 

###### ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1ggu4i7342wj303m00tjr8.jpg)

This file is required by Karma to find and run all the spec files.

###### <img src="https://tva1.sinaimg.cn/large/007S8ZIlgy1ggu3ihgxcej30dg066aa9.jpg" style="zoom:50%;" />

Karma will also create a e2e (end to end) folder. E2e testing is a different way of testing that we won't cover in this block but i will explain it briefly. 

####  What is End to End Testing?

This method of testing aims to replicate real user scenarios so that the application can be validated for integration and data integrity.
Essentially, the test goes through every operation the application can perform to test how the application communicates with hardware, network connectivity, external dependencies, databases, and other applications.

E2e test uses are completly decoupled from your main code. That's why this folder is created inside the root of your project. So in a nutshell e2e testing is needed to simulate how a user would use your application. In essence you can see a e2e test as a bot that perfoms automated instructions in your application.

Ofcourse you can use the standard e2e tester that comes with your angular applictation but there are alot of other frameworks out there that you can use. 
The most common one in that case is [Cypress](https://www.cypress.io/how-it-works/).

## What do you test?

The most difficult thing about being good at testing is knowing what to test. Like i mentioned in a previous paragraph, Its easy to overtest but its better than undertesting. Overtesting can cost you alot of time without the benefit of winning that time back later. 

For starters, you don’t have access to private and protected variables/functions, so all you can do is test the public ones. All variables that are accessed by the view should be public, so those are the ones you can use for your tests. The constructor and all lifecycle events can be called as well as they are public. You should never ever set a variable or function to public in order to test it. If you can’t test it because it’s private, you’re doing something wrong. You should be able to get to it through other functions.

The code coverage report can help you find functions that aren’t fully tested yet. However, your goal shouldn’t be to get a 100% coverage. Getting a 100% isn’t that hard, simply calling all functions with some different inputs will get you there. It won’t mean that your code is fully tested. To give you an example, suppose you have a function that sorts a list. You write some tests with different inputs so all branches are covered and you get a 100% coverage. The ordering of the list could still be completely wrong and not what you expect, although it’s fully covered. By using `expect` to verify that the output is correct, you’ll be doing a way better job. Even then there may be scenarios that aren’t tested despite the coverage report stating that part of the code is covered. So try to think of the various possible scenarios (both success and error scenarios) and translate those to tests.

Also try to cover other paths than just the happy paths!

#### What to test

- **Test the most common case of everything you can.**

  This will tell you when that code breaks after you make some change.

- **Test the edge cases of a few unusually complex code that you think will probably have errors.**

  Keep your friends close but your enemies closer.

- **Whenever you find a bug, write a test case to cover it before fixing it.**

  This way you can make sure that you won't reintroduce the bug.

- **Add edge-case tests to less critical code whenever someone has time to kill.**

  A great time killer is writing test for edge cases. This will ofcourse contribute to you code coverage and better your application in the long run.

- **Make sure the things that should fail are handled as you expect**

  For example does my login form handle the wrong credentials the right way.

#### What not to test

- **Parts of your application that you dont have control over.**

  An easy example here would be the api or the browser apis you are using. You have no control over the code that happens on the api so there is no point in writing a test for the output.

- **The code that is trivial**

  For example a getter that returns 0.

## End note

In most cases, unit tests are not written to find bugs but to prevent them. Unit tests, by definition, examine each unit of your code separately. But when your application is run for real, all those units have to work together, and the whole is more complex and subtle than the sum of its independently-tested parts. Proving that components X and Y both work independently doesn’t prove that they’re compatible with one another or configured correctly. Also, defects in an individual component may bear no relationship to the symptoms an end user would experience and report. And since you’re designing the preconditions for your unit tests, they won’t ever detect problems triggered by preconditions that you didn’t anticipate. 
There’s one exception where unit tests do effectively detect bugs. It’s when you’re refactoring but without meaning to change its behavior. In this case, unit tests can often tell you if the unit’s behavior has changed.

Reading: 

- [browserstack e2e testing (extra)](https://www.browserstack.com/guide/end-to-end-testing)
