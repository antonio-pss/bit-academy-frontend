import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';

@Component({
  selector: 'app-student-card',
  imports: [
    ...MATERIAL_IMPORTS,
    NgClass,
  ],
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
