# Understanding the basic test file



## The content of a test file

Once you generate a component it will include a `.spec` file. A basic `.spec` file looks like this:

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

In this case we create a file called HomeComponent. As you can see the file is humanly readable. This is the reason why unit tests make great documentation. So lets break it down what is going on in the `.spec` file.

## What is TestBed ?

We are still writing our test with the jasmine framework but angular has introduced the concept of the TestBed.
The general concept is that TestBed allows you to set up an independent module, just like the `@NgModule` that lives in the **app.module.ts** file, for testing a specific component. This is an isolated testing environment for the component you are testing. A unit test focuses on testing one chunk of code in isolation, not how it integrates with any other parts of the code, so it makes sense to create an environment where we get rid of any outside influences.

This part of our test file is creating the above mentioned module:

```javascript
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
```

You don’t always need to use TestBed when creating unit tests, you can test your providers and services without it.

It can be alot of work to figure out what modules your component relies on so its might be a good idea to create a module that you can reuse in your tests. This module will include all the basic imports most tests are gonna need. 
Its good practice to give this module a clear name that explains its service e.g. `karma.module.ts` and place it in a seprate folder called `modules/karma`. 

## Side effect of using Testbed

A side effect of using TestBed is that when the component is loaded, the `ngOnInit`, `ngAfterViewInit`… lifecycle events are called automatically. This means you have less control over them.

Getting all the imports, providers and declarations setup can be quite a struggle too. If there’s any subcomponent in the HTML of the component you’re testing, they should either be imported through a module or added in the declarations of the TestBed configuration. If you don’t feel like doing all that, you can also tell Angular to skip elements it doesn’t recognise by adding `NO_ERRORS_SCHEMA` to the TestBed configuration:

```javascript
TestBed.configureTestingModule({
  declarations: [ HomeComponent ],
  schemas: [NO_ERRORS_SCHEMA],
}).compileComponents();
```
## Function rundown

So lets go through everything that is going on in the test file

We first `describe` our test suite giving it a title of `Component:HomeComponent` Inside of that test suite, we add our `beforeEach` blocks. The first one is what configures `TestBed for us with the appropriate dependencies required to run the component.

- The `beforeEach` sections will run before each of the tests are executed (each `it` block is a test).

- We can use `configureTestingModule` to set up the testing environment for the component, including any **imports** and **providers** that are required.

- We can use `createComponent` to create an instance of the component we want to test after configuring it.

- We need to use `compileComponents` when we need to asynchronously compile a component, such as one that has an external template, This is why the `beforeEach` block that this code runs in uses `async` - it sets up an asynchronous test zone for the `compileComponents` to run inside.

- A `Component Fixture` is a handle on the testing environment that was created for the component, compared to the `componentInstance` which is a reference to the component itself (and is what we use for testing)

- Change detection, like when you change a variable with two-way data binding set up, is not automatic when using TestBed. You need to manually call `fixture.detectChanges()` when testing changes. If you would prefer, there is a way to set up automatic change detection for tests.

- The `it` method describe a start of a test. The one test we get from creating a page does the following. 

  ```javascript
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  ```

  The test expects the component (HomeComponent) to be created.

  It is good practice to keep your test desciptions humanly readable e.g. `it('Should find my favorite color')`

## Extra functions

-  The `afterEach` method will run after the test has completed. This can be used to clear data or processes at the end of a `it` so every test will start 'fresh'.
- The `afterAll` method will run after all the `it` have been completed. This can be used to clear data or processes at the end all your test in that file so every test will start 'fresh'.
- The `beforeAll` method will run before all the test in that file. 
- The `toEqual` method check if the variable equals the given paramator. E.g. `expect(myArray).toEqual([1,2,3])`
- The `toBeFalsy` method checks if the variable is false
- The `toBeNull` method check if the variable is null

For any other methods you can refrence the [Jamine documentation](https://jasmine.github.io/)

## Forcing a spec file or a test

When your test base begins to grow, you don’t always want to wait for all tests to have run when only testing a certain class or function. Therefore, you can choose to only run specific `describe` blocks or tests (`it`) by adding an `f` (which stands for focus) in front of them, such as `fdescribe` and `fit`. To exclude certain `describe` blocks or tests, you can prefix them with an `x` (exclude), like `xdescribe` and `xit`. This will certainly come of use.

## Nesting describe blocks

Describe blocks can also be nested. If you want for example different `beforeEach` blocks for your tests when testing a class, you can create a nested `describe` block for each case.

```javascript
describe('AppComponent', () => {
    let mockConsoleBrandService = jasmine.createSpyObj('consoleBrandService', ['findAll']);

    describe('Happy path', () => {
        beforeEach(() => {
            mockCarBrandService.findAll.and.returnValue(Observable.of([
                { name: 'Playstation', country: 'Japan' },
                { name: 'XBOX', country: 'US' }
            ]));
        });

        it(...);
        ...
    });
    
    describe('Error path', () => {
        mockConsoleBrandService.findAll.and.returnValue(Observable.throw('Error'));

        it(...);
        ...
    });
});
```

## Using the injector

Dependency injection is used all over Angular meaning that it isn’t possible to simply call `new` for certain classes. Normally, you simply put the dependencies in the constructor of your class and Angular takes care of the rest (e.g. `constructor(private formBuilder: FormBuilder)`). When calling the constructor of a class in a test, you don’t always want to mock those dependencies, so you’ll need to get instances of them somehow. For example when using Angular’s `FormBuilder` or when you need it to create a `FormGroup` to use in your test. In that case, you can use Angular’s ReflectiveInjector which takes care of getting an instance for you. Here’s an example how:

```javascript
const injector = ReflectiveInjector.resolveAndCreate([FormBuilder]);
const formBuilder = injector.get(FormBuilder);
```

As you can see, you can simply pass the class name and it will return an instance of that class. That instance can then be passed in the constuctor of the class you’re testing.