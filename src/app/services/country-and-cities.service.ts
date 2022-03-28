import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from 'country-state-city';

@Injectable({
  providedIn: 'root',
})
export class CountryAndCitiesService {
  constructor(private _http: HttpClient) {}
  getCurrentCity(): Observable<any> {
    return this._http.get('http://ip-api.com/json');
  }
  getCurrentCountryCitites(countryCode: string) {
    return State.getStatesOfCountry(countryCode);
  }
}
