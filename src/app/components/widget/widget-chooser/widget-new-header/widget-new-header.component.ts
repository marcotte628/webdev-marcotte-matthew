import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-new-header',
  templateUrl: './widget-new-header.component.html',
  styleUrls: ['./widget-new-header.component.css']
})
export class WidgetNewHeaderComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

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
  }

  createWidget() {
    const info = {_id: '',  widgetType: 'HEADING', pageId: this.pageId, size: 4, text: 'NEW-HEADING'};
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }
}
