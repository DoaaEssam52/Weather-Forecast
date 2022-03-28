import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedDataService } from './../../services/shared-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit, OnDestroy {
  constructor(private _sharedData: SharedDataService) {}
  subs: Subscription = new Subscription();
  lat: number = 0;
  long: number = 0;
  data: any;
  /**************
   Drop Down Data 
  ***************/
  cities: any;

  /****************
  Get Location Data 
  ****************/
  getLocation() {
    this._sharedData.getLocationData().subscribe((data) => {
      if (data._value) {
        this.cities = data._value.cities;
        this.data = data._value;
      } else {
        this.cities = data?.cities;
        this.data = data;
      }
    });    
  }
  ngOnInit(): void {
    this._sharedData.resetLocation();
    // this.getLocation();
  }
  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }
}
