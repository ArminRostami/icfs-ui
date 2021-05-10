import { Component, OnDestroy, OnInit } from '@angular/core';
import { FileService } from '@icfs/services/file.service';
import { UserService } from '@icfs/services/user.service';
import { Content } from '@icfs/types/content';
import { User } from '@icfs/types/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-myfiles',
  templateUrl: './myfiles.component.html',
  styleUrls: ['./myfiles.component.less'],
})
export class MyfilesComponent implements OnInit, OnDestroy {
  constructor(private us: UserService, private fileService: FileService) {}
  activeUser = new User();
  dataStream = new BehaviorSubject<Content[]>([]);
  dataStream$ = this.dataStream.asObservable();
  private unsub = new Subject();

  ngOnInit(): void {
    this.getUser();
    this.getFiles();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  getUser() {
    this.us.getUser$.pipe(takeUntil(this.unsub)).subscribe((user) => {
      this.activeUser = user;
    });
  }
  getFiles() {
    this.fileService
      .getUserFiles()
      .pipe(takeUntil(this.unsub))
      .subscribe((contents) => {
        this.dataStream.next(contents);
        console.log('contents are', contents);
      });
  }
}
