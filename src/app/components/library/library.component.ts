import { Component, OnInit } from '@angular/core';
import { FileService } from '@icfs/services/file.service';
import { Content } from '@icfs/types/content';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.less'],
})
export class LibraryComponent implements OnInit {
  private unsub = new Subject();
  private dataStream = new BehaviorSubject<Content[]>([]);
  dataStream$ = this.dataStream.asObservable();

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.getFiles();
  }

  ngOnDestroy() {
    this.unsub.next();
    this.unsub.complete();
  }

  getFiles() {
    this.fileService
      .getDownloads()
      .pipe(takeUntil(this.unsub))
      .subscribe((contents) => {
        this.dataStream.next(contents);
        console.log('contents are', contents);
      });
  }
}
