import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-platform-selector',
  imports: [
    MatButton
  ],
  templateUrl: './platform-selector.component.html',
  styleUrl: './platform-selector.component.scss'
})
export class PlatformSelectorComponent {
  public titleTxt: string = 'Escolha a plataforma';
  public bitSchoolName: string = 'BitSchool';
  public bitClassName: string = 'BitClass';
  public bitNotesName: string = 'BitNotes';


  constructor(private readonly router: Router,
              private readonly toastr: ToastrService) { }

  public onNavigate(action: string) {
    return this.router.navigate([action]).then();
  }
}
