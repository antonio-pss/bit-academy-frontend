import { Component } from '@angular/core';
import {ClassListComponent} from './class-list/class-list.component';
import {MaterialsListComponent} from './materials-list/materials-list.component';

@Component({
  selector: 'app-home',
  imports: [
    ClassListComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
