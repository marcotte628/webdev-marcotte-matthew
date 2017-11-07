import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from "../../../../services/widget.service.client";

@Component({
  selector: 'app-widget-html',
  templateUrl: './widget-html.component.html',
  styleUrls: ['./widget-html.component.css']
})
export class WidgetHtmlComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widget;
  widgetText;
  widgetName: String;

  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
          this.widgetId = params['wgid'];
        });
    this.widgetService.findWidgetById(this.widgetId).subscribe((widget) => {
      this.widget = widget;
      this.widgetName = this.widget.name;
      this.widgetText = this.widget.text;
    });
  }

  update() {
    const date = new Date();
    const newWidget = {_page : this.pageId, type : 'HTML', name : this.widgetName, text : this.widgetText,
      placeholder : this.widgetText, description : this.widgetText, url : '', width : '',
      height : '', rows : '', size : 0, class : '', icon : '', deletable : true,
      formatted : true, dateCreated : date};
    this.widgetService.updateWidget(this.widgetId, newWidget)
      .subscribe(() => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    });
  }

  cancel() {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
  }


}
