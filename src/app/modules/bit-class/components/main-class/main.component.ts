import {Component} from '@angular/core';
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
  selector: 'app-main-class',
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
export class MainClassComponent {

  public menuItems: MenuItem[] = [
    {label: 'Início', icon: 'home', route: 'home'},
    {label: 'Minhas salas', icon: 'co_present', route: 'salas'},
    {label: 'Calendário', icon: 'calendar_month', route: 'calendario'},
    {label: 'Material', icon: 'book_2', route: 'material'},
    {label: 'Avaliação', icon: 'library_books', route: 'avaliacao'},
    {label: 'Perfil', icon: 'person', route: 'perfil'},
    {label: 'Configurações', icon: 'settings', route: 'configuracoes'}
  ];

  private _currentTitle: string = 'Início';

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
  }

  private updateCurrentTitle(): void {
    const urlSegments = this.router.url.split('/');
    const currentRoute = urlSegments[urlSegments.length - 1];
    this._currentTitle = this.menuItems.find(item => item.route === currentRoute)?.label
      || 'Página não encontrada';
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
        // Navegação bem sucedida
      })
      .catch(error => {
        this.toastr.error('Erro ao navegar para a página');
        console.error('Erro de navegação:', error);
      });
  }

  public onLogout(): void {
    this.authService.logout();
    this.toastr.info('Você saiu com sucesso!', 'Logout');
    this.router.navigate(['auth/login'])
      .then(() => {
        // Navegação bem sucedida
      })
      .catch(error => {
        console.error('Erro ao redirecionar após logout:', error);
      });
  }
}
