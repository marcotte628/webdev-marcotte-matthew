import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: String;
  websiteId: String;
  websites = [];
  websiteName: String;
  websiteDescription: String;
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
  }

  createWebsite() {
    const date = new Date();
    const info = {_user: this.userId, name: this.websiteName, description: this.websiteDescription,
                   pages: [], dateCreated: date};
    if (! this.websiteName ) {
      this.invalidMessage = 'website name is a required field';
      this.invalidWebsiteName = true;
    } else {
     this.websiteService.createWebsite(this.userId, info).subscribe( (websites) => {
       this.websites = websites;
       this.router.navigate(['/user/' + this.userId + '/website' ]);
     });
    }
  }


}
