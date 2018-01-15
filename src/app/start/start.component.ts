import { Component, OnInit } from '@angular/core';
import { ContextService } from '../context.service';
import { Router } from '@angular/router';
import { HotJarService } from '../hot-jar.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  constructor(private contextService: ContextService,
    private router: Router,
    private hotJarService: HotJarService) { }

  ngOnInit() {
    if (environment.production) {
      this.hotJarService.import();
    }
  }

}
