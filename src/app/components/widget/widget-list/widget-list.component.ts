import { Component, Input, OnInit } from '@angular/core';
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
  userId: String;
  websiteId: String;
  websiteUrl: String;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  @Input()
  widgetList: WidgetService;

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.pageId = params['pid'];
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
    this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
  }

  WidgetListController($routeParams, WebsiteService) {
    this.pageId = $routeParams['pid'];
    function init() {
      this.widgets = WebsiteService.findWidgetsByPageId(this.pageId);
    }
    init();
  }

}
