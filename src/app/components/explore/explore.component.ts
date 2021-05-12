import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '@icfs/services/file.service';
import { UserService } from '@icfs/services/user.service';
import { Content } from '@icfs/types/content';
import { User } from '@icfs/types/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.less'],
})
export class ExploreComponent implements OnInit, OnDestroy {
  constructor(private us: UserService, private fileService: FileService) {}

  private unsub = new Subject();
  private dataStream = new BehaviorSubject<Content[]>([]);
  dataStream$ = this.dataStream.asObservable();
  activeUser = new User();

  ngOnInit(): void {
    this.getUser();
    this.getFiles();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  getUser() {
    this.us
      .getUser()
      .pipe(takeUntil(this.unsub))
      .subscribe((user) => {
        this.activeUser = user;
      });
  }

  getFiles() {
    this.fileService
      .getFiles()
      .pipe(takeUntil(this.unsub))
      .subscribe((contents) => {
        this.dataStream.next(contents);
        console.log(contents);
      });
  }
}
