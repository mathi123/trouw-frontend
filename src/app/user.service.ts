import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public isValid(email: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.api}/validate/user?email=${email}`);
  }

  public create(user: User): Observable<string> {
    return this.httpClient.post<string>(`${environment.api}/user`, user);
  }

  public update(user: User): Observable<boolean> {
    return this.httpClient.put(`${environment.api}/user/${user._id}`, user, { observe: 'response', responseType: 'text' })
      .map(response => response.status === 200);
  }

  public getById(userId: string) {
    return this.httpClient.get<User>(`${environment.api}/user/${userId}`);
  }

  public getAll() {
    return this.httpClient.get<User[]>(`${environment.api}/user`);
  }

  public getPatients(therapistId: string) {
    return this.httpClient.get<User[]>(`${environment.api}/user?therapist=${therapistId}`);
  }

  public getByEmail(email: string) {
    return this.httpClient
      .get<User[]>(`${environment.api}/user`)
      .map(users => users.filter(u => u.email === email)[0] || null);
  }
}
