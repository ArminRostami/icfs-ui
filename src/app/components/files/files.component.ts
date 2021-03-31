import { iconmap } from './icons';
import { Cols, tableColumns } from './columns';
import { Content } from './../../types/content';
import { FileService } from './../../services/file.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { ActivatedRoute } from '@angular/router';
import { formatDistance } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { user } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less']
})

export class FilesComponent implements OnInit, OnDestroy {
  constructor(
    private userService: UserService,
    private fileService: FileService,
    private router: ActivatedRoute,
    private modal: NzModalService
  ) { this.c = tableColumns }

  activeUser!: user

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
  c: Cols
  modalVisible = false

  ngOnInit() {
    this.getUser()
    this.getFiles()
    this.router.params.subscribe(params => this.setDefaultFilter(params['filter']))
  }

  setDefaultFilter(ftype: string) {
    if (ftype === undefined) return
    const item = this.c.type.listOfFilter?.find(item => item.text.toLowerCase() == ftype.toLowerCase())!
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

  getUser() {
    if (this.userService.userExists()) {
      this.activeUser = this.userService.activeUser
      return
    }
    this.userService.fetchUser().subscribe(user => { this.activeUser = user })
  }

  ngOnDestroy() {
    this.reset()
    this.resetTypeFilter()
    this.unsub$.next()
    this.unsub$.complete()
  }

  getIcon(file: Content) {
    if (iconmap.has(file.extension)) {
      return iconmap.get(file.extension)
    }
    if (iconmap.has(file.file_type)) {
      return iconmap.get(file.file_type)
    }
    return iconmap.get("unknown")
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
      this.getComments(id)
      return
    }
    this.expandSet.delete(id);
  }

  getComments(content_id: string) {
    this.fileService.getComments(content_id).subscribe(fileComments => {
      const idx = this.listOfData.findIndex(content => content.id == content_id)
      if (idx == -1) { return }
      this.listOfData[idx].comments = fileComments
    })
  }

  showModal(file: Content) {
    this.modal.confirm({
      nzTitle: `<i>Do you want to get ${file.name}?</i>`,
      nzContent: `<p>required credit: ${file.size}</p>
      <p>current credit: ${this.activeUser.credit}</p>
      <p>new credit: ${this.activeUser.credit - file.size}</p>`,
      nzOnOk: () => {
        console.log(file.id);
      }
    })
  }

  getTime(time: Date): string {
    return formatDistance(time, new Date())
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
