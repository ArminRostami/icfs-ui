import { API } from './api';
import { HttpClient } from '@angular/common/http';
import { Content, Comment } from '../types/content';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }

  getFiles(): Observable<Content[]> {
    return this.http.get(API.getAllFiles).pipe(
      map(
        (resp: any) => resp["results"]
      ),
      tap(
        (contents: any[]) =>
          contents.forEach(content => { content["uploaded_at"] = new Date(content["uploaded_at"]) })
      )
    )
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(API.getComments + `?id=${id}`).pipe(
      tap(comments => {
        comments.forEach(comment => { comment["comment_time"] = new Date(comment["comment_time"]) })
      })
    )
  }
}
