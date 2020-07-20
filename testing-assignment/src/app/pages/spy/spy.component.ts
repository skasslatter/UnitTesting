import { Component } from '@angular/core';
import { City } from '../../model/city/city.model';

@Component({
  selector: 'app-spy',
  templateUrl: './spycomponent.html'
})
export class SpyComponent {
  cities: City[] = [
    new City(1, 'Venlo', 'LB'),
    new City(2, 'Groningen', 'GR'),
    new City(3, 'Amsterdam', 'NH'),
    new City(4, 'Rotterdam', 'ZH')
  ];
  counter = 0;

  addCity(newCity: string) {
    this.cities.push(new City(this.cities.length + 1, newCity, 'Unknown'));
  }

  increment() {
    this.counter++;
  }

  deleteCity(city: City) {
    this.cities = this.cities.filter(c => c !== city);
  }
}
