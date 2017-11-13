import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import {FoodService} from '../../../../services/project.food.service.client';

@Component({
  selector: 'app-gerneral-diets',
  templateUrl: './gerneral-diets.component.html',
  styleUrls: ['./gerneral-diets.component.css']
})
export class GerneralDietsComponent implements OnInit {
  @ViewChild('f') searchForm: NgForm;

  foodName: String;
  foodType: String;
  foodsByName;
  foodsByType;

  /*

      NEEDS TO GET USER INFO, ASK SERVER FOR ID OF FOOD, QUERY API, SET JSON OBJECT, THEN UPLOAD TO DB

   */
  constructor(private router: Router, private foodService: FoodService ) { }

  ngOnInit() {
  }

  search() {
    this.foodType = this.searchForm.value.type;

    if (this.foodType) {
      this.searchFoodByType();
    }
  }

  searchFoodByName() {
    this.foodService.getFoodPostByName(this.foodName).subscribe(
      (data: any) => {
        this.foodsByName = data;
      },
      (error: any) => {

      }
    );

  }

  searchFoodByType() {
    this.foodService.getFoodPostByType(this.foodType).subscribe(
      (data: any) => {
        this.foodsByType = data;
      },
      (error: any) => {

      }
    );
  }
}
