import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';
import { catchError, map } from 'rxjs/operators';
import { idLocale } from 'ngx-bootstrap';
import { PaginatedResult } from '../_models/Pagination';
import { FoodSearchParams } from '../_models/FoodSearchParams';

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

  constructor(private http: HttpClient) {}

  changeIngredient(ingredient: Ingredient) {
    this.ingredientSource.next(ingredient);
  }

  add(ing: Ingredient): Observable<any> {
    return this.http.post<Ingredient>(this.baseUrl, ing, httpOptions);
  }

  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.baseUrl + '/' + id, httpOptions);
  }

  getIngredients(params?): Observable<PaginatedResult<Ingredient[]>> {
    const paginatedResult = new PaginatedResult<Ingredient[]>();
    let httpParams = new HttpParams();

    if (params.userId === 0) {
      params.userId = null;
    }

    if (params.ascending == null) {
      params.ascending = false;
    }

    httpParams = this.setHttpParams(params, httpParams);

    return this.http
      .get<Ingredient[]>(this.baseUrl, {
        observe: 'response',
        params,
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + localStorage.getItem('token')
        })
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  setHttpParams(obj: FoodSearchParams, params: HttpParams): HttpParams {
    Object.entries(obj).forEach(([key, value]) => {
      if (value != null) {
        params = params.append(key, value);
      }
    });

    return params;
  }

  update(id: number, ing: Ingredient): Observable<any> {
    return this.http.put<Ingredient>(this.baseUrl + '/' + id, ing, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, httpOptions);
  }
}
