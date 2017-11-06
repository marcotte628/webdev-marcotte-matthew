import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-new-html',
  templateUrl: './widget-new-html.component.html',
  styleUrls: ['./widget-new-html.component.css']
})
export class WidgetNewHtmlComponent implements OnInit {
  userId: String;
  websiteId: String;
  pageId: String;
  widgets: {};
  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
        });
  }

}
