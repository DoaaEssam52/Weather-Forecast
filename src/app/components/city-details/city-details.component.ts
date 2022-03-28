import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CityWeatherService } from './../../services/city-weather.service';
import { SharedDataService } from './../../services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.scss'],
})
export class CityDetailsComponent implements OnInit, OnDestroy {
  @Input() data: any;
  @Input() lat: number = 0;
  @Input() long: number = 0;
  @Input() cityIn: string = '';

  constructor(
    private _weatherService: CityWeatherService,
    private _sharedData: SharedDataService
  ) {}
  subs: Subscription = new Subscription();
  subs2: Subscription = new Subscription();

  /********
  Main Data
  *********/
  city: string = '';
  country: string = '';
  countryCode: string = '';
  imgUrl: string = '';
  temp_C: number = 0;
  temp_F: number = 0;
  state: string = '';

  /********
  List Data
  *********/
  feelsLikeC: number = 0;
  feelsLikeF: number = 0;
  windSpeed: number = 0;
  visibilityMiles: number = 0;
  pressure: number = 0;
  humidity: string = '';
  uvIndex: number = 0;

  /********************
  Handle Celsius or not
  ********************/
  isCelsius: boolean = true;
  toggleCelsius() {
    this.isCelsius = !this.isCelsius;
  }

  getWeather(current_lat: number, current_long: number) {
    this.subs2 = this._weatherService
      .getCityWeather(current_lat, current_long)
      .subscribe((response) => {
        let data = response.data;
        this._sharedData.setCurrentWeather(response.data);
        let currentState = data.current_condition
          ? data.current_condition[0]
          : null;

        if (currentState) {
          /***************
      Assign Main Data
      ****************/
          this.imgUrl = currentState.weatherIconUrl[0].value;
          this.temp_C = currentState.temp_C;
          this.temp_F = currentState.temp_F;
          this.state = currentState.weatherDesc[0].value;
          /***************
      Assign List Data
      ****************/
          this.feelsLikeC = currentState.FeelsLikeC;
          this.feelsLikeF = currentState.FeelsLikeF;
          this.windSpeed = currentState.windspeedMiles;
          this.visibilityMiles = currentState.visibilityMiles;
          this.pressure = currentState.pressure;
          this.humidity = currentState.humidity;
          this.uvIndex = currentState.uvIndex;
        }
      });
  }
  getData() {
    if (this.lat && this.long) {
      this.getWeather(this.lat, this.long);
      this.city = this.cityIn;
    } else {
      this.subs = this._sharedData.getLocationData().subscribe((data) => {
        this.city = data.current_city;
        this.country = data.country;
        this.getWeather(data.current_lat, data.current_long);
      });
    }
  }
  ngOnInit(): void {
    this.getData();
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
    this.subs2.unsubscribe();
  }
}
