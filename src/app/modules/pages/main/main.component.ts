import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatToolbar} from '@angular/material/toolbar';

@Component({
  selector: 'app-main',
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    MatNavList,
    MatListItem,
    MatIcon,
    MatDivider,
    MatSidenav,
    MatToolbar
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  menuItems = [
    {label: 'Início', icon: 'home', route: '/home'},
    {label: 'Calendário', icon: 'calendar_month', route: '/calendario'},
    {label: 'Material', icon: 'book_2', route: '/material'},
    {label: 'Avaliação', icon: 'library_books', route: '/avaliacao'},
    {label: 'Perfil', icon: 'person', route: '/perfil'},
    {label: 'Configurações', icon: 'settings', route: '/configuracoes'}
  ];

  public currentTitle: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        const menuItem = this.menuItems.find(item => item.route === currentRoute);
        this.currentTitle = menuItem ? menuItem.label : 'Página não encontrada';
      }
    });
  }

  public onNavigate(action: string) {
    this.router.navigate([action]).then();
  }

  public onLogout() {
    console.log('Deslogando...');
    this.router.navigate(['/login']).then();
  }

}
