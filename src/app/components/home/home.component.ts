import { NzTableFilterList } from 'ng-zorro-antd/table';
import { Component, OnInit } from '@angular/core';
import { tableColumns } from '../files/columns';
import { iconmap } from '../files/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  constructor() { }

  types!: NzTableFilterList
  icons: any

  ngOnInit() {
    this.types = tableColumns.type.listOfFilter!
    this.icons = iconmap
  }

  getIcon(ftype: string) {
    return this.icons.get(ftype)
  }
}
