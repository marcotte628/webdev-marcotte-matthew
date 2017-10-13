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
