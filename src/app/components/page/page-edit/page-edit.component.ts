import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

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
  page;
  pageTitle: String;
  pageName: String;
  invalidPageName: boolean;
  invalidMessage: String;
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
          this.pageId = params['pid'];
        }
      );
    this.invalidPageName = false;
    this.invalidMessage = '';
    // this.pageService.findAllPagesForWebsite(this.websiteId).subscribe( (pages) => { this.page = pages; });
    this.pageService.findPageById(this.pageId).subscribe( (resp) => {
      this.page = resp;
      this.pageTitle = this.page.description;
      this.pageName = this.page.name;
    });
  }

  deletePage() {
    this.pageService.deletePage(this.pageId).subscribe((pages) => { this.pages = pages; });
    this.router.navigate(['/user/' + this.userId + '/website', this.websiteId, 'page' ]);
  }

  updatePage() {
    // { '_id': '321', 'name': 'Post 1', 'websiteId': '456', 'description': 'Lorem' }
    const info = {_id: this.pageId, name: this.pageName, websiteId: this.websiteId, description: this.pageTitle};
    if (! this.pageName ) {
      this.invalidMessage = 'page name is a required field';
      this.invalidPageName = true;
    } else {
    this.pageService.updatePage(this.pageId, info).subscribe((pages) => { this.pages = pages; });
    this.router.navigate(['/user/' + this.userId + '/website', this.websiteId, 'page' ]);
   }
  }
}
