import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EndpointsService } from './endpoints.service';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { jwtDecode } from 'jwt-decode';

interface LoginResponse {
  access: string;
  refresh: string;
}

interface JwtPayload {
  user_id: string;
  name: string;
  username: string;
  email: string;
  xp?: number;
  streak?: number;
}

interface AuthError {
  message: string;
  code: string;
  originalError?: HttpErrorResponse;
}

@Injectable({
  providedIn: 'root'
})
export class AuthBaseService {
  private static readonly STORAGE_KEYS = {
    TOKEN: 'auth-token',
    REFRESH: 'refresh'
  };

  private static readonly HTTP_OPTIONS = {
    CONTENT_TYPE: 'application/json',
    BEARER_PREFIX: 'Bearer '
  };

  private static readonly ERROR_MESSAGES = {
    NO_REFRESH_TOKEN: 'Refresh token não encontrado',
    INVALID_JWT: 'Token JWT inválido',
    DEFAULT: 'Ocorreu um erro durante a autenticação',
    INVALID_CREDENTIALS: 'Credenciais inválidas',
    CONNECTION_ERROR: 'Erro de conexão com o servidor',
    SERVICE_NOT_FOUND: 'Serviço de autenticação não encontrado',
    SERVER_ERROR: 'Erro interno do servidor'
  };

  constructor(
    private readonly httpClient: HttpClient,
    private readonly httpEndpoints: EndpointsService
  ) {}

  get headers(): HttpHeaders {
    const baseHeaders = new HttpHeaders().set('Content-Type', AuthBaseService.HTTP_OPTIONS.CONTENT_TYPE);
    const token = this.getAuthToken();
    return token ? baseHeaders.set('Authorization', `${AuthBaseService.HTTP_OPTIONS.BEARER_PREFIX}${token}`) : baseHeaders;
  }

  get user(): User | null {
    try {
      const token = this.getAuthToken();
      return token ? this.createUserFromPayload(this.decodeToken(token)) : null;
    } catch {
      this.removeTokens();
      return null;
    }
  }

  public login(email: string, password: string): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(
        this.httpEndpoints.path.loginUser,
        { email, password },
        { headers: this.headers, withCredentials: true }
      )
      .pipe(
        tap(this.handleTokenResponse.bind(this)),
        catchError(this.handleAuthError)
      );
  }

  public signup(name: string, email: string, username: string, password: string): Observable<unknown> {
    return this.httpClient
      .post(
        this.httpEndpoints.path.signUpUser,
        { name, email, username, password },
        { headers: this.headers }
      )
      .pipe(catchError(this.handleAuthError));
  }

  public logout(): void {
    this.removeTokens();
  }

  public isAuthenticated(): boolean {
    try {
      const token = this.getAuthToken();
      return token ? this.isValidPayload(this.decodeToken(token)) : false;
    } catch {
      this.removeTokens();
      return false;
    }
  }

  private handleTokenResponse({ access, refresh }: LoginResponse): void {
    this.setTokens(access, refresh);
  }

  private getAuthToken(): string | null {
    const token = sessionStorage.getItem(AuthBaseService.STORAGE_KEYS.TOKEN);
    if (token && this.isValidPayload(this.decodeToken(token))) {
      return token;
    }
    return null;
  }

  private getRefreshToken(): string | null {
    return sessionStorage.getItem(AuthBaseService.STORAGE_KEYS.REFRESH);
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    sessionStorage.setItem(AuthBaseService.STORAGE_KEYS.TOKEN, accessToken);
    sessionStorage.setItem(AuthBaseService.STORAGE_KEYS.REFRESH, refreshToken);
  }

  private removeTokens(): void {
    sessionStorage.removeItem(AuthBaseService.STORAGE_KEYS.TOKEN);
    sessionStorage.removeItem(AuthBaseService.STORAGE_KEYS.REFRESH);
  }

  private decodeToken(token: string): JwtPayload {
    const payload = jwtDecode<JwtPayload>(token);
    if (!this.isValidPayload(payload)) {
      throw new Error(AuthBaseService.ERROR_MESSAGES.INVALID_JWT);
    }
    return payload;
  }

  private isValidPayload(payload: JwtPayload): boolean {
    return Boolean(payload.user_id && payload.name && payload.username && payload.email);
  }

  private createUserFromPayload(payload: JwtPayload): User {
    return {
      id: undefined,
      name: payload.name,
      username: payload.username,
      email: payload.email,
      xp: payload.xp,
      streak: payload.streak,
      active: true,
      created_at: undefined,
      modified_at: undefined
    };
  }

  private handleAuthError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = this.getErrorMessage(error);
    return throwError(() => ({
      message: errorMessage,
      code: error.status.toString(),
      originalError: error
    }));
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return error.error?.non_field_errors?.[0] || error.error?.detail || AuthBaseService.ERROR_MESSAGES.DEFAULT;
      case 401:
        return AuthBaseService.ERROR_MESSAGES.INVALID_CREDENTIALS;
      case 0:
        return AuthBaseService.ERROR_MESSAGES.CONNECTION_ERROR;
      case 404:
        return AuthBaseService.ERROR_MESSAGES.SERVICE_NOT_FOUND;
      case 500:
        return AuthBaseService.ERROR_MESSAGES.SERVER_ERROR;
      default:
        return AuthBaseService.ERROR_MESSAGES.DEFAULT;
    }
  }

  public refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();

    if (!refreshToken) {
      return throwError(() => new Error(AuthBaseService.ERROR_MESSAGES.NO_REFRESH_TOKEN));
    }

    return this.httpClient
      .post<LoginResponse>(
        this.httpEndpoints.path.refreshToken,
        { refresh: refreshToken },
        { headers: this.headers }
      )
      .pipe(
        tap(this.handleTokenResponse.bind(this)),
        catchError(this.handleAuthError)
      );
  }
}
