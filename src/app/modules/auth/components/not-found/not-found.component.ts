import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Location} from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatIcon
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

  constructor(
      public readonly location: Location
  ) {
  }


  public onNavigate(): void {
    this.location.back();
  }
}
