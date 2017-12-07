import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

/*
import { Http, RequestOptions, Response } from '@angular/http';
import { Router } from '@angular/router';
import { User} from '../models/user.model.client';
*/
// injecting service into module
@Injectable()

export class UserService {

  constructor(private _http: Http) {}

  baseUrl = environment.baseUrl;

  // perform register
  register(username: String, password: String) {
    const user = this.createUser(username, password);
    if (user) {
      return user;
    }
  }
  // perform login
  login(username: String, password: String) {
    const user = this.findUserByCredentials(username, password);
    if (user) {
      return user;
    }
  }
  // findUserById
  findUserById(userId: String) {
    return this._http.get(this.baseUrl + '/api/user/' + userId)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }
  // findUserByCredentials = /api/user?username=username&password=password
  findUserByCredentials(username: String, password: String) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
  // "/api/user?username=username", findUserByUsername
  findUserByUsername(username: String) {
    const url = this.baseUrl + '/api/user?username=' + username;
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
  // "/api/user", createUser
  createUser(username: String, password: String) {
    const url = this.baseUrl + '/api/user';
    const date = new Date();
    const body = {username: username, password: password, firstName: username, lastName: username,
      email: username + '@gmail.com', phone: '', websites: [], dateCreated: date};
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
  // "/api/user/:userId", updateUser username: String,
  updateUser(userId: String, username: String, password: String, first: String,
             last: String, email: String, phone: String, websites) {
    const date = new Date();
    const url = this.baseUrl + '/api/user';
    const body = {_id: userId, username: username, password: password, firstName: first, lastName: last,
      email: email, phone: phone, websites: websites, dateCreated: date};
    return this._http.put(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
  // "/api/user/:userId", deleteUser
  deleteUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
