import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CityWeatherDashboardComponent } from './components/city-weather-dashboard/city-weather-dashboard.component';
import { DataViewComponent } from './components/dataView/dataView.component';

@NgModule({
  declarations: [
    AppComponent,
    CityDetailsComponent,
    HeaderComponent,
    LandingPageComponent,
    CityWeatherDashboardComponent,
    DataViewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
