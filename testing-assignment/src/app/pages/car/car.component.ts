import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Car } from '../../model/car/car.model';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {

  @Output() selectedCar: EventEmitter<Car> = new EventEmitter<Car>();
  cars: Car[];

  ngOnInit() {
    this.cars = [
      new Car('Toyota', 'Prius', 2017, 4),
      new Car('Volvo', 'Truck', 2004, 8)
    ];
  }

  selectCar(car: Car) {
    this.selectedCar.emit(car);
  }
}
