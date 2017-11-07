import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widgetId: String;
  widgetText: String;
  widgetName: String;
  widgetPlaceholder: String;
  widgetFormatted: Boolean;
  widgetRows: number;
  widget;

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

  updateWidget() {
    const updatedWidget = {_page : this.widget._page, type : this.widget.type, name : this.widgetName, text : this.widgetText,
      placeholder : this.widgetPlaceholder, description : this.widget.description, url : this.widget.url, width : this.widget.url,
      height : this.widget.height, rows : this.widgetRows, size : this.widget.size, class : this.widget.class, icon : this.widget.icon,
      deletable : this.widget.deletable, formatted : this.widgetFormatted, dateCreated : this.widget.date};

    this.widgetService.updateWidget(this.widgetId, updatedWidget).subscribe(() => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    } );

  }

  cancel() {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
  }
}
