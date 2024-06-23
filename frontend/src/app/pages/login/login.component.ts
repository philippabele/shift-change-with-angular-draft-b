import { Component } from '@angular/core';
import { AbstractControl, ValidationErrors, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordStrengthValidator } from '../../validators/password.validator';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
/*import { StorageService } from '../../services/storage.service';*/

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  registerForm: any = {
    lastName: null,
    firstName: null,
    email: null,
    password: null,
    confirmPassword: null
  };

  loginForm: any = {
    email: null,
    password: null
  };

  showLogin: boolean = true;
  showPassword: boolean = false;
  registrationSubmitted: boolean = false;
  loginSubmitted: boolean = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private router: Router, private authService: AuthService) {
    this.registerForm = new FormGroup({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, PasswordStrengthValidator]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
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
    this.registrationSubmitted = true;

    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.userService.addUser(user).subscribe(response => {
        console.log('Benutzer hinzugefügt:', response);
        this.snackBar.open('Registrierung erfolgreich!', '', { duration: 2000 });
        this.resetForm();
        this.showLoginForm(new Event('click'));
      }, error => {
        if (error.status === 409) {
          this.snackBar.open('Ein Benutzer mit dieser E-Mail-Adresse existiert bereits.', '', { duration: 5000 });
        } else {
          console.error('Fehler beim Hinzufügen des Benutzers:', error);
          this.snackBar.open('Das Fomular ist ungültig, bitte Eingabe überprüfen!', '', { duration: 2000 });
        }
      });
    }
  }

  onLogin() {
    this.loginSubmitted = true;

    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;

      this.userService.loginUser(credentials).subscribe(response => {
        console.log('Login erfolgreich:', response);
        this.router.navigate(['/home']);
      }, error => {
        console.error('Fehler beim Login:', error);
        this.snackBar.open('Das Fomular ist ungültig, bitte Eingabe überprüfen!', '', { duration: 2000 });
      });
    }
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
    this.registerForm.reset();
    this.loginForm.reset();
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  reloadPage(): void {
    window.location.reload();
  }
  /*
    ngOnInit(): void {
      if (this.storageService.isLoggedIn()) {
        this.isLoggedIn = true;
      }
    }
       
    registerOnSubmit(): void {
      const { lastName, firstName, email, password } = this.registerForm;
  
      this.authService.register(lastName, firstName, email, password).subscribe({
        next: data => {
          console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.snackBar.open('Registrierung erfolgreich!', '', { duration: 2000 });
          this.showLoginForm(new Event('click'));
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        }
      });
    }
  
    loginOnSubmit(): void {
      const { username, password } = this.loginForm;
  
      this.authService.login(username, password).subscribe({
        next: data => {
          this.storageService.saveUser(data);
  
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.reloadPage();
        },
        error: err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }*/
}
