import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';
import { catchError, map } from 'rxjs/operators';
import { idLocale } from 'ngx-bootstrap';
import { PaginatedResult } from '../_models/Pagination';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class IngredientsService {
  baseUrl = environment.apiUrl + 'ingredients';
  private ingredientSource = new Subject<Ingredient>();
  currentIngredient = this.ingredientSource.asObservable();

  constructor(private http: HttpClient) { }

  changeIngredient(ingredient: Ingredient) {
    this.ingredientSource.next(ingredient);
  }

  add(ing: Ingredient): Observable<any> {
    return this.http.post<Ingredient>(this.baseUrl, ing, httpOptions);
  }

  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.baseUrl + '/' + id, httpOptions);
  }

  getIngredientsByName(name: string, pageNumber?, pageSize?): Observable<PaginatedResult<Ingredient[]>> {
    const paginatedResult = new PaginatedResult<Ingredient[]>();
    let params = new HttpParams();

    if (pageNumber != null) {
      params = params.append('pageNumber', pageNumber);
    }

    if (pageSize != null) {
      params = params.append('pageSize', pageSize);
    }

    return this.http.get<Ingredient[]>(this.baseUrl + '/' + name, {
      observe: 'response',
      params,
      headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  getIngredientsByUserId(pageNumber?, pageSize?): Observable<PaginatedResult<Ingredient[]>> {
    const paginatedResult = new PaginatedResult<Ingredient[]>();
    let params = new HttpParams();

    if (pageNumber != null) {
      params = params.append('pageNumber', pageNumber);
    }

    if (pageSize != null) {
      params = params.append('pageSize', pageSize);
    }

    return this.http.get<Ingredient[]>(this.baseUrl, {
      observe: 'response',
      params,
      headers: new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    })})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }

          return paginatedResult;
        })
      );
  }

  update(id: number, ing: Ingredient): Observable<any> {
    return this.http.put<Ingredient>(this.baseUrl + '/' + id, ing, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, httpOptions);
  }
}
