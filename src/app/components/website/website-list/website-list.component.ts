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
  websites = [];

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.websiteService.findAllWebsitesForUser(this.userId).subscribe( (websites) => { this.websites = websites; });
  }

  WebsiteListController($routeParams, WebsiteService) {
    this.userId = $routeParams['userId'];
    function init() {
      this.websites = WebsiteService.findAllWebsitesForUser(this.userId);
    }
    init();
  }
}
