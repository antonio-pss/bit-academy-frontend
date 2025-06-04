import {Component, Input} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-student-card',
  imports: [
    ...MATERIAL_IMPORTS,
    NgClass,
  ],
  standalone: true,
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input() student!: {
    name: string;
    initials: string;
    average: string;
    activitiesCompleted: string;
    attendance: string;
    performance: string
  }

}
