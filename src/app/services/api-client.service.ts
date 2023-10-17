import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, tap } from 'rxjs';
import { WeatherRequest, WeatherResponse } from '../domain';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ApiClient {

  private URL = 'https://ogcie.iblsoft.com/ria/opmetquery'

  constructor(private httpClient: HttpClient, private toastService: ToastService) {
  }

  query(queryId: string, params: WeatherRequest) {
    return this.httpClient.post(this.URL, {
      id: queryId,
      method: 'query',
      params: [params]
    }).pipe(
      tap((response: WeatherResponse) => {
        if(response.error) {
          this.toastService.show(response.error.message, { classname: 'bg-danger', delay: 5000 });
        } else if (!response.error && response.result) {
          this.toastService.show('Weather loaded successfully', {classname: 'bg-success text-light', delay: 5000 })
        }
      }),
      map(response => plainToInstance(WeatherResponse, response)),
    )
  }
}
