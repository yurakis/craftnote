import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthFormComponent } from './auth-form/auth-form.component';
import { AuthType } from './auth-type.enum';

const routes: Routes = [
  {
    path: AuthType.SignIn,
    component: AuthFormComponent
  },
  {
    path: AuthType.SignUp,
    component: AuthFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
