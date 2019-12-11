import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../_models/Dish';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';
import { FoodSearchParams } from '../_models/FoodSearchParams';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  baseUrl = environment.apiUrl + 'dishes';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Dish> {
    return this.http.get<Dish>(this.baseUrl + '/' + id, httpOptions);
  }

  getDishes(params?): Observable<PaginatedResult<Dish[]>> {
    const paginatedResult = new PaginatedResult<Dish[]>();
    let httpParams = new HttpParams();

    httpParams = this.setHttpParams(params, httpParams);

    return this.http.get<Dish[]>(this.baseUrl, {
      observe: 'response',
      params: httpParams,
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    })
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

  setHttpParams(obj: FoodSearchParams, params: HttpParams): HttpParams {
    Object.entries(obj).forEach(([key, value]) => {
      if (value != null) {
        params = params.append(key, value);
      }
    });

    return params;
  }

  add(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.baseUrl, dish, httpOptions);
  }

  update(id: number, dish: Dish) {
    return this.http.put<Dish>(this.baseUrl + '/' + id, dish, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, httpOptions);
  }
}
