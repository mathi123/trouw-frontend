import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Step } from '../step';
import { AudioContextService } from '../audio-context.service';
import { FileService } from '../file.service';
import { Uuid } from '../Uuid';
import { environment } from '../../environments/environment';
declare var MediaRecorder: any;

@Component({
  selector: 'app-audio-step',
  templateUrl: './audio-step.component.html',
  styleUrls: ['./audio-step.component.css']
})
export class AudioStepComponent implements OnInit {
  private currentRecordingId: string;
  private part = 0;
  private recorder: any;

  @Input()
  public step: Step;

  @Input()
  public readOnlyMode = false;

  @Input()
  public recordReadOnly = false;

  public serverApi: string = null;
  public recording = false;

  constructor(private audioContextService: AudioContextService,
    private fileService: FileService,
    private zone: NgZone) {
    this.serverApi = environment.public;
  }

  ngOnInit() {
  }

  public startRecording() {
    this.recording = true;
    this.currentRecordingId = Uuid.UUID();
    this.part = 0;
    const options = {
      video: false,
      audio: true
    };

    navigator.getUserMedia(options, stream => this.audioStreamReady(stream), err => this.logError(err));
  }
  public stopRecording() {
    this.recorder.stop();
  }
  private audioStreamReady(stream) {
    this.recorder = new MediaRecorder(stream);
    this.recorder.ondataavailable = (e) => this.dataAvailable(e);
    this.recorder.start(1000);
  }
  private dataAvailable(e) {
    if (`${this.recorder.state}` === 'inactive') {
      this.fileService.sendToServer(this.currentRecordingId, this.part++, e.data)
        .subscribe(res => this.createFile());
    } else {
      this.fileService.sendToServer(this.currentRecordingId, this.part++, e.data)
        .subscribe(res => console.log('part send to server'));
    }
  }
  private createFile() {
    this.fileService.createFile(this.currentRecordingId, this.part)
      .subscribe(id => this.fileCreated(id));
  }
  private fileCreated(id) {
    this.recording = false;
    this.step.src = id;
    this.zone.run(() => console.log('done'));
  }
  private logError(err: Error) {
    console.error(err);
  }
}
