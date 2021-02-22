import { tableColumns } from './columns';
import { Content } from './../../types/content';
import { FileService } from './../../services/file.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html'
})
export class FilesComponent implements OnInit, OnDestroy {
  constructor(private fileService: FileService) { }

  unsub$ = new Subject();
  listOfData: Content[] = [];
  listOfColumns = tableColumns

  ngOnInit() {
    this.fileService.getFiles()
      .pipe(takeUntil(this.unsub$))
      .subscribe(contents => this.listOfData = contents)
  }

  ngOnDestroy() {
    this.unsub$.next()
    this.unsub$.complete()
  }

  getAllFiles(): Observable<Content[]> {
    return this.fileService.getFiles()
  }
}
