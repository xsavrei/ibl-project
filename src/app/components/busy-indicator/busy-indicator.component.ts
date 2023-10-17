import { Component } from '@angular/core';
import { BusyIndicatorService } from '../../services/busy-indicator.service';

@Component({
  selector: 'app-busy-indicator',
  templateUrl: './busy-indicator.component.html',
  styleUrls: ['./busy-indicator.component.scss']
})
export class BusyIndicatorComponent {

  constructor(public busyService: BusyIndicatorService) {
  }

}
