import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { IsAliveComponent } from '../../_core';
import { FeatureService } from '../feature.service';

@Component({
  selector: 'cn-feature-visualization',
  templateUrl: './feature-visualization.component.html',
  styleUrls: ['./feature-visualization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureVisualizationComponent extends IsAliveComponent implements AfterViewInit {
  @ViewChild('chartContainer', {static: true}) chartContainer: ElementRef<HTMLDivElement>;

  constructor(private featureService: FeatureService) {
    super();
  }

  ngAfterViewInit(): void {
    this.featureService.featuresCollection
      .valueChanges()
      .pipe(this.takeWhile())
      .subscribe((features) => this.featureService.appendBarChart(this.chartContainer.nativeElement, features));

    fromEvent(window, 'resize')
      .pipe(
        this.takeWhile(),
        debounceTime(500)
      )
      .subscribe(() => this.featureService.appendBarChart(this.chartContainer.nativeElement));
  }

  openFeatureDialog() {
    this.featureService.openFeatureDialog();
  }
}
