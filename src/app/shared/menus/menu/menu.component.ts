import {Component} from '@angular/core';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    MatSidenav,
    MatSidenavContent,
    FormsModule,
    MatSidenavContainer,
    MatButton, MatSidenavModule, MatCheckboxModule, FormsModule, MatButtonModule, MatListItem, MatNavList, MatIcon
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent{

  constructor(private router: Router,) {  }

  public  events: string[] = [];
  public  opened: boolean | undefined;
  public  listaDeMenus = [
    {menu: 'Minhas salas', icon: 'home', routee: 'http://localhost:4200/auth/login'},
    {menu: 'Material', icon: 'description', routee: 'http://localhost:4200/auth/login'},
    {menu: 'Avaliações', icon: 'task', routee: 'http://localhost:4200/auth/login'},
    {menu: 'Calendário', icon: 'event_available', routee: 'http://localhost:4200/auth/login'},
  ];

  public trackByIndex(index: number) {
    return index;
  }

  public onNavigate(action: string) {
    return this.router.navigate([action]).then();
  }

  public logout() {
    try {
      localStorage.clear();
      this.router.navigate(['/login']).then(r => console.log('Logout realizado com sucesso!'));
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }

}
