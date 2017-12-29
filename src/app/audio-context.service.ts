import { Injectable } from '@angular/core';

@Injectable()
export class AudioContextService {
  private audioContext = new AudioContext();

  constructor() { }

  public getContext() {
    return this.audioContext;
  }
}
