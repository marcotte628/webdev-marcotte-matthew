import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {
  userId: String;
  websiteId: String;
  widgetId: String;
  widgetName: String;
  widgetText: String;
  widgetUrl: String;
  widgetWidth: String;
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
    const date = new Date();
    const info = {_page : this.pageId, type : 'IMAGE', name : this.widgetName, text : this.widgetText,
      placeholder : '', description : '', url : this.widgetUrl, width : this.widgetWidth,
      height : '', rows : '', size : 0, class : '', icon : '', deletable : true,
      formatted : true, dateCreated : date};
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }
}
