import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Meal } from '../_models/Meal';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class MealService {
  baseUrl = environment.apiUrl + 'meals';

  constructor(private http: HttpClient) { }

  add(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.baseUrl, meal, httpOptions);
  }

  getManyByDate(date: Date): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.baseUrl + '/' + date.toISOString(), httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, httpOptions);
  }

}
