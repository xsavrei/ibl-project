import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { BusyIndicatorService } from './busy-indicator.service';

@Injectable()
export class BusyIndicatorInterceptor implements HttpInterceptor {

  constructor(private busyIndicator: BusyIndicatorService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyIndicator.start();

    return next.handle(request).pipe(finalize(() => {
      this.busyIndicator.stop();
    }));
  }
}
