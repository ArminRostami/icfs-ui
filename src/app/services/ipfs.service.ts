import { Injectable } from '@angular/core';
import { create } from 'ipfs-http-client';
import { from } from 'rxjs';
import { API } from './api';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private ipfs = create({ url: API.ipfs });

  constructor() {}

  getVersion() {
    return from(this.ipfs.version());
  }

  saveToIpfs(file: File) {
    const fileDetails = {
      path: file.name,
      content: file,
    };
    const options = {
      wrapWithDirectory: false,
      // progress: (prog: any) => console.log(`received: ${prog}`),
    };
    return from(this.ipfs.add(fileDetails, options));
  }

  getFromIpfs(cid: string) {
    return this.ipfs.get(cid);
  }

  async removeFromIpfs(cid: string) {
    const result = await this.ipfs.pin.rm(cid);
    this.ipfs.repo.gc();
    return result;
  }
}
