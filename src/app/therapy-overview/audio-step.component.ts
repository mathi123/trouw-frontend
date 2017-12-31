import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Step } from '../step';
import { AudioContextService } from '../audio-context.service';
import { FileService } from '../file.service';
import { Uuid } from '../Uuid';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';
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
  private buffer = null;
  private metronomeSubscription: Subscription;

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
    this.prepareMetronome();
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
    if (this.metronomeSubscription) {
      this.metronomeSubscription.unsubscribe();
    }
    this.recorder.stop();
  }
  public fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file: File = fileList[0];

        this.fileService.uploadFile(file)
          .subscribe(path => this.step.src = path);
    }
  }
  public playSound() {
    const context = this.audioContextService.getContext();
    const source = context.createBufferSource(); // creates a sound source
    source.buffer = this.buffer;                    // tell the source which sound to play
    source.connect(context.destination);       // connect the source to the context's destination (the speakers)
    source.start(0);                           // play the source now
  }
  private prepareMetronome() {
    const audioContext = this.audioContextService.getContext();
    const url = `${environment.samples}/audio/metronome.wav`;
    this.fileService.load(audioContext, url, (buffer) => this.metronomeLoaded(buffer), (err) => this.logError(err));
  }
  private metronomeLoaded(buffer) {
    this.buffer = buffer;
  }
  private audioStreamReady(stream) {
    this.recorder = new MediaRecorder(stream);
    this.recorder.ondataavailable = (e) => this.dataAvailable(e);
    this.recorder.start(1000);

    if (this.step.metronome && this.step.bpm !== 0) {
      const source = Observable.timer(0, 1000 * 60 / this.step.bpm);
      this.metronomeSubscription = source.subscribe(val => this.metronomeTick());
    }
  }
  private metronomeTick() {
    this.playSound();
  }
  private dataAvailable(e) {
    if (`${this.recorder.state}` === 'inactive') {
      this.fileService.sendToServer(this.currentRecordingId, this.part++, e.data, res => this.createFile());
    } else {
      this.fileService.sendToServer(this.currentRecordingId, this.part++, e.data, res => console.log('part send to server'));
    }
  }
  private createFile() {
    this.fileService.createFile(this.currentRecordingId, this.part, 'webm')
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
