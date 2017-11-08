import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class WebsiteService {

  constructor(private _http: Http) { }

  baseUrl = environment.baseUrl;

  createWebsite(userId: String, info: {}) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this._http.post(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findAllWebsitesForUser(userId: String) {
    const url = this.baseUrl + '/api/user/' + userId + '/website';
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findWebsiteById(websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateWebsite(websiteId: String, info: any) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this._http.put(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deleteWebsite(websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
