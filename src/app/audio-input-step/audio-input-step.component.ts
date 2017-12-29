import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-audio-input-step',
  templateUrl: './audio-input-step.component.html',
  styleUrls: ['./audio-input-step.component.css']
})
export class AudioInputStepComponent implements OnInit {
  @Input()
  public step: Step;

  constructor() { }

  ngOnInit() {
  }

}
