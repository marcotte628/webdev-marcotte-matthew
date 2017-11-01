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

  constructor(private router: Router, private foodService: FoodService ) { }

  ngOnInit() {
  }

  search() {
    this.foodName = this.searchForm.value.name;
    this.foodType = this.searchForm.value.type;

    if (this.foodName && this.foodType) {
      this.searchFoodByName();
      this.searchFoodByType();
     }else if (this.foodName ) {
      this.searchFoodByName();
    } else if (this.foodType) {
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
