import { Component, OnInit } from '@angular/core';
import { Assignment } from '../assignment';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../assignment.service';
import { ContextService } from '../context.service';
import { MatDialog } from '@angular/material';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise';

@Component({
  selector: 'app-assignment-view',
  templateUrl: './assignment-view.component.html',
  styleUrls: ['./assignment-view.component.css']
})
export class AssignmentViewComponent implements OnInit {

  public assignment: Assignment = new Assignment();
  public unexpectedError = false;
  public assignmentForm: FormGroup;
  public exercises: Exercise[] = [];

  constructor(private assignmentService: AssignmentService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contextService: ContextService,
    private dialogService: MatDialog,
    private userService: UserService,
    private exerciseService: ExerciseService) {
      this.buildForm();
  }

  public ngOnInit() {
    this.activeRoute.params
      .subscribe(params => this.reloadData(params));
    this.exerciseService.getExercises()
      .subscribe(exercises => this.exercises = exercises);
    this.activeRoute.queryParams
      .subscribe(params => this.loadQueryParams(params));
  }

  public save(form: NgForm) {
    this.unexpectedError = false;
    this.assignment.exerciseId = form.controls['exercise'].value;

    if (this.assignment._id === undefined) {
      this.assignmentService.create(this.assignment)
        .subscribe(result => this.handleSuccess(true, result), err => this.errorOccurred(err));
    } else {
      this.assignmentService.update(this.assignment)
        .subscribe(result => this.handleSuccess(result, this.assignment._id), err => this.errorOccurred(err));
    }
  }

  public delete() {
    const options = {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this assignment?'
      }
    };

    const dialogRef = this.dialogService.open(ConfirmDialogComponent, options);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.assignmentService.delete(this.assignment._id)
          .subscribe(success => this.handleSuccess(success, null), err => this.errorOccurred(err));
      }
    });
  }

  public back() {
    this.location.back();
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
    this.assignmentForm = new FormGroup({
        exercise: new FormControl('', Validators.required),
    });
  }

  private errorOccurred(err: Error) {
    this.unexpectedError = true;
  }

  private reloadData(params: { [key: string]: string}) {
    const assignmentId = params['id'];
    if (assignmentId !== '0') {
      this.reloadById(assignmentId);
    } else {
      const therapy = params['therapyId'];
      this.assignment.therapyId = therapy;
      this.assignment.order = 0;
    }
  }
  private loadQueryParams(params: { [key: string]: string }) {
    const order = params['order'];
    if (order) {
      this.assignment.order = parseInt(order, null);
    }
  }
  private reloadById(assignmentId: string) {
    this.assignmentService.getAssignment(assignmentId)
        .subscribe(assignment => this.displayData(assignment));
  }

  private displayData(assignment: Assignment) {
    this.assignment = assignment;
    this.assignmentForm.controls['exercise'].setValue(assignment.exerciseId);
  }
}
