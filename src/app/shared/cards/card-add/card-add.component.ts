import { Component } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-card-add',
  imports: [
    MatCardContent,
    MatIcon,
    MatCard
  ],
  templateUrl: './card-add.component.html',
  styleUrl: './card-add.component.scss'
})
export class CardAddComponent {

}
