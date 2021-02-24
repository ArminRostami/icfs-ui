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
  FolderOpenTwoTone
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
  FolderOpenTwoTone
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
