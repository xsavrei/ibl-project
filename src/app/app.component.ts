import { Component } from '@angular/core';
import "reflect-metadata";
import { Observable } from 'rxjs';
import * as uuid from 'uuid';
import { WeatherRequest, WeatherResponse } from './domain';
import { ApiClient } from './services/api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  weatherResponse?: Observable<WeatherResponse>;

  constructor(private apiClient: ApiClient) {
  }

  onFormSubmit(request: WeatherRequest) {
    this.weatherResponse = this.apiClient.query(uuid.v4(), request);
  }
}
