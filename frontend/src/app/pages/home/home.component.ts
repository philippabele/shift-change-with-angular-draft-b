import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentDate: Date;
  displayedWeeks: any[] = [];

  constructor(private datePipe: DatePipe, private router: Router) {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    this.currentDate = new Date();
    this.loadCalendar();
  }

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

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

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

      currentWeek.push({ date });

      if (i === 13) {
        weeks.push({ days: currentWeek });
      }
    }

    return weeks;
  }

  isToday(date: Date): boolean {
    const today: Date = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  weekdays = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  get currentMonth(): string {
    return this.datePipe.transform(this.currentDate, 'MMMM')!;
  }

  get currentYear(): number {
    return this.currentDate.getFullYear();
  }
}
