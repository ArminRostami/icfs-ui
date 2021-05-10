import { Icons } from './icons';
import { Cols, tableColumns } from './columns';
import { Content } from '@icfs/types/content';
import { FileService } from '@icfs/services/file.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { formatDistance } from 'date-fns';
import { NzModalService } from 'ng-zorro-antd/modal';
import { user } from '@icfs/types/user';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.less'],
})
export class FilesComponent implements OnInit, OnDestroy {
  constructor(
    private fileService: FileService,
    private router: ActivatedRoute,
    private modal: NzModalService
  ) {
    this.c = tableColumns;
  }

  @Input() activeUser: user | null = null;
  @Input() fileStream!: Observable<Content[]>;
  @Input() editMode = false;

  fileList: Content[] = [];
  displayData: Content[] = [];

  dlsFilterVisible = false;
  sizeFilterVisible = false;
  rateFilterVisible = false;
  textSearchVisible = false;
  modalVisible = false;

  loading = true;
  submitting = false;

  textSearchValue = '';
  commentText = '';

  ltSize = +Infinity;
  gtSize = -Infinity;
  ltRate = 5;
  gtRate = 0;
  gtDls = 0;
  ltDls = +Infinity;

  pageSize = 6;
  userRating = 0;

  expandSet = new Set<string>();
  unsub$ = new Subject();

  c: Cols;

  ngOnInit() {
    this.fileStream.subscribe((files) => {
      this.fileList = files;
      this.displayData = files;
      this.loading = false;
    });
    this.router.params.subscribe((params) => this.setDefaultFilter(params['filter']));
  }

  setDefaultFilter(ftype: string) {
    if (ftype === undefined) return;
    const item = this.c.type.listOfFilter?.find((item) => item.text.toLowerCase() == ftype.toLowerCase())!;
    item.byDefault = true;
  }

  ngOnDestroy() {
    this.reset();
    this.resetTypeFilter();
    this.unsub$.next();
    this.unsub$.complete();
  }

  getIcon(file: Content) {
    return Icons.getIcon(file.extension, file.file_type);
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
      this.getComments(id);
    } else {
      this.expandSet.delete(id);
    }

    this.commentText = '';
    this.userRating = 0;
  }

  getComments(content_id: string) {
    this.fileService.getComments(content_id).subscribe((fileComments) => {
      const idx = this.fileList.findIndex((content) => content.id == content_id);
      if (idx == -1) {
        return;
      }
      this.fileList[idx].comments = fileComments;
    });
  }

  submitReview() {
    // TODO: send reviews to API
    this.submitting = true;
    console.log(this.commentText, this.userRating);
    this.submitting = false;
  }

  showModal(file: Content) {
    if (!this.editMode) this.showDownloadModal(file);
    else {
      this.showDeleteModal(file);
    }
  }

  showDownloadModal(file: Content) {
    if (this.activeUser == null) {
      return;
    }
    this.modal.confirm({
      nzTitle: `<i>Do you want to get ${file.name}?</i>`,
      nzContent: `<p>required credit: ${file.size}</p>
        <p>current credit: ${this.activeUser.credit}</p>
        <p>new credit: ${this.activeUser.credit - file.size}</p>`,
      nzOnOk: () => {
        // TODO: get file from server
        console.log(file.id);
      },
    });
  }

  showDeleteModal(file: Content) {
    if (this.activeUser == null) {
      return;
    }
    this.modal.confirm({
      nzTitle: `<i>Are you sure you want to delete ${file.name}?</i>`,
      nzContent: `<p>you will lose: ${file.size} credit.</p>
      <p>current credit: ${this.activeUser.credit}</p>
      <p>new credit: ${this.activeUser.credit - file.size}</p>`,
      nzOnOk: () => {
        // TODO: send delete to API
        console.log(file.id);
      },
    });
  }

  getTime(time: Date): string {
    return formatDistance(time, new Date());
  }

  reset() {
    this.dlsFilterVisible = false;
    this.sizeFilterVisible = false;
    this.rateFilterVisible = false;
    this.textSearchVisible = false;
    this.textSearchValue = '';

    this.ltSize = +Infinity;
    this.gtSize = -Infinity;
    this.ltRate = 5;
    this.gtRate = 0;
    this.gtDls = 0;
    this.ltDls = +Infinity;
    this.displayData = this.fileList;
  }

  NotInfinite(x: number): boolean {
    return isFinite(x);
  }

  filterSize() {
    this.displayData = this.displayData.filter(
      (content) => content.size >= this.gtSize && content.size <= this.ltSize
    );
  }
  filterRate() {
    this.displayData = this.displayData.filter(
      (content) => content.rating >= this.gtRate && content.rating <= this.ltRate
    );
  }
  filterDls() {
    this.displayData = this.displayData.filter(
      (content) => content.downloads >= this.gtDls && content.downloads <= this.ltDls
    );
  }

  textSearch() {
    this.fileService.textSearch(this.textSearchValue).subscribe((results) => {
      console.log('results: ' + results);

      this.displayData = results;
    });
  }

  resetTypeFilter() {
    this.c.type.listOfFilter?.forEach((filter) => (filter.byDefault = false));
  }
}
