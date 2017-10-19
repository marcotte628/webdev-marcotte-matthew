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
  createUser(userId: String, username: String, password: String, first: String, last: String) {
    const url = this.baseUrl + '/api/user';
    const body = {_id: userId, username: username, password: password, firstName: first, lastName: last};
    return this._http.post(url, body).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
  // "/api/user/:userId", updateUser
  updateUser(userId: String, username: String, password: String, first: String, last: String) {
    const url = this.baseUrl + '/api/user';
    const body = {_id: userId, username: username, password: password, firstName: first, lastName: last};
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


  /*
  users: User[] = [
    new User('123', 'alice', 'alice', 'Alice', 'Wonder', 'alice@google.com'),
    new User('234', 'bob', 'bob', 'Bob', 'Wonder', 'bob@google.com'),
    new User('345', 'charly', 'charly', 'Charly', 'Garcia', 'charly@google.com'),
    new User('456', 'jannunzi', 'jannunzi', 'Jose', 'Annunzi', 'jann@google.com')
  ];

  api = {
    'createUser'   : this.createUser,
    'findUserById' : this.findUserById,
    'findUserByUsername' : this.findUserByUsername,
    'updateUser' : this.updateUser,
    'deleteUser' : this.deleteUser
  };

  createUser(user: String, password: String) {
    const newID = Math.floor((Math.random() * 1000));
    const newUser = new User( newID, user, password, user, user, user);
    this.users.push(newUser);
    return newUser;
  }

  findUserById(userId: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {  return this.users[x]; }
    }
  }

  findUserByUsername(username: String) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username) { return this.users[x]; }
    }
  }

  findUserByCredentials(username: String, password: String) {
    // find credentials fromthe server...
    // const url = 'http://localhost:3100/api/user?username=' + username + '&password=' + password;
    // return this.http.get(url).map(response: Response) => { return response.json(); });
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x].username === username && this.users[x].password === password ) { return this.users[x]; }
    }
  }

  updateUser(userId, user) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {  this.users[x] = user; }
    }
  }

  deleteUser(userId) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id !== userId) {
        this.users.splice(x, 1);
      }
    }
  }

  */
}
