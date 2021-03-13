import { API } from './api';
import { HttpClient } from '@angular/common/http';
import { Content } from '../types/content';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<Content[]> {
    return this.http.get(API.getAll)
      .pipe(
        map(
          (resp: any) => resp["results"]
        ),
        tap(
          (contents: any[]) =>
            contents.forEach(content => { content["uploaded_at"] = new Date(content["uploaded_at"]) })
        )
      )
  }
}
