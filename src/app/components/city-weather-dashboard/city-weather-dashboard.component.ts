import { Component, OnInit } from '@angular/core';
import { SharedDataService } from './../../services/shared-data.service';
import { CityWeatherService } from './../../services/city-weather.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-city-weather-dashboard',
  templateUrl: './city-weather-dashboard.component.html',
  styleUrls: ['./city-weather-dashboard.component.css'],
})
export class CityWeatherDashboardComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute
  ) {}
  cityData: any;
  weather: any;
  lat: number = 0;
  long: number = 0;
  city:string="";
  queryParamsStatus = '';
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((event) => {
      this.lat = event.lat;
      this.long = event.long;
      this.city=event.city;
    });    
  }
}
