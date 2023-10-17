import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { BusyIndicatorService } from './busy-indicator.service';

@Injectable()
export class BusyIndicatorInterceptor implements HttpInterceptor {

  constructor(private busyIndicator: BusyIndicatorService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.busyIndicator.start();

    return next.handle(request).pipe(tap({
      next: (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.busyIndicator.stop();
        }
      }, error: () => {
        this.busyIndicator.stop();
      }
    }));
  }
}
