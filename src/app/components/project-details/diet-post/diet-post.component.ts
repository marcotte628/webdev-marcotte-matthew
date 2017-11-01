import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FoodService} from '../../../services/project.food.service.client';

@Component({
  selector: 'app-diet-post',
  templateUrl: './diet-post.component.html',
  styleUrls: ['./diet-post.component.css']
})
export class DietPostComponent implements OnInit {

  foodId: String;
  food;
  foodName: String;
  foodType: String;
  foodProtein: number;
  foodCarbs: number;
  foodFat: number;

  constructor(private activatedRoute: ActivatedRoute, private foodService: FoodService) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.foodId = params['fid'];
        }
      );
    this.foodService.getFoodPostById(this.foodId).subscribe( (ret) => {
      this.food = ret;
      this.foodName = this.food.name;
      this.foodType = this.food.type;
      this.foodProtein = this.food.protein;
      this.foodCarbs = this.food.carbs;
      this.foodFat = this.food.fats;

    });

  }

}
