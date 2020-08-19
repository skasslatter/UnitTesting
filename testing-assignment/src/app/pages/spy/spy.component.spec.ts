import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SpyComponent} from './spy.component';
import {City} from '../../model/city/city.model';
import {By} from '@angular/platform-browser';

describe('SpyComponent', () => {
  let component: SpyComponent;
  let fixture: ComponentFixture<SpyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpyComponent]
    })
      .compileComponents();
    fixture = TestBed.createComponent(SpyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.cities = [
      new City(1, 'Rome', 'RO'),
      new City(2, 'Bologna', 'BO'),
      new City(3, 'Ancona', 'AN'),
      new City(4, 'Bolzano', 'BZ')
    ];
  }));

  it('should construct this.cities[] after initialisation', () => {
    expect(component.cities.length).toEqual(4);
  });

  it('should add a city', () => {
    component.addCity('Cagliari');
    expect(component.cities.length).toEqual(5);
  });

  it('should delete a city', () => {
    // const city = component.cities[0];
    // component.deleteCity(city);
    component.deleteCity({id: 4, name: 'Bolzano', province: 'BZ'});
    expect(component.cities.length).toEqual(4);
  });

  it('should call the deleteCity() method when clicking on Delete', () => {
    spyOn(component, 'deleteCity');
    const deleteButton = fixture.debugElement.query(By.css('.btnDelete')).nativeElement;
    deleteButton.click();
    expect(component.deleteCity).toHaveBeenCalled();
  });
});
