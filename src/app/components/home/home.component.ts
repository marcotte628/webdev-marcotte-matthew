import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../services/widget.service.client';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  baseUrl: String;
  widgetId: String;
  imgUrl: String;
  constructor(private imageGetter: WidgetService) { }

  ngOnInit() {
    this.widgetId = '5a2da4a853f09a0004533f99';

    this.imageGetter.findWidgetById(this.widgetId).subscribe(
      (img) => {
        this.imgUrl = img.url;
      });
  }

}
