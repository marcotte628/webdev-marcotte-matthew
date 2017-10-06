import { Component, OnInit } from '@angular/core';
import { WidgetService } from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  pageId: String;
  widgets = {};
  widgetType: String;
  headingWidget = 'HEADING';
  youtubeWidget = 'YOUTUBE';
  imageWidget = 'IMAGE';
  widgetText: String;
  widgetUrl: String;
  widgetWidth: String;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.pageId = params['pid'];
        }
      );
    this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
    this.widgetType = this.widgets['widgetType'];
    this.widgetText = this.widgets['text'];
    this.widgetUrl = this.widgets['url'];
    this.widgetWidth = this.widgets['width'];
  }

  WidgetListController($routeParams, WebsiteService) {
    this.pageId = $routeParams['pid'];
    function init() {
      this.widgets = WebsiteService.findWidgetsByPageId(this.pageId);
    }
    init();
  }

}
