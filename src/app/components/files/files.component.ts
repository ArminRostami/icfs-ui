import { iconmap } from './icons';
import { tableColumns } from './columns';
import { Content } from './../../types/content';
import { FileService } from './../../services/file.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
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
      .subscribe(contents => { this.listOfData = contents, console.log(contents) })
  }

  ngOnDestroy() {
    this.unsub$.next()
    this.unsub$.complete()
  }

  getIcon(data: Content) {
    if (iconmap.has(data.extension)) {
      return iconmap.get(data.extension)
    }
    if (iconmap.has(data.file_type)) {
      return iconmap.get(data.file_type)
    }
    return iconmap.get("unknown")
  }
}
