import {TestBed} from '@angular/core/testing';
import {CarService} from './car.service';
import {Car} from '../../model/car/car.model';

describe('CarService', () => {
  let service: CarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarService]
    });
    service = TestBed.inject(CarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a new Car', () => {
    const newCar = service.createCar('BMW', 'M135', 2018, 4);
    expect(newCar).toEqual(new Car('BMW', 'M135', 2018, 4));
  });

  it('should return a Car', () => {
    const newCar = service.createCar('BMW', 'M135', 2018, 4);
    expect(service.getCar(newCar)).toEqual('A BMW M135 from 2018 is a fine car!');
  });
});
