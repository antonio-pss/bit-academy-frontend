import { Component } from '@angular/core';
import {GeneralService} from '../../../../shared/services/general.service';
import {User} from '../../../../shared/models/user';
import {MatIcon} from '@angular/material/icon';
import {MatFabButton} from '@angular/material/button';
import {MatCard, MatCardHeader} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-profile',
  imports: [
    MatIcon,
    MatFabButton,
    MatCard,
    MatListModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent extends GeneralService{

}
