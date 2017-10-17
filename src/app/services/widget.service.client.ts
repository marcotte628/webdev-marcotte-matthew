import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import {Widget} from '../models/widget.model.client';

// injecting service into module
@Injectable()

export class WidgetService {

  constructor() { }

  widgets: Widget[] = [
    new Widget('null', '123', 'HEADING', '321', 2, 'null', 'GIZMODO', 'null', 'GIZMODO'),
    new Widget('null', '234', 'HEADING', '321', 4, 'null', 'Lorem ipsum', 'null', 'LI'),
    new Widget('http://lorempixel.com', '345', 'IMAGE', '321', 0, '100%', 'null', 'http://lorempixel.com/400/200/', 'null'),
    new Widget('null', '456', 'HTML', '321', 0, 'null', '<p>Lorem ipsum</p>', 'null', 'null'),
    new Widget('null', '567', 'HEADING', '321', 4, 'null', 'Lorem ipsum', 'null', 'LI'),
    new Widget('null', '678', 'YOUTUBE', '321', 0, '100%', 'null', 'https://youtu.be/AM2Ivdi9c4E', 'null'),
    new Widget('null', '789', 'HTML', '321', 0, 'null', '<p>Lorem ipsum</p>', 'null', 'null')
  ];

  api = {
    'createWidget'   : this.createWidget,
    'findWidgetByPageId' : this.findWidgetsByPageId,
    'findWidgetById' : this.findWidgetById,
    'updateWidget' : this.updateWidget,
    'deleteWidget' : this.deleteWidget
  };

  createWidget(widget: any) {
    const newId = Math.floor(Math.random() * 1000)
    const newWidget = new Widget('src', newId, 'type', 'page', 0, 'width', 'text', 'url', 'name');
    this.widgets.push(newWidget);
    return newWidget;
  }

  findWidgetsByPageId(pid: String) {
    const wids = [];
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x].pageId === pid) {  wids.push(this.widgets[x]); }
    }
    return wids;
  }

  findWidgetById(widgetId: String) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) { return this.widgets[x]; }
    }
  }

  updateWidget(widgetId, widget) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id === widgetId) {  this.widgets[x] = widget; }
    }
  }

  deleteWidget(widgetId) {
    for (let x = 0; x < this.widgets.length; x++) {
      if (this.widgets[x]._id !== widgetId) {
        this.widgets.splice(x, 1);
      }
    }
  }
}
