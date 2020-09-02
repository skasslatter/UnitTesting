import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CityComponent} from './city.component';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        CityComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the the component "CityComponent"', () => {
    expect(component).toBeTruthy();
  });

  it('should check if the city variable gets the right value from ngOnInit', () => {
    component.ngOnInit();
    expect(component.city).toEqual('Haarlem');
  });

  it('should change the city name', () => {
    component.setCity('Amsterdam');
    expect(component.city).toEqual('Amsterdam');
  });

  it('should render the city name on the page', () => {
    component.ngOnInit();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('My favorite city is Haarlem');
  });
});
