import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';

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

  constructor(private http: HttpClient) { }

  getIngredientsByName(name: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl + '/' + name, httpOptions);
  }

}
