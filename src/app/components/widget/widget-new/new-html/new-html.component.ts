import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-html',
  templateUrl: './new-html.component.html',
  styleUrls: ['./new-html.component.css']
})
export class NewHtmlComponent implements OnInit {

  userId: String;
  websiteId: String;
  pageId: String;
  widget;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
        });
    this.widget = {_page : this.pageId, type : 'HTML', name : '', text : '',
      placeholder : '', description : '', url : '', width : '',
      height : '', rows : '', size : 0, class : '', icon : '', deletable : true,
      formatted : true, dateCreated : '2017-11-6'};
  }

  submit() {}
  delete() {}
}
