import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {MatCard} from '@angular/material/card';

@Component({
    selector: 'app-select-plataform',
  imports: [
    MatCard
  ],
    templateUrl: './select-plataform.component.html',
    styleUrl: './select-plataform.component.scss'
})
export class SelectPlataformComponent {
    public titleTxt: string = 'Escolha a plataforma';

    public bitSchoolName: string = 'BitSchool';
    public bitClassName: string = 'BitClass';
    public bitNotesName: string = 'BitNotes';


    constructor(private readonly router: Router) {}

    public onNavigate(action: string) {
        return this.router.navigate([action]).then()
    }
}
