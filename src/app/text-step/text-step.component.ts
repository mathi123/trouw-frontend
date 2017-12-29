import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-text-step',
  templateUrl: './text-step.component.html',
  styleUrls: ['./text-step.component.css']
})
export class TextStepComponent implements OnInit {
  @Input()
  public step: Step;
  @Input()
  public readOnlyMode = false;

  constructor() { }

  ngOnInit() {
  }

}
