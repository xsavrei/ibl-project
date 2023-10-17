import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherRequest } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class ApiClient {

  private URL = 'https://ogcie.iblsoft.com/ria/opmetquery'

  constructor(private httpClient: HttpClient) {

  }

  query(queryId: string, params: WeatherRequest) {
    return this.httpClient.post(this.URL, {
      id: queryId,
      method: 'query',
      params: [params]
    });
  }
}
