import { API } from './api';
import { HttpClient } from '@angular/common/http';
import { Content, Comment } from '@icfs/types/content';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { fileData } from '@icfs/types/fileData';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(private http: HttpClient) {}

  getFiles(): Observable<Content[]> {
    return this.http.get(API.getAllFiles).pipe(
      map((resp: any) => resp['results']),
      tap((contents: any[]) => {
        if (contents == null) contents = [];
        contents.forEach((content) => {
          content['uploaded_at'] = new Date(content['uploaded_at']);
        });
      })
    );
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(API.getComments + `?id=${id}`).pipe(
      tap((comments) => {
        if (comments === null) comments = [];
        comments.forEach((comment) => {
          comment['comment_time'] = new Date(comment['comment_time']);
        });
      })
    );
  }

  textSearch(term: string): Observable<Content[]> {
    return this.http.post(API.textSearch, { term: term }).pipe(
      map((data: any) => data['results']),
      tap((contents: Content[]) => {
        if (contents == null) contents = [];
        contents.forEach((content) => {
          content['uploaded_at'] = new Date(content['uploaded_at']);
        });
      })
    );
  }

  uploadFile(file: fileData, desc: string) {
    const payload = {
      path: file.path,
      description: desc,
      name: file.name,
      extension: file.extension,
      size: Math.floor(file.size / (1024 * 1024)) + 1,
      file_type: file.type,
    };
    console.log(payload);

    return this.http.post(API.upload, payload, { withCredentials: true });
  }

  getUserFiles(): Observable<Content[]> {
    return this.http.get(API.getUserFiles, { withCredentials: true }).pipe(
      map((resp: any) => resp['results']),
      tap((contents: Content[]) => {
        if (contents == null) contents = [];
        contents.forEach((content) => {
          content['uploaded_at'] = new Date(content['uploaded_at']);
        });
      })
    );
  }
}
