import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../user';
import { ContextService } from '../context.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public email: string;
  public password: string;
  public error = false;

  constructor(private userService: UserService,
    private contextService: ContextService) {
    this.buildForm();
   }

  ngOnInit() {
    if (!environment.production) {
      this.email = 'colpaert.mathias@gmail.com';
      this.password = 'test';
    }
  }

  public login(form: NgForm) {
    this.error = false;
    this.userService.getByEmail(this.email)
      .subscribe(user => this.userResult(user));
  }

  private userResult(user: User) {
    if (user !== null) {
      this.contextService.setCurrentUser(user);
    } else {
      this.error = true;
    }
  }

  private buildForm() {
    this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
    });
  }
}
