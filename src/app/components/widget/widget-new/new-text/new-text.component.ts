import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';

@Component({
  selector: 'app-new-text',
  templateUrl: './new-text.component.html',
  styleUrls: ['./new-text.component.css']
})
export class NewTextComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
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
        });
  }

  createWidget() {
    const date = new Date();
    const newWidget = {_page : this.pageId, type : 'INPUT', name : this.widgetName, text : this.widgetText,
      placeholder : this.widgetPlaceholder, description : '', url : '', width : '',
      height : '', rows : this.widgetRows, size : 0, class : '', icon : '', deletable : true,
      formatted : this.widgetFormatted, dateCreated : date};

    this.widgetService.createWidget(this.pageId, newWidget).subscribe(() => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    } );
  }

  cancel() {
    this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
  }

}
