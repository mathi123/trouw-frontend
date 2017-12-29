import { Component, OnInit, ViewChild } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { Exercise } from '../exercise';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material';
import { TypedSortedDataSource } from '../typed-data-source';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-exercise-overview',
  templateUrl: './exercise-overview.component.html',
  styleUrls: ['./exercise-overview.component.css']
})
export class ExerciseOverviewComponent implements OnInit {
  public displayedColumns = ['title', 'description'];
  public dataSource: TypedSortedDataSource<Exercise>;
  public currentExercise: Exercise;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private exerciseService: ExerciseService,
    private router: Router) {
      this.initDataSource([]);
  }

  public ngOnInit() {
    this.reloadData();
  }

  public open(exercise: Exercise) {
    this.router.navigate(['exercise', exercise._id]);
  }

  public create() {
    this.router.navigate(['exercise', '0']);
  }

  private reloadData() {
    this.exerciseService.getExercises()
    .subscribe(excercises => this.initDataSource(excercises));
  }

  private initDataSource(exercises: Exercise[]) {
    this.dataSource = new TypedSortedDataSource(exercises, this.sort, 'title');
  }
}
