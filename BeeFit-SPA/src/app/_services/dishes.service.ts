import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dish } from '../_models/Dish';

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

  getDishesByName(name: string): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.baseUrl + '/' + name, httpOptions);
  }

}
