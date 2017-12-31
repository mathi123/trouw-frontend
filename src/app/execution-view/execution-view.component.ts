import { Component, OnInit } from '@angular/core';
import { AssignmentService } from '../assignment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from '../context.service';
import { MatDialog } from '@angular/material';
import { Assignment } from '../assignment';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-execution-view',
  templateUrl: './execution-view.component.html',
  styleUrls: ['./execution-view.component.css']
})
export class ExecutionViewComponent implements OnInit {
  public assignment: Assignment = new Assignment();
  public unexpectedError = false;
  public assignmentForm: FormGroup;
  public readOnlyMode = false;

  constructor(private assignmentService: AssignmentService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private contextService: ContextService,
    private dialogService: MatDialog) {
  }

  public ngOnInit() {
    this.activeRoute.params
      .subscribe(params => this.reloadData(params));
  }

  public back() {
    this.location.back();
  }

  private errorOccurred(err: Error) {
    this.unexpectedError = true;
  }

  private reloadData(params: { [key: string]: string}) {
    const therapyId = params['therapyId'];
    const assignmentId = params['assignmentId'];

    this.assignmentService.getAssignment(assignmentId)
        .subscribe(assignment => this.displayData(assignment));
  }

  private displayData(assignment: Assignment) {
    this.assignment = assignment;
  }
}
