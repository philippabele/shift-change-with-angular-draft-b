import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['/login'], { state: { showLogin: true } });
    this.snackBar.open('Logout erfolgreich', '', {
      duration: 2000,
    });
  }
}