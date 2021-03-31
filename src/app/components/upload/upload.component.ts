import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  constructor() { }

  collapseDisabled = true;
  collapseActive = true;
  descText: string = ""

  fileList: NzUploadFile[] = [];

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.collapseDisabled = false;
    return false;
  };

  handleUpload() {
    console.log(this.fileList);
    console.log(this.descText);

  }
}
