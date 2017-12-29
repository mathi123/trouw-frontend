import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ContextService } from '../context.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-invite-patient',
  templateUrl: './invite-patient.component.html',
  styleUrls: ['./invite-patient.component.css']
})
export class InvitePatientComponent implements OnInit {
  public url: string = null;

  constructor(private location: Location,
    private contextService: ContextService) { }

  public ngOnInit() {
    const therapistId = this.contextService.getCurrentUser()._id;
    this.url = `${environment.frontend}/register?therapist=${therapistId}`;
  }

  public back() {
    this.location.back();
  }


}
