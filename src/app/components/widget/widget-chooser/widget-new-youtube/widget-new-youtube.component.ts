import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-new-youtube',
  templateUrl: './widget-new-youtube.component.html',
  styleUrls: ['./widget-new-youtube.component.css']
})
export class WidgetNewYoutubeComponent implements OnInit {
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

  createYoutube() {
    const info = {_id: '',  widgetType: 'YOUTUBE', pageId: this.pageId, width: '100%', url: 'https://www.youtube.com/embed/AM2Ivdi9c4E'};
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }


}
