import {Component, Input} from '@angular/core';
import {DecimalPipe, NgClass} from '@angular/common';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-class-card',
  imports: [
    NgClass,
    DecimalPipe,
    MatCardContent,
    MatCard,
  ],
  templateUrl: './class-card.component.html',
  standalone: true,
  styleUrl: './class-card.component.scss'
})
export class ClassCardComponent {
  @Input() title: string = '';
  @Input() schedule: string = '';
  @Input() studentCount: number = 0;
  @Input() gradeAverage: number = 0;
  @Input() assignmentsCount: number = 0;
  @Input() progressPercentage: number = 0;
  @Input() status: string = 'Active';
  @Input() id: number = 0;

}
