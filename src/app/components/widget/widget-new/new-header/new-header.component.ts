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
    const info = {	_page : this.pageId, type : 'HEADING', name : 'LOREM', text : 'Lorem Ipsum',
                    placeholder : 'LI', description : 'lorem ipsum', url : '', width : '',
                    height : '', rows : '', size : 4, class : 'HEADING', icon : '', deletable : true,
                    formatted : true, dateCreated : '2017-11-6'};
    this.widgetService.createWidget(this.pageId, info).subscribe((resp) => { this.widgets = resp; });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' + this.pageId + '/widget']);
  }
}
