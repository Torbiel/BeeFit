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

  getDishesByName(name: string, pageNumber?, pageSize?): Observable<Dish[]> {
    // const paginatedResult = new PaginatedResult<Dish[]>();
    return this.http.get<Dish[]>(this.baseUrl + '/' + name, httpOptions);
    // let params = new HttpParams();

    // if (pageNumber != null) {
    //   params = params.append('pageNumber', pageNumber);
    // }

    // if (pageSize != null) {
    //   params = params.append('pageSize', pageSize);
    // }

    // return this.http.get<Dish[]>(this.baseUrl + '/' + name, { observe: 'response', params })
    //   .pipe(
    //     map(response => {
    //       paginatedResult.result = response.body;

    //       if (response.headers.get('Pagination') != null) {
    //         paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
    //       }

    //       return paginatedResult;
    //     })
    //   );
  }

  getDishesByUserId(id: number): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.baseUrl, httpOptions);
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
