import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './pages/city/city.component';
import { CarComponent } from './pages/car/car.component';
import { SpyComponent } from './pages/spy/spy.component';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CarComponent,
    SpyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
