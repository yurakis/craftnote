import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cn-sign-in',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  form: FormGroup;
  isSignUp: boolean;
  formFooterData: {
    questionText: string;
    linkPath: string;
    linkLabel: string;
    primaryButtonText: string;
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.isSignUp = this.activatedRoute.snapshot.url[0].path === 'sign-up';
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.setRepeatEmailFormControl();
    this.setFormFooterData();
  }

  private setFormFooterData() {
    this.formFooterData = this.isSignUp ?
      {
        questionText: 'Already signed up?',
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

  private setRepeatEmailFormControl() {
    if (!this.isSignUp) {
      return;
    }

    this.form.addControl('repeatPassword', new FormControl(null, Validators.required));
  }
}
