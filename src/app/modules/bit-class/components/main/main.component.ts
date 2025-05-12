import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {MatListItem, MatNavList} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {MatDivider} from '@angular/material/divider';
import {MatToolbar} from '@angular/material/toolbar';
import {AuthBaseService} from '../../../../shared/services/auth-base.service';
import {ToastrService} from 'ngx-toastr';
import {filter} from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

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
  public menuItems: MenuItem[] = [];

  private _currentTitle: string = 'Início'
  public activeRoute = ''

  constructor(
    private readonly router: Router,
    private readonly authService: AuthBaseService,
    private readonly toastr: ToastrService
  ) {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.updateCurrentTitle();
      });

    this.setActiveRoute(this.router.url);

    this.menuItems = [
      {label: 'Início', icon: 'home', route: 'home'},
      {label: 'Minhas salas', icon: 'co_present', route: '#'},
      {label: 'Calendário', icon: 'calendar_month', route: '#'},
      {label: 'Material', icon: 'book_2', route: '#'},
      {label: 'Avaliação', icon: 'library_books', route: '#'},
      {label: 'Perfil', icon: 'person', route: '#'},
      {label: 'Configurações', icon: 'settings', route: '#'}
    ]
  }

  public setActiveRoute(url: string) {
    // Remover barras iniciais para comparação consistente
    const cleanUrl = url.startsWith('/') ? url.substring(1) : url;

    // Encontrar item que corresponde à rota atual
    for (const item of this.menuItems) {
      const cleanRoute = item.route.startsWith('/') ? item.route.substring(1) : item.route;
      if (cleanUrl === cleanRoute || cleanUrl.startsWith(cleanRoute + '/')) {
        this.activeRoute = item.route;
        return;
      }
    }
  }


  private updateCurrentTitle(): void {
    const currentUrl = this.router.url;
    const matchingItem = this.menuItems.find(item => {
      return currentUrl.includes(item.route) ||
        (item.route.startsWith('/') && currentUrl.includes(item.route.substring(1)));
    });

    this._currentTitle = matchingItem?.label || 'Página não encontrada';
  }


  public get currentTitle(): string {
    return this._currentTitle;
  }

  public onNavigate(action: string): void {
    if (action === '#') {
      this.toastr.info('Funcionalidade em desenvolvimento');
      return;
    }

    this.router.navigate(['class', action])
      .then(() => {
        this.activeRoute = '/class/' + action;
        this.updateCurrentTitle();

      })
      .catch(error => {
        console.error('Erro de navegação:', error);
        this.toastr.error('Erro ao navegar para a página', '', {
          timeOut: 3000,
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true
        });
      });
  }

  public onLogout(): void {
    this.authService.logout();
    this.toastr.info('Você saiu com sucesso!', 'Logout');
    this.router.navigate(['auth', 'login'])
      .then(() => {
        // Navegação bem sucedida
      })
      .catch(error => {
        console.error('Erro ao redirecionar após logout:', error);
      });
  }
}
