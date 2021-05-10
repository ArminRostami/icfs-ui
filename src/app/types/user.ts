export class User {
  id: string;
  username: string;
  email: string;
  credit: number;

  constructor() {
    this.credit = 0;
    this.id = '';
    this.username = '';
    this.email = '';
  }
}
