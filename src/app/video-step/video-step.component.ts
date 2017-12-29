import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-video-step',
  templateUrl: './video-step.component.html',
  styleUrls: ['./video-step.component.css']
})
export class VideoStepComponent implements OnInit {
  @Input()
  public step: Step;

  constructor() { }

  ngOnInit() {
  }

}
