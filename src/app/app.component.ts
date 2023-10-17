import { Component } from '@angular/core';
import { WeatherRequest } from './domain';
import { ApiClient } from './services/api-client.service';
import * as uuid from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private apiClient: ApiClient) {
  }

  onFormSubmit(request: WeatherRequest) {
    this.apiClient.query(uuid.v4(), request).subscribe(res => {
      console.log(res)
    })
  }
}
