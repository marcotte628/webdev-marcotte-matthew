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

  constructor(private _http: Http) { }

  createWebsite(userId: String, info: any) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website';
    return this._http.post(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findAllWebsitesForUser(userId: String) {
    const url = 'http://localhost:3100/api/user/' + userId + '/website';
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findWebsiteById(websiteId: String) {
    const url = 'http://localhost:3100/api/website/' + websiteId;
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateWebsite(websiteId: String, info: any) {
    const url = 'http://localhost:3100/api/website/' + websiteId;
    return this._http.put(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deleteWebsite(websiteId: String) {
    const url = 'http://localhost:3100/api/website/' + websiteId;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
