import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Widget} from '../models/widget.model.client';

// injecting service into module
@Injectable()

export class WidgetService {

  constructor(private _http: Http) { }

  createWidget(pageId, info) {
    const url = 'http://localhost:3100/api/page/' + pageId + '/widget';
    return this._http.post(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findAllWidgetsForPage(pageId) {
    const url = 'http://localhost:3100/api/page/' + pageId + '/widget';
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  findWidgetById(widgetId: String) {
    const url = 'http://localhost:3100/api/widget/' + widgetId;
    return this._http.get(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  updateWidget(widgetId, info) {
    const url = 'http://localhost:3100/api/widget/' + widgetId;
    return this._http.put(url, info).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }

  deleteWidget(widgetId) {
    const url = 'http://localhost:3100/api/widget/' + widgetId;
    return this._http.delete(url).map( (res: Response) =>  {
      const data = res.json();
      return data;
    });
  }
}
