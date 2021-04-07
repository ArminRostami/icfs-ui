import { Component } from '@angular/core';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { FileService } from '@icfs/services/file.service';
import { ipcRenderer } from 'electron'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html'
})
export class UploadComponent {
  constructor(private fileService: FileService) { }

  descText: string = ""

  fileList: NzUploadFile[] = [];

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  handleUpload() {
    console.log(this.fileList);
    console.log(this.descText);
    this.fileService.uploadFile(this.fileList[0], this.descText).subscribe(resp => console.log(resp))
  }
  openDialog() {
    ipcRenderer.send("open-dialog", true)
  }
}
