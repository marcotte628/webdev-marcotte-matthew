import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-edit',
  templateUrl: './widget-edit.component.html',
  styleUrls: ['./widget-edit.component.css']
})
export class WidgetEditComponent implements OnInit {

  widget;
  widgetId: String;
  widgetType: String;
  userId: String;
  pageId: String;
  websiteId: String;
  size: String;
  widgetText: String;
  headingWidget = 'HEADING';
  youtubeWidget = 'YOUTUBE';
  imageWidget = 'IMAGE';

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.widgetId = params['wgid'];
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
        });
    this.widgetService.findWidgetById(this.widgetId).subscribe((widget) => {
      this.widget = widget;
      this.widgetType = this.widget.widgetType;
      this.size = this.widget.size;
      this.widgetText = this.widget.text;
    });
  }

}
