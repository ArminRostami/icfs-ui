import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  UserOutline,
  LockOutline,
  InboxOutline,
  UploadOutline,
  FileAddTwoTone,
  AppstoreTwoTone,
  FolderOpenTwoTone,
  StarTwoTone,
  DownSquareTwoTone,
  DownloadOutline,
  AudioTwoTone,
  VideoCameraTwoTone,
  FilePdfTwoTone,
  FileUnknownTwoTone,
  FileImageTwoTone,
  FileZipTwoTone,
  FilePptTwoTone,
  FileExcelTwoTone,
  FileWordTwoTone,
  FileTextTwoTone,
  BookTwoTone,
  ContainerTwoTone,
  InfoCircleOutline,
  DeleteOutline
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline, UserOutline,
  LockOutline,
  InboxOutline,
  UploadOutline,
  FileAddTwoTone,
  AppstoreTwoTone,
  FolderOpenTwoTone,
  StarTwoTone,
  DownSquareTwoTone,
  DownloadOutline,
  // file type icons
  AudioTwoTone,
  VideoCameraTwoTone,
  FilePdfTwoTone,
  FileUnknownTwoTone,
  FileImageTwoTone,
  FileZipTwoTone,
  FilePptTwoTone,
  FileExcelTwoTone,
  FileWordTwoTone,
  FileTextTwoTone,
  BookTwoTone,
  ContainerTwoTone,
  InfoCircleOutline,
  DeleteOutline


];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [
    { provide: NZ_ICONS, useValue: icons }
  ]
})
export class IconsProviderModule {
}
