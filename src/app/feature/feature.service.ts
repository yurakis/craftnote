import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection } from '@angular/fire/firestore/collection/collection';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as d3 from 'd3/dist/d3.min';
import { switchMap } from 'rxjs/operators';

import { FeatureDialogComponent } from './feature-dialog/feature-dialog.component';
import { Feature } from './feature.model';

@Injectable()
export class FeatureService {
  private features: Feature[];

  constructor(
    private angularFirestore: AngularFirestore,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  public get featuresCollection(): AngularFirestoreCollection<Feature> {
    return this.angularFirestore.collection<Feature>('Feature');
  }

  public openFeatureDialog(): void {
    this.dialog
      .open<unknown, unknown, Feature>(FeatureDialogComponent, {width: '500px'})
      .afterClosed()
      .pipe(switchMap((feature) => this.featuresCollection.add(feature)))
      .subscribe(() => this.matSnackBar.open('Feature has been added successfully', 'OK', {duration: 3000}));
  }

  public appendBarChart(container: HTMLElement, features: Feature[] = this.features): void {
    const width = container.clientWidth;
    const height = container.clientHeight;
    const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);
    const margin = {top: 20, right: 0, bottom: 30, left: 40};
    const x = d3.scaleBand()
      .domain(d3.range(features.length))
      .range([margin.left, width - margin.right])
      .padding(0.1);
    const y = d3.scaleLinear()
      .domain([0, d3.max(features, d => d.quantity)]).nice()
      .range([height - margin.bottom, margin.top]);

    container.innerHTML = '';

    svg.append('g')
      .attr('fill', 'steelblue')
      .selectAll('rect')
      .data(features.sort((a, b) => b.quantity - a.quantity))
      .join('rect')
      .attr('x', (d, i) => x(i))
      .attr('y', d => y(d.quantity))
      .attr('height', d => y(0) - y(d.quantity))
      .attr('width', x.bandwidth());

    svg.append('g').call(
      (g) => g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat(i => features[i].featureName).tickSizeOuter(0))
    );

    svg.append('g').call(
      (g) => g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call((innerG) => innerG.select('.domain').remove())
    );

    this.features = features;
    container.appendChild(svg.node());
  }
}
