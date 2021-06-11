import { Icons } from './../files/icons';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { Component, OnInit } from '@angular/core';
import { tableColumns } from '@icfs/components/files/columns';
import { IpfsService } from '@icfs/services/ipfs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  types: NzTableFilterList;

  constructor(private ipfsService: IpfsService) {
    this.types = tableColumns.type.listOfFilter!;
  }

  ngOnInit() {
    this.testIPFS();
  }

  testIPFS() {
    this.ipfsService.getVersion().subscribe((v) => {
      console.log('Connected to ipfs: ', v);
    });
  }

  getIcon(ftype: string) {
    return Icons.getIcon('', ftype);
  }
}
