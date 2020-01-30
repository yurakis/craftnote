import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cn-feature-dialog',
  templateUrl: './feature-dialog.component.html',
  styleUrls: ['./feature-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    public matDialogRef: MatDialogRef<FeatureDialogComponent>,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    const numberValidators = [Validators.required, Validators.min(0)];

    this.form = this.formBuilder.group({
      featureName: [null, Validators.required],
      importance: [null, numberValidators],
      quantity: [null, numberValidators]
    });
  }
}
