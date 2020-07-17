# Understanding the basic test file



## The content of a test file

Once you create a component the generate it will include a `.spec` file. A basic `.spec` file looks like this:

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

```

In this case we create a file called HomeComponent. As you can see the file is humanly readable. This is the reason why it makes great documentation. Everyone can look at a `.spec` file and figure out what is going on. So lets break it down.

## What is TestBed ?

We are still writing our test with the jasmine framework but angular has introduces the concept of the TestBed.
The general concept is that TestBed allows you to set up an independent module, just like the `@NgModule` that lives in the **app.module.ts** file, for testing a specific component. This is an isolated testing environment for the component you are testing. A unit test focuses on testing one chunk of code in isolation, not how it integrates with any other parts of the code, so it makes sense to create an environment where we get rid of any outside influences.

This part of our test file is creating the above mentioned module:

```javascript
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
```

You don’t always need to use TestBed when creating unit tests, you can test your providers and services without it - in fact, that is the recommended way.

It can be alot of work to figure out what modules your component relies on so its might be a good idea to create a module that you can reuse in your tests. This module will include all the basic imports most tests are gonna need. 
Its good practice to give this module a clear name that explains its service e.g. `karma.module.ts` and place it in a seprate folder called `modules/karma`. 

## Function rundown

So lets go through everything that is going on in the testfile

We first `describe` our test suite giving it a title of `Component:HomeComponent. Inside of that test suite, we add our `beforeEach` blocks. The first one is what configures `TestBed for us with the appropriate dependencies required to run the component.

- The `beforeEach` sections will run before each of the tests are executed (each `it` block is a test).

- We can use `configureTestingModule` to set up the testing environment for the component, including any **imports** and **providers** that are required.

- We can use `createComponent` to create an instance of the component we want to test after configuring it.

- We need to use `compileComponents` when we need to asynchronously compile a component, such as one that has an external template, This is why the `beforeEach` block that this code runs in uses `async` - it sets up an asynchronous test zone for the `compileComponents` to run inside.

- A `Component Fixture` is a handle on the testing environment that was created for the component, compared to the `componentInstance` which is a reference to the component itself (and is what we use for testing)

- Change detection, like when you change a variable with two-way data binding set up, is not automatic when using TestBed. You need to manually call `fixture.detectChanges()` when testing changes. If you would prefer, there is a way to set up automatic change detection for tests.

- The `it` method describe a start of a test. The one test we get from creating a page does the following. 

  ```
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  ```

  The test expects the component (HomeComponent) to be created.

  It is good practice to keep your test desciptions humanly readable e.g. `it('Should find my favorite color')`

## Extra basic functions

-  The `afterEach` will run after the test has completed. This can be used to clear data or processes at the end of a `it` so every test will start 'fresh'.
- `afterAll`
- `beforeAll`
- `toEqual`
- `toBeFalsy`
- `toBeNull`
- `ToBe()`

For any other methods you can refrence the [Jamine documentation](https://jasmine.github.io/)

## Forcing a spec file or a test

