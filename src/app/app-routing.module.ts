import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CityWeatherDashboardComponent } from './components/city-weather-dashboard/city-weather-dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: 'Home', component: LandingPageComponent },
      {
        path: ':country/:city/Dashboard/:lat/:long',
        pathMatch: 'full',
        component: CityWeatherDashboardComponent,
      },
      { path: '**', component: LandingPageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
