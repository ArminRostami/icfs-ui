import { Component, OnInit } from '@angular/core';
import { FileService } from '@icfs/services/file.service';
import { UserService } from '@icfs/services/user.service';
import { Content } from '@icfs/types/content';
import { user } from '@icfs/types/user';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.less'],
})
export class ExploreComponent implements OnInit {
  constructor(private userService: UserService, private fileService: FileService) {}

  activeUser!: user;
  dataStream = new BehaviorSubject<Content[]>([]);
  dataStream$ = this.dataStream.asObservable();

  ngOnInit(): void {
    this.getUser();
    this.getFiles();
  }

  getUser() {
    if (this.userService.userExists()) {
      this.activeUser = this.userService.activeUser;
      return;
    }
    this.userService.fetchUser().subscribe((user) => {
      this.activeUser = user;
    });
  }

  getFiles() {
    this.fileService.getFiles().subscribe((contents) => {
      this.dataStream.next(contents);
      console.log(contents);
    });
  }
}
