import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

// injecting service into module
@Injectable()

export class FlickrService {
  key = '882ca8a6183b4b4492b41d70d16ad1dd';
  secret = '9ce1abbe5c354fe1';
  baseUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=';

  constructor(private _http: Http) { }

  searchPhotos(searchTerm: String) {

    const url = this.baseUrl + this.key + '&text=' + searchTerm;
    return this._http.get(url);

  }
}
