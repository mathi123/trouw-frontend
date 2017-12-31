import { Component, OnInit } from '@angular/core';
import { TherapyService } from '../therapy.service';
import { ContextService } from '../context.service';
import { User } from '../user';
import { Therapy } from '../therapy';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: User = null;
  public therapies: Therapy[] = [];

  constructor(private therapyService: TherapyService,
    private contextService: ContextService,
    private router: Router) { }

  ngOnInit() {
    this.reloadData();
  }
  public start(therapy: Therapy) {
    this.router.navigate(['my-therapy', therapy._id]);
  }
  private reloadData() {
    this.user = this.contextService.getCurrentUser();
    this.therapyService.getMyTherapys()
      .subscribe(therapies => this.displayData(therapies));
  }
  private displayData(therapies: Therapy[]) {
    this.therapies = therapies;
  }
}
