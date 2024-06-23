import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-shift',
  templateUrl: './add-shift.component.html',
  styleUrls: ['./add-shift.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddShiftComponent implements OnInit {
  schichtForm: FormGroup = this.fb.group({});
  today = new Date();

  constructor(private fb: FormBuilder, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.schichtForm = this.fb.group({
      geboteneSchicht: ['', Validators.required],
      gesuchteSchicht: ['', Validators.required],
      datum: ['', Validators.required],
      customTimeOffered: [null],
      customTimeRequested: [null],
      trainee: [false],
      dringend: [false],
      kommentar: ['']
    }, { validators: this.commentRequiredForEarlierOrLater });
  }

  // Validates that a comment is required if either the offered or requested shift is 'earlier' or 'later'.
  commentRequiredForEarlierOrLater(control: AbstractControl): ValidationErrors | null {
    const offeredShift = control.get('geboteneSchicht');
    const requestedShift = control.get('gesuchteSchicht');
    const comment = control.get('kommentar');
  
    if (offeredShift && requestedShift && comment && 
        ((offeredShift.value === 'früher' || offeredShift.value === 'später') || 
         (requestedShift.value === 'früher' || requestedShift.value === 'später')) && 
        !comment.value) {
      return { commentRequired: true };
    }
    return null;
  }

  onSubmit() {
    if (this.schichtForm.valid) {
        console.log(this.schichtForm.value);
        this.snackBar.open('Tauschangebot wurde erstellt', '', {
          duration: 2000,
     });
        this.router.navigate(['/home']);
    }
}

  onCancel() {
    this.schichtForm.reset();
    this.router.navigate(['/home']);
  }
}