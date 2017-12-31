import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Therapy } from '../therapy';
import { FormGroup } from '@angular/forms';
import { TherapyService } from '../therapy.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContextService } from '../context.service';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-my-therapy-view',
  templateUrl: './my-therapy-view.component.html',
  styleUrls: ['./my-therapy-view.component.css']
})
export class MyTherapyViewComponent implements OnInit {
  public therapy: Therapy = new Therapy();
  public unexpectedError = false;

  constructor(private therapyService: TherapyService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialogService: MatDialog,
    private userService: UserService) {
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
    const therapyId = params['id'];
    this.reloadById(therapyId);
  }
  private reloadById(therapyId: string) {
    this.therapyService.getById(therapyId)
        .subscribe(therapy => this.displayData(therapy));
  }

  private displayData(therapy: Therapy) {
    this.therapy = therapy;
  }
}
