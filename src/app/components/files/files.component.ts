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

  pageSize = 6
  expandSet = new Set<string>();
  loading = true
  unsub$ = new Subject();
  listOfData: Content[] = [];
  c = tableColumns

  ngOnInit() {
    this.fileService.getFiles()
      .pipe(takeUntil(this.unsub$))
      .subscribe(contents => {
        this.listOfData = contents
        console.log(contents)
        this.loading = false
      })
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

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
}
