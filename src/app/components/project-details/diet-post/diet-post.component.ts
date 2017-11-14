import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FoodService} from '../../../services/project.food.service.client';
import {PersonService} from '../../../services/project.user.service.client';

@Component({
  selector: 'app-diet-post',
  templateUrl: './diet-post.component.html',
  styleUrls: ['./diet-post.component.css']
})
export class DietPostComponent implements OnInit {

  foodId: String;
  userId: String;
  foodData;
  username: String;
  otherId: String;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService,
              private accountService: PersonService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid']
          this.foodId = params['fid'];
        }
      );
    this.foodService.getFoodPostById(this.foodId).subscribe( (data: any) => {
        this.foodData = data;
        this.otherId = this.foodData.userId;
        this.getUser();
      },
      (error: any) => {
      }
    );
  }

  getUser() {
    this.accountService.gePersonById(this.otherId).subscribe(
      (data: any) => {
        this.username = data.name;
      },
      (error: any) => {
      }
    );
  }

}
