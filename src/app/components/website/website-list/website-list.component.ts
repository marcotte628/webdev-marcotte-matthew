import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-website-list',
  templateUrl: './website-list.component.html',
  styleUrls: ['./website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

 /****





  // synchonous example===>

  websites: Website[] = [];
  constructor( private activeRoute: ActivatedRoute, private websiteService: WebsiteService ) { }

  ngOnInit() {
      // subscribe to params to run function if any parameters change
      this.activeRoute.params.subscribe(next: (params) => {
          // store userId from the url
          const userId = params['userId'];

          // want to ask the server what the WEBSITES are for this userId...
          // need client service to encapulate data access to websites in one place
          this.websteis = this.websiteService.findWebsitesForUser(userId);
      });


    // asynchronous example ====>

     websites: Website[] = [];
  constructor( private activeRoute: ActivatedRoute, private websiteService: WebsiteService ) { }

  ngOnInit() {
      // subscribe to params to run function if any parameters change
      this.activeRoute.params.subscribe(next: (params) => {
          // store userId from the url
          const userId = params['userId'];

          // want to ask the server what the WEBSITES are for this userId...
          // need client service to encapulate data access to websites in one place
          this.websiteService.findWebsitesForUser(userId). subscribe(next: (websites) { if(websites) { this.websites = websites; }); });
      });
   ****/

  userId: String;
  websites = {};

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
  }

  WebsiteListController($routeParams, WebsiteService) {
    this.userId = $routeParams['userId'];
    function init() {
      this.websites = WebsiteService.findWebsitesByUser(this.userId);
    }
    init();
  }
}
