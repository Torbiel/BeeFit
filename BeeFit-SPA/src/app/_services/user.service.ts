import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl + 'users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  getUser(id): Observable<User> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<User>(url);
  }

  updateUser(user: User): Observable<User> {
    const url = this.baseUrl + '/' + user.id;
    const data = JSON.stringify(user);

    return this.http.put<User>(url, data);
  }
}
