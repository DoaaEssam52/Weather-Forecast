import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CityWeatherService {
  constructor(private _http: HttpClient) {}
  
  //Getting choosen city weather
  getCityWeather(lat:number,long:number): Observable<any> {    
    return this._http.get(
      `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=a6886c00fd364386a2d110128222003&q=${lat},${long}&num_of_days=5&format=json`,
    )
  }
}
