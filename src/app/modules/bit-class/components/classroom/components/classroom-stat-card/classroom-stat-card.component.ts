import {Component, Input} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-classroom-stat-card',
  imports: [
    MATERIAL_IMPORTS,
    NgClass
  ],
  templateUrl: './classroom-stat-card.component.html',
  styleUrl: './classroom-stat-card.component.scss'
})
export class ClassroomStatCardComponent {
  @Input() title: string = '';
  @Input() value: number = 0;
  @Input() trend: 'up' | 'down' | 'neutral' = 'neutral';
  @Input() change: string = '';
  public isPercentage: boolean = true;


}
