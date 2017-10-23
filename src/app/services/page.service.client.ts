import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class PageService {

  constructor(private _http: Http) { }

  createPage(websiteId: String, info: any) {
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this._http.post(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findAllPagesForWebsite(websiteId: String) {
    const url = 'http://localhost:3100/api/website/' + websiteId + '/page';
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findPageById(pageId: String) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this._http.get(url).map( (res: Response) =>  {
      console.log('response ---> ' + res);
      console.log('res.json ---> ' + res);
      const data = res.json();
      return data;
    });
  }

  updatePage(pageId, info) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this._http.put(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deletePage(pageId) {
    const url = 'http://localhost:3100/api/page/' + pageId;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
