import { Component, OnInit } from '@angular/core';
import { ContextService } from '../context.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private contextService: ContextService,
    private router: Router) { }

  ngOnInit() {
    if (this.contextService.getCurrentUser() !== null) {
      this.router.navigate(['home']);
    }
  }

}
