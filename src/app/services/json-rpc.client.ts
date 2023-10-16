import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JsonRpcClient {

  constructor(private httpClient: HttpClient) {

  }

  query(url: string, params: any) {
    this.httpClient.post(url, {
      id: 'id',
      method: 'query',
      params: params
    })
  }
}
