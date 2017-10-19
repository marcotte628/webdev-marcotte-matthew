/******
 service to host all website access

 //=======+> single threaded example

 import {WEBSITES} from './website.mock';
 import {Injectable} from './........';

 //-----> include this class in module.ts providers so you can inject it
 @Injectable()
 export class WebsiteServiceClient {
  findWebsitesForUser(userId: String){
    return WEBSITES;
  }
 }

 // =======> asynchronous call to the server
 // first return says not to wait for response.. when response comes back, second function is called

 import {WEBSITES} from './website.mock';
 import {Injectable} from './........';
 import {Http} from 'angular/http';
 import 'rxjs/Rx';

 //-----> include this class in module.ts providers so you can inject it
 @Injectable()
 export class WebsiteServiceClient {
  findWebsitesForUser(userId: String){
  const url = 'http://localhost:3100/api/user/' + userId + '/website';
    this.http.get(url).map((response: Response) = {
      resturn response.json();
    });
  }

  createWebsite(userId: String, website: Website) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website';
    return this.http.post(url, website).map((response: Response) => {
        return response.json();
    });
  }

    function deleteWebsite(websiteId: String, userId: String) {
      const url = 'http://localhost:3100/api/user/' + userId + '/website' + websiteId;
      return this.http.delete(url).map((response: Response) => {
          return response.json();
     });
  }

  selectWebsite(websiteId: String) {
   const url = 'http://localhost:3100/api/user/' + userId + '/website' + websiteId;
      return this.http.get(url).map((response: Response) => {
          return response.json();
     });
  }
 }



 ******/




import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WebsiteService {

  constructor() { }

  websites = [
    { '_id': '123', 'name': 'Facebook',    'developerId': '456', 'description': 'Lorem' },
    { '_id': '234', 'name': 'Tweeter',     'developerId': '456', 'description': 'Lorem' },
    { '_id': '456', 'name': 'Gizmodo',     'developerId': '456', 'description': 'Lorem' },
    { '_id': '890', 'name': 'Go',          'developerId': '123', 'description': 'Lorem' },
    { '_id': '567', 'name': 'Tic Tac Toe', 'developerId': '123', 'description': 'Lorem' },
    { '_id': '678', 'name': 'Checkers',    'developerId': '123', 'description': 'Lorem' },
    { '_id': '789', 'name': 'Chess',       'developerId': '234', 'description': 'Lorem' }
  ];

  api = {
    'createWebsite'   : this.createWebsite,
    'findWebsitesByUser' : this.findWebsitesByUser,
    'findWebsiteById' : this.findWebsiteById,
    'updateWebsite' : this.updateWebsite,
    'deleteWebsite' : this.deleteWebsite
  };

  createWebsite(site: any) {
    site._id = Math.random();
    this.websites.push(site);
    return site;
  }

  findWebsitesByUser(userId: String) {
    const sites = [{}];
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x].developerId === userId) {  sites.push(this.websites[x]); }
    }
    return sites;
  }

  findWebsiteById(wid: String) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === wid) { return this.websites[x]; }
    }
  }

  updateWebsite(wid, site) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id === wid) {  this.websites[x] = site; }
    }
  }

  deleteWebsite(wid) {
    for (let x = 0; x < this.websites.length; x++) {
      if (this.websites[x]._id !== wid) {
        this.websites.splice(x, 1);
      }
    }
  }
}
