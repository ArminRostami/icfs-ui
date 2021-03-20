import { iconmap } from './icons';
import { tableColumns } from './columns';
import { Content } from './../../types/content';
import { FileService } from './../../services/file.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})

export class FilesComponent implements OnInit, OnDestroy {
  constructor(
    private fileService: FileService,
    private router: ActivatedRoute) { }

  dlsFilterVisible = false
  sizeFilterVisible = false
  rateFilterVisible = false
  ltSize = +Infinity
  gtSize = -Infinity
  ltRate = 5
  gtRate = 0
  gtDls = 0
  ltDls = +Infinity
  pageSize = 6
  expandSet = new Set<string>();
  loading = true
  unsub$ = new Subject();
  listOfData: Content[] = [];
  displayData: Content[] = []
  c = tableColumns

  ngOnInit() {
    this.getFiles()
    this.router.params.subscribe(params => this.setDefaultFilter(params['filter']))
  }

  setDefaultFilter(ftype: string) {
    if (ftype === "") return
    const item = this.c.type.listOfFilter!.find(item => item.text.toLowerCase() == ftype.toLowerCase())!
    item.byDefault = true
  }

  getFiles() {
    this.fileService.getFiles()
      .pipe(takeUntil(this.unsub$))
      .subscribe(contents => {
        this.listOfData = contents
        this.displayData = this.listOfData
        console.log(contents)
        this.loading = false
      })
  }

  ngOnDestroy() {
    this.reset()
    this.resetTypeFilter()
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

  reset() {
    this.dlsFilterVisible = false
    this.sizeFilterVisible = false
    this.rateFilterVisible = false
    this.ltSize = +Infinity
    this.gtSize = -Infinity
    this.ltRate = 5
    this.gtRate = 0
    this.gtDls = 0
    this.ltDls = +Infinity
    this.displayData = this.listOfData
  }


  NotInfinite(x: number): boolean {
    return isFinite(x)
  }

  filterSize() {
    this.displayData = this.displayData.filter(content => content.size >= this.gtSize && content.size <= this.ltSize)
  }
  filterRate() {
    this.displayData = this.displayData.filter(content => content.rating >= this.gtRate && content.rating <= this.ltRate)
  }
  filterDls() {
    this.displayData = this.displayData.filter(content => content.downloads >= this.gtDls && content.downloads <= this.ltDls)
  }

  resetTypeFilter() {
    this.c.type.listOfFilter?.forEach(filter => filter.byDefault = false)
  }
}
