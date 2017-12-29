import { Injectable } from '@angular/core';
import { User } from './user';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable()
export class ContextService {
  private currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
  private url: string = null;

  constructor(private router: Router) { }

  public setCurrentUser(user: User) {
    this.currentUser.next(user);
    if (user !== null) {
      if (this.url !== null) {
        this.router.navigateByUrl(this.url);
      } else {
        this.router.navigateByUrl('/home');
      }
    }
  }

  public getCurrentUser(): User {
    return this.currentUser.value;
  }

  public getCurrentUserSubject(): BehaviorSubject<User> {
    return this.currentUser;
  }

  public setRedirectUrl(url: string) {
    this.url = url;
  }
}
