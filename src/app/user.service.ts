import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../environments/environment';
import { User } from './user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public create(user: User): Observable<string> {
    return this.httpClient.post<string>(`${environment.api}/user`, user);
  }

  public getAll() {
    return this.httpClient.get<User[]>(`${environment.api}/user`);
  }
}
