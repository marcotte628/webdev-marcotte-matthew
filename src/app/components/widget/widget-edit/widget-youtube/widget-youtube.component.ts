import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  widget = {};
  widgetId: String;
  userId: String;
  websiteId: String;
  pageId: String;
  widgetName: String;
  widgetText: String;
  widgetUrl: String;
  widgetWidth: String;
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
    this.widgetService.findWidgetById(this.widgetId).subscribe((widget) => {
      this.widget = widget;
      this.widgetName = this.widget['name'];
      this.widgetText = this.widget['text'];
      this.widgetUrl = this.widget['url'];
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
    const info = { _id: this.widgetId, widgetType: 'YOUTUBE', pageId: this.pageId, width: this.widgetWidth, url: this.widgetUrl };
    this.widgetService.updateWidget(this.widgetId, info).subscribe((widget) => { this.widget = widget; });
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget']);
  }
  }
}
