import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Assignment } from '../assignment';
import { TypedSortedDataSource } from '../typed-data-source';
import { MatSort } from '@angular/material';
import { AssignmentService } from '../assignment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-assignment-overview',
  templateUrl: './assignment-overview.component.html',
  styleUrls: ['./assignment-overview.component.css']
})
export class AssignmentOverviewComponent implements OnInit {
  private _therapyId: string;

  @Input()
  public set therapyId(id: string) {
    this._therapyId = id;
    this.reloadData();
  }
  public get therapyId(){
    return this._therapyId;
  }

  @Input()
  public allowAdd = false;

  public displayedColumns = ['order', 'exercise', 'progress'];
  public dataSource: TypedSortedDataSource<Assignment>;
  public currentAssignment: Assignment;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private assignmentService: AssignmentService,
    private router: Router) {
      this.initDataSource([]);
  }

  public ngOnInit() {
  }

  public open(assignment: Assignment) {
    this.router.navigate(['therapy', this._therapyId, 'assignment', assignment._id]);
  }

  public create() {
    this.router.navigate(['therapy', this._therapyId, 'assignment', '0'], {
      queryParams: { order: this.dataSource.list.length },
   });
  }

  private reloadData() {
    this.assignmentService.getAssignments(this._therapyId)
      .subscribe(assignments => this.initDataSource(assignments));
  }

  private initDataSource(assignments: Assignment[]) {
    this.dataSource = new TypedSortedDataSource(assignments, this.sort, 'order');
  }
}
