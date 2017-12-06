import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})

export class PageNewComponent implements OnInit {

  pageName: String;
  pageDescription: String;
  userId: String;
  websiteId: String;
  pages;
  invalidPageName: boolean;
  invalidMessage: String;
  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.websiteId = params['wid'];
        }
      );
    this.invalidPageName = false;
    this.invalidMessage = '';
    this.pageService.findAllPagesForWebsite(this.websiteId).subscribe( (pages) => { this.pages = pages; });
  }

  createPage() {
    const date = new Date();
    const info = {  _website: this.websiteId, name: this.pageName, description: this.pageDescription, widgets: [], dateCreated: date};
    if (! this.pageName ) {
      this.invalidMessage = 'page name is a required field';
      this.invalidPageName = true;
    } else {
    this.pageService.createPage(this.websiteId, info).subscribe( (pages) => {
      console.log('finally -------> ' + pages);
      this.pages = pages;
    });
    this.router.navigate(['/user/' + this.userId + '/website/' + this.websiteId + '/page/' ]);
    }
  }
}
