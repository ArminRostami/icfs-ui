import { Component, OnInit } from '@angular/core';
import { FileService } from '@icfs/services/file.service';
import { fileData } from '@icfs/types/fileData';
import { NgZone } from '@angular/core';
import { Icons } from '../files/icons';
import { Ftypes } from '../files/file-types';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent implements OnInit {
  constructor(private fileService: FileService, private zone: NgZone) {}

  tagColor = '#1890ff';
  descText: string = '';
  fileInfo: fileData | null = null;

  handleUpload() {
    if (this.fileInfo === null) {
      return;
    }
    this.fileService
      .uploadFile(this.fileInfo, this.descText)
      .subscribe((resp) => {
        console.log(resp);
      });
  }

  ngOnInit() {}

  setFileInfo(info: any) {
    this.fileInfo = info;
    if (!this.fileInfo) {
      return;
    }
    this.fileInfo.type = Ftypes.getRealType(
      this.fileInfo.extension,
      this.fileInfo.type
    );
    this.tagColor = Icons.getIcon(
      this.fileInfo.extension,
      this.fileInfo.type
    ).color;
  }

  onClose() {
    this.fileInfo = null;
    this.descText = '';
  }

  openDialog() {}
}
