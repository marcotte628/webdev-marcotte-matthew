import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  widget = {};
  widgetId: String;
  widgetType: String;
  widgetText: String;
  widgetName: String;
  widgetSize: String;
  userId: String
  pageId: String;
  websiteId: String;

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

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
      this.widgetType = this.widget['widgetType'];
      this.widgetName = this.widget['name'];
      this.widgetSize = this.widget['size'];
      this.widgetText = this.widget['text'];
    });
  }

  deleteWidget() {
    this.widgetService.deleteWidget(this.widgetId).subscribe((widget) => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    });
  }

  updateWidget() {
    const info = { _id: this.widgetId, widgetType: 'HEADING', pageId: this.pageId, size: this.widgetSize, text: this.widgetText };
    this.widgetService.updateWidget(this.widgetId, info).subscribe((widget) => { this.widget = widget; });
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
  }
}
