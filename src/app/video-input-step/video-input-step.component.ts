import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-video-input-step',
  templateUrl: './video-input-step.component.html',
  styleUrls: ['./video-input-step.component.css']
})
export class VideoInputStepComponent implements OnInit {
  @Input()
  public step: Step;

  constructor() { }

  ngOnInit() {
  }

}
