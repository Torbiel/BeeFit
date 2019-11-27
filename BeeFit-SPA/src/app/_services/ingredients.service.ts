import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Ingredient } from '../_models/Ingredient';
import { catchError } from 'rxjs/operators';
import { idLocale } from 'ngx-bootstrap';

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

  constructor(private http: HttpClient) { }

  changeIngredient(ingredient: Ingredient) {
    this.ingredientSource.next(ingredient);
  }

  add(ing: Ingredient): Observable<any> {
    return this.http.post<Ingredient>(this.baseUrl, ing, httpOptions);
  }

  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.baseUrl + '/' + id, httpOptions);
  }

  getIngredientsByName(name: string): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl + '/' + name, httpOptions);
  }

  getIngredientsByUserId(id: number): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.baseUrl, httpOptions);
  }

  update(id: number, ing: Ingredient): Observable<any> {
    return this.http.put<Ingredient>(this.baseUrl + '/' + id, ing, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, httpOptions);
  }
}
