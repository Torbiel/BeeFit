import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Meal } from '../_models/Meal';

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

  addMeal(meal: Meal) {
    this.http.post<Meal>(this.baseUrl, httpOptions);
  }

}
