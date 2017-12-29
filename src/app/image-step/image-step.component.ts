import { Component, OnInit, Input } from '@angular/core';
import { Step } from '../step';
import { FileService } from '../file.service';

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


  constructor(private fileService: FileService) { }

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
