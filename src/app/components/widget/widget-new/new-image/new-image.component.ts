import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {
  userId: String;
  websiteId: String;
  widgetId: String;
  pageId: String;
  widgets= [];
  baseUrl: String;

  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
        });
    this.baseUrl = environment.baseUrl;
    this.widgetService.findWidgetById(this.pageId).subscribe( (widgets) => {
      this.widgets = widgets;
      this.widgetId = '' + this.widgets.length;
    });
  }

  createImage () {
    const info = {_id: '',  widgetType: 'IMAGE', pageId: this.pageId, width: '100%', url: 'http://lorempixel.com/400/200/' };
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }
}
