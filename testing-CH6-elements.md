# Testing HTML elements

Let’s take a look at the sample component.ts code:

```javascript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notice-board',
  templateUrl: './notice-board.component.html',
  styleUrls: ['./notice-board.component.css'],
})
export class NoticeBoardComponent implements OnInit {
  public title = 'NOTICE BOARD';
  public disableNoButton = true;
  public userResponse: string;
  constructor() {}

  ngOnInit() {}

  public sayYes() {
    this.userResponse = 'I am In';
  }
}
```

Similarly, we have a very basic HTML file:

```javascript
<div>
  <h1>{{title}}</h1>
  <div class="board">
    We are going to Mars. Do you want to join ?
  </div>
  <hr/>
  <div>
    <button id="yes-btn" (click)="sayYes()">Yes</button>
    <button id="no-btn"
            [disabled]="disableNoButton">No</button>
  </div>
</div>
```

and the spec file:

```javascript
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoticeBoardComponent } from './notice-board.component';

describe('NoticeBoardComponent', () => {
  let component: NoticeBoardComponent;
  let fixture: ComponentFixture<NoticeBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoticeBoardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoticeBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

What we have in the component :

- A title for the Notice board
- Content inside Notice board
- A ‘**YES’** button which sets “*userResponse*” value when clicked
- A ‘**NO’** button which is disabled.

## Finding element using html element

```javascript
 it('should have a title', () => {
    expect(component.title).toBe('NOTICE BOARD');
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(title.innerHTML).toBe('NOTICE BOARD');
  });
```

## Finding Element using “id” and verifying it’s content

```javascript
	it('should have Yes in "Yes Button"', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#yes-btn');
    expect(btn.innerHTML).toBe('Yes');
  });
```

## Finding Element using “class” and verifying it’s content

```javascript
  it('should have content in notice board ', () => {
    const board = fixture.debugElement.query(By.css('.board')).nativeElement;
    expect(board.innerHTML).not.toBeNull();
    expect(board.innerHTML.length).toBeGreaterThan(0);
  });
```

## **Get attributes of a button and verify the attribute value**

```javascript
 it('should have Yes in "Yes Button"', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#yes-btn');
    expect(btn.innerHTML).toBe('Yes');
  });
  
  it('should have "No" button disabled', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#no-btn');
    expect(btn.disabled).toBeTruthy();
  });
```

## Recreate a “Click” event on a button

```javascript
it('should set userResponse when Yes button is clicked', () => {
    expect(component.userResponse).toBeUndefined();
    const btn = fixture.debugElement.nativeElement.querySelector('#yes-btn');
    btn.click();
    expect(component.userResponse).toBe('I am In');
  });
```

