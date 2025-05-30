import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse, HttpUserEvent} from '@angular/common/http';
import {catchError, from, map, Observable, of, switchMap, tap} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GeneralService<T> implements OnInit {
  public urlBase: string;
  public fullUrl: string;
  private parameters: HttpParams = new HttpParams();
  private token: string;

  constructor(private httpClient: HttpClient, public path: string) {
    this.urlBase = environment.urlBase;
    this.fullUrl = `${this.urlBase}${path}`;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  private getHeaders(): Observable<HttpHeaders> {
    const token = sessionStorage.getItem('auth-token');
    return of(new HttpHeaders({"Authorization": "Bearer ".concat(<string>token)}));
  }

  public clearParameter(): void {
    this.parameters = new HttpParams();
    this.token = null;
  }

  public addParameter(key: string, value: any): void {
    if (this.parameters.has(key)) {
      this.parameters = this.parameters.set(key, value);
    } else {
      this.parameters = this.parameters.append(key, value);
    }
  }

  public addParameters(params: ParametersFilter): void {
    Object.keys(params).forEach(key => {
      this.parameters = this.parameters.append(key, params[key]);
    });
  }

  private getOptions(responseType?: any): any {
    const httpOptions = {};
    if (this.parameters) {
      httpOptions["params"] = this.parameters;
    }
    if (responseType) {
      httpOptions["responseType"] = responseType;
    }
    return httpOptions;
  }

  public getAll(route?: string): Observable<T[]> {
    const url = route ? `${this.fullUrl}${route}/` : `${this.fullUrl}`;
    return this.http.get<T[]>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T[]>),
        catchError(ex => from([]))
      );
  }


  public getPaginated(route?: string): Observable<PaginatedResult<T>> {
    const url = route ? `${this.fullUrl}${route}/` : `${this.fullUrl}`;
    return this.http.get<PaginatedResult<T>>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<PaginatedResult<T>>),
        catchError(ex => from([]))
      );
  }


  public getPaginatedFromDetailRoute<K>(id: number, route: string): Observable<PaginatedResult<K>> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.get<PaginatedResult<K>>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<PaginatedResult<K>>),
        catchError(ex => from([]))
      );
  }

  public getPaginatedFromListRoute<K>(route: string): Observable<PaginatedResult<K>> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.get<PaginatedResult<K>>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<PaginatedResult<K>>),
        catchError(ex => from([]))
      );
  }


  public getFromDetailRoute<K>(id: number, route: string): Observable<K> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.get<K>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }


  public getFromListRoute<K>(route: string): Observable<K> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.get<K>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }


  public postFromDetailRoute<E, K>(id: number, route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.post<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }


  public postFromListRoute<E, K>(route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.post<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }


  public deleteFromListRoute<K>(route: string, model: any): Observable<K> {
    const url = `${this.fullUrl}${route}/`;

    const token = this.token ? this.token : localStorage.getItem("access_token");
    const httpOptions = {};
    if (token) {
      httpOptions["headers"] = new HttpHeaders({"Authorization": "Bearer ".concat(token)});
    }
    if (model) {
      httpOptions["body"] = model;
    }

    return this.http.delete<K>(url, httpOptions)
      .pipe(
        tap(response => response as unknown as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public patchFromDetailRoute<E, K>(id: number, route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${id}/${route}/`;
    return this.http.patch<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public patchFromListRoute<E, K>(route: string, entity: E): Observable<K> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.patch<K>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<K>),
        catchError(ex => from([]))
      );
  }

  public save(entity: T): Observable<T> {
    this.clearParameter();
    return this.http.post<T>(this.fullUrl, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T>),
        catchError(ex => from([]))
      );
  }

  public getById(id: number | string, route?: string): Observable<T> {
    const url = route ? `${this.fullUrl}${id}/${route}/` : `${this.fullUrl}${id}/`;
    return this.http.get<T>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T>),
        catchError(ex => from([]))
      );
  }

  public delete(id: number | string): Observable<any> {
    this.clearParameter();
    const url = `${this.fullUrl}${id}/`;
    return this.http.delete<any>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<any>),
        catchError(ex => from([]))
      );
  }

  public update(id: number | string, entity: any): Observable<any> {
    this.clearParameter();
    const url = `${this.fullUrl}${id}/`;
    return this.http.patch<T>(url, entity, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T>),
        catchError(ex => throwError(ex))
      );
  }

  public options(): Observable<any> {
    return this.http.options<T>(this.fullUrl, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<any>),
        map(response => response["actions"]["POST"]),
        catchError(ex => from([]))
      );
  }

  public getChoices(field: string): Observable<any> {
    return this.http.options<any>(this.fullUrl, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<any>),
        map(response => response["actions"]["POST"][field]["choices"]),
        catchError(ex => from([]))
      );
  }

  public loadUrl(url: string): Observable<T> {
    return this.http.get<T>(url, this.getOptions())
      .pipe(
        tap(response => response as HttpUserEvent<T>),
        catchError(ex => from([]))
      );
  }

  public loadFile(route: string, data: any): Observable<Blob> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.post<Blob>(url, data, this.getOptions("blob"))
      .pipe(
        tap(response => response),
        catchError(ex => from([]))
      );
  }

  public getFileFromListRoute<K>(route: string): Observable<Blob> {
    const url = `${this.fullUrl}${route}/`;
    return this.http.get<Blob>(url, this.getOptions("blob"))
      .pipe(
        tap(response => response),
        catchError(ex => from([]))
      );
  }
}


