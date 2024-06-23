import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-swap-shift',
  templateUrl: './swap-shift.component.html',
  styleUrls: ['./swap-shift.component.css']
})
export class SwapShiftComponent implements OnInit {
  date: Date | null = null;
  user: string | null = null;
  requestedShift: string | null = null;
  offeredShift: string | null = null;
  isUrgent: boolean | null = null;
  Trainee: boolean | null = null;

  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar, private router: Router, private datePipe: DatePipe) { }

  // Initializes the component by extracting query parameters from the route
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.date = params['date'] ? new Date(params['date']) : null;
      this.user = params['user'];
      this.requestedShift = params['requestedShift'];
      this.offeredShift = params['offeredShift'];
      this.isUrgent = params['isUrgent'] === 'true';
      this.Trainee = params['Trainee'] === 'true';
    });
  }

  cancel() {
    this.router.navigate(['/home']);
  }

  acceptSwap() {
    this.snackBar.open('Tausch akzeptiert!', '', {
      duration: 3000, 
    });
    this.router.navigate(['/home']);
  }

  getFormattedDate(date: Date | null): string {
    return date ? this.datePipe.transform(date, 'dd.MM.yyyy')! : '';
  }
}
