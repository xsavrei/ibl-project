import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BriefingResult } from '../../domain';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultsComponent {

  @Input() results?: BriefingResult[];

  constructor(private domSanitizer: DomSanitizer) {
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

  highlightText(text?: string) {
    const patterns = [
      { pattern: /(\s[A-Z]{3}0[3-9]\d)/g, replace: '<span style="color: red">$1</span>' },
      { pattern: /(\s[A-Z]{3}0[0-2]\d)/g, replace: '<span style="color: blue">$1</span>' },
    ]
    if (text) {
      patterns.forEach(pattern => {
        text = text?.replace(pattern.pattern, pattern.replace);
      })
      return this.domSanitizer.bypassSecurityTrustHtml(text);
    }
    return null;
  }
}
