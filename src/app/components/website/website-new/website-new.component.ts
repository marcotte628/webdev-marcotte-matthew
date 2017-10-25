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
  websites = [];
  websiteName: String;
  websiteDescription: String;
  constructor(private websiteService: WebsiteService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.websiteService.findAllWebsitesForUser(this.userId).subscribe( (websites) => { this.websites = websites; });
  }

  createWebsite() {
    const info = {_id: '', name: this.websiteName, developerId: this.userId, description: this.websiteDescription};
    this.websiteService.createWebsite(this.userId, info).subscribe( (websites) => { this.websites = websites; });
    this.router.navigate(['/user/' + this.userId + '/website' ]);
  }


}
