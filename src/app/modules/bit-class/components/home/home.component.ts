import {Component, EventEmitter, Output} from '@angular/core';
import {MATERIAL_IMPORTS} from '../../../../shared/imports/material.imports';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MATERIAL_IMPORTS,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{

  @Output() open = new EventEmitter<boolean>();

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
  ){}

  public onNavigate(action: string) {
    return this.router.navigate([action]).then(
      () => {
        this.open.emit(false);
      },
      (error) => {
        console.error('Erro ao navegar:', error);
        this.toastr.error('Erro ao navegar para a página desejada');
      }
    );
  }
}
