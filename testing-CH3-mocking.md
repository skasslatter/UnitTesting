# Mocking

In unit testing, we are only interested in testing the class itself and try to isolate it as much as possible. We also want to be able to easily control the output of all dependencies of our class, such as services.

## Spyon

One way to do so is by creating spies for all calls to functions of those dependencies. That’s where the `spyOn` function comes into play:

```javascript
describe('AppComponent', () => {
    let component: RequestPopupContainer;
    let fixture: ComponentFixture<AppComponent>;        

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [ConsoleBrandService],
            imports: [CommonLogicModule]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;

        const consoleBrandService = fixture.debugElement.injector.get(ConsoleBrandService);
        spyOn(consoleBrandService, 'findAll').and.returnValue(Observable.of([
            { name: 'Playstation', country: 'Japan' },
            { name: 'XBOX', country: 'US' }
        ]));    

        fixture.detectChanges();
    });
    ...
});
```

In the example above, you can see when the `AppComponent` would call consoleBrandService.findAll()`, instead of making a HTTP call, an Observable is returned with a list of console brands which is defined in the test itself. This is pretty cool, but also very error prone. If you forget to place a spy on a certain function, it will perform the actual call, possibly a HTTP call. That’s something we do not want at all.

## Mock classes

To prevent forgetting to spy on a certain function, you could create mock classes and inject them instead of the actual classes:

```javascript
class MockConsoleBrandService {
    findAll(): Observable<ConsoleBrand[]> {
        return Observable.of([
      			{ name: 'Playstation', country: 'Japan' },
            { name: 'XBOX', country: 'US' }
        ]);     
    }   
}

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;        

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{provide: ConsoleBrandService, useClass: MockConsoleBrandService}],
            imports: [CommonLogicModule]
        })
        .compileComponents();
    }));

    ...
});
```

Again we see that `findAll()` will return an Observable containing a list. By using this approach, you’ll get an error when you forgot to define a function in the mock class. This may solve our previous problem, but now we have created another one. Karma allows us to assert whether a function was called using `toHaveBeenCalled` and `toHaveBeenCalledWith`. The problem here is that we don’t have any spies, so those functions can’t be used. We can again add spies like in the first approach, but you can imagine that this is a lot of work and will get quite messy.

## Jasmine spy objects

So, the first two approaches have some issues. Luckily there’s a better way, Jasmine spy objects:

```javascript
describe('AppComponent', () => {        
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>; 

    const mockConsoleBrandService = jasmine.createSpyObj('consoleBrandService', ['findAll']);
    mockConsoleBrandService.findAll.and.returnValue(Observable.of([
     				{ name: 'Playstation', country: 'Japan' },
            { name: 'XBOX', country: 'US' }
    ]);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
            providers: [{provide: ConsoleBrandService, useValue: mockConsoleBrandService}],
            imports: [CommonLogicModule]
        })
        .compileComponents();
    }));
    ...
});
```

The first argument of `jasmine.createSpyObj` is the name for the object and will be used to mention it in the console. This is usually the name you gave the instance of the corresponding class in the constructor. The second argument is an array containing all function names of that corresponding class that are called from the class being tested. In other words, not all functions offered by the class that’s being mocked have be listed, only the ones actually being used.

Also note that in the providers list, we have to use `useValue` instead of `useClass` since `jasmine.createSpyObj` already returns an instance.

Using `spyOn` isn’t needed, a spy object is already being spied upon (hence the name) and you can call the `toHaveBeenCalled` and `toHaveBeenCalledWith` functions on it.

```javascript
...
it('should call the findAll method' () => {
    component.getFavoriteConsoleBrand();
    expect(mockConsoleBrandService.findAll).toHaveBeenCalled();
}); 
...
```

I think it’s obvious to say that using Jasmine spy objects is the way to go. If you forget to define a function, you’ll get an error when it’s called. The functions that are defined, are also spied upon. So all the problems with the first and second approach are solved. There’s even another benefit when using spy objects. The implementation (`returnValue` or `callFake`) can be changed at any time, even in the middle of a test!

## Calling the constructor

A much better way to do unit testing is to simply call the constructor of the class you want to test. You should get an instance of each dependency that’s needed in the component’s constructor. Of course we want to mock these classes and as we saw in the Angular TestBed section, the Jasmine spy objects are the way to go.

```javascript
describe('AppComponent', () => {        
    let component: AppComponent;

    const mockConsoleBrandService = jasmine.createSpyObj('consoleBrandService', ['findAll']);
    mockConsoleBrandService.findAll.and.returnValue(Observable.of([
     				{ name: 'Playstation', country: 'Japan' },
            { name: 'XBOX', country: 'US' }
    ]);

    beforeEach(() => {
        component = new AppComponent(mockConsoleBrandService);
    });
    ...
});
```

Without the TestBed, you don’t have access to the view. However, your tests will run much faster as there are less things to load. When using TestBed, you’ll probably be including lots of dependencies just to make it work, giving you less control. This is something you do not want in unit testing as you want to isolate the class as much as possible. Another difference with TestBed is that you have to call the lifecycle events yourself, again giving you more control over the code you’re testing.

```javascript
it('should find the console brand', () => {
    component.ngOnInit();
    const consoleBrand = component.getFavoriteConsoleBrand();
    expect(consoleBrand.name).toEqual('Playstation');
}); 
```

