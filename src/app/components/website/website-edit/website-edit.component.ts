import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  websiteId: String;
  website = {};
  websiteName: String;
  websiteDescription: String;
  userId: String;
  websites: {};

  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.websites = this.websiteService.findWebsitesByUser(this.userId);
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.websiteId = params['wid'];
        });
    this.website = this.websiteService.findWebsiteById(this.websiteId);
    this.websiteName = this.website['name'];
    this.websiteDescription = this.website['description'];
  }

  deleteWebsite(websiteId: String) {
   // this.websiteService.deleteWebsite(websiteId, userId).subscribe((websites) => { this.websites = websites })
  }

  selectWebiste(websiteId: String) {
    //this.websiteService.findWebsiteById(this.userId, websiteId).subscribe((websites) => { this.websites = websites});
  }

  updateWebiste(websiteId: String) {
    this.website = this.websiteService.findWebsiteById(this.websiteId);
    //this.websiteService.findWebsiteById(this.userId, websiteId).subscribe((websites) => { this.websites = websites});
  }
}
