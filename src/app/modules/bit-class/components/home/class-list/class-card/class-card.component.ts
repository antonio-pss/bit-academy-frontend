import { Component, Input } from '@angular/core';
import {NgClass, DecimalPipe, NgIf} from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Class } from '../../../../../../shared/models/bit-class-models/class';
import {WeekDayLabel} from '../../../../../../shared/models/bit-class-models/week-day-label';
import {WeekDay} from '../../../../../../shared/models/bit-class-models/week-day';

@Component({
  selector: 'app-class-card',
  standalone: true,
  imports: [NgClass, DecimalPipe, MatCardContent, MatCard, NgIf],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss'
})
export class ClassCardComponent {
  @Input() classroom!: Class;
  @Input() studentCount?: number = 0;
  @Input() gradeAverage?: number = 0;
  @Input() assignmentsCount?: number = 0;
  @Input() progressPercentage?: number = 0;

  public weekDayLabels = WeekDayLabel;

  get daysDisplay(): string {
    if (this.classroom?.days_display?.length) {
      return this.classroom.days_display.join(', ');
    }
    if (this.classroom?.days_per_week?.length) {
      return this.classroom.days_per_week
        .split(',')
        .map(day => this.weekDayLabels[day as WeekDay])
        .join(', ');
    }
    return 'Não agendado';
  }

  get status(): string {
    // Considera 'Active' se is_active (ou active) for true, senão 'Deactivated'
    return this.classroom?.active ?? this.classroom?.active ? 'Active' : 'Deactivated';
  }

  get badgeClass(): string {
    return this.status === 'Active'
      ? 'badge-success'
      : 'badge-danger';
  }

  showClassData() {
    console.log(this.classroom);
  }

}
