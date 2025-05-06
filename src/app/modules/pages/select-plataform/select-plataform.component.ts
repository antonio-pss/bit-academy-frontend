import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Router} from '@angular/router';

@Component({
    selector: 'app-select-plataform',
    imports: [
        MatButton
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
