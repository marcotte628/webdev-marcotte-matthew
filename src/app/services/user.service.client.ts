import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { User} from '../models/user.model.client';

// injecting service into module
@Injectable()

export class UserService {

  constructor() { }
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
}
