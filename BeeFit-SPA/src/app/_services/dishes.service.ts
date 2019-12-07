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
    const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();
    let httpParams = new HttpParams();
    httpParams = this.setHttpParams(params, httpParams);

    // if (searchParams.minCallories != null) {
    //   httpParams = httpParams.append('minCallories', searchParams.minCallories);
    // }

    // if (searchParams.maxCallories != null) {
    //   httpParams = httpParams.append('maxCallories', searchParams.maxCallories);
    // }

    // if (searchParams. != null) {
    //   params = params.append('', searchParams.);
    // }

    // if (searchParams.userId != null && searchParams.userId !== 'null') {
    //   httpParams = httpParams.append('userId', searchParams.userId);
    // }

    // if (paginationParams.pageNumber == null) {
    //   paginationParams.pageNumber = 1;
    // }
    // httpParams = httpParams.append('pageNumber', paginationParams.pageNumber);

    // if (paginationParams.pageSize == null) {
    //   paginationParams.pageSize = 10;
    // }
    // httpParams = httpParams.append('pageSize', paginationParams.pageSize);

    const authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<Dish[]>(this.baseUrl, {
      observe: 'response',
      params: httpParams,
      headers: authHeader})
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
