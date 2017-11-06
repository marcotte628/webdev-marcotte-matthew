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
    const info = {_page : this.pageId, type : 'YOUTUBE', name : 'LOREM', text : 'Lorem Ipsum',
      placeholder : 'LI', description : 'lorem ipsum', url : 'https://www.youtube.com/embed/AM2Ivdi9c4E', width : '',
      height : '', rows : '', size : 4, class : 'YOUTUBE', icon : '', deletable : true,
      formatted : true, dateCreated : '2017-11-6'};
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }


}
