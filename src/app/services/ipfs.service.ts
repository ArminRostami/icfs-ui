import { Injectable } from '@angular/core';
import ipfsClient from 'ipfs-http-client';
import { from } from 'rxjs';
import { API } from './api';

@Injectable({
  providedIn: 'root',
})
export class IpfsService {
  private client = ipfsClient({ url: API.ipfs });

  constructor() {}

  getVersion() {
    return from(this.client.version());
  }

  saveToIpfs(file: File) {
    const fileDetails = {
      path: file.name,
      content: file,
    };
    const options = {
      wrapWithDirectory: true,
      progress: (prog: any) => console.log(`received: ${prog}`),
    };
    return from(this.client.add(fileDetails, options));
  }
}
