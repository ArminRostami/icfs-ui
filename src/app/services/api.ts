import { environment } from 'src/environments/environment';

const base = environment.baseUrl;
const contents = `${base}/contents`;
const users = `${base}/users`;

export const API = {
  users: `${users}`,
  login: `${users}/login`,
  logout: `${users}/logout`,
  register: `${users}`,
  getAllFiles: `${contents}/all`,
  getComments: `${contents}/comment`,
  textSearch: `${contents}/search`,
  upload: `${contents}`,
  getUserUploads: `${contents}/uploads`,
  getUserDownloads: `${contents}/downloads`,
  deleteContent: `${contents}`,
  getCID: `${contents}`,
  newComment: `${contents}/comment`,
  newRating: `${contents}/rate`,
  ipfs: `/ip4/127.0.0.1/tcp/5001`,
};
