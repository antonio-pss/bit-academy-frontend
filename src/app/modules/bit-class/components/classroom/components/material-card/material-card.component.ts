import {Component, Input} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../../../shared/imports/material.imports';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-material-card',
  imports: [
    ...MATERIAL_IMPORTS,
    NgClass
  ],
  standalone: true,
  templateUrl: './material-card.component.html',
  styleUrl: './material-card.component.scss'
})
export class MaterialCardComponent {
  @Input() material!: any;

}
