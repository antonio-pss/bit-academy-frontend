import {Component, Input} from '@angular/core';

import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {Class} from '../../../../shared/models/bit-class-models/class';
import {WeekDayLabel} from '../../../../shared/models/bit-class-models/week-day-label';
import {WeekDay} from '../../../../shared/models/bit-class-models/week-day';
import {DecimalPipe, NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-class',
  imports: [
    MATERIAL_IMPORTS,
    DecimalPipe,
    NgIf,
    NgClass
  ],
  templateUrl: './class.component.html',
  styleUrl: './class.component.scss'
})
export class ClassComponent{
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
    return this.classroom?.active === false
      ? 'Deactivated'
      : 'Active';
  }

  public get badgeClass(): string {
    return this.status === 'Active'
      ? 'badge-success'
      : 'badge-danger';
  }

  public showClassData() {
    console.log(this.classroom);
  }
}
