import { user } from '@icfs/types/user';
import { UserService } from '@icfs/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  user: user | null = null;

  constructor(private userService: UserService) {}

  // TODO: implement log out
  ngOnInit(): void {
    if (this.userService.userExists()) {
      this.user = this.userService.activeUser;
      return;
    }

    this.userService.fetchUser().subscribe((resp) => {
      this.user = resp.body;
      console.log('user', this.user);
    });
  }
}
