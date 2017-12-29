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
    this.activeRoute.queryParams
      .subscribe(params => this.reloadData(params));
  }

  public save(form: NgForm) {
    this.userService.create(this.user)
      .subscribe(userId => this.userCreated(userId, this.user));
  }
  public emailChanged() {
    this.userService.isValid(this.user.email)
      .subscribe(isAvailable => this.setEmailIsAvailable(isAvailable));
  }
  public checkPasswords() {
    if (this.registerForm.controls['passwordRepeat'].dirty &&
        this.registerForm.controls['passwordRepeat'].value !== this.registerForm.controls['password'].value) {
      this.registerForm.controls['passwordRepeat'].setErrors({ repeat: true});
    }
  }

  private setEmailIsAvailable(isAvailable: boolean) {
    if (!isAvailable) {
      this.registerForm.controls['email'].setErrors({ isTaken: !isAvailable});
    }
  }

  private buildForm() {
    this.registerForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        passwordRepeat: new FormControl('', Validators.required),
    });
  }
  private reloadData(params: { [key: string]: string}) {
    const therapistId = params['therapist'];
    if (therapistId !== null && therapistId !== undefined) {
      this.reloadTherapist(therapistId);
      this.user.isTherapist = false;
      this.user.therapistId = therapistId;
    } else {
      this.user.isTherapist = true;
    }
  }
  private reloadTherapist(therapistId: string) {
    this.userService.getById(therapistId)
      .subscribe(therapist => this.displayTherapist(therapist));
  }
  private displayTherapist(therapist: User) {
    this.therapist = therapist;
  }
  private userCreated(userId: string, user: User) {
    user._id = userId;
    this.contextService.setCurrentUser(user);
  }
}
