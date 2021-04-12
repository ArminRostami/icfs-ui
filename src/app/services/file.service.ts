import { API } from './api';
import { HttpClient } from '@angular/common/http';
import { Content, Comment } from '@icfs/types/content';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { fileTypes } from '@icfs/components/files/file-types';

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
        (contents: any[]) => {
          if (contents == null) contents = []
          contents.forEach(content => { content["uploaded_at"] = new Date(content["uploaded_at"]) })
        }
      )
    )
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(API.getComments + `?id=${id}`).pipe(
      tap(comments => {
        if (comments === null) comments = []
        comments.forEach(comment => { comment["comment_time"] = new Date(comment["comment_time"]) })
      })
    )
  }

  textSearch(term: string): Observable<Content[]> {
    return this.http.post(API.textSearch, { "term": term }).pipe(
      map(
        (data: any) => data["results"]
      ),
      tap(
        (contents: Content[]) => {
          if (contents == null) contents = []
          contents.forEach(content => { content["uploaded_at"] = new Date(content["uploaded_at"]) })
        }
      )
    )
  }

  uploadFile(file: NzUploadFile, desc: string) {
    const idx = file.name.indexOf(".")
    const name = file.name.substring(0, idx)
    const ext = file.name.substring(idx + 1)
    const payload = {
      "description": desc,
      "name": name,
      "extension": ext,
      "size": Math.floor(file.size! / (1024 * 1024)) + 1,
      "file_type": this.getType(ext, file.type!)
    }
    return this.http.post(API.upload, payload, { withCredentials: true })
  }

  getType(extension: string, type: string): string {
    switch (extension) {
      case "7z":
      case "arj":
      case "deb":
      case "pkg":
      case "rar":
      case "rpm":
      case "tar.gz":
      case "z":
      case "zip":
      case "gz":
      case "cab":
        return fileTypes.Archive

      case "xls":
      case "ods":
      case "xlsx":
      case "xlsm":
        return fileTypes.Spreadsheet

      case "key":
      case "odp":
      case "pps":
      case "ppt":
      case "pptx":
        return fileTypes.Presentation

      case "doc":
      case "docx":
      case "pdf":
      case "odt":
      case "tex":
      case "wpd":
        return fileTypes.Document

      default: return type.split("/", 2)[0]
    }
  }


}
