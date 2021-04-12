import { fileTypes } from '@icfs/components/files/file-types';
import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from 'ng-zorro-antd/table';
import { Content } from '@icfs/types/content';


export interface Cols {
  type: ColumnItem
  name: ColumnItem
  date: ColumnItem
  size: ColumnItem
  rate: ColumnItem
  downloads: ColumnItem
  actions: ColumnItem
}

interface ColumnItem {
  name: string;
  sortOrder: NzTableSortOrder | null;
  sortFn: NzTableSortFn | null;
  sortDirections: NzTableSortOrder[];
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
}

export const tableColumns: Cols = {
  type: {
    name: 'Type',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.file_type.localeCompare(b.file_type),
    sortDirections: ['ascend', 'descend', null],
    listOfFilter: [
      { text: 'Font', value: fileTypes.Font },
      { text: 'Text', value: fileTypes.Text },
      { text: 'Image', value: fileTypes.Image },
      { text: 'Audio', value: fileTypes.Audio },
      { text: 'Video', value: fileTypes.Video },
      { text: 'Spreadsheet', value: fileTypes.Spreadsheet },
      { text: 'Presentation', value: fileTypes.Presentation },
      { text: 'Document', value: fileTypes.Document },
      { text: 'Archive', value: fileTypes.Archive },
      { text: 'Application', value: fileTypes.Application },
    ],
    filterFn: (list: string[], item: Content) => list.some(cat => item.file_type.indexOf(cat) !== -1),
    filterMultiple: true

  },
  name: {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', null],
  },
  date: {
    name: 'Date',
    sortOrder: 'descend',
    sortFn: (a: Content, b: Content) => a.uploaded_at.getTime() - b.uploaded_at.getTime(),
    sortDirections: ['ascend', 'descend', null],
  },
  size: {
    name: 'Size',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.size - b.size,
    sortDirections: ['ascend', 'descend', null],
  },
  rate: {
    name: 'Rating',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.rating - b.rating,
    sortDirections: ['ascend', 'descend', null],
  },
  downloads: {
    name: 'Downloads',
    sortOrder: null,
    sortFn: (a: Content, b: Content) => a.downloads - b.downloads,
    sortDirections: ['ascend', 'descend', null],
  },
  actions: {
    name: "Actions",
    sortOrder: null,
    sortFn: null,
    sortDirections: [null],
  }

};
