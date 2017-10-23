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
    this.websites = this.websiteService.findAllWebsitesForUser(this.userId);
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.websiteId = params['wid'];
        });
    this.website = this.websiteService.findWebsiteById(this.websiteId);
    this.websiteName = this.website['name'];
    this.websiteDescription = this.website['description'];
  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe((id) => { this.websiteId = id; });
  }

  updateWebsite() {
    const info = { _id: this.websiteId, name: this.websiteName, developerId: this.userId, description: this.websiteDescription };
    this.websiteService.updateWebsite(this.websiteId, info).subscribe((website) => { this.website = website; });
  }
}
