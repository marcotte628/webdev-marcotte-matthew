import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FoodService} from '../../../../services/project.food.service.client';

@Component({
  selector: 'app-gerneral-diets',
  templateUrl: './gerneral-diets.component.html',
  styleUrls: ['./gerneral-diets.component.css']
})
export class GerneralDietsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  userId: String;
  foodName: String;
  foodType: String;
  allFoods;
  constructor(private router: Router, private foodService: FoodService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
        (params: any) => {
          this.userId = params['uid'];
        });
    this.foodService.getAllFoodPosts().subscribe(
      (data: any) => {
        this.allFoods = data;
      },
      (error: any) => {}
    );
  }

  searchFoodByName() {

    this.foodService.getFoodPostByName(this.foodName).subscribe(
      (data: any) => {
        this.allFoods = data;
      },
      (error: any) => {

      }
    );
  }

  searchFoodByType() {

    this.foodService.getFoodPostByType(this.foodType).subscribe(
      (data: any) => {
        this.allFoods = data;
      },
      (error: any) => {

      }
    );
  }

}
