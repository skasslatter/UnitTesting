import { Injectable } from '@angular/core';
import { Car } from '../../model/car/car.model';

@Injectable()
export class CarService {

  createCar(make: string, model: string, year: number, numWheels: number): Car {
    return new Car(make, model, year, numWheels);
  }

  getCar(car: Car): string {
    return `A ${car.make} ${car.model} from ${car.year} is a fine car!`;
  }

}
