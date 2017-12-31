import { Component, OnInit } from '@angular/core';
import { Therapy } from '../therapy';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { TherapyService } from '../therapy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from '../context.service';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-therapy-view',
  templateUrl: './therapy-view.component.html',
  styleUrls: ['./therapy-view.component.css']
})
export class TherapyViewComponent implements OnInit {
  public therapy: Therapy = new Therapy();
  public unexpectedError = false;
  public therapyForm: FormGroup;
  public patients: User[] = [];

  constructor(private therapyService: TherapyService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contextService: ContextService,
    private dialogService: MatDialog,
    private userService: UserService) {
      this.buildForm();
  }

  public ngOnInit() {
    this.activeRoute.params
      .subscribe(params => this.reloadData(params));
    this.userService.getPatients(this.contextService.getCurrentUser()._id)
      .subscribe(patients => this.patients = patients);
  }

  public save() {
    this.unexpectedError = false;
    this.therapy.patientId = this.therapyForm.controls['patient'].value;

    if (this.therapy._id === undefined) {
      this.therapyService.create(this.therapy)
        .subscribe(result => this.handleSuccess(true, result), err => this.errorOccurred(err));
    } else {
      this.therapyService.update(this.therapy)
        .subscribe(result => this.handleSuccess(result, this.therapy._id), err => this.errorOccurred(err));
    }
  }

  public delete() {
    const options = {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this therapy?'
      }
    };

    const dialogRef = this.dialogService.open(ConfirmDialogComponent, options);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.therapyService.delete(this.therapy._id)
          .subscribe(success => this.handleSuccess(success, null), err => this.errorOccurred(err));
      }
    });
  }

  public back() {
    this.location.back();
  }

  public start() {
    const options = {
      data: {
        title: 'Confirm',
        message: 'After the therapy is started, you cannot modify the assignments anymore. Do you wish to start the therapy?'
      }
    };

    const dialogRef = this.dialogService.open(ConfirmDialogComponent, options);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.therapyService.start(this.therapy._id)
          .subscribe(success => this.therapyStarted(success));
      }
    });
  }
  private therapyStarted(success: boolean) {
    if (success) {
      this.therapy.hasStarted = true;
    }
  }

  private handleSuccess(success: boolean, id: string) {
    if (!success) {
      this.errorOccurred(null);
    } else {
      if (id === null) {
        this.location.back();
      } else {
        this.reloadById(id);
      }
    }
  }

  private buildForm() {
    this.therapyForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
        patient: new FormControl('', Validators.required),
    });
  }

  private errorOccurred(err: Error) {
    this.unexpectedError = true;
  }

  private reloadData(params: { [key: string]: string}) {
    const therapyId = params['id'];
    if (therapyId !== '0') {
      this.reloadById(therapyId);
    } else {
      this.therapy.therapistId = this.contextService.getCurrentUser()._id;
    }
  }
  private reloadById(therapyId: string) {
    this.therapyService.getById(therapyId)
        .subscribe(therapy => this.displayData(therapy));
  }

  private displayData(therapy: Therapy) {
    this.therapy = therapy;
    this.therapyForm.controls['patient'].setValue(therapy.patientId);
  }
}
