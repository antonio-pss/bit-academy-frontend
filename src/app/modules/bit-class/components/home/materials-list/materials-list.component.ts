import { Component } from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-materials-list',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './materials-list.component.html',
  styleUrl: './materials-list.component.scss'
})
export class MaterialsListComponent {

}
