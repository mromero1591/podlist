import { User } from './interfaces/user';

export class Auth {
  private static _user: User;

  static set user(user: User) {
    this._user = user;
  }

  static get user(): User {
    return this._user;
  }
}
