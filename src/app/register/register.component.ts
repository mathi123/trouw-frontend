import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ContextService } from '../context.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = new User();
  public therapist: User = null;
  public repeatPassword: string;
  public registerForm: FormGroup;

  constructor(private userService: UserService,
    private activeRoute: ActivatedRoute,
    private contextService: ContextService) {
      this.buildForm();
    }

  public ngOnInit() {
  }

  public save(form: NgForm) {
    this.userService.create(this.user)
      .subscribe(userId => this.userCreated(userId, this.user));
  }

  private buildForm() {
    this.registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        persons: new FormControl('', Validators.required),
    });
  }
  private userCreated(userId: string, user: User) {
    user._id = userId;
    this.contextService.setCurrentUser(user);
  }
}
