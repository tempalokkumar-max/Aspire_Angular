import { Component, OnInit, signal } from '@angular/core';
import {
  WeatherService,
  WeatherForecast
} from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  weatherData: WeatherForecast[] = [];
  loading = false;
  error = '';
  useCelsius = false;

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.fetchWeatherForecast();
  }

  fetchWeatherForecast(): void {
    this.loading = true;
    this.error = '';

    this.weatherService.getWeatherForecast().subscribe({
      next: (data) => {
        this.weatherData = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Weather API error:', err);
        this.error = 'Unable to load weather forecast.';
        this.loading = false;
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString(undefined, {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }
}
