import {Component} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthBaseService} from '../../../shared/services/auth-base.service';
import {ToastrService} from 'ngx-toastr';

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
    {label: 'Início', icon: 'home', route: '#'},
    {label: 'Minhas salas', icon: 'co_present', route: '#'},
    {label: 'Calendário', icon: 'calendar_month', route: '#'},
    {label: 'Material', icon: 'book_2', route: '#'},
    {label: 'Avaliação', icon: 'library_books', route: '#'},
    {label: 'Perfil', icon: 'person', route: '#'},
    {label: 'Configurações', icon: 'settings', route: '#'}
  ];

  public currentTitle: string = '';

  constructor(private readonly router: Router,
              private readonly authService: AuthBaseService,
              private readonly toastr: ToastrService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        const menuItem = this.menuItems.find(item => item.route === currentRoute);
        this.currentTitle = menuItem ? menuItem?.label : 'Página não encontrada';
      }
    });
  }

  public onNavigate(action: string) {
    this.router.navigate([action]).then();
  }

  public onLogout() {
    this.authService.logout()
    this.toastr.info('Você saiu com sucesso!', 'Logout')
    this.router.navigate(['auth/login']).then();
  }

}
