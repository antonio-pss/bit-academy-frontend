import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {URLS} from '../urls';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {
  public fullUrl: string;

  private parameters: HttpParams = new HttpParams();

  constructor(
    public http: HttpClient,
    public router: Router,
    public path: string
  ) {
    this.fullUrl = URLS.BASE + this.path;
  }

  public logout() {
    try {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['/login']).then(r => console.log('Logout realizado com sucesso!'));
    } catch (error) {
      console.error('Erro ao realizar logout:', error);
    }
  }
}
