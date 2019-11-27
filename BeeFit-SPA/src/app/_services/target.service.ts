import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Target } from '../_models/Target';
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class TargetService {
  baseUrl = environment.apiUrl + 'targets';

  constructor(private http: HttpClient) { }

  add(target: Target): Observable<Target> {
    return this.http.post<Target>(this.baseUrl, target, httpOptions);
  }

  getById(id: number): Observable<Target[]> {
    return this.http.get<Target[]>(this.baseUrl, httpOptions);
  }

  update(id: number, target: Target): Observable<Target> {
    return this.http.put<Target>(this.baseUrl + '/' + id, target, httpOptions);
  }

  delete(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, httpOptions);
  }
}
