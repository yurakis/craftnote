import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private matSnackBar: MatSnackBar
  ) {}

  authenticate(email: string, password: string, isSignUp: boolean): Promise<void> {
    let message: string;
    let buttonLabel: string;

    return this.angularFireAuth.auth[isSignUp ? 'createUserWithEmailAndPassword' : 'signInWithEmailAndPassword'](email, password)
      .then(({user}) => {
        message = `Successfully authenticated with ${email}`;
        buttonLabel = 'OK';
      })
      .catch((error) => {
        message = error.message;
        buttonLabel = 'Dismiss';
      })
      .finally(() => this.matSnackBar.open(message, buttonLabel, {duration: 5000}));
  }
}
