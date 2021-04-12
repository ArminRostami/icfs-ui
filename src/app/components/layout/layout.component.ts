import { user } from '@icfs/types/user';
import { UserService } from '@icfs/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  user!: user

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    if (this.userService.userExists()) {
      this.user = this.userService.activeUser
      return
    }

    this.userService.fetchUser().subscribe(u => {
      this.user = u
      console.log("user", this.user);
    })
  }

}
