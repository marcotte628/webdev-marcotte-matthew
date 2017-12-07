import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../services/widget.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl: String;
  pageId: String;
  imgUrl: String;
  constructor(private imageGetter: WidgetService) { }

  ngOnInit() {
    this.pageId = '5a29723194249574b501238f';

    this.imageGetter.findAllWidgetsForPage(this.pageId).subscribe(
      (img) => {
        this.imgUrl = img[0].url;
      });
  }

}
