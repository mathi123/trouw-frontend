import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Step } from '../step';

@Component({
  selector: 'app-step-view',
  templateUrl: './step-view.component.html',
  styleUrls: ['./step-view.component.css']
})
export class StepViewComponent implements OnInit {

  @Input()
  public step: Step;

  @Output()
  public deleted: EventEmitter<Step> = new EventEmitter<Step>();

  @Output()
  public moveUp: EventEmitter<Step> = new EventEmitter<Step>();

  @Output()
  public moveDown: EventEmitter<Step> = new EventEmitter<Step>();

  @Input()
  public readOnlyMode = false;

  constructor() { }

  ngOnInit() {
  }

  public delete() {
    this.deleted.next(this.step);
  }
  public up() {
    this.moveUp.next(this.step);
  }
  public down() {
    this.moveDown.next(this.step);
  }
}
