import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CarComponent} from './car.component';
import {By} from '@angular/platform-browser';

describe('CarComponent', () => {
  let component: CarComponent;
  let fixture: ComponentFixture<CarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(CarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create "CarComponent"', () => {
    expect(component).toBeTruthy();
  });

  it('should construct this.cars[] after initialisation', () => {
    expect(component.cars.length).toEqual(2);
  });

  it('should call the @Output() event when clicking on a car', () => {
    spyOn(component.selectedCar, 'emit');
    const carParagraphs = fixture.debugElement.queryAll(By.css('p'));

    carParagraphs.forEach((carParagraph, index) => {
      expect(component.selectedCar.emit).not.toHaveBeenCalledWith(component.cars[index]);
      carParagraph.nativeElement.click();
      expect(component.selectedCar.emit).toHaveBeenCalledWith(component.cars[index]);
    });
  });
});
