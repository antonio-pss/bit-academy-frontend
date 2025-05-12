import {Component, Input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {DecimalPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-class-card',
  imports: [
    NgClass,
    DecimalPipe,
  ],
  templateUrl: './class-card.component.html',
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
