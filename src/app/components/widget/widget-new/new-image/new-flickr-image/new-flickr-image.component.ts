import { Component, OnInit } from '@angular/core';
import { WidgetService} from '../../../../../services/widget.service.client';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {FlickrService} from "../../../../../services/flickr.service.client";

@Component({
  selector: 'app-new-flickr-image',
  templateUrl: './new-flickr-image.component.html',
  styleUrls: ['./new-flickr-image.component.css']
})
export class NewFlickrImageComponent implements OnInit {
  baseUrl: String;
  userId: String;
  websiteId: String;
  pageId: String;
  searchText: String;
  photos;

  constructor(private widgetService: WidgetService, private router: Router,
              private activatedRoute: ActivatedRoute, private flickrService: FlickrService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
          this.pageId = params['pid'];
          this.websiteId = params['wid'];
        });
    this.baseUrl = environment.baseUrl;
  }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log(data);
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          console.log(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';
    const date = new Date();
    const widget = {
      _page: this.pageId, type: 'IMAGE', name: 'flickr image', text: '',
      placeholder: '', description: '', url: url, width: '', height: '',
      rows: '', size: '', class: '', icon: '', deletable: true,
      formatted: false, dateCreated: date };

    this.widgetService.createWidget(this.pageId, widget).subscribe((dontcare) => {
      this.router.navigate(['/user', this.userId, 'website', this.websiteId, 'page', this.pageId, 'widget' ]);
    } );
  }
}
