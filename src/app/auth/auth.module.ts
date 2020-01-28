import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule } from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AuthModule {}
