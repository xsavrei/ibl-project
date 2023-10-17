import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusyIndicatorService {

  private isBusy = new BehaviorSubject<boolean>(false);
  private runningRequestCount = 0;

  readonly isBusy$ = this.isBusy.asObservable();

  start() {
    this.runningRequestCount ++;
    this.isBusy.next(true);
  }

  stop() {
    if (this.runningRequestCount > 0) {
      this.runningRequestCount --;
    }

    if (this.runningRequestCount === 0) {
      this.isBusy.next(false);
    }
  }
}
