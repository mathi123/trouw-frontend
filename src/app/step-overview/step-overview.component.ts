import { Component, OnInit, Input } from '@angular/core';

import { Step } from '../step';

@Component({
  selector: 'app-step-overview',
  templateUrl: './step-overview.component.html',
  styleUrls: ['./step-overview.component.css']
})
export class StepOverviewComponent implements OnInit {
  private _readOnlyMode = false;

  @Input()
  public steps: Step[] = [];

  @Input()
  public readOnlyMode = false;

  constructor() { }

  public ngOnInit() {
  }

  public create(type: string) {
    const step = new Step();
    step.type = type;
    this.steps.push(step);
  }

  public delete(step: Step) {
    const index = this.steps.indexOf(step);
    if (index >= 0) {
      this.steps.splice(index, 1);
    }
  }

  public moveUp(step: Step) {
    const index = this.steps.indexOf(step);
    if (index > 0) {
      const temp = this.steps[index - 1];
      this.steps[index - 1] = this.steps[index];
      this.steps[index] = temp;
    }
  }

  public moveDown(step: Step) {
    const index = this.steps.indexOf(step);
    if (index >= 0 && index < this.steps.length - 1) {
      const temp = this.steps[index + 1];
      this.steps[index + 1] = this.steps[index];
      this.steps[index] = temp;
    }
  }
}
