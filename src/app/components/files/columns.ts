import { NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Content } from 'src/app/types/content';


interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  sortDirections: NzTableSortOrder[];
  // listOfFilter: NzTableFilterList;
  // filterFn: NzTableFilterFn | null;
  // filterMultiple: boolean;
}

export const tableColumns: ColumnItem[] = [
  {
    name: 'Category',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.category.localeCompare(b.category),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Uploader',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.uploader.localeCompare(b.uploader),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Date',
    sortOrder: 'descend',
    sortFn: (a: Content, b: Content) => a.upload_date.getTime() - b.upload_date.getTime(),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Size',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.size - b.size,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Rating',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.rating - b.rating,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Downloads',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.downloads - b.downloads,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: "Actions",
    sortOrder: null,
    sortFn: null,
    sortDirections: [null]
  }

];
