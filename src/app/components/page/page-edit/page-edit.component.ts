import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})

export class PageEditComponent implements OnInit {

  pageId: String;
  websiteId: String;
  userId: String;
  pages: {};
  page: {};
  pageTitle: String;
  pageName: String

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
      );
    this.pages = this.pageService.findAllPagesForWebsite(this.websiteId);
    this.page = this.pageService.findPageById(this.pageId);
    this.pageTitle = this.page['description'];
    this.pageName = this.page['name'];
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe((pages) => { this.pages = pages; });
  }

  updatePage() {
    // { '_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem' }
    const info = {_id: this.pageId, name: this.pageName, websiteId: this.websiteId, description: this.pageTitle};
    this.pageService.updatePage(this.pageId, info).subscribe((pages) => { this.pages = pages; });
  }

}
