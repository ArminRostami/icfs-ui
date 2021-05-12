const base = 'http://127.0.0.1:8000';

export const API = {
  users: `${base}/users`,
  login: `${base}/users/login`,
  logout: `${base}/users/logout`,
  getAllFiles: `${base}/contents/all`,
  getComments: `${base}/contents/comment`,
  textSearch: `${base}/contents/search`,
  upload: `${base}/contents`,
  getUserFiles: `${base}/contents/user`,
  ipfs: `/ip4/127.0.0.1/tcp/5001`,
};
