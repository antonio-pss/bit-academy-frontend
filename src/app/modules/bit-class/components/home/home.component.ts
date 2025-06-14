import { Component } from '@angular/core';
import {ClassListComponent} from './class-list/class-list.component';
import {MaterialsListComponent} from './materials-list/materials-list.component';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';

@Component({
  selector: 'app-home',
  imports: [
    ClassListComponent,
    MATERIAL_IMPORTS,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
