import { files } from './files';
import { Content } from '../types/content';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }

  getFiles(): Observable<Content[]> {
    return of(files)
  }
}
