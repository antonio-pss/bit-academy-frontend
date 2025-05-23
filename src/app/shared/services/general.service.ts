import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable, of, Subject, switchMap, tap, throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(private httpClient: HttpClient,) {}

  public unsubscribe = new Subject();



  private getHeaders(): Observable<HttpHeaders> {
    const token = sessionStorage.getItem('auth-token');
    if (!token) {
      return throwError(() => new Error('Token não encontrado no armazenamento.'));
    }
    return of(new HttpHeaders({ "Authorization": "Bearer ".concat(token) }));
  }


  public post(path: string, body: any): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.httpClient.post(path, body, { headers, withCredentials: true })
      )
    );
  }


  public get(path: string): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.httpClient.get(path, {headers})
      )
    );
  }


  public getById(path: string, id:number): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.httpClient.get(path + id + '/', {headers})
      )
    );
  }


  public patch(body: any, path: string): Observable<HttpResponse<any>> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.httpClient.patch(path + body.id + '/', body, { headers }).pipe(
          tap((response: any) => response),
        )
      )
    );
  }


  public getPaginated(path: string, limit: number, offset: number): Observable<any> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.httpClient.get(path, {
          headers,
          params: {
            limit: limit.toString(),
            offset: offset.toString(),
          }
        })
      )
    );
  }

  public delete(path: string, id: number): Observable<HttpResponse<any>> {
    return this.getHeaders().pipe(
      switchMap((headers) =>
        this.httpClient.delete(path + id + '/', { headers }).pipe(
          tap((response: any) => response),
        )
      )
    );
  }
}
