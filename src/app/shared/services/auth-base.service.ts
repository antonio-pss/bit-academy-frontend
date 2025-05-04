import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EndpointsService} from './endpoints.service';
import {tap} from 'rxjs';
import {User} from '../models/user';
import {jwtDecode} from 'jwt-decode';

interface LoginResponse {
  access: string;
  refresh: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthBaseService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly httpEndpoints: EndpointsService
  ) {
  }

  get headers(): HttpHeaders {
    const token = sessionStorage.getItem('auth-token');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json' // Adiciona o token CSRF aos cabeçalhos
    });
    if (token) {
      headers = headers.append('Authorization', 'Bearer '.concat(token));
    }
    return headers;
  }

  public login(email: string, password: string) {
    return this.httpClient.post<LoginResponse>(
      this.httpEndpoints.path.loginUser,
      {email, password},
      {withCredentials: true}
    ).pipe(
      tap((value) => {
        console.log('Token recebido:', value.access);

        // Armazene o token no sessionStorage
        sessionStorage.setItem('auth-token', value.access);
        sessionStorage.setItem('refresh', value.refresh);
      })
    );
  }

  public signup(name: string, email: string, username: string, password: string) {
    console.log(name, email, username, password);
    return this.httpClient.post(
      this.httpEndpoints.path.signUpUser,
      {name, username, email, password}
    );
  }

  public logout() {
    console.log('Deslogando...');
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('refresh');
  }

  get user(): User | null {
    const token = sessionStorage.getItem('auth-token');

    if (!token) {
      console.warn('Nenhum token encontrado no armazenamento.');
      return null;
    }

    try {
      const payload = jwtDecode<any>(token);

      if (!payload.user_id || !payload.name || !payload.username || !payload.email) {
        console.error('Token JWT não contém as informações esperadas:', payload);
        return null;
      }

      return {
        name: payload.name,
        username: payload.username,
        email: payload.email,
        xp: payload.xp,
        streak: payload.streak,
        active: true,
        created_at: undefined,
        modified_at: undefined,
        id: undefined,
      };
    } catch (error) {
      console.error('Erro ao decodificar o token JWT:', error);
      return null;
    }
  }
}
