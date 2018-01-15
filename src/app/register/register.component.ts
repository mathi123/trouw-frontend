import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ContextService } from '../context.service';

import { Location } from '@angular/common';

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
  public saved = false;
  public oneChecked = false;
  public error = false;

  constructor(private userService: UserService,
    private activeRoute: ActivatedRoute, private location: Location,
    private contextService: ContextService) {
      this.buildForm();
    }

  public ngOnInit() {
  }
  public back() {
    this.location.back();
  }

  public save(form: NgForm) {
    this.userService.create(this.user)
      .subscribe(userId => this.userCreated(userId, this.user),
      (error) => this.error = true);
  }

  public check() {
    this.oneChecked = this.user.receptie || this.user.ceremonie || this.user.feest || this.user.cantMakeIt;
    console.log(this.oneChecked);
  }

  private buildForm() {
    this.registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        food: new FormControl(''),
        songs: new FormControl('')
    });
  }
  private userCreated(userId: string, user: User) {
    this.saved = true;
  }
}
