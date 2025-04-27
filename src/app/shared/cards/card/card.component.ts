import {Component} from '@angular/core';
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

    listaDeVariaveis: string[] = [
        'Geografia',
        'História',
        'Lógica',
        'Python',
        'Redes',
        'Ingles',
        'Portugues',
        'Matematica',
        'Fisica',
        'Quimica',
        'Biologia',
        'Sociologia',
        'Filosofia',
        'Artes',
        'Educacao Fisica',
        'Educacao Musical',
    ];
}
