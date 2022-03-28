import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { Subscription } from 'rxjs';
import { CityWeatherService } from '../../services/city-weather.service';

@Component({
  selector: 'app-dataView',
  templateUrl: './dataView.component.html',
  styleUrls: ['./dataView.component.scss'],
})
export class DataViewComponent implements OnInit, OnDestroy {
  constructor(private _weatherService: CityWeatherService) {}
  /*************
  Location Data 
  *************/
  @Input() lat: number = 0;
  @Input() long: number = 0;
  /*************
  Weather Data 
  *************/
  weather_data: Array<any> = [];
  screenWidth: number = 0;
  isCelsius: boolean = true;
  tempData: any = {
    maxC: 58,
    minC: -88,
    maxF: 136.4,
    minF: -127.4,
  };
  /***********
  Drawing Data 
  ************/
  d3: any;
  svg: any;
  margin = 30;
  height = 500 - this.margin * 2;

  subs: Subscription = new Subscription();
  ngOnInit(): void {
    this.getData();
    let windowWidth = window.innerWidth;
    if (windowWidth > 800) {
      this.screenWidth = windowWidth * 0.4 - this.margin * 2;
    } else {
      this.screenWidth = windowWidth * 0.9 - this.margin * 2;
    }
  }
  /************************************
  Toggle Between Celsius and Fahrenheit 
  ************************************/
  toggleCelsius() {
    this.isCelsius = !this.isCelsius;
    this.svg.selectAll('*').remove();
    this.drawBars(this.weather_data);
  }
  /**************************
  Get Location and Set Values 
  **************************/
  getData() {
    this._weatherService
      .getCityWeather(this.lat, this.long)
      .subscribe((response) => {
        this.weather_data = response.data.weather;
        this.createSvg();
        this.drawBars(this.weather_data);
      });
  }
  /************************
  Create and Draw SVG 
  *************************/
  createSvg(): void {
    this.svg = d3
      .select('figure#bar')
      .append('svg')
      .attr('width', this.screenWidth)
      .attr('height', this.height + this.margin * 3)
      .attr('color', '#283253')
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
  }
  drawBars(data: any[]): void {
    // Create the X-axis band scale
    const x = d3
      .scaleBand()
      .range([10, this.screenWidth])
      .domain(data?.map((d) => d.date))
      .padding(0.2);
    // Draw the X-axis on the DOM
    this.svg
      .append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-20)')
      .style('text-anchor', 'end')
      .style('font-size', '16px');
    // Create the Y-axis band scale
    const y = this.isCelsius
      ? d3
          .scaleLinear()
          .domain([this.tempData.minC, this.tempData.maxC])
          .range([this.height, 0])
      : d3
          .scaleLinear()
          .domain([this.tempData.minF, this.tempData.maxF])
          .range([this.height, 0]);
    // Draw the Y-axis on the DOM
    this.svg.append('g').call(d3.axisLeft(y)).style('font-size', '18px');
    // Create and fill the bars
    if (this.isCelsius) {
      this.svg
        .selectAll('bars')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d: any) => x(d.date))
        .attr('y', (d: any) => y(parseInt(d.maxtempC)))
        .attr('width', x.bandwidth())
        .attr('height', (d: any) => this.height - y(parseInt(d.maxtempC)))
        .attr('fill', '#283253');
    } else {
      this.svg
        .selectAll('bars')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d: any) => x(d.date))
        .attr('y', (d: any) => y(parseInt(d.maxtempF)))
        .attr('width', x.bandwidth())
        .attr('height', (d: any) => this.height - y(parseInt(d.maxtempF)))
        .attr('fill', '#283253');
    }
  }
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
