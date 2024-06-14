import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../user.service';
import { validateForm } from '../../validators/form.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  lastName: string = '';
  firstName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  loginEmail: string = '';
  loginPassword: string = '';

  showLogin: boolean = false;

  loginForm: FormGroup;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
    this.loginForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const passwordControl = control.get('password');
    const confirmPasswordControl = control.get('confirmPassword');
    if (passwordControl && confirmPasswordControl) {
      return passwordControl.value === confirmPasswordControl.value
        ? null : { 'mismatch': true };
    }
    return null;
  }

  addUser() {
    validateForm();
  
    const user = {
      lastName: this.lastName,
      firstName: this.firstName,
      email: this.email,
      password: this.password
    };
  
    this.userService.addUser(user).subscribe(response => {
      console.log('Benutzer hinzugefügt:', response);
      this.snackBar.open('Registrierung erfolgreich!', '', { duration: 2000 });
      this.resetForm();
    }, error => {
      if (error.status === 409) {
        this.snackBar.open('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.', '', { duration: 5000 });
      } else {
        console.error('Fehler beim Hinzufügen des Benutzers:', error);
      }
    });
  }
  
  onLogin() {
    validateForm();
  
    const credentials = {
      email: this.loginEmail,
      password: this.loginPassword
    };
  
    this.userService.loginUser(credentials).subscribe(response => {
      console.log('Login erfolgreich:', response);
      // Weitere Login-Logik hier
    }, error => {
      console.error('Fehler beim Login:', error);
    });
  }

  showLoginForm(event: Event) {
    event.preventDefault();
    this.showLogin = true;
  }

  showSignupForm(event: Event) {
    event.preventDefault();
    this.showLogin = false;
  }

  resetForm() {
    this.loginForm.reset();
  }
}
