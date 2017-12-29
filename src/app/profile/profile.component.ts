import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material';
import { ContextService } from '../context.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: User = new User();
  public unexpectedError = false;
  public userForm: FormGroup;

  constructor(private userService: UserService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contextService: ContextService) {
      this.buildForm();
  }

  public ngOnInit() {
    this.activeRoute.params
      .subscribe(params => this.reload());
  }

  public save(form: NgForm) {
    this.unexpectedError = false;

    this.userService.update(this.user)
        .subscribe(result => this.handleSuccess(result, this.user._id), err => this.errorOccurred(err));
  }

  public back() {
    this.location.back();
  }

  public checkPasswords() {
    if (this.userForm.controls['passwordRepeat'].dirty &&
        this.userForm.controls['passwordRepeat'].value !== this.userForm.controls['password'].value) {
      this.userForm.controls['passwordRepeat'].setErrors({ repeat: true});
    }
  }

  private handleSuccess(success: boolean, id: string) {
    if (!success) {
      this.errorOccurred(null);
    } else {
      this.contextService.setCurrentUser(this.user);
      if (id === null) {
        this.location.back();
      } else {
        this.reload();
      }
    }
  }

  private buildForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordRepeat: new FormControl('', Validators.required),
    });
  }

  private errorOccurred(err: Error) {
    this.unexpectedError = true;
  }

  private reload() {
    this.userService.getById(this.contextService.getCurrentUser()._id)
        .subscribe(user => this.displayData(user));
  }

  private displayData(user: User) {
    this.user = user;
  }
}
