import {Component, Input} from '@angular/core';
import {NgClass} from '@angular/common';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';

@Component({
  selector: 'app-activity-card',
  imports: [
    ...MATERIAL_IMPORTS,
    NgClass,
  ],
  standalone: true,
  templateUrl: './activity-card.component.html',
  styleUrl: './activity-card.component.scss'
})
export class ActivityCardComponent {
  @Input() activity!: {
    title: string;
    description: string;
    date: string;
    completed: string;
    status: string }

}
