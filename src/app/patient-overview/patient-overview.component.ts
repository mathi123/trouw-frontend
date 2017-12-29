import { Component, OnInit, ViewChild } from '@angular/core';
import { TypedSortedDataSource } from '../typed-data-source';
import { User } from '../user';
import { UserService } from '../user.service';
import { MatSort, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ContextService } from '../context.service';
import { environment } from '../../environments/environment';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css']
})
export class PatientOverviewComponent implements OnInit {
  public displayedColumns = ['lastName', 'firstName', 'email'];
  public dataSource: TypedSortedDataSource<User>;
  public currentUser: User;

  @ViewChild(MatSort)
  public sort: MatSort;

  constructor(private userService: UserService,
    private contextService: ContextService,
    private router: Router,
    private dialogService: MatDialog) {
      this.initDataSource([]);
  }

  public ngOnInit() {
    this.reloadData();
  }

  public invite() {
    this.router.navigate([ 'invite' ]);
  }

  private reloadData() {
    this.userService.getPatients(this.contextService.getCurrentUser()._id)
    .subscribe(users => this.initDataSource(users));
  }

  private initDataSource(users: User[]) {
    this.dataSource = new TypedSortedDataSource(users, this.sort, 'lastName');
  }
}
