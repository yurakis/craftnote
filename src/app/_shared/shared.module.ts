import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InputAutofocusDirective } from './input-autofocus.directive';

const sharedModules = [
  ReactiveFormsModule,
  MatButtonModule,
  MatInputModule,
  MatSnackBarModule
];

const sharedDeclarations = [InputAutofocusDirective];

@NgModule({
  declarations: [...sharedDeclarations],
  imports: [
    CommonModule,
    ...sharedModules
  ],
  exports: [...sharedModules, ...sharedDeclarations]
})
export class SharedModule {}
