import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

  userId: String;
  websites = {};
  profileURL: String;
  newSite: String;

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    this.profileURL = '/user/' + this.userId;
    this.newSite = '/user/' + this.userId + '/website/new';
  }

  WebsiteListController($routeParams, WebsiteService) {
    this.userId = $routeParams['userId'];
    function init() {
      this.websites = WebsiteService.findWebsitesByUser(this.userId);
    }
    init();
  }
}
