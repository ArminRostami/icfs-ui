import { UserService } from '@icfs/services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.less'],
})
export class LayoutComponent {
  isCollapsed = false;
  ust = this.us.userStream$;

  constructor(private us: UserService) {}
}
