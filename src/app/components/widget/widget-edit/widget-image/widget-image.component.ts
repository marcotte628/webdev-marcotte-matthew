import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private widgetService: WidgetService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.widgetId = params['wgid'];
        });
    this.widget = this.widgetService.findWidgetById(this.widgetId);
    this.widgetType = this.widget['widgetType'];
    this.widgetName = this.widget['name'];
    this.widgetUrl = this.widget['url'];
    this.widgetText = this.widget['text'];
    this.widgetText = this.widget['width'];
  }

}
