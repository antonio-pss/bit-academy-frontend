import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatIcon,
    MatDivider,
    MatSidenav
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  menuItems = [
    { label: 'Início', icon: 'home', route: '/home' },
    { label: 'Perfil', icon: 'person', route: '/perfil' },
    { label: 'Configurações', icon: 'settings', route: '/configuracoes' }
  ];

  constructor(private router: Router) {}

  public onNavigate(action: string) {
    this.router.navigate([action]).then();
  }

  public onLogout() {
    console.log('Deslogando...');
    this.router.navigate(['/login']).then();
  }

}
