import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-new-html',
  templateUrl: './new-html.component.html',
  styleUrls: ['./new-html.component.css']
})
export class NewHtmlComponent implements OnInit {
  userId: String;
  websiteId: String;
  pageId: String;
  widgetText;
  widgetName: String;
  invalidWidgetName: boolean;
  invalidMessage: String;
  constructor(private activatedRoute: ActivatedRoute, private widgetService: WidgetService, private router: Router) { }

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
  }

  submit() {
    if (! this.widgetName ) {
      this.invalidMessage = 'widget name is a required field';
      this.invalidWidgetName = true;
    } else {

      const date = new Date();
    const newWidget = {_page : this.pageId, type : 'HTML', name : this.widgetName, text : this.widgetText,
      placeholder : this.widgetText, description : this.widgetText, url : '', width : '',
      height : '', rows : '', size : 0, class : '', icon : '', deletable : true,
      formatted : true, dateCreated : date};
    this.widgetService.createWidget(this.pageId, newWidget).subscribe(() => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    });
    }
  }
  cancel() {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
  }
}
