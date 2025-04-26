// import { Component } from '@angular/core';
// import {MatCard} from '@angular/material/card';
// import {MatCalendar} from '@angular/material/datepicker';
//
// @Component({
//   selector: 'app-calendary',
//   imports: [
//     MatCard,
//     MatCalendar
//   ],
//   templateUrl: './calendary.component.html',
//   styleUrl: './calendary.component.scss'
// })
// export class CalendaryComponent {
//
// }
import {ChangeDetectionStrategy, Component, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

/** @title Datepicker inline calendar example */
@Component({
  selector: 'datepicker-inline-calendar-example',
  templateUrl: 'datepicker-inline-calendar-example.html',
  styleUrl: 'datepicker-inline-calendar-example.css',
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerInlineCalendarExample {
  selected = model<Date | null>(null);
}
