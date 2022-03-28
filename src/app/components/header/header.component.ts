import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedDataService } from './../../services/shared-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() showCities: boolean = false;
  // @Input() cities: Array<any> = [];
  current_city: string = '';
  cities_data:Array<any>=[]; 
  filteredCities: Array<any> =[];
  showSideBar: boolean = false;
  getCities() {
    this._sharedData.getLocationData().subscribe((data) => {
     this.cities_data=data.cities;
     this.filteredCities=data.cities;
    });    
  }
  constructor(private _sharedData: SharedDataService, private router: Router) {}

  ngOnInit(): void {  
    this.getCities();  
  }
  getDashboardCity(city: any) {
    this._sharedData.updateLocation(
      city.name.replace(' Governorate', ''),
      parseFloat(city.latitude),
      parseFloat(city.longitude)
    );
    this.router.navigate([
      `${city.country}/${city.name.replace(' Governorate', '')}/Dashboard/${parseFloat(city.latitude)}/${parseFloat(city.longitude)}`,
    ]);
  }
  backToLanding() {
    this.router.navigate([``]);
  }
  modelChangeFn(e: any) {
    let updatedCities = this.cities_data?.filter((city) => {
      return city.name
        .replace(' Governorate', '')
        .toUpperCase()
        .includes(e.toUpperCase());
    });
    this.filteredCities = updatedCities;
  }
  toggleSideBar(): void {
    this.showSideBar = !this.showSideBar;
    this.filteredCities = this.cities_data;
  }
}
