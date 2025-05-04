import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(private readonly router:Router) {
  }

  public onNavigate(action:string){
    this.router.navigate([action]).then()
  }
}
