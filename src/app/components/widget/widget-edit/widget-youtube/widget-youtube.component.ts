import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

  widget = {};
  widgetId: String;
  widgetName: String;
  widgetText: String;
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
    this.widgetName = this.widget['name'];
    this.widgetText = this.widget['text'];
    this.widgetUrl = this.widget['size'];
    this.widgetWidth = this.widget['text'];
  }

}
