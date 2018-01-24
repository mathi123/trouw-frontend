import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public showFeest = false;

  constructor(private location: Location) {

   }
  ngOnInit() {
    this.showFeest = environment.feest;
  }

  public back() {
    this.location.back();
  }
}
