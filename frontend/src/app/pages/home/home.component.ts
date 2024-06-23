import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

interface Shift {
  date: Date;
  isSwapShift: boolean;
  isUrgent?: boolean;
  Trainee?: boolean;
  user?: string;
  requestedShift?: string;
  offeredShift?: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentDate: Date;
  displayedWeeks: any[] = [];
  swapShifts: Shift[] = [];

  weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  constructor(private datePipe: DatePipe, private router: Router) {
    this.currentDate = new Date();
  }

  // Loads swap shifts and initializes the calendar view on component initialization.
  ngOnInit(): void {
    this.currentDate = new Date();
    this.swapShifts = [
      { date: new Date(this.currentDate.getFullYear(), 5, 25), isSwapShift: true, user: 'FT', requestedShift: 'Frühschicht', offeredShift: '10:45', isUrgent: true, Trainee: true },
      { date: new Date(this.currentDate.getFullYear(), 5, 28), isSwapShift: true, user: 'AT', requestedShift: 'spät', offeredShift: '05:45' },
      { date: new Date(this.currentDate.getFullYear(), 6, 2), isSwapShift: true, user: 'YW', requestedShift: 'früher', offeredShift: '10:45' }
    ];
    this.loadCalendar();
  }

  // Translates English month names to German month names.
  getGermanMonthName(englishMonthName: string): string {
    const monthNames: { [key: string]: string } = {
      'January': 'Januar',
      'February': 'Februar',
      'March': 'März',
      'April': 'April',
      'May': 'Mai',
      'June': 'Juni',
      'July': 'Juli',
      'August': 'August',
      'September': 'September',
      'October': 'Oktober',
      'November': 'November',
      'December': 'Dezember'
    };

    return monthNames[englishMonthName];
  }

  // Retrieves the German name of the month of the first date displayed in the calendar.
  getFirstDateGermanMonthName(): string {
    if (this.displayedWeeks.length > 0 && this.displayedWeeks[0].days.length > 0) {
      const firstDate = this.displayedWeeks[0].days[0].date;
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const firstDateEnglishMonthName = monthNames[firstDate.getMonth()];
      return this.getGermanMonthName(firstDateEnglishMonthName);
    }
    return '';
  }

  previousWeeks() {
    this.currentDate.setDate(this.currentDate.getDate() - 14);
    this.loadCalendar();
  }

  nextWeeks() {
    this.currentDate.setDate(this.currentDate.getDate() + 14);
    this.loadCalendar();
  }

  add() {
    this.router.navigate(['/add-shift']);
  }

  loadCalendar() {
    const startDate = this.getStartOfWeek(this.currentDate);
    this.displayedWeeks = this.getTwoWeeks(startDate);
  }

  // Calculates the start of the week for a given date, adjusting for weeks starting on Monday.
  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  // Generates an array representing two weeks starting from a given date, including any swap shifts.
  getTwoWeeks(startDate: Date): any[] {
    const weeks = [];
    let currentWeek = [];

    for (let i = 0; i < 14; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      if (date.getDay() === 1 && currentWeek.length) {
        weeks.push({ days: currentWeek });
        currentWeek = [];
      }

      const swapShift = this.swapShifts.find(shift => 
        shift.date.getDate() === date.getDate() &&
        shift.date.getMonth() === date.getMonth() &&
        shift.date.getFullYear() === date.getFullYear()
      );

      currentWeek.push({ date, ...swapShift });

      if (i === 13) {
        weeks.push({ days: currentWeek });
      }
    }

    return weeks;
  }

  // Determines if a given date is today based on day, month, and year comparison.
  isToday(date: Date): boolean {
    const today: Date = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  get currentMonth(): string {
    return this.datePipe.transform(this.currentDate, 'MMMM')!;
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }

  // Navigates to the swap-shift page with query parameters for the selected shift.
  goToAcceptSwap(shift: Shift) {
    this.router.navigate(['/swap-shift'], { queryParams: { date: shift.date, user: shift.user, requestedShift: shift.requestedShift, offeredShift: shift.offeredShift, isUrgent: shift.isUrgent, Trainee: shift.Trainee } });
  }
}
