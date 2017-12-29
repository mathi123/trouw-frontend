import { Component, OnInit, ViewChild } from '@angular/core';
import { TypedSortedDataSource } from '../typed-data-source';
import { Therapy } from '../therapy';
import { MatSort, MatDialog } from '@angular/material';
import { TherapyService } from '../therapy.service';
import { ContextService } from '../context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-therapy-overview',
  templateUrl: './therapy-overview.component.html',
  styleUrls: ['./therapy-overview.component.css']
})
export class TherapyOverviewComponent implements OnInit {
  public displayedColumns = ['patient', 'title', 'description'];
  public dataSource: TypedSortedDataSource<Therapy>;
  public currentTherapy: Therapy;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private therapyService: TherapyService,
    private contextService: ContextService,
    private router: Router,
    private dialogService: MatDialog) {
      this.initDataSource([]);
  }

  public ngOnInit() {
    this.reloadData();
  }

  public open(therapy: Therapy) {
    this.router.navigate(['therapy', therapy._id]);
  }

  public create() {
    this.router.navigate(['therapy', '0']);
  }

  private reloadData() {
    this.therapyService.getTherapys()
      .subscribe(therapys => this.initDataSource(therapys));
  }

  private initDataSource(therapys: Therapy[]) {
    this.dataSource = new TypedSortedDataSource(therapys, this.sort, 'patient');
  }
}
