import { Icons } from './../files/icons';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { Component, OnInit } from '@angular/core';
import { tableColumns } from '@icfs/components/files/columns';
import ipfsClient from 'ipfs-http-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  types: NzTableFilterList;

  constructor() {
    this.types = tableColumns.type.listOfFilter!;
  }

  ngOnInit() {
    this.getClient();
  }

  getClient() {
    const client = ipfsClient({ url: '/ip4/127.0.0.1/tcp/5001' });

    client
      .version()
      .then((res: any) => console.log('client version:', res))
      .catch((err: any) => console.log('error while getting client version', err));
  }

  getIcon(ftype: string) {
    return Icons.getIcon('', ftype);
  }
}
