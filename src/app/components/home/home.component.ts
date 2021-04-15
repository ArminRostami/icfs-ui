import { Icons } from './../files/icons';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { Component } from '@angular/core';
import { tableColumns } from '@icfs/components/files/columns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {

  constructor() { this.types = tableColumns.type.listOfFilter! }

  types: NzTableFilterList

  getIcon(ftype: string) {
    return Icons.getIcon("", ftype)
  }
}
