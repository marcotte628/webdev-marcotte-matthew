import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})

export class PageNewComponent implements OnInit {

  pageName: String;
  pageTitle: String;
  userId: String;
  websiteId: String;
  pages = {};

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
    this.pages = this.pageService.findAllPagesForWebsite(this.websiteId).subscribe( (pages) => { this.pages = pages; });
  }

  createPage() {
    const info = {_id: '', name: this.pageName, websiteId: this.websiteId, description: this.pageTitle};
    this.pageService.createPage(this.websiteId, info).subscribe( (pages) => { this.pages = pages; });
  }

}
