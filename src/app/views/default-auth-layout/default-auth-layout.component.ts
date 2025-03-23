import { Component } from '@angular/core';
import {MatCard} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-default-auth-layout',
  imports: [
    MatCard,
    MatDivider
  ],
  templateUrl: './default-auth-layout.component.html',
  styleUrl: './default-auth-layout.component.scss'
})
export class DefaultAuthLayoutComponent {

}
