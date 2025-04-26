import { Component } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';

@Component({
  selector: 'app-card',
  imports: [
    MatCard,
    MatCardContent
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public variavel = "aqui vai o valor(disciplina ou material)"
}
