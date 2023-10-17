import { Component, Input } from '@angular/core';
import { BriefingResult } from '../../domain';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

  @Input() results?: BriefingResult[];

  constructor() {
  }

  processResults(data: BriefingResult[]) {
    const groupedData: { [stationId: string]: { stationId: string, results: BriefingResult[] } } = {};

    data.forEach(brief => {
      if (brief.stationId) {
        if (!groupedData[brief.stationId]) {
          groupedData[brief.stationId] = {
            stationId: brief.stationId,
            results: [brief]
          };
        } else {
          groupedData[brief.stationId].results.push(brief);
        }
      }
    })
    return Object.values(groupedData);
  }
}
