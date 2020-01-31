import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { IsAliveComponent } from '../../_core';
import { AuthType } from '../auth-type.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cn-sign-in',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent extends IsAliveComponent implements OnInit {
  form: FormGroup;
  isSignUp: boolean;
  formMetadata: {
    questionText: string;
    linkPath: string;
    linkLabel: string;
    primaryButtonText: string;
  };
  isLoading = false;
  private readonly emailRegExp = /^[\w.-]+@[a-z0-9-]+\.[a-z]{2,}$/i;
  private readonly passwordRegExp = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,}$/;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.isSignUp = this.activatedRoute.snapshot.url[0].path === AuthType.SignUp;
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, this.generateValidator('email address', this.emailRegExp)]],
      password: [null, [Validators.required, this.generateValidator('password', this.passwordRegExp)]],
    });
    this.setUpRepeatEmailFormControl();
    this.setFormFooterData();
  }

  submit() {
    const {email, password} = this.form.value;

    this.isLoading = true;
    this.authService
      .authenticate(email, password, this.isSignUp)
      .finally(() => {
        this.isLoading = false;
        this.changeDetector.markForCheck();
      });
  }

  private setFormFooterData() {
    this.formMetadata = this.isSignUp ?
      {
        questionText: 'Already have an account?',
        linkPath: '../sign-in',
        linkLabel: 'Sign in',
        primaryButtonText: 'Sign up'
      } :
      {
        questionText: 'Don\'t have an account?',
        linkPath: '../sign-up',
        linkLabel: 'Sign up',
        primaryButtonText: 'Sign in'
      };
  }

  private setUpRepeatEmailFormControl() {
    if (!this.isSignUp) {
      return;
    }

    const passwordControl = this.form.get('password');
    const repeatPasswordControl = new FormControl(null, [
      Validators.required,
      (formControl: FormControl) => formControl.value !== passwordControl.value ? {validation: 'Passwords must match'} : null
    ]);
    const updateRepeatPasswordControlState = () => repeatPasswordControl[passwordControl.invalid ? 'disable' : 'enable']();

    this.form.addControl('repeatPassword', repeatPasswordControl);

    passwordControl.statusChanges
      .pipe(this.takeWhile())
      .subscribe(() => updateRepeatPasswordControlState());
    updateRepeatPasswordControlState();
  }

  private generateValidator(inputName: string, regexp: RegExp): ValidatorFn {
    return (formControl: FormControl) => {
      const value = formControl.value;

      return value && !regexp.test(value) ? {validation: `Please enter a valid ${inputName}`} : null;
    };
  }
}
