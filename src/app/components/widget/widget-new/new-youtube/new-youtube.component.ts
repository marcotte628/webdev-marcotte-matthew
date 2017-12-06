import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-youtube',
  templateUrl: './new-youtube.component.html',
  styleUrls: ['./new-youtube.component.css']
})
export class NewYoutubeComponent implements OnInit {
  userId: String;
  websiteId: String;
  pageId: String;
  widgetName: String;
  widgetText: String;
  widgetUrl: String;
  widgetWidth: String;
  widgets;
  invalidWidgetName: boolean;
  invalidMessage: String;
  constructor(private widgetService: WidgetService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
        });
    this.invalidWidgetName = false;
    this.invalidMessage = '';

    this.widgetService.findWidgetById(this.pageId).subscribe((wdtgs) => {
      this.widgets = wdtgs;
    } );
  }

  createYoutube() {
    if (! this.widgetName ) {
      this.invalidMessage = 'widget name is a required field';
      this.invalidWidgetName = true;
    } else {
    const date = new Date();
    const info = {_page : this.pageId, type : 'YOUTUBE', name : this.widgetName, text : this.widgetText,
      placeholder : '', description : '', url : this.widgetUrl, width : this.widgetWidth,
      height : '', rows : '', size : 4, class : '', icon : '', deletable : true,
      formatted : true, dateCreated : date};
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }
  }

}
