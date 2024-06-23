import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent {
  settingsForm: FormGroup;
  currentUser = {
    firstName: 'Max', // Beispiel-Vorname
    lastName: 'Doe', // Beispiel-Nachname
    email: 'beispiel@domain.com', // Beispiel-E-Mail-Adresse
  };

  constructor(private snackBar: MatSnackBar, private router: Router, private authService: AuthService) {
    this.settingsForm = new FormGroup({
      lastName: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  logout() {
    this.authService.logout();
  }

  changeData() {
    if (this.settingsForm.valid) {
      console.log('Data changed');

      this.snackBar.open('Daten wurde erfolgreich geändert', '', {
        duration: 2000,
      });
    } else {
      this.snackBar.open('Bitte füllen Sie alle Felder aus!', '', {
        duration: 2000,
      });
    }
  }
  /*currentUser: any;

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }*/

}
