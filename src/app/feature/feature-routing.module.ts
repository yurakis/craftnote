import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeatureVisualizationComponent } from './feature-visualization/feature-visualization.component';

const routes: Routes = [{
  path: 'visualization',
  component: FeatureVisualizationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
