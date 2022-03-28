import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountryAndCitiesService } from './country-and-cities.service';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  constructor(private _locationService: CountryAndCitiesService) {}

  /******************
   Location Full Data
  ******************/
  data = new BehaviorSubject<any>(this.InitLocation());
  dataObservable = this.data.asObservable();

  /******************
   Weather Full Data
  ******************/
  weather_data = new BehaviorSubject<any>({ current_weather: [] });
  weatherDataObservable = this.weather_data.asObservable();

  /******************
  Init Location  Data
  ******************/
  InitLocation() {
    return this._locationService.getCurrentCity().subscribe((data) => {
      this.data.next({
        current_city: data.city,
        country: data.country,
        userCity: data.city,
        userCity_lat: parseFloat(data.lat),
        userCity_long: parseFloat(data.lon),
        current_lat: parseFloat(data.lat),
        current_long: parseFloat(data.lon),
        cities: this._locationService.getCurrentCountryCitites(
          data.countryCode
        ),
      });
    });
  }

  /****************
  Get Location Data
  *****************/
  getLocationData(): Observable<any> {
    return this.dataObservable;
  }

  /********************
  Update Location Data
  ********************/
  updateLocation(
    current_city: string,
    current_lat: number,
    current_long: number
  ) {
    return this.data.next({
      ...this.data,
      current_city: current_city,
      current_lat: current_lat,
      current_long: current_long,
    });
  }

  /*****************************
  Reset Location To Current City 
  *****************************/
  resetLocation() {
    this.InitLocation();
    return this.data.next({
      ...this.data,
      current_city: this.data.getValue()._value?.userCity,
      current_lat: this.data.getValue()._value?.userCity_lat,
      current_long: this.data.getValue()._value?.userCity_long,
    });
  }
  getCurrentWeather(): Observable<any> {
    return this.weatherDataObservable;
  }

  setCurrentWeather(weather: any) {
    return this.weather_data.next({
      current_weather: weather,
    });
  }
}
