import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../_models/Dish';
import { PaginatedResult } from '../_models/Pagination';
import { map } from 'rxjs/operators';

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

  getDishes(name?: string, userId?, pageNumber?, pageSize?): Observable<PaginatedResult<Dish[]>> {
    let params = new HttpParams();

    if (userId != null) {
      params = params.append('userId', userId);
    }

    if (pageNumber != null) {
      params = params.append('pageNumber', pageNumber);
    }

    if (pageSize != null) {
      params = params.append('pageSize', pageSize);
    }

    const authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });

    if (name != null) {
      return this.getDishesByName(name, params, authHeader);
    } else {
      return this.getDishesByUserId(params, authHeader);
    }
  }

  getDishesByName(name: string, params: HttpParams, authHeader: HttpHeaders): Observable<PaginatedResult<Dish[]>> {
    const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();

    return this.http.get<Dish[]>(this.baseUrl + '/' + name, {
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

  getDishesByUserId(params: HttpParams, authHeader: HttpHeaders): Observable<PaginatedResult<Dish[]>> {
    const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();

    return this.http.get<Dish[]>(this.baseUrl, {
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

  // getDishesByUserAndName(name: string, userId: number, params: HttpParams, authHeader: HttpHeaders): Observable<PaginatedResult<Dish[]>> {
  //   const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();

  //   return this.http.get<Dish[]>(this.baseUrl + '/' + userId + '/' + name, {
  //     observe: 'response',
  //     params,
  //     headers: authHeader
  //   }).pipe(
  //       map(response => {
  //         paginatedResult.result = response.body;

  //         if (response.headers.get('Pagination') != null) {
  //           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
  //         }

  //         return paginatedResult;
  //       })
  //     );
  // }

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
