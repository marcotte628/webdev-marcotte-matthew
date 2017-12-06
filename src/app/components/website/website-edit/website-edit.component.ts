import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';

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
  websites = [];
  invalidWebsiteName: boolean;
  invalidMessage: String;
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
    this.invalidWebsiteName = false;
    this.invalidMessage = '';
    this.websiteService.findAllWebsitesForUser(this.userId).subscribe( (websites) => { this.websites = websites; });
    this.website = this.websiteService.findWebsiteById(this.websiteId).subscribe( (website) => {
      this.website = website;
      this.websiteName = this.website['name'];
      this.websiteDescription = this.website['description'];
    });

  }

  deleteWebsite() {
    this.websiteService.deleteWebsite(this.websiteId).subscribe((id) => { this.websiteId = id; })
    this.router.navigate(['/user/' + this.userId + '/website' ]);
  }

  updateWebsite() {
    const info = { _id: this.websiteId, name: this.websiteName, developerId: this.userId, description: this.websiteDescription };
    if (! this.websiteName ) {
      this.invalidMessage = 'website name is a required field';
      this.invalidWebsiteName = true;
    } else {
    this.websiteService.updateWebsite(this.websiteId, info).subscribe((website) => { this.website = website; });
    this.router.navigate(['/user/' + this.userId + '/website' ]);
    }
  }
}
