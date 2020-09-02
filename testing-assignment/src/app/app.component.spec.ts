import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {By} from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should have the title: "testing-assignment app is running!"', () => {
    const title = fixture.debugElement.query(By.css('.highlight-card span')).nativeElement;
    expect(title.innerHTML).toBe('testing-assignment app is running!');
  });

  // Alternative
  // it(`should contain 'testing-assignment app is running!'`, () => {
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.highlight-card span').textContent).toContain('testing-assignment app is running!');
  // });
});
