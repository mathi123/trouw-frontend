import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';
import { FileService } from '../file.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-image-step',
  templateUrl: './image-step.component.html',
  styleUrls: ['./image-step.component.css']
})
export class ImageStepComponent implements OnInit {
  @Input()
  public step: Step;
  @Input()
  public readOnlyMode = false;

  public serverApi: string = null;

  constructor(private fileService: FileService) {
    this.serverApi = environment.public;
  }

  ngOnInit() {

  }

  public fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
        const file: File = fileList[0];

        this.fileService.uploadFile(file)
          .subscribe(path => this.step.src = path);
    }
  }
}
