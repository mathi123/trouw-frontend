import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise';
import { ExerciseService } from '../exercise.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContextService } from '../context.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.css']
})
export class ExerciseViewComponent implements OnInit {
  public exercise: Exercise = new Exercise();
  public unexpectedError = false;
  public exerciseForm: FormGroup;

  constructor(private exerciseService: ExerciseService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contextService: ContextService,
    private dialogService: MatDialog) {
      this.buildForm();
  }

  public ngOnInit() {
    this.activeRoute.params
      .subscribe(params => this.reloadData(params));
  }

  public save(form: NgForm) {
    this.unexpectedError = false;

    if (this.exercise._id === undefined) {
      this.exerciseService.create(this.exercise)
        .subscribe(result => this.handleSuccess(true), err => this.errorOccurred(err));
    } else {
      this.exerciseService.update(this.exercise)
        .subscribe(result => this.handleSuccess(result), err => this.errorOccurred(err));
    }
  }

  public delete() {
    const options = {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this exercise?'
      }
    };

    const dialogRef = this.dialogService.open(ConfirmDialogComponent, options);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.exerciseService.delete(this.exercise._id)
          .subscribe(success => this.handleSuccess(success), err => this.errorOccurred(err));
      }
    });
  }

  public back() {
    this.location.back();
  }

  private handleSuccess(success: boolean) {
    console.log(success);
    if (!success) {
      this.errorOccurred(null);
    } else {
      this.location.back();
    }
  }

  private buildForm() {
    this.exerciseForm = new FormGroup({
        title: new FormControl('', Validators.required),
        description: new FormControl('', Validators.required),
    });
  }

  private errorOccurred(err: Error) {
    this.unexpectedError = true;
  }

  private reloadData(params: { [key: string]: string}) {
    const exerciseId = params['id'];
    if (exerciseId !== '0') {
      this.exerciseService.getExercise(exerciseId)
        .subscribe(exercise => this.displayData(exercise));
    } else {
      this.exercise.createdOn = new Date();
      this.exercise.therapistId = this.contextService.getCurrentUser()._id;
      this.exercise.isGlobal = false;
    }
  }

  private displayData(exercise: Exercise) {
    this.exercise = exercise;
  }
}
