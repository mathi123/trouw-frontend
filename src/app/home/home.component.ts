import { Component, OnInit } from '@angular/core';
import { TherapyService } from '../therapy.service';
import { ContextService } from '../context.service';
import { User } from '../user';
import { Therapy } from '../therapy';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public user: User = null;
  public therapies: Therapy[] = [];

  constructor(private therapyService: TherapyService,
    private contextService: ContextService) { }

  ngOnInit() {
    this.reloadData();
  }
  public start(therapy: Therapy) {
    
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
