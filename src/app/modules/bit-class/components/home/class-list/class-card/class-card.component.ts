import { Component, Input } from '@angular/core';
import { NgClass, DecimalPipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Classroom} from '../../../../../../shared/models/class';
import {WeekDayLabel} from '../../../../../../shared/models/week-day-label';
import {WeekDay} from '../../../../../../shared/models/week-day';

@Component({
  selector: 'app-class-card',
  standalone: true,
  imports: [NgClass, DecimalPipe, MatCardContent, MatCard],
  templateUrl: './class-card.component.html',
  styleUrl: './class-card.component.scss'
})
export class ClassCardComponent {
  @Input() classroom!: Classroom; // O card espera o objeto inteiro

  @Input() studentCount?: number = 0;
  @Input() gradeAverage?: number = 0;
  @Input() assignmentsCount?: number = 0;
  @Input() progressPercentage?: number = 0;
  @Input() status?: string = 'Active';

  public weekDayLabels = WeekDayLabel;

  get daysDisplay(): string {
    // Prioriza days_display se vier pronto do backend
    if (this.classroom?.days_display?.length) {
      return this.classroom.days_display.join(', ');
    }
    // Caso não venha, converte o array de codes com o enum
    if (this.classroom?.days_per_week?.length) {
      return this.classroom.days_per_week
        .map(day => this.weekDayLabels[day as WeekDay])
        .join(', ');
    }
    return 'Não agendado';
  }

  showClassData() {
    console.log(this.classroom);
  }
}
