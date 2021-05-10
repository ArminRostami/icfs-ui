import { Icons } from './../files/icons';
import { NzTableFilterList } from 'ng-zorro-antd/table';
import { Component, OnInit } from '@angular/core';
import { tableColumns } from '@icfs/components/files/columns';
import { UserService } from '@icfs/services/user.service';
import { Router } from '@angular/router';
import ipfsClient from 'ipfs-http-client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {
    this.types = tableColumns.type.listOfFilter!;
  }

  ngOnInit() {
    this.checkUser();
    this.getClient();
  }

  checkUser() {
    if (this.userService.userExists()) {
      return;
    }

    this.userService.fetchUser().subscribe((_) => {
      if (!this.userService.userExists()) this.router.navigateByUrl('login');
    });
  }

  getClient() {
    const client = ipfsClient({ url: '/ip4/127.0.0.1/tcp/5001' });

    client
      .version()
      .then((res: any) => console.log('client version:', res))
      .catch((err: any) => console.log('error while getting client version', err));
  }

  types: NzTableFilterList;

  getIcon(ftype: string) {
    return Icons.getIcon('', ftype);
  }
}
