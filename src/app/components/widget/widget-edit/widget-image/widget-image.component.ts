import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  widget = {};
  widgetId: String;
  widgetType: String;
  widgetText: String;
  widgetName: String;
  widgetUrl: String;
  widgetWidth: String;
  baseUrl: String;
  websiteId: String;
  pageId: String;
  userId: String;
  invalidWidgetName: boolean;
  invalidMessage: String;
  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.widgetId = params['wgid'];
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
        });
    this.invalidWidgetName = false;
    this.invalidMessage = '';
    this.baseUrl = environment.baseUrl;
    this.widgetService.findWidgetById(this.widgetId).subscribe((widget) => {
      this.widget = widget;
      this.widgetType = this.widget['widgetType'];
      this.widgetName = this.widget['name'];
      this.widgetUrl = this.widget['url'];
      this.widgetText = this.widget['text'];
      this.widgetWidth = this.widget['width'];
    });
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe((widget) => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    });
  }

  updateWidget() {
    if (! this.widgetName ) {
      this.invalidMessage = 'widget name is a required field';
      this.invalidWidgetName = true;
    } else {
    const info = { _id: this.widgetId, widgetType: 'IMAGE', pageId: this.pageId, width: this.widgetWidth, url: this.widgetUrl};
    this.widgetService.updateWidget(this.widgetId, info).subscribe((widget) => { this.widget = widget; });
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    }
  }

}
