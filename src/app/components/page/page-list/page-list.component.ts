import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services/page.service.client';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.css']
})
export class PageListComponent implements OnInit {

  userId: String;
  pages = {};

  constructor(private pageService: PageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        }
      );
    this.pages = this.pageService.findPagesByWebsiteId(this.userId);
  }

  WidgetListController($routeParams, WebsiteService) {
    this.userId = $routeParams['uid'];
    function init() {
      this.page = this.pageService.findPagesByWebsiteId(this.userId);
    }
    init();
  }
}
