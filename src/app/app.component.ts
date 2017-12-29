import { Component, OnInit } from '@angular/core';
import { ContextService } from './context.service';
import { User } from './user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title = 'tele-fon';
  public user: User = null;

  constructor(private contextService: ContextService, private router: Router) {
  }

  public ngOnInit() {
    this.contextService.getCurrentUserSubject()
      .subscribe(user => this.userChanged(user));
  }
  public logout() {
    this.contextService.setCurrentUser(null);
    this.router.navigate(['']);
  }

  private userChanged(user: User) {
    this.user = user;
  }
}
