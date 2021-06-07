import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { create } from 'ipfs-http-client';
import { from } from 'rxjs';
import { API } from './api';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private client = create({ url: API.ipfs });

  constructor(private http: HttpClient) {}

  getVersion() {
    return from(this.client.version());
  }

  saveToIpfs(file: File) {
    const fileDetails = {
      path: file.name,
      content: file,
    };
    const options = {
      wrapWithDirectory: false,
      progress: (prog: any) => console.log(`received: ${prog}`),
    };
    return from(this.client.add(fileDetails, options));
  }

  // FIXME:
  getFromIpfs(cid: string) {
    // const iter = this.client.cat('/ipfs/' + cid);
    // await this.client.files.write('/home', iter);
    this.client.get(cid);
    return this.http.post(`http://localhost:5001/api/v0/get?arg=${cid}`, { observe: 'response' });
  }

  async removeFromIpfs(cid: string) {
    const result = await this.client.pin.rm(cid);
    this.client.repo.gc();
    return result;
  }
}
