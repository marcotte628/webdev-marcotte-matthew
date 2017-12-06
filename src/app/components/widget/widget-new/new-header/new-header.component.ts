import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { WidgetService} from '../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.css']
})
export class NewHeaderComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userId: String;
  websiteId: String;
  pageId: String;
  headingName: String;
  headingText: String;
  headingSize: number;
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
  }

  createWidget() {
    if (! this.headingName ) {
      this.invalidMessage = 'widget name is a required field';
      this.invalidWidgetName = true;
    } else {
      const date = new Date();
    const info = {	_page : this.pageId, type : 'HEADING', name : this.headingName, text : this.headingText,
                    placeholder : '', description : '', url : '', width : '',
                    height : '', rows : '', size : this.headingSize, class : '', icon : '', deletable : true,
                    formatted : true, dateCreated : date};
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }
  }
}
