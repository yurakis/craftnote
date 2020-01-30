import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MatDialogModule } from '@angular/material/dialog';

import { SharedModule } from '../_shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureVisualizationComponent } from './feature-visualization/feature-visualization.component';
import { FeatureService } from './feature.service';
import { FeatureDialogComponent } from './feature-dialog/feature-dialog.component';


@NgModule({
  declarations: [
    FeatureVisualizationComponent,
    FeatureDialogComponent
  ],
  entryComponents: [FeatureDialogComponent],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    AngularFirestoreModule,
    SharedModule,
    MatDialogModule
  ],
  providers: [FeatureService]
})
export class FeatureModule {}
