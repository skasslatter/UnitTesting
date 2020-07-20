## Async Testing

## Async, Fakesync, Tick

Angular is full of Observables and writing tests for them is a little trickier. You might also be using the `setTimeout` and `setInterval` functions. To cope with all that, Angular provides the `async` and `fakeAsync` functions. You can simply wrap your test in an `async` and it should only finish after all async calls are finished. If you want to have more control, you can wrap the test in a `fakeAsync` instead. Then the `tick()` function can be called to advance time with one tick. By passing an argument to it, time can be advanced by more ticks at once: `tick(500)`.

Suppose we have this class:

```javascript
export class TimeoutExample {
    counter = 0;

    updateCounterWithDelay() {
        setTimeout(() => {
            this.counter++;
        }, 100);
    }
}
```

And this test:

```javascript
it('should increase the counter with a delay', fakeAsync(() => {
    const component = new TimeoutExample();
    expect(component.counter).toBe(0);
    component.updateCounterWithDelay();
    tick();
    expect(component.counter).toBe(0);
    tick(10);
    expect(component.counter).toBe(0);
    tick(90);
    expect(component.counter).toBe(1);
}));
```

It clearly shows how the `tick` function manipulates the advancement of time, although it isn’t really a useful test,

## OBSERVABLES

Now, what if you want to test a function that returns an Observable? Well, simply subscribe to it in an async block and check the result!

```javascript
it('should return a list of consoles' async(() => {
    service.findAll().take(1).subscribe(
        (result) => {
            expect(result.length).toBe(9);
        },
        (error) => {
            expect(true).toBeFalsy();
        }
    );
}));
```

The error clause may seem strange. However, what if the `findAll()` call returns an error and you don’t have the error clause in your test? You’ll simply think that your test has passed because it appears green in the console. With code coverage enabled, you may notice that the part of the code you were testing isn’t marked as covered. By adding `expect(true).toBeFalsy();` to the error clause, your test will fail because it shouldn’t get there!