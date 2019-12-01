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

  getDishes(paginationParams?, searchParams?): Observable<PaginatedResult<Dish[]>> {
    const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();
    let params = new HttpParams();
    params = params.append('name', searchParams.name);

    if (searchParams.minCallories != null) {
      params = params.append('minCallories', searchParams.minCallories);
    }

    if (searchParams.maxCallories != null) {
      params = params.append('maxCallories', searchParams.maxCallories);
    }

    if (searchParams.userId != null && searchParams.userId !== 'null') {
      params = params.append('userId', searchParams.userId);
    }

    if (paginationParams.pageNumber == null) {
      paginationParams.pageNumber = 1;
    }
    params = params.append('pageNumber', paginationParams.pageNumber);

    if (paginationParams.pageSize == null) {
      paginationParams.pageSize = 10;
    }
    params = params.append('pageSize', paginationParams.pageSize);

    const authHeader = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token')
    });

    return this.http.get<Dish[]>(this.baseUrl, {
      observe: 'response',
      params,
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

  // getDishesByName(name: string, params: HttpParams, authHeader: HttpHeaders): Observable<PaginatedResult<Dish[]>> {
  //   const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();

  //   return this.http.get<Dish[]>(this.baseUrl + '/' + name, {
  //     observe: 'response',
  //     params,
  //     headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token')
  //   })})
  //     .pipe(
  //       map(response => {
  //         paginatedResult.result = response.body;

  //         if (response.headers.get('Pagination') != null) {
  //           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
  //         }

  //         return paginatedResult;
  //       })
  //     );
  // }

  // getDishesByUserId(params: HttpParams, authHeader: HttpHeaders): Observable<PaginatedResult<Dish[]>> {
  //   const paginatedResult: PaginatedResult<Dish[]> = new PaginatedResult<Dish[]>();

  //   return this.http.get<Dish[]>(this.baseUrl, {
  //     observe: 'response',
  //     params,
  //     headers: new HttpHeaders({
  //     Authorization: 'Bearer ' + localStorage.getItem('token')
  //   })})
  //     .pipe(
  //       map(response => {
  //         paginatedResult.result = response.body;

  //         if (response.headers.get('Pagination') != null) {
  //           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
  //         }

  //         return paginatedResult;
  //       })
  //     );
  // }

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
