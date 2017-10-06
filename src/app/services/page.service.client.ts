import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class PageService {

  constructor() { }

  pages = [
    { '_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem' },
    { '_id': '432', 'name': 'Post 2', 'websiteId': '456', 'description': 'Lorem' },
    { '_id': '543', 'name': 'Post 3', 'websiteId': '456', 'description': 'Lorem' }
  ];

  api = {
    'createPage'   : this.createPage,
    'findPageByWebsiteId' : this.findPagesByWebsiteId,
    'findPageById' : this.findPageById,
    'updatePage' : this.updatePage,
    'deletePage' : this.deletePage
  };

  createPage(page: any) {
    page._id = Math.random();
    this.pages.push(page);
    return page;
  }

  findPagesByWebsiteId(wid: String) {
    const pgs = [];
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x].websiteId === wid) {  pgs.push(this.pages[x]); }
    }
    return pgs;
  }

  findPageById(pid: String) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pid) { return this.pages[x]; }
    }
  }

  updatePage(pid, page) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id === pid) {  this.pages[x] = page; }
    }
  }

  deletePage(pid) {
    for (let x = 0; x < this.pages.length; x++) {
      if (this.pages[x]._id !== pid) {
        this.pages.splice(x, 1);
      }
    }
  }
}
