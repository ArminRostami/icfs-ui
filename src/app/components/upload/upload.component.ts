import { Component } from '@angular/core';
import { FileService } from '@icfs/services/file.service';
import { FileData } from '@icfs/types/fileData';
import { Icons } from '../files/icons';
import { FileTypes } from '../files/file-types';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { IpfsService } from '@icfs/services/ipfs.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  constructor(private fileService: FileService, private ipfsService: IpfsService) {}

  tagColor = '#1890ff';
  descText = '';
  fileInfo = new FileData();
  fileObj: File | null = null;

  beforeUpload = (file: NzUploadFile): boolean => {
    const nameExt = file.name.split('.', 2);
    this.fileInfo.name = nameExt[0];
    this.fileInfo.extension = nameExt[1];
    this.fileInfo.size = file.size || 0;
    this.fileInfo.type = FileTypes.get(this.fileInfo.extension, file.type || '');

    this.tagColor = Icons.getIcon(this.fileInfo.extension, this.fileInfo.type).color;

    this.fileObj = file as any as File;
    console.log(this.fileInfo);
    console.log(this.fileObj);

    return false;
  };

  handleUpload() {
    if (!this.fileInfo.size || this.fileObj === null) {
      return;
    }
    this.ipfsService.saveToIpfs(this.fileObj).subscribe((added) => {
      console.log(added);
      this.fileService
        .uploadFile(this.fileInfo, this.descText, added.cid.toString())
        .subscribe((resp) => {
          console.log(resp);
        });
    });
  }

  onClose() {
    this.fileInfo = new FileData();
    this.descText = '';
  }
}
