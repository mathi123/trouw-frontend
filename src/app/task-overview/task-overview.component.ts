import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { get } from 'selenium-webdriver/http';
import { TypedSortedDataSource } from '../typed-data-source';
import { Task } from '../task';
import { MatSort } from '@angular/material';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-overview',
  templateUrl: './task-overview.component.html',
  styleUrls: ['./task-overview.component.css']
})
export class TaskOverviewComponent implements OnInit {
  private _exerciseId: string;

  @Input()
  public set exerciseId(id: string){
    this._exerciseId = id;
    this.reloadData();
  }
  public displayedColumns = ['order', 'title'];
  public dataSource: TypedSortedDataSource<Task>;
  public currentTask: Task;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private taskService: TaskService,
    private router: Router) {
      this.initDataSource([]);
  }

  public ngOnInit() {
  }

  public open(task: Task) {
    this.router.navigate(['exercise', this._exerciseId, 'task', task._id]);
  }

  public create() {
    this.router.navigate(['exercise', this._exerciseId, 'task', '0'], {
      queryParams: { order: this.dataSource.list.length },
   });
  }

  private reloadData() {
    this.taskService.getTasksForExcersise(this._exerciseId)
      .subscribe(tasks => this.initDataSource(tasks));
  }

  private initDataSource(tasks: Task[]) {
    this.dataSource = new TypedSortedDataSource(tasks, this.sort, 'order');
  }
}
