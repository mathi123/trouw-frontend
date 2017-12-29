import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { FormGroup, NgForm, FormControl, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from '../context.service';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnInit {
  public task: Task = new Task();
  public unexpectedError = false;
  public taskForm: FormGroup;
  public readOnlyMode = false;

  constructor(private taskService: TaskService,
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

    if (this.task._id === undefined) {
      this.taskService.create(this.task)
        .subscribe(result => this.handleSuccess(true, result), err => this.errorOccurred(err));
    } else {
      this.taskService.update(this.task)
        .subscribe(result => this.handleSuccess(result, this.task._id), err => this.errorOccurred(err));
    }
  }

  public delete() {
    const options = {
      data: {
        title: 'Confirm',
        message: 'Are you sure you want to delete this task?'
      }
    };

    const dialogRef = this.dialogService.open(ConfirmDialogComponent, options);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.taskService.delete(this.task._id)
          .subscribe(success => this.handleSuccess(success, null), err => this.errorOccurred(err));
      }
    });
  }

  public edit() {
    this.readOnlyMode = false;
  }

  public back() {
    this.location.back();
  }

  private handleSuccess(success: boolean, id: string) {
    console.log(success);
    if (!success) {
      this.errorOccurred(null);
    } else {
      if (id === null) {
        this.location.back();
      } else {
        this.taskService.getTask(id)
        .subscribe(task => this.displayData(task));
        this.readOnlyMode = true;
      }
    }
  }

  private buildForm() {
    this.taskForm = new FormGroup({
        title: new FormControl('', Validators.required),
    });
  }

  private errorOccurred(err: Error) {
    this.unexpectedError = true;
  }

  private reloadData(params: { [key: string]: string}) {
    const taskId = params['taskId'];
    if (taskId !== '0') {
      this.taskService.getTask(taskId)
        .subscribe(task => this.displayData(task));
    } else {
      const exerciseId = params['exerciseId'];
      this.task.exerciseId = exerciseId;
      this.task.steps = [];
      this.activeRoute.queryParams.subscribe(
        query => this.task.order = parseInt(query['order'], null)
      );
    }
  }

  private displayData(task: Task) {
    this.task = task;
  }
}
