import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-new-image',
  templateUrl: './widget-new-image.component.html',
  styleUrls: ['./widget-new-image.component.css']
})
export class WidgetNewImageComponent implements OnInit {
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
    this.widgets = this.widgetService.findWidgetById(this.pageId);
  }

  createImage () {
    const info = {_id: '',  widgetType: 'IMAGE', pageId: this.pageId, width: '100%', url: 'http://lorempixel.com/400/200/' };
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }
}
