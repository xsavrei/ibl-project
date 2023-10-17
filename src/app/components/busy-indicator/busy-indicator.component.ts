import { Component, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BusyIndicatorService } from '../../services/busy-indicator.service';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent implements OnInit{

  private timeoutHandle: any;

  isVisible = false;

  constructor(public busyService: BusyIndicatorService) {
  }

  ngOnInit(): void {
    this.busyService.isBusy$.pipe(takeUntilDestroyed())
      .subscribe(isBusy => {
        if(isBusy){
        this.timeoutHandle = setTimeout(() => { this.isVisible = true;  }, 1000);
        }
        if (!isBusy && this.timeoutHandle) {
          clearTimeout(this.timeoutHandle);
        }
        if (!isBusy) {
          this.isVisible = false;
        }
      })
  }

}
