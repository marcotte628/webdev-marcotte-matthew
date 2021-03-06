import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class PageService {

  constructor(private _http: Http) { }

  baseUrl = environment.baseUrl;

  createPage(websiteId: String, info: any) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this._http.post(url, info).map( (res: Response) =>  {
      const data = res.json();
      console.log(data);
      return data;
    });
  }

  findAllPagesForWebsite(websiteId: String) {
    const url = this.baseUrl + '/api/website/' + websiteId + '/page';
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      console.log('findallpagesforwebsite... = ' + data);
      return data;
    });
  }

  findPageById(pageId: String) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updatePage(pageId, info) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.put(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deletePage(pageId) {
    const url = this.baseUrl + '/api/page/' + pageId;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
